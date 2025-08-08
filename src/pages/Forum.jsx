import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  MessageSquare,
  Eye,
  ThumbsUp,
  ThumbsDown,
  Clock,
  Tag,
  Plus,
  TrendingUp,
  CheckCircle,
  X,
  ChevronLeft,
  ChevronRight,
  Users,
  Award,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "./Forum.css";

const Forum = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: "",
    search: "",
    sort: "newest",
    resolved: "",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  });
  const [showFilters, setShowFilters] = useState(false);
  const [stats, setStats] = useState({
    totalPosts: 0,
    totalAnswers: 0,
    totalUsers: 0,
  });

  useEffect(() => {
    fetchCategories();
    fetchPosts();
    fetchStats();
  }, [filters, pagination.current]);

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

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.current,
        ...filters,
      });

      const response = await fetch(`/api/forum/posts?${queryParams}`);
      const data = await response.json();

      if (data.success) {
        setPosts(data.data);
        setPagination(data.pagination);
      } else {
        console.error("Error fetching posts:", data.message);
        setPosts([]);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      // This would be a separate endpoint for forum stats
      // For now, we'll calculate from posts data
      const response = await fetch("/api/forum/posts?limit=1000");
      const data = await response.json();
      if (data.success) {
        const totalAnswers = data.data.reduce((sum, post) => sum + post.answersCount, 0);
        setStats({
          totalPosts: data.pagination.total,
          totalAnswers,
          totalUsers: Math.floor(data.pagination.total * 0.8), // Estimate
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchPosts();
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      search: "",
      sort: "newest",
      resolved: "",
    });
    setPagination((prev) => ({ ...prev, current: 1 }));
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
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    return postDate.toLocaleDateString();
  };

  // Skeleton Loading Component
  const PostCardSkeleton = () => (
    <div className="forum-skeleton-card forum-skeleton">
      <div className="forum-skeleton-votes"></div>
      <div className="forum-skeleton-content">
        <div className="forum-skeleton-title"></div>
        <div className="forum-skeleton-excerpt"></div>
        <div className="forum-skeleton-meta">
          <div className="forum-skeleton-tag"></div>
          <div className="forum-skeleton-time"></div>
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          {/* Header Skeleton */}
          <div className="forum-skeleton-header">
            <div className="forum-skeleton-title"></div>
            <div className="forum-skeleton-subtitle"></div>
          </div>

          {/* Stats Skeleton */}
          <div className="forum-skeleton-stats">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="forum-skeleton-stat"></div>
            ))}
          </div>

          {/* Search Skeleton */}
          <div className="card forum-skeleton-search">
            <div className="card-content">
              <div className="forum-skeleton-search-bar"></div>
            </div>
          </div>

          {/* Posts Skeleton */}
          <div className="forum-skeleton-posts">
            {Array.from({ length: 5 }).map((_, index) => (
              <PostCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        {/* Enhanced Header */}
        <div className="forum-header">
          <div className="forum-icon">
            <span>🗣️</span>
          </div>
          <h1 className="forum-title">AgriConnect Forum</h1>
          <p className="forum-subtitle">
            Connect with fellow farmers, share knowledge, and get expert advice
            on all things agriculture
          </p>
          <div className="forum-features">
            <div className="forum-feature">
              <Users size={16} />
              <span>Community Driven</span>
            </div>
            <div className="forum-feature">
              <Award size={16} />
              <span>Expert Verified</span>
            </div>
            <div className="forum-feature">
              <MessageSquare size={16} />
              <span>Real-time Support</span>
            </div>
          </div>
        </div>

        {/* Forum Stats */}
        <div className="forum-stats">
          <div className="forum-stat">
            <div className="forum-stat-icon">
              <MessageSquare size={20} />
            </div>
            <div className="forum-stat-content">
              <div className="forum-stat-number">{stats.totalPosts}</div>
              <div className="forum-stat-label">Total Posts</div>
            </div>
          </div>
          <div className="forum-stat">
            <div className="forum-stat-icon">
              <TrendingUp size={20} />
            </div>
            <div className="forum-stat-content">
              <div className="forum-stat-number">{stats.totalAnswers}</div>
              <div className="forum-stat-label">Total Answers</div>
            </div>
          </div>
          <div className="forum-stat">
            <div className="forum-stat-icon">
              <Users size={20} />
            </div>
            <div className="forum-stat-content">
              <div className="forum-stat-number">{stats.totalUsers}</div>
              <div className="forum-stat-label">Active Members</div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="card forum-search">
          <div className="card-content">
            <form onSubmit={handleSearch} className="forum-search-form">
              <div className="forum-search-row">
                <div className="forum-search-input-wrapper">
                  <Search className="forum-search-icon" size={20} />
                  <input
                    type="text"
                    placeholder="Search for questions, topics, or keywords..."
                    value={filters.search}
                    onChange={(e) => handleFilterChange("search", e.target.value)}
                    className="form-input forum-search-input"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`btn ${
                    showFilters ? "btn-primary" : "btn-secondary"
                  } forum-filters-toggle`}
                >
                  <Filter size={20} />
                  Filters
                  {Object.values(filters).some((value) => value !== "") && (
                    <span className="forum-filters-indicator"></span>
                  )}
                </button>
              </div>
            </form>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="forum-advanced-filters">
                <div className="forum-filters-grid">
                  <div className="forum-filter-group">
                    <label className="form-label">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => handleFilterChange("category", e.target.value)}
                      className="form-select"
                    >
                      <option value="">All Categories</option>
                      {categories.map((category) => (
                        <option key={category.value} value={category.value}>
                          {category.icon} {category.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="forum-filter-group">
                    <label className="form-label">Sort By</label>
                    <select
                      value={filters.sort}
                      onChange={(e) => handleFilterChange("sort", e.target.value)}
                      className="form-select"
                    >
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                      <option value="most-voted">Most Voted</option>
                      <option value="most-answered">Most Answered</option>
                      <option value="most-viewed">Most Viewed</option>
                    </select>
                  </div>

                  <div className="forum-filter-group">
                    <label className="form-label">Status</label>
                    <select
                      value={filters.resolved}
                      onChange={(e) => handleFilterChange("resolved", e.target.value)}
                      className="form-select"
                    >
                      <option value="">All Questions</option>
                      <option value="false">Unanswered</option>
                      <option value="true">Resolved</option>
                    </select>
                  </div>
                </div>

                <div className="forum-filters-footer">
                  <button
                    type="button"
                    onClick={clearFilters}
                    className="forum-clear-filters"
                  >
                    Clear All Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Results Header */}
        <div className="forum-results">
          <div className="forum-results-header">
            <p className="forum-results-count">
              Showing <span>{posts.length}</span> of{" "}
              <span>{pagination.total}</span> posts
            </p>
            {Object.values(filters).some((value) => value !== "") && (
              <button
                onClick={clearFilters}
                className="forum-clear-filters-btn"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>
          {user && (
            <Link to="/forum/new" className="btn btn-primary forum-new-post-btn">
              <Plus size={20} />
              Ask Question
            </Link>
          )}
        </div>

        {/* Posts List */}
        {posts.length === 0 ? (
          <div className="forum-empty">
            <div className="forum-empty-icon">
              <span>💬</span>
            </div>
            <h3 className="forum-empty-title">No posts found</h3>
            <p className="forum-empty-description">
              Try adjusting your search criteria or be the first to ask a question!
            </p>
            {user ? (
              <Link to="/forum/new" className="btn btn-primary">
                Ask Your First Question
              </Link>
            ) : (
              <Link to="/login" className="btn btn-primary">
                Login to Ask Question
              </Link>
            )}
          </div>
        ) : (
          <div className="forum-posts">
            {posts.map((post) => (
              <div key={post._id} className="forum-post-card">
                {/* Vote Section */}
                <div className="forum-post-votes">
                  <div className="forum-vote-count">
                    {post.votes.upvotes.length - post.votes.downvotes.length}
                  </div>
                  <div className="forum-vote-label">votes</div>
                </div>

                {/* Post Content */}
                <div className="forum-post-content">
                  <div className="forum-post-header">
                    <Link
                      to={`/forum/post/${post._id}`}
                      className="forum-post-title"
                    >
                      {post.title}
                    </Link>
                    {post.isResolved && (
                      <div className="forum-post-resolved">
                        <CheckCircle size={16} />
                        <span>Resolved</span>
                      </div>
                    )}
                  </div>

                  <div className="forum-post-excerpt">
                    {post.content.length > 200
                      ? `${post.content.substring(0, 200)}...`
                      : post.content}
                  </div>

                  <div className="forum-post-meta">
                    <div className="forum-post-tags">
                      <span className="forum-post-category">
                        {getCategoryIcon(post.category)} {getCategoryLabel(post.category)}
                      </span>
                      {post.tags.slice(0, 3).map((tag, index) => (
                        <span key={index} className="forum-post-tag">
                          <Tag size={12} />
                          {tag}
                        </span>
                      ))}
                    </div>

                    <div className="forum-post-stats">
                      <span className="forum-post-stat">
                        <MessageSquare size={14} />
                        {post.answersCount} answers
                      </span>
                      <span className="forum-post-stat">
                        <Eye size={14} />
                        {post.views} views
                      </span>
                      <span className="forum-post-stat">
                        <Clock size={14} />
                        {formatTimeAgo(post.createdAt)}
                      </span>
                    </div>
                  </div>

                  <div className="forum-post-author">
                    <div className="forum-author-info">
                      <span>Asked by</span>
                      <span className="forum-author-name">
                        {post.author.name}
                      </span>
                      <span className="forum-author-role">
                        {post.author.role}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="forum-pagination">
            <div className="forum-pagination-container">
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    current: prev.current - 1,
                  }))
                }
                disabled={pagination.current === 1}
                className="btn btn-secondary forum-pagination-btn"
              >
                <ChevronLeft size={16} />
                Previous
              </button>

              {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() =>
                      setPagination((prev) => ({ ...prev, current: page }))
                    }
                    className={`btn ${
                      page === pagination.current
                        ? "btn-primary"
                        : "btn-secondary"
                    } forum-pagination-btn`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    current: prev.current + 1,
                  }))
                }
                disabled={pagination.current === pagination.pages}
                className="btn btn-secondary forum-pagination-btn"
              >
                Next
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Forum; 