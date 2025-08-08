import React, { useState, useEffect } from "react";
import {
  Search,
  ShoppingCart,
  Star,
  Package,
  Leaf,
  Droplets,
  Bug,
} from "lucide-react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState({ items: [], totalAmount: 0, itemCount: 0 });
  const { user } = useAuth();

  useEffect(() => {
    fetchProducts();
    if (user) {
      fetchCart();
    }
  }, [user]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/api/products");
      // The API returns an object with products array, not just the array
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Fallback to mock data
      setProducts(mockProducts);
    } finally {
      setLoading(false);
    }
  };

  const fetchCart = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const response = await axios.get("/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setCart(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const addToCart = async (product) => {
    if (!user) {
      alert("Please login to add items to cart");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "/api/cart/add",
        { productId: product._id || product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.success) {
        setCart(response.data.data);
        alert("Item added to cart!");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add item to cart");
    }
  };

  const mockProducts = [
    {
      id: 1,
      name: "Hybrid Wheat Seeds",
      category: "Seeds",
      description:
        "High-yield hybrid wheat seeds with excellent disease resistance.",
      price: 450,
      unit: "kg",
      rating: 4.7,
      reviews: 156,
      inStock: true,
      image: "https://images.pexels.com/photos/416607/pexels-photo-416607.jpeg",
      seller: "AgriSeeds Co.",
      specifications: {
        variety: "HD-2967",
        purity: "98%",
        germination: "85%",
        moisture: "12%",
      },
    },
    {
      id: 2,
      name: "NPK Fertilizer 10-26-26",
      category: "Fertilizers",
      description:
        "Balanced NPK fertilizer for optimal plant growth and development.",
      price: 850,
      unit: "50kg bag",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      image: "https://images.pexels.com/photos/416607/pexels-photo-416607.jpeg",
      seller: "FertilizerPro",
      specifications: {
        nitrogen: "10%",
        phosphorus: "26%",
        potassium: "26%",
        coverage: "1 acre per bag",
      },
    },
    {
      id: 3,
      name: "Organic Pesticide",
      category: "Pesticides",
      description:
        "Eco-friendly organic pesticide for pest control without harmful chemicals.",
      price: 320,
      unit: "liter",
      rating: 4.8,
      reviews: 64,
      inStock: true,
      image: "https://images.pexels.com/photos/416607/pexels-photo-416607.jpeg",
      seller: "EcoFarm Solutions",
      specifications: {
        activeIngredient: "Neem Oil",
        concentration: "1500 ppm",
        dilution: "1:200",
        application: "Foliar spray",
      },
    },
    {
      id: 4,
      name: "Drip Irrigation Kit",
      category: "Tools",
      description:
        "Complete drip irrigation system for 1-acre coverage with timer control.",
      price: 15000,
      unit: "set",
      rating: 4.9,
      reviews: 32,
      inStock: true,
      image: "https://images.pexels.com/photos/416607/pexels-photo-416607.jpeg",
      seller: "IrriTech",
      specifications: {
        coverage: "1 acre",
        dripper: "2 LPH",
        mainPipe: "50mm",
        laterals: "16mm",
      },
    },
    {
      id: 5,
      name: "Basmati Rice Seeds",
      category: "Seeds",
      description:
        "Premium basmati rice seeds with long grains and aromatic quality.",
      price: 680,
      unit: "kg",
      rating: 4.5,
      reviews: 78,
      inStock: false,
      image: "https://images.pexels.com/photos/416607/pexels-photo-416607.jpeg",
      seller: "Rice Masters",
      specifications: {
        variety: "Pusa Basmati 1121",
        purity: "99%",
        germination: "90%",
        grainLength: "8.5mm",
      },
    },
    {
      id: 6,
      name: "Soil Testing Kit",
      category: "Tools",
      description:
        "Professional soil testing kit for pH, NPK, and organic matter analysis.",
      price: 2800,
      unit: "kit",
      rating: 4.7,
      reviews: 45,
      inStock: true,
      image: "https://images.pexels.com/photos/416607/pexels-photo-416607.jpeg",
      seller: "SoilTech Labs",
      specifications: {
        tests: "15 parameters",
        accuracy: "±0.1 pH",
        includes: "Reagents & Manual",
        validTests: "100+",
      },
    },
  ];

  const categories = [
    { name: "Seeds", icon: <Leaf size={20} /> },
    { name: "Fertilizers", icon: <Droplets size={20} /> },
    { name: "Pesticides", icon: <Bug size={20} /> },
    { name: "Tools", icon: <Package size={20} /> },
  ];

  const filteredProducts = (products || []).filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      !selectedCategory || product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const getCartItemCount = () => {
    return cart.itemCount || 0;
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="section">
      <div className="container">
        <div className="page-header">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div>
              <h1 className="page-title">Agricultural Products</h1>
              <p className="page-description">
                Quality seeds, fertilizers, pesticides, and farming tools
              </p>
            </div>
            <div style={{ position: "relative" }}>
              <button className="btn btn-primary">
                <ShoppingCart size={20} />
                Cart ({getCartItemCount()})
              </button>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div style={{ marginBottom: "32px" }}>
          <div
            style={{
              display: "flex",
              gap: "16px",
              marginBottom: "24px",
              flexWrap: "wrap",
            }}
          >
            <button
              className={`btn ${
                !selectedCategory ? "btn-primary" : "btn-secondary"
              }`}
              onClick={() => setSelectedCategory("")}
            >
              All Products
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                className={`btn ${
                  selectedCategory === category.name
                    ? "btn-primary"
                    : "btn-secondary"
                }`}
                onClick={() => setSelectedCategory(category.name)}
              >
                {category.icon}
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="search-bar">
          <div style={{ position: "relative", flex: 1 }}>
            <input
              type="text"
              className="search-input"
              placeholder="Search products..."
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
        </div>

        {/* Products Grid */}
        <div className="equipment-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="equipment-card">
              <img
                src={product.image}
                alt={product.name}
                className="equipment-image"
              />
              <div className="equipment-content">
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    marginBottom: "8px",
                  }}
                >
                  <h3 className="equipment-title">{product.name}</h3>
                  <span
                    className={`badge ${
                      product.inStock ? "badge-success" : "badge-danger"
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <p className="equipment-description">{product.description}</p>

                <div className="equipment-meta">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Package size={14} />
                    <span>{product.seller}</span>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "4px",
                    }}
                  >
                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    <span>
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                <div className="equipment-price">
                  ₹{product.price}/
                  <span style={{ fontSize: "14px" }}>{product.unit}</span>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    disabled={!product.inStock}
                    onClick={() => addToCart(product)}
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button className="btn btn-secondary">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 20px" }}>
            <p style={{ fontSize: "18px", color: "#64748b" }}>
              No products found matching your criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
