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
import "./Products.css";

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
      setProducts(response.data.products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
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

  // ✅ Enhanced mock products with diverse images and more variety
  const mockProducts = [
    // 🌱 Seeds (5 products)
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
      name: "Basmati Rice Seeds",
      category: "Seeds",
      description:
        "Premium basmati rice seeds with long grains and aromatic quality.",
      price: 680,
      unit: "kg",
      rating: 4.5,
      reviews: 78,
      inStock: false,
      image: "https://images.pexels.com/photos/2092507/pexels-photo-2092507.jpeg",
      seller: "Rice Masters",
      specifications: {
        variety: "Pusa Basmati 1121",
        purity: "99%",
        germination: "90%",
        grainLength: "8.5mm",
      },
    },
    {
      id: 3,
      name: "Maize Hybrid Seeds",
      category: "Seeds",
      description:
        "High-yielding hybrid maize seeds suitable for different climates.",
      price: 520,
      unit: "kg",
      rating: 4.6,
      reviews: 101,
      inStock: true,
      image: "https://images.pexels.com/photos/158507/pexels-photo-158507.jpeg",
      seller: "CornGrow Ltd.",
      specifications: {
        variety: "HQPM-1",
        germination: "88%",
        grainType: "Flint",
      },
    },
    {
      id: 4,
      name: "Organic Vegetable Seeds Pack",
      category: "Seeds",
      description:
        "Assorted organic vegetable seeds including tomato, cucumber, and carrot.",
      price: 350,
      unit: "pack",
      rating: 4.8,
      reviews: 92,
      inStock: true,
      image: "https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg",
      seller: "Organic Farms",
      specifications: {
        varieties: "Tomato, Cucumber, Carrot, Lettuce",
        organic: "Certified",
        germination: "95%",
        shelfLife: "2 years",
      },
    },
    {
      id: 5,
      name: "Sunflower Hybrid Seeds",
      category: "Seeds",
      description:
        "High-oil content sunflower seeds for oil production and bird feed.",
      price: 420,
      unit: "kg",
      rating: 4.4,
      reviews: 67,
      inStock: true,
      image: "https://images.pexels.com/photos/2577943/pexels-photo-2577943.jpeg",
      seller: "SunGrow Seeds",
      specifications: {
        variety: "Peredovik",
        oilContent: "42%",
        maturity: "90-100 days",
        plantHeight: "150-180cm",
      },
    },

    // 🌾 Fertilizers (5 products)
    {
      id: 6,
      name: "NPK Fertilizer 10-26-26",
      category: "Fertilizers",
      description:
        "Balanced NPK fertilizer for optimal plant growth and development.",
      price: 850,
      unit: "50kg bag",
      rating: 4.6,
      reviews: 89,
      inStock: true,
      image: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg",
      seller: "FertilizerPro",
      specifications: {
        nitrogen: "10%",
        phosphorus: "26%",
        potassium: "26%",
        coverage: "1 acre per bag",
      },
    },
    {
      id: 7,
      name: "Urea Fertilizer",
      category: "Fertilizers",
      description:
        "High-nitrogen fertilizer for rapid crop growth and yield improvement.",
      price: 600,
      unit: "50kg bag",
      rating: 4.4,
      reviews: 134,
      inStock: true,
      image: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg",
      seller: "GreenGrow",
      specifications: {
        nitrogen: "46%",
        application: "Soil broadcast",
      },
    },
    {
      id: 8,
      name: "Compost Organic Fertilizer",
      category: "Fertilizers",
      description:
        "Eco-friendly organic compost for soil enrichment and plant nutrition.",
      price: 400,
      unit: "25kg bag",
      rating: 4.8,
      reviews: 67,
      inStock: true,
      image: "https://images.pexels.com/photos/7652162/pexels-photo-7652162.jpeg",
      seller: "EcoFarms",
      specifications: {
        organicMatter: "65%",
        moisture: "20%",
        pH: "6.5-7.5",
        nutrients: "N-P-K: 2-1-1",
      },
    },
    {
      id: 9,
      name: "Bone Meal Fertilizer",
      category: "Fertilizers",
      description:
        "Organic phosphorus-rich fertilizer from animal bones for root development.",
      price: 550,
      unit: "25kg bag",
      rating: 4.6,
      reviews: 45,
      inStock: true,
      image: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg",
      seller: "Organic Nutrients",
      specifications: {
        phosphorus: "15%",
        calcium: "24%",
        nitrogen: "3%",
        application: "Soil amendment",
      },
    },
    {
      id: 10,
      name: "Liquid Seaweed Fertilizer",
      category: "Fertilizers",
      description:
        "Concentrated liquid fertilizer from seaweed for plant growth and stress resistance.",
      price: 750,
      unit: "5 liter",
      rating: 4.7,
      reviews: 83,
      inStock: true,
      image: "https://images.pexels.com/photos/1002703/pexels-photo-1002703.jpeg",
      seller: "OceanGrow",
      specifications: {
        type: "Liquid concentrate",
        dilution: "1:100",
        nutrients: "60+ trace minerals",
        application: "Foliar spray",
      },
    },

    // 🐛 Pesticides (5 products)
    {
      id: 11,
      name: "Organic Neem Pesticide",
      category: "Pesticides",
      description:
        "Eco-friendly organic pesticide from neem for pest control without chemicals.",
      price: 320,
      unit: "liter",
      rating: 4.8,
      reviews: 64,
      inStock: true,
      image: "https://images.pexels.com/photos/756636/pexels-photo-756636.jpeg",
      seller: "EcoFarm Solutions",
      specifications: {
        activeIngredient: "Neem Oil",
        concentration: "1500 ppm",
        dilution: "1:200",
        application: "Foliar spray",
      },
    },
    {
      id: 12,
      name: "Insecticide Powder",
      category: "Pesticides",
      description:
        "Effective powder pesticide for controlling crop-damaging insects.",
      price: 250,
      unit: "500g pack",
      rating: 4.3,
      reviews: 52,
      inStock: true,
      image: "https://images.pexels.com/photos/756636/pexels-photo-756636.jpeg",
      seller: "AgriProtect",
      specifications: {
        type: "Contact Insecticide",
        application: "Soil & Foliar",
        targetPests: "Aphids, Whiteflies, Thrips",
      },
    },
    {
      id: 13,
      name: "Herbal Fungicide",
      category: "Pesticides",
      description: "Natural fungicide for preventing fungal diseases in crops.",
      price: 500,
      unit: "liter",
      rating: 4.5,
      reviews: 43,
      inStock: true,
      image: "https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg",
      seller: "BioCrop",
      specifications: {
        formulation: "Liquid",
        dilution: "1:150",
        targetDiseases: "Powdery mildew, Rust, Blight",
      },
    },
    {
      id: 14,
      name: "Biological Pest Control",
      category: "Pesticides",
      description:
        "Beneficial insects and microorganisms for natural pest management.",
      price: 1200,
      unit: "kit",
      rating: 4.9,
      reviews: 38,
      inStock: true,
      image: "https://images.pexels.com/photos/756636/pexels-photo-756636.jpeg",
      seller: "NatureGuard",
      specifications: {
        type: "Biological control",
        contents: "Ladybugs, Lacewings, Beneficial nematodes",
        coverage: "Up to 1 acre",
        organic: "Certified",
      },
    },
    {
      id: 15,
      name: "Weed Killer Herbicide",
      category: "Pesticides",
      description:
        "Selective herbicide for effective weed control in agricultural fields.",
      price: 680,
      unit: "liter",
      rating: 4.2,
      reviews: 76,
      inStock: true,
      image: "https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg",
      seller: "WeedFree Ag",
      specifications: {
        type: "Selective herbicide",
        targetWeeds: "Broadleaf weeds",
        application: "Post-emergence",
        safety: "Crop-safe when used as directed",
      },
    },

    // 🛠️ Tools (5 products)
    {
      id: 16,
      name: "Drip Irrigation Kit",
      category: "Tools",
      description:
        "Complete drip irrigation system for 1-acre coverage with timer control.",
      price: 15000,
      unit: "set",
      rating: 4.9,
      reviews: 32,
      inStock: true,
      image: "https://images.pexels.com/photos/248880/pexels-photo-248880.jpeg",
      seller: "IrriTech",
      specifications: {
        coverage: "1 acre",
        dripper: "2 LPH",
        mainPipe: "50mm",
        laterals: "16mm",
        timer: "Digital programmable",
      },
    },
    {
      id: 17,
      name: "Soil Testing Kit",
      category: "Tools",
      description:
        "Professional soil testing kit for pH, NPK, and organic matter analysis.",
      price: 2800,
      unit: "kit",
      rating: 4.7,
      reviews: 45,
      inStock: true,
      image: "https://images.pexels.com/photos/248880/pexels-photo-248880.jpeg",
      seller: "SoilTech Labs",
      specifications: {
        tests: "15 parameters",
        accuracy: "±0.1 pH",
        includes: "Reagents & Manual",
        validTests: "100+",
        parameters: "pH, N, P, K, Organic matter",
      },
    },
    {
      id: 18,
      name: "Tractor Plough",
      category: "Tools",
      description: "Durable tractor plough for efficient soil preparation.",
      price: 35000,
      unit: "unit",
      rating: 4.6,
      reviews: 29,
      inStock: true,
      image: "https://images.pexels.com/photos/248880/pexels-photo-248880.jpeg",
      seller: "FarmEquip",
      specifications: {
        type: "Reversible Plough",
        material: "High-carbon steel",
        workingWidth: "120cm",
        compatibility: "35-50 HP tractors",
      },
    },
    {
      id: 19,
      name: "Hand Sprayer Pump",
      category: "Tools",
      description:
        "Manual sprayer pump for pesticides and fertilizers application.",
      price: 900,
      unit: "piece",
      rating: 4.4,
      reviews: 74,
      inStock: true,
      image: "https://images.pexels.com/photos/7652687/pexels-photo-7652687.jpeg",
      seller: "AgriTools",
      specifications: {
        capacity: "16 liters",
        type: "Manual Pump",
        pressure: "3-4 bar",
        nozzle: "Adjustable brass",
      },
    },
    {
      id: 20,
      name: "Harvesting Sickle",
      category: "Tools",
      description:
        "Traditional harvesting sickle with ergonomic handle for crop cutting.",
      price: 250,
      unit: "piece",
      rating: 4.5,
      reviews: 89,
      inStock: true,
      image: "https://images.pexels.com/photos/248880/pexels-photo-248880.jpeg",
      seller: "Traditional Tools",
      specifications: {
        bladeMaterial: "Carbon steel",
        handle: "Wooden ergonomic",
        bladeLength: "30cm",
        weight: "450g",
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
    <div className="products-section">
      <div className="products-container">
        <div className="products-header">
          <div>
            <h1 className="products-title">Agricultural Products</h1>
            <p className="products-description">
              Quality seeds, fertilizers, pesticides, and farming tools
            </p>
          </div>
          <div>
            <button className="add-to-cart-btn">
              <ShoppingCart size={20} />
              Cart ({getCartItemCount()})
            </button>
          </div>
        </div>

        {/* Category Filters */}
        <div className="category-filters">
          <button
            className={`category-btn ${!selectedCategory ? 'active' : ''}`}
            onClick={() => setSelectedCategory("")}
          >
            All Products
          </button>
          {categories.map((category) => (
            <button
              key={category.name}
              className={`category-btn ${
                selectedCategory === category.name ? 'active' : ''
              }`}
              onClick={() => setSelectedCategory(category.name)}
            >
              {category.icon}
              {category.name}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={20} className="search-icon" />
        </div>

        {/* Products Grid */}
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <div className="product-content">
                <div className="product-header">
                  <h3 className="product-title">{product.name}</h3>
                  <span
                    className={`stock-badge ${
                      product.inStock ? 'in-stock' : 'out-of-stock'
                    }`}
                  >
                    {product.inStock ? "In Stock" : "Out of Stock"}
                  </span>
                </div>

                <p className="product-description">{product.description}</p>

                <div className="product-meta">
                  <div className="seller-info">
                    <Package size={14} />
                    <span>{product.seller}</span>
                  </div>
                  <div className="rating-info">
                    <Star size={14} fill="#fbbf24" color="#fbbf24" />
                    <span>
                      {product.rating} ({product.reviews})
                    </span>
                  </div>
                </div>

                <div className="product-price">
                  ₹{product.price}
                  <span className="price-unit">/{product.unit}</span>
                </div>

                <div className="product-actions">
                  <button
                    className="add-to-cart-btn"
                    disabled={!product.inStock}
                    onClick={() => addToCart(product)}
                  >
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>
                  <button className="details-btn">Details</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="no-products">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Products;
