import React from "react";
import { Link } from "react-router-dom";
import {
  Tractor,
  Wrench,
  Leaf,
  Brain,
  Users,
  Star,
  TrendingUp,
  Shield,
} from "lucide-react";

const Home = () => {
  const features = [
    {
      icon: <Tractor size={32} />,
      title: "Equipment Rental",
      description:
        "Rent tractors, JCBs, and other agricultural equipment by the hour or day with competitive pricing.",
    },
    {
      icon: <Wrench size={32} />,
      title: "Quality Tools",
      description:
        "Purchase high-quality farming tools, seeds, fertilizers, and agricultural supplies.",
    },
    {
      icon: <Brain size={32} />,
      title: "AI Recommendations",
      description:
        "Get personalized equipment and crop recommendations based on your specific farming needs.",
    },
    {
      icon: <Leaf size={32} />,
      title: "Crop Planning",
      description:
        "AI-powered crop planning assistance with optimal sowing times and resource recommendations.",
    },
    {
      icon: <Users size={32} />,
      title: "Community",
      description:
        "Connect with other farmers and equipment owners in your area for knowledge sharing.",
    },
    {
      icon: <Shield size={32} />,
      title: "Secure Transactions",
      description:
        "Safe and secure payment processing with insurance coverage for all rentals.",
    },
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Tamil Nadu",
      text: "AgriRent helped me find the perfect tractor for my 10-acre farm. The AI recommendations were spot-on!",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      location: "Punjab",
      text: "As an equipment owner, this platform has increased my rental income by 200%. Highly recommended!",
      rating: 5,
    },
    {
      name: "Mohammed Ali",
      location: "Karnataka",
      text: "The crop planning feature saved me thousands. The AI suggested the best equipment for my soil type.",
      rating: 5,
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="hero">
        <video autoPlay muted loop playsInline>
          <source
            src="https://res.cloudinary.com/da1pmfwy2/video/upload/v1753953103/agri-rentel1_re8wr0.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
        <div className="container">
          <h1>Revolutionizing Agriculture with Smart Equipment Rental</h1>
          <p>
            Connect farmers with equipment owners, get AI-powered
            recommendations, and access everything you need for successful
            farming.
          </p>
          <div>
            <Link to="/equipment" className="btn btn-primary">
              Browse Equipment
            </Link>
            <Link to="/register" className="btn btn-outline">
              Join Our Community
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container">
        <div className="stats">
          <div className="stat">
            <div className="stat-number">10,000+</div>
            <div className="stat-label">Active Farmers</div>
          </div>
          <div className="stat">
            <div className="stat-number">5,000+</div>
            <div className="stat-label">Equipment Listed</div>
          </div>
          <div className="stat">
            <div className="stat-number">50,000+</div>
            <div className="stat-label">Successful Rentals</div>
          </div>
          <div className="stat">
            <div className="stat-number">98%</div>
            <div className="stat-label">Customer Satisfaction</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Why Choose AgriRent?</h2>
          <p className="section-subtitle">
            We provide comprehensive solutions for modern farming needs with
            cutting-edge technology and community support.
          </p>

          <div className="feature-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section" style={{ backgroundColor: "white" }}>
        <div className="container">
          <h2 className="section-title">What Our Users Say</h2>
          <p className="section-subtitle">
            Join thousands of satisfied farmers and equipment owners who trust
            AgriRent.
          </p>

          <div className="grid grid-3" style={{ marginTop: "48px" }}>
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="card-content">
                  <div style={{ display: "flex", marginBottom: "12px" }}>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} size={16} fill="#fbbf24" color="#fbbf24" />
                    ))}
                  </div>
                  <p style={{ marginBottom: "16px", fontStyle: "italic" }}>
                    "{testimonial.text}"
                  </p>
                  <div>
                    <div style={{ fontWeight: "600", color: "#1e293b" }}>
                      {testimonial.name}
                    </div>
                    <div style={{ color: "#64748b", fontSize: "14px" }}>
                      {testimonial.location}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="section" style={{ backgroundColor: "#f0fdf4" }}>
        <div className="container">
          <div
            style={{ textAlign: "center", maxWidth: "600px", margin: "0 auto" }}
          >
            <h2 className="section-title">Ready to Transform Your Farming?</h2>
            <p className="section-subtitle">
              Join our community today and access modern farming solutions
              powered by AI technology.
            </p>
            <div
              style={{
                display: "flex",
                gap: "16px",
                justifyContent: "center",
                marginTop: "32px",
              }}
            >
              <Link to="/register" className="btn btn-primary">
                Get Started Free
              </Link>
              <Link to="/equipment" className="btn btn-secondary">
                Browse Equipment
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
