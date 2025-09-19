import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Tractor,
  Wrench,
  Leaf,
  Brain,
  Users,
  Shield,
  Star,
  ChevronDown,
  ArrowRight,
  Menu,
  X,
  Phone,
  Mail,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  MessageCircle,
  CheckCircle,
  Clock,
  Globe,
  Smartphone,
} from "lucide-react";

const Home = () => {
  const [visible, setVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      icon: <Tractor size={28} />,
      title: "Equipment Rental",
      description:
        "Rent tractors, JCBs, and other agricultural equipment with smart booking system.",
      benefits: [
        "Hourly/Daily rates",
        "Real-time tracking",
        "Insurance included",
      ],
    },
    {
      icon: <Wrench size={28} />,
      title: "Quality Tools",
      description: "Purchase premium farming tools from verified suppliers.",
      benefits: ["Verified suppliers", "Quality guarantee"],
    },
    {
      icon: <Brain size={28} />,
      title: "AI Recommendations",
      description: "Get personalized farming recommendations powered by AI.",
      benefits: ["Crop-specific", "Weather-based"],
    },
    {
      icon: <Leaf size={28} />,
      title: "Crop Planning",
      description: "Smart crop planning with AI-driven insights.",
      benefits: ["Seasonal planning", "Resource optimization"],
    },
    {
      icon: <Users size={28} />,
      title: "Farmer Community",
      description: "Connect with fellow farmers and share knowledge.",
      benefits: ["Knowledge sharing", "Local support"],
    },
    {
      icon: <Shield size={28} />,
      title: "Secure Platform",
      description: "Safe payments and secure transactions.",
      benefits: ["Secure payments", "24/7 support"],
    },
  ];

  const howItWorksSteps = [
    {
      step: "01",
      title: "Sign Up & Profile Setup",
      description:
        "Create your account and add farm details for personalized recommendations.",
      time: "2 minutes",
    },
    {
      step: "02",
      title: "Browse & Get AI Suggestions",
      description:
        "Explore equipment and get AI-powered recommendations based on your needs.",
      time: "Browse anytime",
    },
    {
      step: "03",
      title: "Book & Connect Safely",
      description:
        "Book equipment with secure payment and connect with verified owners.",
      time: "Instant booking",
    },
    {
      step: "04",
      title: "Farm Smarter",
      description:
        "Use rented equipment efficiently with GPS tracking and support.",
      time: "Ongoing support",
    },
  ];

  const stats = [
    { number: "25,000+", label: "Active Farmers", icon: "👨‍🌾" },
    { number: "8,500+", label: "Equipment Listed", icon: "🚜" },
    { number: "150,000+", label: "Successful Rentals", icon: "✅" },
    { number: "99.2%", label: "Customer Satisfaction", icon: "⭐" },
  ];

  return (
    <div
      style={{
        fontFamily: "'Montserrat', sans-serif",
        background: "#FFFFFF",
        color: "#059669",
        minHeight: "100vh",
        position: "relative",
      }}
    >
      {/* Navigation Bar */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
          background: "rgba(255, 255, 255, 0.98)",
          backdropFilter: "blur(20px)",
          padding: "12px 24px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          zIndex: 1000,
          boxShadow: "0 2px 20px rgba(5, 150, 105, 0.08)",
          borderBottom: "1px solid rgba(5, 150, 105, 0.1)",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <Link to="/" style={{ textDecoration: "none" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              color: "#059669",
              fontWeight: "700",
              fontSize: "18px",
              fontFamily: "'Poppins', sans-serif",
              transition: "transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
            }}
          >
            <span style={{ fontSize: "20px" }}>🚜</span>
            AgriRent
          </div>
        </Link>

        {/* Right Side Container */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            flexShrink: 0,
          }}
        >
          {/* Desktop Navigation Links */}
          <div
            style={{
              display: window.innerWidth > 768 ? "flex" : "none",
              gap: "20px",
              alignItems: "center",
              marginRight: "8px",
            }}
          >
            {["Home", "Features", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(" ", "-")}`}
                style={{
                  color: "#000000ff",
                  textDecoration: "none",
                  fontWeight: "600",
                  fontSize: "14px",
                  padding: "6px 12px",
                  borderRadius: "20px",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.target.style.background = "rgba(5, 150, 105, 0.08)";
                  e.target.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.background = "transparent";
                  e.target.style.transform = "translateY(0)";
                }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div
            style={{
              display: "flex",
              gap: "8px",
              alignItems: "center",
              flexShrink: 0,
            }}
          >
            <Link
              to="/login"
              style={{
                color: "#000000ff",
                textDecoration: "none",
                padding: "8px 16px",
                borderRadius: "20px",
                transition: "all 0.2s ease",
                border: "1.5px solid #ffffffff",
                fontWeight: "600",
                fontSize: "13px",
                background: "#059669",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#059669";
                e.target.style.color = "#ffffffff";
                e.target.style.transform = "translateY(-1px)";
                e.target.style.boxShadow = "0 4px 12px rgba(5, 150, 105, 0.2)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#FFFFFF";
                e.target.style.color = "#059669";
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              Login
            </Link>

            <Link
              to="/register"
              style={{
                background: "#059669",
                color: "#FFFFFF",
                textDecoration: "none",
                fontWeight: "600",
                padding: "8px 18px",
                borderRadius: "20px",
                transition: "all 0.2s ease",
                boxShadow: "0 2px 8px rgba(5, 150, 105, 0.2)",
                border: "1.5px solid #059669",
                fontSize: "13px",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#FFFFFF";
                e.target.style.color = "#059669";
                e.target.style.transform = "translateY(-1px) scale(1.02)";
                e.target.style.boxShadow = "0 6px 20px rgba(5, 150, 105, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#059669";
                e.target.style.color = "#FFFFFF";
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 2px 8px rgba(5, 150, 105, 0.2)";
              }}
            >
              Sign Up Free
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            style={{
              display: window.innerWidth <= 768 ? "block" : "none",
              background: "none",
              border: "none",
              color: "#059669",
              fontSize: "18px",
              cursor: "pointer",
              padding: "4px",
            }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        style={{
          position: "relative",
          minHeight: "100vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #FFFFFF 0%, #f0fdf4 100%)",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 2,
            textAlign: "center",
            maxWidth: "900px",
            padding: "6rem 2rem 2rem",
            transform: visible ? "translateY(0)" : "translateY(50px)",
            opacity: visible ? 1 : 0,
            transition: "all 1.5s ease-out",
          }}
        >
          {/*  */}

          {/* Main Headline */}
          <h1
            style={{
              fontSize: "clamp(2.2rem, 6vw, 4rem)",
              fontWeight: "800",
              lineHeight: "1.2",
              marginBottom: "1.5rem",
              color: "#059669",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Empowering Farmers with{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #059669, #10b981)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Smart Equipment Rental
            </span>{" "}
            & Farming Solutions
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "clamp(1rem, 2vw, 1.3rem)",
              lineHeight: "1.6",
              color: "#059669",
              marginBottom: "2.5rem",
              fontWeight: "500",
              maxWidth: "700px",
              margin: "0 auto 2.5rem",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Connect with equipment owners, get AI-powered farming
            recommendations, and access premium supplies - all in one
            revolutionary platform.
          </p>

          {/* CTA Buttons */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/register"
              style={{
                background: "linear-gradient(135deg, #059669, #10b981)",
                color: "#FFFFFF",
                padding: "12px 28px",
                borderRadius: "25px",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 16px rgba(5, 150, 105, 0.3)",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Montserrat', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "translateY(-3px) scale(1.02)";
                e.target.style.boxShadow = "0 8px 25px rgba(5, 150, 105, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0) scale(1)";
                e.target.style.boxShadow = "0 4px 16px rgba(5, 150, 105, 0.3)";
              }}
            >
              🚜 Get Started Free
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/demo"
              style={{
                background: "#FFFFFF",
                color: "#059669",
                border: "2px solid #059669",
                padding: "12px 28px",
                borderRadius: "25px",
                fontSize: "16px",
                fontWeight: "600",
                textDecoration: "none",
                transition: "all 0.3s ease",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "'Montserrat', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#059669";
                e.target.style.color = "#FFFFFF";
                e.target.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "#FFFFFF";
                e.target.style.color = "#059669";
                e.target.style.transform = "translateY(0)";
              }}
            >
              🎥 Watch Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        style={{
          background: "rgba(5, 150, 105, 0.05)",
          padding: "4rem 2rem",
          borderTop: "1px solid rgba(5, 150, 105, 0.1)",
          borderBottom: "1px solid rgba(5, 150, 105, 0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <h3
              style={{
                fontSize: "1.6rem",
                fontWeight: "700",
                color: "#059669",
                marginBottom: "0.5rem",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Trusted by Farmers Across India
            </h3>
            <p
              style={{
                color: "#059669",
                fontSize: "14px",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Join our growing community of successful farmers
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                style={{
                  textAlign: "center",
                  padding: "2rem 1rem",
                  background: "#FFFFFF",
                  borderRadius: "15px",
                  border: "1px solid rgba(5, 150, 105, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  boxShadow: "0 2px 10px rgba(5, 150, 105, 0.05)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(5, 150, 105, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 2px 10px rgba(5, 150, 105, 0.05)";
                }}
              >
                <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                  {stat.icon}
                </div>
                <div
                  style={{
                    fontSize: "2.2rem",
                    fontWeight: "800",
                    color: "#059669",
                    marginBottom: "0.5rem",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    color: "#059669",
                    fontWeight: "600",
                    fontSize: "14px",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section
        id="features"
        style={{
          padding: "5rem 2rem",
          background: "#FFFFFF",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "800",
                marginBottom: "1rem",
                color: "#059669",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Why Choose AgriRent?
            </h2>
            <div
              style={{
                width: "80px",
                height: "3px",
                background: "linear-gradient(135deg, #059669, #10b981)",
                margin: "0 auto 1.5rem",
                borderRadius: "2px",
              }}
            />
            <p
              style={{
                fontSize: "1.1rem",
                color: "#059669",
                maxWidth: "600px",
                margin: "0 auto",
                fontWeight: "500",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Complete farming solutions powered by AI technology and community
              support.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {features.map(({ icon, title, description, benefits }, i) => (
              <div
                key={i}
                style={{
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  padding: "2rem",
                  border: "2px solid rgba(5, 150, 105, 0.1)",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(5, 150, 105, 0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(5, 150, 105, 0.2)";
                  e.currentTarget.style.borderColor = "#059669";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(5, 150, 105, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(5, 150, 105, 0.1)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(135deg, #059669, #10b981)",
                    borderRadius: "15px",
                    color: "#FFFFFF",
                    marginBottom: "1.5rem",
                    boxShadow: "0 4px 15px rgba(5, 150, 105, 0.3)",
                  }}
                >
                  {icon}
                </div>

                <h3
                  style={{
                    fontSize: "1.3rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                    color: "#059669",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {title}
                </h3>

                <p
                  style={{
                    color: "#059669",
                    lineHeight: "1.6",
                    marginBottom: "1.5rem",
                    fontSize: "14px",
                    opacity: 0.8,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {description}
                </p>

                <div
                  style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}
                >
                  {benefits.map((benefit, idx) => (
                    <span
                      key={idx}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.3rem",
                        background: "rgba(5, 150, 105, 0.1)",
                        color: "#059669",
                        padding: "0.3rem 0.7rem",
                        borderRadius: "12px",
                        fontSize: "12px",
                        fontWeight: "600",
                        border: "1px solid rgba(5, 150, 105, 0.2)",
                        fontFamily: "'Montserrat', sans-serif",
                      }}
                    >
                      <CheckCircle size={10} />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section
        id="how-it-works"
        style={{
          padding: "5rem 2rem",
          background: "linear-gradient(135deg, #f0fdf4 0%, #FFFFFF 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "800",
                marginBottom: "1rem",
                color: "#059669",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              How AgriRent Works
            </h2>
            <div
              style={{
                width: "80px",
                height: "3px",
                background: "linear-gradient(135deg, #059669, #10b981)",
                margin: "0 auto 1.5rem",
                borderRadius: "2px",
              }}
            />
            <p
              style={{
                fontSize: "1.1rem",
                color: "#059669",
                maxWidth: "600px",
                margin: "0 auto",
                fontWeight: "500",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Get started in four simple steps and transform your farming
              experience.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
            }}
          >
            {howItWorksSteps.map((step, index) => (
              <div
                key={index}
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  background: "#FFFFFF",
                  borderRadius: "20px",
                  border: "2px solid rgba(5, 150, 105, 0.1)",
                  transition: "all 0.3s ease",
                  boxShadow: "0 4px 20px rgba(5, 150, 105, 0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 12px 30px rgba(5, 150, 105, 0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(5, 150, 105, 0.08)";
                }}
              >
                <div
                  style={{
                    position: "relative",
                    marginBottom: "1.5rem",
                  }}
                >
                  <div
                    style={{
                      width: "70px",
                      height: "70px",
                      background: "linear-gradient(135deg, #059669, #10b981)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto",
                      fontSize: "1.5rem",
                      fontWeight: "800",
                      color: "#FFFFFF",
                      boxShadow: "0 6px 20px rgba(5, 150, 105, 0.3)",
                      fontFamily: "'Poppins', sans-serif",
                    }}
                  >
                    {step.step}
                  </div>
                  <div
                    style={{
                      position: "absolute",
                      top: "-8px",
                      right: "8px",
                      fontSize: "1.2rem",
                    }}
                  >
                    {step.icon}
                  </div>
                </div>

                <h3
                  style={{
                    fontSize: "1.2rem",
                    fontWeight: "700",
                    marginBottom: "1rem",
                    color: "#059669",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {step.title}
                </h3>

                <p
                  style={{
                    color: "#059669",
                    lineHeight: "1.6",
                    marginBottom: "1rem",
                    fontSize: "14px",
                    opacity: 0.8,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {step.description}
                </p>

                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    background: "rgba(5, 150, 105, 0.1)",
                    color: "#059669",
                    padding: "0.4rem 0.8rem",
                    borderRadius: "15px",
                    fontSize: "12px",
                    fontWeight: "600",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  <Clock size={12} />
                  {step.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        style={{
          padding: "5rem 2rem",
          background: "linear-gradient(135deg, #f0fdf4 0%, #FFFFFF 100%)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: "800",
                marginBottom: "1rem",
                color: "#059669",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              Get in Touch
            </h2>
            <div
              style={{
                width: "80px",
                height: "3px",
                background: "linear-gradient(135deg, #059669, #10b981)",
                margin: "0 auto 1.5rem",
                borderRadius: "2px",
              }}
            />
            <p
              style={{
                fontSize: "1.1rem",
                color: "#059669",
                maxWidth: "600px",
                margin: "0 auto",
                fontWeight: "500",
                fontFamily: "'Montserrat', sans-serif",
              }}
            >
              Have questions? Need support? We're here to help you succeed.
            </p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "2rem",
              marginBottom: "3rem",
            }}
          >
            {[
              {
                icon: <Phone size={24} />,
                title: "24/7 Phone Support",
                info: "+91-9876-543-210",
                desc: "Toll-free support available",
              },
              {
                icon: <Mail size={24} />,
                title: "Email Support",
                info: "support@agrirent.com",
                desc: "Quick response within 2 hours",
              },
              {
                icon: <MessageCircle size={24} />,
                title: "Live Chat",
                info: "Available 24/7",
                desc: "Instant help and guidance",
              },
              {
                icon: <MapPin size={24} />,
                title: "Visit Our Office",
                info: "Bangalore, Karnataka",
                desc: "Main headquarters",
              },
            ].map((contact, index) => (
              <div
                key={index}
                style={{
                  textAlign: "center",
                  padding: "2rem",
                  background: "#FFFFFF",
                  border: "2px solid rgba(5, 150, 105, 0.1)",
                  borderRadius: "20px",
                  transition: "all 0.3s ease",
                  cursor: "pointer",
                  boxShadow: "0 4px 20px rgba(5, 150, 105, 0.08)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-8px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(5, 150, 105, 0.15)";
                  e.currentTarget.style.borderColor = "#059669";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(5, 150, 105, 0.08)";
                  e.currentTarget.style.borderColor = "rgba(5, 150, 105, 0.1)";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "60px",
                    height: "60px",
                    background: "linear-gradient(135deg, #059669, #10b981)",
                    borderRadius: "50%",
                    color: "#FFFFFF",
                    margin: "0 auto 1.5rem",
                    boxShadow: "0 4px 15px rgba(5, 150, 105, 0.3)",
                  }}
                >
                  {contact.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1.1rem",
                    fontWeight: "700",
                    marginBottom: "0.8rem",
                    color: "#059669",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {contact.title}
                </h3>
                <p
                  style={{
                    color: "#059669",
                    fontWeight: "600",
                    marginBottom: "0.4rem",
                    fontSize: "15px",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {contact.info}
                </p>
                <p
                  style={{
                    color: "#059669",
                    marginBottom: "1.2rem",
                    fontSize: "12px",
                    opacity: 0.7,
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                >
                  {contact.desc}
                </p>
                <button
                  style={{
                    background: "rgba(5, 150, 105, 0.1)",
                    color: "#059669",
                    border: "1px solid rgba(5, 150, 105, 0.3)",
                    padding: "0.5rem 1rem",
                    borderRadius: "15px",
                    fontSize: "12px",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    fontFamily: "'Montserrat', sans-serif",
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#059669";
                    e.target.style.color = "#FFFFFF";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "rgba(5, 150, 105, 0.1)";
                    e.target.style.color = "#059669";
                  }}
                >
                  Contact Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        style={{
          padding: "4rem 2rem",
          background: "linear-gradient(135deg, #059669, #10b981)",
          textAlign: "center",
        }}
      >
        <div style={{ position: "relative", zIndex: 2 }}>
          <h2
            style={{
              color: "#FFFFFF",
              fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
              marginBottom: "1rem",
              fontWeight: "800",
              fontFamily: "'Poppins', sans-serif",
            }}
          >
            Ready to Transform Your Farming?
          </h2>
          <p
            style={{
              color: "rgba(255,255,255,0.95)",
              marginBottom: "2.5rem",
              fontSize: "1.1rem",
              maxWidth: "600px",
              margin: "0 auto 2.5rem",
              fontWeight: "500",
              fontFamily: "'Montserrat', sans-serif",
            }}
          >
            Join thousands of farmers using smart technology for better yields
            and sustainable practices.
          </p>

          <div
            style={{
              display: "flex",
              gap: "1.5rem",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              to="/register"
              style={{
                padding: "1rem 2.5rem",
                background: "#FFFFFF",
                color: "#059669",
                borderRadius: "25px",
                textDecoration: "none",
                fontWeight: "700",
                fontSize: "16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
                boxShadow: "0 4px 20px rgba(255, 255, 255, 0.3)",
                fontFamily: "'Montserrat', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.target.style.transform = "scale(1.05) translateY(-3px)";
                e.target.style.boxShadow =
                  "0 8px 30px rgba(255, 255, 255, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "scale(1) translateY(0)";
                e.target.style.boxShadow =
                  "0 4px 20px rgba(255, 255, 255, 0.3)";
              }}
            >
              🚀 Start Your Journey Today
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/contact"
              style={{
                padding: "1rem 2.5rem",
                background: "transparent",
                color: "#FFFFFF",
                border: "2px solid #FFFFFF",
                borderRadius: "25px",
                textDecoration: "none",
                fontWeight: "600",
                fontSize: "16px",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                transition: "all 0.3s ease",
                fontFamily: "'Montserrat', sans-serif",
              }}
              onMouseEnter={(e) => {
                e.target.style.background = "#FFFFFF";
                e.target.style.color = "#059669";
                e.target.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.target.style.background = "transparent";
                e.target.style.color = "#FFFFFF";
                e.target.style.transform = "translateY(0)";
              }}
            >
              📞 Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}

      {/* Google Fonts Import */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700&family=Poppins:wght@600;700;800&display=swap");

        * {
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        @media (max-width: 768px) {
          nav > div > div:nth-child(1) {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
