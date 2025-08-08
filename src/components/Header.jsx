import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  Tractor,
  User,
  LogOut,
  Settings,
  BarChart3,
  Menu,
  X,
  Package,
  ShoppingCart,
} from "lucide-react";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setShowUserMenu(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <Link to="/" className="logo">
            <Tractor size={32} />
            <span>AgriRent</span>
          </Link>

          <nav className={`nav ${showMobileMenu ? "mobile-nav-open" : ""}`}>
            <Link
              to="/equipment"
              className={`nav-link ${isActive("/equipment") ? "active" : ""}`}
              onClick={() => setShowMobileMenu(false)}
            >
              Equipment
            </Link>
            <Link
              to="/crop-marketplace"
              className={`nav-link ${
                isActive("/crop-marketplace") ? "active" : ""
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Crop Marketplace
            </Link>
            <Link
              to="/products"
              className={`nav-link ${isActive("/products") ? "active" : ""}`}
              onClick={() => setShowMobileMenu(false)}
            >
              Products
            </Link>
            <Link
              to="/knowledge-hub"
              className={`nav-link ${
                isActive("/knowledge-hub") ? "active" : ""
              }`}
              onClick={() => setShowMobileMenu(false)}
            >
              Knowledge Hub
            </Link>
            <Link
              to="/forum"
              className={`nav-link ${isActive("/forum") ? "active" : ""}`}
              onClick={() => setShowMobileMenu(false)}
            >
              Forum
            </Link>

            {user && (
              <Link
                to="/ai-crop-planner"
                className={`nav-link ${
                  isActive("/ai-crop-planner") ? "active" : ""
                }`}
                onClick={() => setShowMobileMenu(false)}
              >
                AI Crop Planner
              </Link>
            )}



            {user ? (
              <div className="user-menu">
                <button
                  className="user-button"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                >
                  <User size={20} />
                  <span>{user.name}</span>
                </button>

                {showUserMenu && (
                  <div className="dropdown">
                    <Link
                      to="/profile"
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings size={16} />
                      Profile
                    </Link>
                    <Link
                      to="/bookings"
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <BarChart3 size={16} />
                      My Bookings
                    </Link>
                    {user.role === "farmer" && (
                      <Link
                        to="/my-crops"
                        className="dropdown-item"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <Package size={16} />
                        My Crops
                      </Link>
                    )}
                    <Link
                      to="/my-orders"
                      className="dropdown-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <ShoppingCart size={16} />
                      My Orders
                    </Link>
                    {user.role === "admin" && (
                      <Link
                        to="/admin"
                        className="dropdown-item"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <BarChart3 size={16} />
                        Admin Panel
                      </Link>
                    )}
                    <button
                      className="dropdown-item"
                      onClick={handleLogout}
                      style={{
                        border: "none",
                        background: "none",
                        width: "100%",
                        textAlign: "left",
                      }}
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div style={{ display: "flex", gap: "12px" }}>
                <Link to="/login" className="btn btn-secondary">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            )}
          </nav>

          <button
            className="mobile-menu-button"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
