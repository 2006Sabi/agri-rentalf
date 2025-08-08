import React, { useState, useEffect } from "react";
import { Search, MapPin, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Equipment = () => {
  const [equipment, setEquipment] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    location: "",
    availability: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    setEquipment([
      {
        _id: "1",
        name: "John Deere Tractor",
        description: "A powerful and fuel-efficient tractor for farming.",
        category: "Tractor",
        pricing: { daily: 1500 },
        location: { city: "Coimbatore", state: "Tamil Nadu" },
        images: [
          {
            url: "https://i.pinimg.com/736x/a2/20/06/a22006bbaa520f303b4db51f8e023760.jpg",
            alt: "John Deere",
          },
        ],
        availability: { isAvailable: true },
        ratings: { average: 4.5, count: 12 },
      },
      {
        _id: "2",
        name: "Kubota Harvester",
        description: "Efficient crop harvesting with great precision.",
        category: "Harvester",
        pricing: { daily: 2000 },
        location: { city: "Salem", state: "Tamil Nadu" },
        images: [
          {
            url: "https://i.pinimg.com/736x/e0/59/72/e0597263e76222020e19b448aa8b3d3f.jpg",
            alt: "Kubota Harvester",
          },
        ],
        availability: { isAvailable: false },
        ratings: { average: 4.2, count: 8 },
      },
      {
        _id: "3",
        name: "JCB Excavator",
        description: "Strong and reliable for all types of digging work.",
        category: "JCB",
        pricing: { hourly: 500 },
        location: { city: "Madurai", state: "Tamil Nadu" },
        images: [
          {
            url: "https://i.pinimg.com/736x/4d/46/82/4d4682bc5aa0a56249c23ae4a2158369.jpg",
            alt: "JCB Machine",
          },
        ],
        availability: { isAvailable: true },
        ratings: { average: 4.8, count: 18 },
      },
      {
        _id: "4",
        name: "Power Tiller",
        description: "Compact and efficient tilling machine.",
        category: "Tiller",
        pricing: { daily: 800 },
        location: { city: "Erode", state: "Tamil Nadu" },
        images: [
          {
            url: "https://i.pinimg.com/736x/78/52/1a/78521a131904fbb2b15e5ff3f511fcb8.jpg",
            alt: "Power Tiller",
          },
        ],
        availability: { isAvailable: true },
        ratings: { average: 4.0, count: 5 },
      },
      {
        _id: "5",
        name: "Pesticide Sprayer",
        description: "Battery powered pesticide sprayer for wide coverage.",
        category: "Sprayer",
        pricing: { hourly: 200 },
        location: { city: "Chennai", state: "Tamil Nadu" },
        images: [
          {
            url: "https://i.pinimg.com/736x/9c/e9/50/9ce950a194a987707f76d472bd619626.jpg",
            alt: "Sprayer",
          },
        ],
        availability: { isAvailable: false },
        ratings: { average: 3.9, count: 4 },
      },
      {
        _id: "6",
        name: "Mahindra Tractor 275",
        description: "Multi-utility tractor with smooth transmission.",
        category: "Tractor",
        pricing: { daily: 1400 },
        location: { city: "Tirupur", state: "Tamil Nadu" },
        images: [
          {
            url: "https://i.pinimg.com/736x/c2/3b/7d/c23b7db69cd1e20db265620686efa3b8.jpg",
            alt: "Mahindra 275",
          },
        ],
        availability: { isAvailable: true },
        ratings: { average: 4.4, count: 10 },
      },
    ]);
  }, []);

  const filteredEquipment = equipment.filter((item) => {
    const matchesSearch =
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item?.description?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      !filters.category || item?.category === filters.category;

    const locationString = `${item?.location?.city || ""}, ${
      item?.location?.state || ""
    }`;
    const matchesLocation =
      !filters.location ||
      locationString.toLowerCase().includes(filters.location.toLowerCase());

    const matchesAvailability =
      !filters.availability ||
      (filters.availability === "available" &&
        item?.availability?.isAvailable) ||
      (filters.availability === "unavailable" &&
        !item?.availability?.isAvailable);

    return (
      matchesSearch && matchesCategory && matchesLocation && matchesAvailability
    );
  });

  const categories = [...new Set(equipment.map((item) => item?.category))];

  return (
    <div className="section">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Equipment Rental</h1>
          <p className="page-description">
            Find and rent the perfect agricultural equipment for your farming
            needs
          </p>
        </div>

        {/* Search and Filters */}
        <div
          className="search-bar"
          style={{
            background: "white",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
            marginBottom: "2rem",
            border: "1px solid #e5e7eb",
          }}
        >
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <div style={{ position: "relative", flex: 1, minWidth: "250px" }}>
              <input
                type="text"
                className="search-input"
                placeholder="Search equipment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  paddingLeft: "45px",
                  width: "100%",
                  height: "48px",
                  border: "1px solid #d1d5db",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  transition: "border-color 0.2s ease",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#10b981")}
                onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
              />
              <Search
                size={20}
                style={{
                  position: "absolute",
                  left: "15px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#6b7280",
                }}
              />
            </div>

            <select
              className="filter-select"
              value={filters.category}
              onChange={(e) =>
                setFilters({ ...filters, category: e.target.value })
              }
              style={{
                padding: "0 15px",
                height: "48px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                backgroundColor: "white",
                outline: "none",
                cursor: "pointer",
                minWidth: "150px",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#10b981")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            >
              <option value="">All Categories</option>
              {categories.map((category, idx) => (
                <option key={idx} value={category}>
                  {category}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="filter-select"
              placeholder="Location"
              value={filters.location}
              onChange={(e) =>
                setFilters({ ...filters, location: e.target.value })
              }
              style={{
                padding: "0 15px",
                height: "48px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                minWidth: "150px",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#10b981")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            />

            <select
              className="filter-select"
              value={filters.availability}
              onChange={(e) =>
                setFilters({ ...filters, availability: e.target.value })
              }
              style={{
                padding: "0 15px",
                height: "48px",
                border: "1px solid #d1d5db",
                borderRadius: "8px",
                fontSize: "14px",
                backgroundColor: "white",
                outline: "none",
                cursor: "pointer",
                minWidth: "150px",
                transition: "border-color 0.2s ease",
              }}
              onFocus={(e) => (e.target.style.borderColor = "#10b981")}
              onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
            >
              <option value="">All Status</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>

        {/* Equipment Cards */}
        <div
          className="equipment-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            marginTop: "2rem",
          }}
        >
          {filteredEquipment.map((item) => {
            const price =
              item?.pricing?.daily ||
              item?.pricing?.hourly ||
              item?.pricing?.weekly ||
              item?.pricing?.monthly ||
              0;

            const priceType = item?.pricing?.daily
              ? "day"
              : item?.pricing?.hourly
              ? "hour"
              : item?.pricing?.weekly
              ? "week"
              : item?.pricing?.monthly
              ? "month"
              : "";

            return (
              <div
                key={item._id}
                className="equipment-card"
                style={{
                  border: "1px solid #ddd",
                  borderRadius: "10px",
                  padding: "1.5rem",
                  backgroundColor: "white",
                }}
              >
                <img
                  src={
                    item?.images?.[0]?.url || "https://via.placeholder.com/300"
                  }
                  alt={item?.images?.[0]?.alt || item?.name}
                  style={{
                    width: "100%",
                    height: "220px",
                    borderRadius: "8px",
                    objectFit: "cover",
                  }}
                />
                <h3 style={{ marginTop: "1rem", marginBottom: "0.5rem" }}>
                  {item.name}
                </h3>
                <p style={{ color: "#64748b" }}>{item.description}</p>
                <p>
                  <MapPin size={14} /> {item.location.city},{" "}
                  {item.location.state}
                </p>
                <p>
                  <Star size={14} fill="#fbbf24" /> {item.ratings.average} (
                  {item.ratings.count})
                </p>
                <strong style={{ display: "block", margin: "0.5rem 0" }}>
                  ₹{price} / {priceType}
                </strong>
                <button
                  style={{
                    width: "100%",
                    backgroundColor: item.availability.isAvailable
                      ? "#10b981"
                      : "#9ca3af",
                    color: "white",
                    padding: "0.6rem",
                    border: "none",
                    borderRadius: "6px",
                    cursor: item.availability.isAvailable
                      ? "pointer"
                      : "not-allowed",
                  }}
                  disabled={!item.availability.isAvailable}
                >
                  {item.availability.isAvailable ? "Book Now" : "Unavailable"}
                </button>
              </div>
            );
          })}
        </div>

        {filteredEquipment.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ fontSize: "18px", color: "#64748b" }}>
              No equipment found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Equipment;
