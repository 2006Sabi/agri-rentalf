import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ThumbsUp,
  ThumbsDown,
  MessageSquare,
  Clock,
  Tag,
  CheckCircle,
  Award,
  Edit,
  Trash2,
  User,
  MapPin,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "./Forum.css";

const ForumPost = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newAnswer, setNewAnswer] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    fetchPost();
    fetchCategories();
  }, [id]);

  const fetchPost = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/forum/posts/${id}`);
      const data = await response.json();

      if (data.success) {
        setPost(data.data.post);
        setAnswers(data.data.answers);
      } else {
        console.error("Error fetching post:", data.message);
      }
    } catch (error) {
      console.error("Error fetching post:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/forum/categories");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleVote = async (itemId, itemType, voteType) => {
    if (!user) {
      navigate("/login");
      return;
    }

    try {
      const endpoint =
        itemType === "post"
          ? `/api/forum/posts/${itemId}/vote`
          : `/api/forum/answers/${itemId}/vote`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ voteType }),
      });

      const data = await response.json();

      if (data.success) {
        // Update the post or answer with new vote data
        if (itemType === "post") {
          setPost((prev) => ({
            ...prev,
            votes: {
              upvotes:
                voteType === "upvote"
                  ? [...prev.votes.upvotes, { _id: user.id }]
                  : prev.votes.upvotes.filter((v) => v._id !== user.id),
              downvotes:
                voteType === "downvote"
                  ? [...prev.votes.downvotes, { _id: user.id }]
                  : prev.votes.downvotes.filter((v) => v._id !== user.id),
            },
          }));
        } else {
          setAnswers((prev) =>
            prev.map((answer) =>
              answer._id === itemId
                ? {
                    ...answer,
                    votes: {
                      upvotes:
                        voteType === "upvote"
                          ? [...answer.votes.upvotes, { _id: user.id }]
                          : answer.votes.upvotes.filter(
                              (v) => v._id !== user.id
                            ),
                      downvotes:
                        voteType === "downvote"
                          ? [...answer.votes.downvotes, { _id: user.id }]
                          : answer.votes.downvotes.filter(
                              (v) => v._id !== user.id
                            ),
                    },
                  }
                : answer
            )
          );
        }
      }
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  const handleSubmitAnswer = async (e) => {
    e.preventDefault();
    if (!newAnswer.trim()) return;

    try {
      setSubmitting(true);
      const response = await fetch(`/api/forum/posts/${id}/answers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newAnswer }),
      });

      const data = await response.json();

      if (data.success) {
        setAnswers((prev) => [data.data, ...prev]);
        setNewAnswer("");
        // Update post answers count
        setPost((prev) => ({
          ...prev,
          answersCount: prev.answersCount + 1,
        }));
      }
    } catch (error) {
      console.error("Error submitting answer:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkBestAnswer = async (answerId) => {
    try {
      const response = await fetch(`/api/forum/answers/${answerId}/best`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (data.success) {
        // Update answers to mark the best answer
        setAnswers((prev) =>
          prev.map((answer) => ({
            ...answer,
            isBestAnswer: answer._id === answerId,
            isAccepted: answer._id === answerId,
          }))
        );

        // Update post to mark as resolved
        setPost((prev) => ({
          ...prev,
          isResolved: true,
          bestAnswer: answerId,
        }));
      }
    } catch (error) {
      console.error("Error marking best answer:", error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`/api/forum/posts/${id}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (data.success) {
        navigate("/forum");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.icon : "💬";
  };

  const getCategoryLabel = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.label : "General";
  };

  const formatTimeAgo = (date) => {
    const now = new Date();
    const postDate = new Date(date);
    const diffInSeconds = Math.floor((now - postDate) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return postDate.toLocaleDateString();
  };

  const hasUserVoted = (item, itemType) => {
    if (!user) return null;
    const userId = user.id;

    if (item.votes.upvotes.some((vote) => vote._id === userId)) return "upvote";
    if (item.votes.downvotes.some((vote) => vote._id === userId))
      return "downvote";
    return null;
  };

  const getVoteCount = (item) => {
    return item.votes.upvotes.length - item.votes.downvotes.length;
  };

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div className="forum-post-skeleton">
            <div className="forum-post-skeleton-header"></div>
            <div className="forum-post-skeleton-content"></div>
            <div className="forum-post-skeleton-answers">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="forum-post-skeleton-answer"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="section">
        <div className="container">
          <div className="forum-post-not-found">
            <h2>Post not found</h2>
            <p>
              The post you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/forum" className="btn btn-primary">
              Back to Forum
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        {/* Navigation */}
        <div className="forum-post-navigation">
          <Link to="/forum" className="forum-back-link">
            <ArrowLeft size={16} />
            Back to Forum
          </Link>
        </div>

        {/* Post Content */}
        <div className="forum-post-main">
          <div className="forum-post-vote-section">
            <button
              onClick={() => handleVote(post._id, "post", "upvote")}
              className={`forum-vote-btn ${
                hasUserVoted(post, "post") === "upvote" ? "voted" : ""
              }`}
              disabled={!user}
            >
              <ThumbsUp size={20} />
            </button>
            <div className="forum-vote-count">{getVoteCount(post)}</div>
            <button
              onClick={() => handleVote(post._id, "post", "downvote")}
              className={`forum-vote-btn ${
                hasUserVoted(post, "post") === "downvote" ? "voted" : ""
              }`}
              disabled={!user}
            >
              <ThumbsDown size={20} />
            </button>
          </div>

          <div className="forum-post-content-main">
            <div className="forum-post-header-main">
              <h1 className="forum-post-title-main">{post.title}</h1>
              {post.isResolved && (
                <div className="forum-post-resolved-badge">
                  <CheckCircle size={16} />
                  <span>Resolved</span>
                </div>
              )}
            </div>

            <div className="forum-post-body">
              <p>{post.content}</p>
            </div>

            <div className="forum-post-meta-main">
              <div className="forum-post-tags-main">
                <span className="forum-post-category-main">
                  {getCategoryIcon(post.category)}{" "}
                  {getCategoryLabel(post.category)}
                </span>
                {post.tags.map((tag, index) => (
                  <span key={index} className="forum-post-tag-main">
                    <Tag size={12} />
                    {tag}
                  </span>
                ))}
              </div>

              <div className="forum-post-stats-main">
                <span className="forum-post-stat-main">
                  <MessageSquare size={14} />
                  {post.answersCount} answers
                </span>
                <span className="forum-post-stat-main">
                  <Clock size={14} />
                  {formatTimeAgo(post.createdAt)}
                </span>
              </div>
            </div>

            <div className="forum-post-author-main">
              <div className="forum-author-card">
                <div className="forum-author-avatar">
                  <User size={24} />
                </div>
                <div className="forum-author-details">
                  <div className="forum-author-name-main">
                    {post.author.name}
                  </div>
                  <div className="forum-author-role-main">
                    {post.author.role}
                  </div>
                  {post.author.location && (
                    <div className="forum-author-location">
                      <MapPin size={12} />
                      {post.author.location}
                    </div>
                  )}
                </div>
              </div>

              {(user?.id === post.author._id || user?.role === "admin") && (
                <div className="forum-post-actions">
                  <Link
                    to={`/forum/post/${post._id}/edit`}
                    className="btn btn-secondary btn-sm"
                  >
                    <Edit size={14} />
                    Edit
                  </Link>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="btn btn-danger btn-sm"
                  >
                    <Trash2 size={14} />
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Answers Section */}
        <div className="forum-answers-section">
          <h2 className="forum-answers-title">
            {answers.length} Answer{answers.length !== 1 ? "s" : ""}
          </h2>

          {answers.length === 0 ? (
            <div className="forum-no-answers">
              <p>No answers yet. Be the first to help!</p>
            </div>
          ) : (
            <div className="forum-answers-list">
              {answers.map((answer) => (
                <div
                  key={answer._id}
                  className={`forum-answer-card ${
                    answer.isBestAnswer ? "best-answer" : ""
                  }`}
                >
                  {answer.isBestAnswer && (
                    <div className="forum-best-answer-badge">
                      <Award size={16} />
                      <span>Best Answer</span>
                    </div>
                  )}

                  <div className="forum-answer-vote-section">
                    <button
                      onClick={() => handleVote(answer._id, "answer", "upvote")}
                      className={`forum-vote-btn ${
                        hasUserVoted(answer, "answer") === "upvote"
                          ? "voted"
                          : ""
                      }`}
                      disabled={!user}
                    >
                      <ThumbsUp size={16} />
                    </button>
                    <div className="forum-vote-count">
                      {getVoteCount(answer)}
                    </div>
                    <button
                      onClick={() =>
                        handleVote(answer._id, "answer", "downvote")
                      }
                      className={`forum-vote-btn ${
                        hasUserVoted(answer, "answer") === "downvote"
                          ? "voted"
                          : ""
                      }`}
                      disabled={!user}
                    >
                      <ThumbsDown size={16} />
                    </button>
                  </div>

                  <div className="forum-answer-content">
                    <div className="forum-answer-body">
                      <p>{answer.content}</p>
                    </div>

                    <div className="forum-answer-meta">
                      <div className="forum-answer-author">
                        <span>Answered by</span>
                        <span className="forum-answer-author-name">
                          {answer.author.name}
                        </span>
                        <span className="forum-answer-author-role">
                          {answer.author.role}
                        </span>
                      </div>

                      <div className="forum-answer-time">
                        {formatTimeAgo(answer.createdAt)}
                      </div>

                      {!post.isResolved &&
                        (user?.id === post.author._id ||
                          user?.role === "admin") && (
                          <button
                            onClick={() => handleMarkBestAnswer(answer._id)}
                            className="btn btn-success btn-sm"
                          >
                            <CheckCircle size={14} />
                            Mark as Best
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Add Answer Form */}
        {user && !post.isLocked && (
          <div className="forum-answer-form-section">
            <h3 className="forum-answer-form-title">Your Answer</h3>
            <form onSubmit={handleSubmitAnswer} className="forum-answer-form">
              <textarea
                value={newAnswer}
                onChange={(e) => setNewAnswer(e.target.value)}
                placeholder="Share your knowledge and help the community..."
                className="form-textarea forum-answer-textarea"
                rows={6}
                required
              />
              <div className="forum-answer-form-footer">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={submitting || !newAnswer.trim()}
                >
                  {submitting ? "Posting..." : "Post Answer"}
                </button>
              </div>
            </form>
          </div>
        )}

        {!user && (
          <div className="forum-login-prompt">
            <p>Please log in to answer this question.</p>
            <Link to="/login" className="btn btn-primary">
              Login to Answer
            </Link>
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="modal">
              <div className="modal-header">
                <h3>Delete Post</h3>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to delete this post? This action cannot
                  be undone.
                </p>
              </div>
              <div className="modal-footer">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button onClick={handleDeletePost} className="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ForumPost;
