import React, { useState } from "react";
import {
  Book,
  Video,
  FileText,
  Search,
  Calendar,
  User,
  Eye,
  ThumbsUp,
  MessageCircle,
} from "lucide-react";

const KnowledgeHub = () => {
  const [activeTab, setActiveTab] = useState("articles");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const articles = [
    {
      id: 1,
      title: "Modern Irrigation Techniques for Water Conservation",
      excerpt:
        "Learn about drip irrigation, sprinkler systems, and smart water management to optimize crop yield while conserving water.",
      category: "Irrigation",
      author: "Dr. Rajesh Patel",
      date: "2024-01-15",
      readTime: "8 min read",
      views: 1250,
      likes: 89,
      image:
        "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg",
    },
    {
      id: 2,
      title: "Organic Farming: A Complete Guide for Beginners",
      excerpt:
        "Discover the principles of organic farming, natural pest control methods, and how to transition from conventional farming.",
      category: "Organic Farming",
      author: "Priya Sharma",
      date: "2024-01-12",
      readTime: "12 min read",
      views: 2100,
      likes: 156,
      image: "https://images.pexels.com/photos/416607/pexels-photo-416607.jpeg",
    },
    {
      id: 3,
      title: "Soil Health Management and Testing",
      excerpt:
        "Understanding soil composition, pH levels, nutrient management, and how to maintain healthy soil for better crop production.",
      category: "Soil Management",
      author: "Dr. Kumar Singh",
      date: "2024-01-10",
      readTime: "10 min read",
      views: 980,
      likes: 67,
      image: "https://images.pexels.com/photos/416607/pexels-photo-416607.jpeg",
    },
    {
      id: 4,
      title: "Integrated Pest Management (IPM) Strategies",
      excerpt:
        "Effective pest control using biological, cultural, and chemical methods while minimizing environmental impact.",
      category: "Pest Control",
      author: "Dr. Anita Verma",
      date: "2024-01-08",
      readTime: "15 min read",
      views: 1680,
      likes: 124,
      image: "https://images.pexels.com/photos/416607/pexels-photo-416607.jpeg",
    },
    {
      id: 5,
      title: "Climate-Smart Agriculture Practices",
      excerpt:
        "Adapting farming practices to climate change, drought-resistant crops, and sustainable farming techniques.",
      category: "Climate",
      author: "Prof. Suresh Reddy",
      date: "2024-01-05",
      readTime: "11 min read",
      views: 1420,
      likes: 98,
      image: "https://images.pexels.com/photos/416607/pexels-photo-416607.jpeg",
    },
  ];

  const videos = [
    {
      id: 1,
      title: "Tractor Maintenance: Essential Tips for Farmers",
      description:
        "Learn how to properly maintain your tractor to ensure optimal performance and longevity.",
      category: "Equipment",
      duration: "12:45",
      views: 5600,
      likes: 234,
      thumbnail:
        "https://images.pexels.com/photos/1595108/pexels-photo-1595108.jpeg",
    },
    {
      id: 2,
      title: "Drip Irrigation Installation Guide",
      description:
        "Step-by-step guide to installing a drip irrigation system for your farm.",
      category: "Irrigation",
      duration: "18:30",
      views: 3200,
      likes: 189,
      thumbnail:
        "https://images.pexels.com/photos/2132250/pexels-photo-2132250.jpeg",
    },
    {
      id: 3,
      title: "Organic Composting Techniques",
      description:
        "How to create nutrient-rich compost using farm waste and organic materials.",
      category: "Organic Farming",
      duration: "15:20",
      views: 2800,
      likes: 156,
      thumbnail:
        "https://images.pexels.com/photos/416607/pexels-photo-416607.jpeg",
    },
    {
      id: 4,
      title: "Crop Rotation Planning for Maximum Yield",
      description:
        "Understanding crop rotation principles and planning for sustainable farming.",
      category: "Crop Management",
      duration: "22:15",
      views: 4100,
      likes: 278,
      thumbnail:
        "https://images.pexels.com/photos/416607/pexels-photo-416607.jpeg",
    },
  ];

  const guides = [
    {
      id: 1,
      title: "Government Schemes and Subsidies for Farmers",
      description:
        "Complete guide to available government schemes, subsidies, and how to apply for them.",
      category: "Government Schemes",
      pages: 24,
      downloads: 1500,
      fileSize: "2.5 MB",
    },
    {
      id: 2,
      title: "Crop Insurance: A Farmer's Guide",
      description:
        "Understanding crop insurance policies, coverage options, and claim procedures.",
      category: "Insurance",
      pages: 18,
      downloads: 980,
      fileSize: "1.8 MB",
    },
    {
      id: 3,
      title: "Seasonal Farming Calendar for India",
      description:
        "Month-wise farming activities, crop selection, and weather considerations.",
      category: "Planning",
      pages: 32,
      downloads: 2200,
      fileSize: "3.2 MB",
    },
    {
      id: 4,
      title: "Equipment Rental vs Purchase Guide",
      description:
        "Decision-making guide for farmers on when to rent vs buy agricultural equipment.",
      category: "Equipment",
      pages: 16,
      downloads: 750,
      fileSize: "1.5 MB",
    },
  ];

  const categories = [
    "All Categories",
    "Irrigation",
    "Organic Farming",
    "Soil Management",
    "Pest Control",
    "Equipment",
    "Crop Management",
    "Climate",
    "Government Schemes",
    "Insurance",
    "Planning",
  ];

  const filterContent = (content) => {
    return content.filter((item) => {
      const matchesSearch =
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item.description || item.excerpt || "")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      const matchesCategory =
        !selectedCategory ||
        selectedCategory === "All Categories" ||
        item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  return (
    <div className="section">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Knowledge Hub</h1>
          <p className="page-description">
            Access farming guides, tutorials, and expert advice to improve your
            agricultural practices
          </p>
        </div>

        {/* Search and Filters */}
        <div className="search-bar">
          <div style={{ position: "relative", flex: 1 }}>
            <input
              type="text"
              className="search-input"
              placeholder="Search articles, videos, guides..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ paddingLeft: "40px" }}
            />
            <Search
              size={20}
              style={{
                position: "absolute",
                left: "12px",
                top: "50%",
                transform: "translateY(-50%)",
                color: "#9ca3af",
              }}
            />
          </div>

          <select
            className="filter-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Tab Navigation */}
        <div className="tab-nav">
          <button
            className={activeTab === "articles" ? "active" : ""}
            onClick={() => setActiveTab("articles")}
          >
            <FileText size={16} />
            Articles ({filterContent(articles).length})
          </button>
          <button
            className={activeTab === "videos" ? "active" : ""}
            onClick={() => setActiveTab("videos")}
          >
            <Video size={16} />
            Videos ({filterContent(videos).length})
          </button>
          <button
            className={activeTab === "guides" ? "active" : ""}
            onClick={() => setActiveTab("guides")}
          >
            <Book size={16} />
            Guides ({filterContent(guides).length})
          </button>
        </div>

        {/* Content Display */}
        {activeTab === "articles" && (
          <div className="equipment-grid">
            {filterContent(articles).map((article) => (
              <div key={article.id} className="equipment-card">
                <img
                  src={article.image}
                  alt={article.title}
                  className="equipment-image"
                />
                <div className="equipment-content">
                  <div style={{ marginBottom: "8px" }}>
                    <span
                      className="badge badge-info"
                      style={{ fontSize: "12px" }}
                    >
                      {article.category}
                    </span>
                  </div>

                  <h3 className="equipment-title">{article.title}</h3>
                  <p className="equipment-description">{article.excerpt}</p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "16px",
                      marginBottom: "12px",
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <User size={14} />
                      <span>{article.author}</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Calendar size={14} />
                      <span>{new Date(article.date).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    <span>{article.readTime}</span>
                    <div style={{ display: "flex", gap: "12px" }}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <Eye size={14} />
                        <span>{article.views}</span>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "4px",
                        }}
                      >
                        <ThumbsUp size={14} />
                        <span>{article.likes}</span>
                      </div>
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{ width: "100%" }}>
                    Read Article
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "videos" && (
          <div className="equipment-grid">
            {filterContent(videos).map((video) => (
              <div key={video.id} className="equipment-card">
                <div style={{ position: "relative" }}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="equipment-image"
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      width: "60px",
                      height: "60px",
                      backgroundColor: "rgba(0, 0, 0, 0.7)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                  >
                    <Video size={24} color="white" />
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "8px",
                      backgroundColor: "rgba(0, 0, 0, 0.8)",
                      color: "white",
                      padding: "4px 8px",
                      borderRadius: "4px",
                      fontSize: "12px",
                    }}
                  >
                    {video.duration}
                  </div>
                </div>
                <div className="equipment-content">
                  <div style={{ marginBottom: "8px" }}>
                    <span
                      className="badge badge-info"
                      style={{ fontSize: "12px" }}
                    >
                      {video.category}
                    </span>
                  </div>

                  <h3 className="equipment-title">{video.title}</h3>
                  <p className="equipment-description">{video.description}</p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <Eye size={14} />
                      <span>{video.views} views</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "4px",
                      }}
                    >
                      <ThumbsUp size={14} />
                      <span>{video.likes}</span>
                    </div>
                  </div>

                  <button className="btn btn-primary" style={{ width: "100%" }}>
                    Watch Video
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "guides" && (
          <div className="equipment-grid">
            {filterContent(guides).map((guide) => (
              <div key={guide.id} className="equipment-card">
                <div
                  style={{
                    height: "200px",
                    backgroundColor: "#f1f5f9",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "8px 8px 0 0",
                  }}
                >
                  <Book size={64} color="#64748b" />
                </div>
                <div className="equipment-content">
                  <div style={{ marginBottom: "8px" }}>
                    <span
                      className="badge badge-info"
                      style={{ fontSize: "12px" }}
                    >
                      {guide.category}
                    </span>
                  </div>

                  <h3 className="equipment-title">{guide.title}</h3>
                  <p className="equipment-description">{guide.description}</p>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "16px",
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    <span>{guide.pages} pages</span>
                    <span>{guide.fileSize}</span>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                      marginBottom: "16px",
                      fontSize: "14px",
                      color: "#64748b",
                    }}
                  >
                    <span>{guide.downloads} downloads</span>
                  </div>

                  <button className="btn btn-primary" style={{ width: "100%" }}>
                    Download Guide
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {((activeTab === "articles" && filterContent(articles).length === 0) ||
          (activeTab === "videos" && filterContent(videos).length === 0) ||
          (activeTab === "guides" && filterContent(guides).length === 0)) && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <Search
              size={48}
              style={{ color: "#94a3b8", marginBottom: "16px" }}
            />
            <h3 style={{ color: "#64748b", marginBottom: "8px" }}>
              No content found
            </h3>
            <p style={{ color: "#94a3b8" }}>
              Try adjusting your search terms or category filter.
            </p>
          </div>
        )}

        {/* Featured Section */}
        <div style={{ marginTop: "60px" }}>
          <h2 className="section-title">Featured Resources</h2>
          <div className="grid grid-3">
            <div className="feature-card">
              <div className="feature-icon">
                <Book size={32} />
              </div>
              <h3 className="feature-title">Expert Guides</h3>
              <p className="feature-description">
                Comprehensive guides written by agricultural experts and
                researchers.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Video size={32} />
              </div>
              <h3 className="feature-title">Video Tutorials</h3>
              <p className="feature-description">
                Step-by-step video tutorials for practical farming techniques.
              </p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <MessageCircle size={32} />
              </div>
              <h3 className="feature-title">Community Q&A</h3>
              <p className="feature-description">
                Get answers to your farming questions from experienced farmers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KnowledgeHub;
