import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Tag,
  Plus,
  X,
  AlertCircle,
  CheckCircle,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "./Forum.css";

const NewForumPost = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: [],
  });
  const [newTag, setNewTag] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategories();

    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (!token) {
      setErrors({ submit: "Please log in to create a post" });
    }
  }, []);

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

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((tag) => tag !== tagToRemove),
    }));
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    } else if (formData.title.length < 10) {
      newErrors.title = "Title must be at least 10 characters long";
    } else if (formData.title.length > 200) {
      newErrors.title = "Title must be less than 200 characters";
    }

    if (!formData.content.trim()) {
      newErrors.content = "Content is required";
    } else if (formData.content.length < 20) {
      newErrors.content = "Content must be at least 20 characters long";
    }

    if (!formData.category) {
      newErrors.category = "Please select a category";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check if user is authenticated
    const token = localStorage.getItem("token");
    if (!token) {
      setErrors({ submit: "Please log in to create a post" });
      return;
    }

    // Debug: Log the request details
    console.log("Creating forum post with data:", formData);
    console.log("Token exists:", !!token);

    try {
      setLoading(true);
      const response = await fetch("/api/forum/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      console.log("Response status:", response.status);
      const data = await response.json();
      console.log("Response data:", data);

      if (data.success) {
        navigate(`/forum/post/${data.data._id}`);
      } else {
        setErrors({ submit: data.message });
      }
    } catch (error) {
      console.error("Error creating post:", error);
      setErrors({ submit: "An error occurred while creating your post" });
    } finally {
      setLoading(false);
    }
  };

  const getCategoryIcon = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.icon : "💬";
  };

  const getCategoryDescription = (category) => {
    const cat = categories.find((c) => c.value === category);
    return cat ? cat.description : "";
  };

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

        {/* Header */}
        <div className="forum-new-post-header">
          <h1 className="forum-new-post-title">Ask a Question</h1>
          <p className="forum-new-post-subtitle">
            Share your farming challenges and get expert advice from the
            community
          </p>
        </div>

        {/* Form */}
        <div className="card forum-new-post-form-card">
          <div className="card-content">
            <form onSubmit={handleSubmit} className="forum-new-post-form">
              {/* Title */}
              <div className="form-group">
                <label className="form-label">
                  Question Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  placeholder="What's your question? Be specific..."
                  className={`form-input ${errors.title ? "error" : ""}`}
                  maxLength={200}
                />
                {errors.title && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    {errors.title}
                  </div>
                )}
                <div className="form-help">
                  {formData.title.length}/200 characters
                </div>
              </div>

              {/* Category */}
              <div className="form-group">
                <label className="form-label">
                  Category <span className="required">*</span>
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    handleInputChange("category", e.target.value)
                  }
                  className={`form-select ${errors.category ? "error" : ""}`}
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.value} value={category.value}>
                      {category.icon} {category.label}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    {errors.category}
                  </div>
                )}
                {formData.category && (
                  <div className="form-help">
                    {getCategoryDescription(formData.category)}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="form-group">
                <label className="form-label">
                  Question Details <span className="required">*</span>
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  placeholder="Provide detailed information about your question. Include relevant context, what you've tried, and any specific details that might help others understand your situation..."
                  className={`form-textarea ${errors.content ? "error" : ""}`}
                  rows={8}
                />
                {errors.content && (
                  <div className="form-error">
                    <AlertCircle size={14} />
                    {errors.content}
                  </div>
                )}
                <div className="form-help">
                  {formData.content.length} characters (minimum 20)
                </div>
              </div>

              {/* Tags */}
              <div className="form-group">
                <label className="form-label">Tags (Optional)</label>
                <div className="forum-tags-input">
                  <div className="forum-tags-input-wrapper">
                    <Tag size={16} className="forum-tags-icon" />
                    <input
                      type="text"
                      value={newTag}
                      onChange={(e) => setNewTag(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Add tags to help others find your question..."
                      className="form-input forum-tags-input-field"
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="btn btn-secondary btn-sm forum-add-tag-btn"
                      disabled={!newTag.trim()}
                    >
                      <Plus size={14} />
                      Add
                    </button>
                  </div>
                  <div className="form-help">
                    Press Enter or click Add to add a tag
                  </div>
                </div>

                {/* Tags Display */}
                {formData.tags.length > 0 && (
                  <div className="forum-tags-display">
                    {formData.tags.map((tag, index) => (
                      <span key={index} className="forum-tag-item">
                        <Tag size={12} />
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="forum-tag-remove"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Tips */}
              <div className="forum-post-tips">
                <h4 className="forum-tips-title">
                  <CheckCircle size={16} />
                  Tips for a great question
                </h4>
                <ul className="forum-tips-list">
                  <li>Be specific and provide relevant context</li>
                  <li>Include what you've already tried</li>
                  <li>Add relevant tags to help others find your question</li>
                  <li>Use clear, descriptive language</li>
                  <li>Include any error messages or symptoms</li>
                </ul>
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="form-error form-error-submit">
                  <AlertCircle size={16} />
                  {errors.submit}
                </div>
              )}

              {/* Not Logged In Warning */}
              {!localStorage.getItem("token") && (
                <div className="form-error form-error-submit">
                  <AlertCircle size={16} />
                  Please log in to create a forum post
                </div>
              )}

              {/* Form Actions */}
              <div className="forum-form-actions">
                <Link to="/forum" className="btn btn-secondary">
                  Cancel
                </Link>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading || !localStorage.getItem("token")}
                >
                  {loading ? "Posting..." : "Post Question"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewForumPost;
