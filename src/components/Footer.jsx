import React from "react";
import { Link } from "react-router-dom";
import {
  Tractor,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <div
              className="logo"
              style={{ color: "white", marginBottom: "16px" }}
            >
              <Tractor size={32} />
              <span>AgriRent</span>
            </div>
            <p style={{ color: "#94a3b8", marginBottom: "16px" }}>
              Empowering farmers with modern agricultural equipment and tools.
              Connecting farm owners with those who need their equipment.
            </p>
            <div style={{ display: "flex", gap: "12px" }}>
              <Facebook
                size={20}
                style={{ color: "#94a3b8", cursor: "pointer" }}
              />
              <Twitter
                size={20}
                style={{ color: "#94a3b8", cursor: "pointer" }}
              />
              <Instagram
                size={20}
                style={{ color: "#94a3b8", cursor: "pointer" }}
              />
              <Linkedin
                size={20}
                style={{ color: "#94a3b8", cursor: "pointer" }}
              />
            </div>
          </div>

          <div className="footer-section">
            <h3>Quick Links</h3>
            <Link to="/equipment">Equipment Rental</Link>
            <Link to="/products">Products</Link>
            <Link to="/knowledge-hub">Knowledge Hub</Link>
            <Link to="/ai-recommendations">AI Recommendations</Link>
            <Link to="/crop-planner">Crop Planner</Link>
          </div>

          <div className="footer-section">
            <h3>Services</h3>
            <a href="#tractors">Tractor Rental</a>
            <a href="#jcb">JCB Rental</a>
            <a href="#seeds">Seeds & Fertilizers</a>
            <a href="#tools">Farming Tools</a>
            <a href="#consultation">AI Consultation</a>
          </div>

          <div className="footer-section">
            <h3>Contact Info</h3>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <MapPin size={16} />
              <span>123 Farm Street, Agriculture City, AC 12345</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <Phone size={16} />
              <span>+1 (555) 123-4567</span>
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "8px",
              }}
            >
              <Mail size={16} />
              <span>info@agrirent.com</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>
            &copy; 2024 AgriRent. All rights reserved. | Privacy Policy | Terms
            of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
