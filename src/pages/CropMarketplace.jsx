import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  MapPin,
  Star,
  ShoppingCart,
  Eye,
  TrendingUp,
  Clock,
  Package,
  Sparkles,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "./CropMarketplace.css";

const CropMarketplace = () => {
  const { user } = useAuth();
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    organic: "",
    quality: "",
    search: "",
  });
  const [pagination, setPagination] = useState({
    current: 1,
    pages: 1,
    total: 0,
  });
  const [showFilters, setShowFilters] = useState(false);

  // 🔹 Static demo crops
  const staticProducts = [
    {
      _id: "static1",
      cropName: "Organic Tomatoes",
      description: "Fresh red organic tomatoes directly from local farmers.",
      images: ["https://images.unsplash.com/photo-1567306226416-28f0efdc88ce"],
      status: "available",
      organic: true,
      quality: "premium",
      location: "Coimbatore",
      pricePerUnit: 40,
      unit: "kg",
      quantity: 100,
      harvestDate: new Date().toISOString(),
      views: 25,
      sellerId: { _id: "s1", name: "Farmer Ram" },
    },
    {
      _id: "static2",
      cropName: "Basmati Rice",
      description: "Long grain basmati rice, freshly harvested.",
      images: [
        "https://res.cloudinary.com/dhlhlbvea/image/upload/v1756046993/WhatsApp_Image_2025-08-24_at_20.19.02_8f4ceb65_p5tnad.jpg",
      ],
      status: "available",
      organic: false,
      quality: "good",
      location: "Salem",
      pricePerUnit: 80,
      unit: "kg",
      quantity: 250,
      harvestDate: new Date().toISOString(),
      views: 42,
      sellerId: { _id: "s2", name: "Farmer Ravi" },
    },
    {
      _id: "static3",
      cropName: "Fresh Mangoes",
      description: "Juicy alphonso mangoes straight from the farm.",
      images: [
        "https://res.cloudinary.com/dhlhlbvea/image/upload/v1756047305/WhatsApp_Image_2025-08-24_at_20.22.25_7bd2c61b_yjary0.jpg",
      ],
      status: "available",
      organic: true,
      quality: "premium",
      location: "Erode",
      pricePerUnit: 120,
      unit: "dozen",
      quantity: 50,
      harvestDate: new Date().toISOString(),
      views: 60,
      sellerId: { _id: "s3", name: "Farmer Lakshmi" },
    },
  ];

  useEffect(() => {
    fetchCategories();
    fetchCrops();
  }, [filters, pagination.current]);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/crop-sell/categories");
      const data = await response.json();
      if (data.success) {
        setCategories(data.data);
      } else {
        console.error("Error fetching categories:", data.message);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchCrops = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams({
        page: pagination.current,
        ...filters,
      });

      const response = await fetch(`/api/crop-sell?${queryParams}`);
      const data = await response.json();

      if (data.success) {
        // 🔹 Merge static + API crops
        setCrops([...staticProducts, ...data.data]);
        setPagination(data.pagination);
      } else {
        console.error("Error fetching crops:", data.message);
        setCrops(staticProducts); // fallback to static crops
      }
    } catch (error) {
      console.error("Error fetching crops:", error);
      setCrops(staticProducts); // fallback to static crops
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchCrops();
  };

  const clearFilters = () => {
    setFilters({
      category: "",
      location: "",
      minPrice: "",
      maxPrice: "",
      organic: "",
      quality: "",
      search: "",
    });
    setPagination((prev) => ({ ...prev, current: 1 }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "badge badge-success";
      case "sold":
        return "badge badge-danger";
      case "reserved":
        return "badge badge-warning";
      default:
        return "badge badge-info";
    }
  };

  const getQualityColor = (quality) => {
    switch (quality) {
      case "premium":
        return "badge badge-info";
      case "good":
        return "badge badge-success";
      case "average":
        return "badge badge-warning";
      default:
        return "badge badge-info";
    }
  };

  const getQualityIcon = (quality) => {
    switch (quality) {
      case "premium":
        return <Sparkles size={14} />;
      case "good":
        return <Star size={14} />;
      case "average":
        return <Package size={14} />;
      default:
        return <Package size={14} />;
    }
  };

  // Skeleton Loading Component
  const CropCardSkeleton = () => (
    <div className="crop-marketplace-skeleton-card crop-marketplace-skeleton">
      <div className="crop-marketplace-skeleton-image"></div>
      <div className="crop-marketplace-skeleton-content">
        <div className="crop-marketplace-skeleton-title-line"></div>
        <div className="crop-marketplace-skeleton-description-line"></div>
        <div className="crop-marketplace-skeleton-description-line-2"></div>
        <div className="crop-marketplace-skeleton-price"></div>
        <div className="crop-marketplace-skeleton-button"></div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="section">
        <div className="container">
          <div className="crop-marketplace-skeleton-header">
            <div className="crop-marketplace-skeleton-title"></div>
            <div className="crop-marketplace-skeleton-subtitle"></div>
          </div>
          <div className="card crop-marketplace-skeleton-search">
            <div className="card-content">
              <div className="crop-marketplace-skeleton-search-bar"></div>
            </div>
          </div>
          <div className="crop-marketplace-skeleton-grid">
            {Array.from({ length: 8 }).map((_, index) => (
              <CropCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        {/* --- header, search, filters remain same --- */}

        {/* Results */}
        <div className="crop-marketplace-results">
          <div className="crop-marketplace-results-header">
            <p className="crop-marketplace-results-count">
              Showing <span>{crops.length}</span> crops
            </p>
            {Object.values(filters).some((value) => value !== "") && (
              <button
                onClick={clearFilters}
                className="crop-marketplace-clear-filters-btn"
              >
                <X size={14} />
                Clear filters
              </button>
            )}
          </div>
          {user && (
            <Link
              to="/sell-crop"
              className="btn btn-primary crop-marketplace-sell-btn"
            >
              <ShoppingCart size={20} />
              Sell Your Crop
            </Link>
          )}
        </div>

        {/* Crop Grid */}
        {crops.length === 0 ? (
          <div className="crop-marketplace-empty">
            <div className="crop-marketplace-empty-icon">
              <span>🌾</span>
            </div>
            <h3 className="crop-marketplace-empty-title">No crops found</h3>
            <p className="crop-marketplace-empty-description">
              Try adjusting your search criteria or check back later for new
              fresh crop listings.
            </p>
            <button onClick={clearFilters} className="btn btn-primary">
              Clear All Filters
            </button>
          </div>
        ) : (
          <div className="crop-marketplace-grid">
            {crops.map((crop) => (
              <div key={crop._id} className="crop-marketplace-card">
                {/* --- Crop Card UI stays same --- */}
                <div className="crop-marketplace-card-image">
                  {crop.images && crop.images.length > 0 ? (
                    <img
                      src={crop.images[0]}
                      alt={crop.cropName}
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="crop-marketplace-card-image-placeholder"
                    style={{
                      ...(crop.images && crop.images.length > 0
                        ? { display: "none" }
                        : {}),
                    }}
                  >
                    <span>🌾</span>
                  </div>

                  <div className="crop-marketplace-card-status">
                    <span className={getStatusColor(crop.status)}>
                      {crop.status}
                    </span>
                  </div>

                  {crop.organic && (
                    <div className="crop-marketplace-card-organic">
                      <span className="badge badge-success">
                        <span className="crop-marketplace-card-organic-indicator"></span>
                        Organic
                      </span>
                    </div>
                  )}

                  <div className="crop-marketplace-card-quality">
                    <span className={getQualityColor(crop.quality)}>
                      {getQualityIcon(crop.quality)}
                      {crop.quality}
                    </span>
                  </div>
                </div>

                <div className="crop-marketplace-card-content">
                  <div className="crop-marketplace-card-header">
                    <h3 className="crop-marketplace-card-title">
                      {crop.cropName}
                    </h3>
                  </div>

                  <p className="crop-marketplace-card-description">
                    {crop.description}
                  </p>

                  <div className="crop-marketplace-card-location">
                    <MapPin size={16} />
                    <span>{crop.location}</span>
                  </div>

                  <div className="crop-marketplace-card-price-section">
                    <div>
                      <span className="crop-marketplace-card-price">
                        ₹{crop.pricePerUnit}
                      </span>
                      <span className="crop-marketplace-card-unit">
                        /{crop.unit}
                      </span>
                    </div>
                    <div className="crop-marketplace-card-quantity">
                      {crop.quantity} {crop.unit}
                    </div>
                  </div>

                  <div className="crop-marketplace-card-meta">
                    <span className="crop-marketplace-card-meta-item">
                      <Clock size={14} />
                      {new Date(crop.harvestDate).toLocaleDateString()}
                    </span>
                    <div className="crop-marketplace-card-meta-item">
                      <Eye size={14} />
                      <span>{crop.views}</span>
                    </div>
                  </div>

                  <div className="crop-marketplace-card-actions">
                    <Link
                      to={`/crop/${crop._id}`}
                      className="btn btn-secondary"
                    >
                      View Details
                    </Link>
                    {user ? (
                      crop.sellerId && crop.sellerId._id !== user.id ? (
                        <Link
                          to={`/crop/${crop._id}`}
                          className="btn btn-primary"
                        >
                          Buy Now
                        </Link>
                      ) : (
                        <div className="crop-marketplace-card-sold-by-you">
                          Sold by you
                        </div>
                      )
                    ) : (
                      <Link to="/login" className="btn btn-outline">
                        Login to Buy
                      </Link>
                    )}
                  </div>

                  <div className="crop-marketplace-card-seller-info">
                    <div className="crop-marketplace-card-seller">
                      <span>Seller:</span>
                      <span className="crop-marketplace-card-seller-name">
                        {crop.sellerId ? crop.sellerId.name : "Unknown Seller"}
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
          <div className="crop-marketplace-pagination">
            <div className="crop-marketplace-pagination-container">
              <button
                onClick={() =>
                  setPagination((prev) => ({
                    ...prev,
                    current: prev.current - 1,
                  }))
                }
                disabled={pagination.current === 1}
                className="btn btn-secondary crop-marketplace-pagination-btn"
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
                    } crop-marketplace-pagination-btn`}
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
                className="btn btn-secondary crop-marketplace-pagination-btn"
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

export default CropMarketplace;
