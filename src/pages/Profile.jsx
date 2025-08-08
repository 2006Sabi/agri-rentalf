import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Settings,
  Bell,
  Shield,
  Tractor,
  Package,
  DollarSign,
  TrendingUp,
  Users,
  Plus,
  CheckCircle,
  Clock,
} from "lucide-react";

const Profile = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [isEditing, setIsEditing] = useState(false);
  const [stats, setStats] = useState({
    totalRentals: 0,
    activeBookings: 0,
    totalEarnings: 0,
    equipmentListed: 0,
  });
  const [formData, setFormData] = useState({
    name: user?.name || "",
    phone: user?.phone || "",
    location: user?.location || "",
    farmSize: "",
    cropTypes: "",
    soilType: "",
    businessName: "",
    equipmentCount: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    // Mock data - replace with actual API calls
    setStats({
      totalRentals: user.role === "farmer" ? 15 : 48,
      activeBookings: user.role === "farmer" ? 3 : 8,
      totalEarnings: user.role === "farmer" ? 12500 : 45000,
      equipmentListed: user.role === "owner" ? 6 : 0,
    });
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = () => {
    // API call to update profile
    setIsEditing(false);
  };

  return (
    <div className="section">
      <div className="container">
        <div
          className="grid grid-4"
          style={{ gridTemplateColumns: "250px 1fr" }}
        >
          <div className="card" style={{ height: "fit-content" }}>
            <div className="card-content">
              <nav
                style={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <button
                  className={`btn ${
                    activeTab === "overview" ? "btn-primary" : "btn-secondary"
                  }`}
                  onClick={() => setActiveTab("overview")}
                  style={{ justifyContent: "flex-start" }}
                >
                  <TrendingUp size={16} />
                  Overview
                </button>
                <button
                  className={`btn ${
                    activeTab === "profile" ? "btn-primary" : "btn-secondary"
                  }`}
                  onClick={() => setActiveTab("profile")}
                  style={{ justifyContent: "flex-start" }}
                >
                  <User size={16} />
                  Profile Info
                </button>
                <button
                  className={`btn ${
                    activeTab === "preferences"
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                  onClick={() => setActiveTab("preferences")}
                  style={{ justifyContent: "flex-start" }}
                >
                  <Settings size={16} />
                  Preferences
                </button>
                <button
                  className={`btn ${
                    activeTab === "notifications"
                      ? "btn-primary"
                      : "btn-secondary"
                  }`}
                  onClick={() => setActiveTab("notifications")}
                  style={{ justifyContent: "flex-start" }}
                >
                  <Bell size={16} />
                  Notifications
                </button>
                <button
                  className={`btn ${
                    activeTab === "security" ? "btn-primary" : "btn-secondary"
                  }`}
                  onClick={() => setActiveTab("security")}
                  style={{ justifyContent: "flex-start" }}
                >
                  <Shield size={16} />
                  Security
                </button>
              </nav>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              {activeTab === "overview" && (
                <>
                  <div className="welcome-section">
                    <h1 className="page-title">Dashboard Overview</h1>
                    <p className="page-description">
                      Welcome back,{" "}
                      <span className="user-name">{user.name}</span>! Here's
                      your account summary.
                    </p>
                    <div className="welcome-stats">
                      <div className="welcome-stat">
                        <span className="welcome-stat-label">Today's Date</span>
                        <span className="welcome-stat-value">
                          {new Date().toLocaleDateString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="welcome-stat">
                        <span className="welcome-stat-label">
                          Account Status
                        </span>
                        <span className="welcome-stat-value status-active">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="stats-grid">
                    <div className="stat-card">
                      <div className="stat-card-icon">
                        <Calendar size={24} />
                      </div>
                      <div className="stat-card-content">
                        <div className="stat-card-title">
                          {user.role === "farmer"
                            ? "Total Rentals"
                            : "Total Bookings"}
                        </div>
                        <div className="stat-card-value">
                          {stats.totalRentals}
                        </div>
                        <div className="stat-card-change positive">
                          <TrendingUp size={14} />
                          +12% from last month
                        </div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-card-icon">
                        <CheckCircle size={24} />
                      </div>
                      <div className="stat-card-content">
                        <div className="stat-card-title">Active Bookings</div>
                        <div className="stat-card-value">
                          {stats.activeBookings}
                        </div>
                        <div className="stat-card-change positive">
                          <TrendingUp size={14} />
                          +3 new this week
                        </div>
                      </div>
                    </div>
                    <div className="stat-card">
                      <div className="stat-card-icon">
                        <DollarSign size={24} />
                      </div>
                      <div className="stat-card-content">
                        <div className="stat-card-title">
                          {user.role === "farmer"
                            ? "Total Spent"
                            : "Total Earnings"}
                        </div>
                        <div className="stat-card-value">
                          ₹{stats.totalEarnings.toLocaleString()}
                        </div>
                        <div className="stat-card-change positive">
                          <TrendingUp size={14} />
                          +8% from last month
                        </div>
                      </div>
                    </div>
                    {user.role === "owner" && (
                      <div className="stat-card">
                        <div className="stat-card-icon">
                          <Tractor size={24} />
                        </div>
                        <div className="stat-card-content">
                          <div className="stat-card-title">
                            Equipment Listed
                          </div>
                          <div className="stat-card-value">
                            {stats.equipmentListed}
                          </div>
                          <div className="stat-card-change positive">
                            <TrendingUp size={14} />2 added this month
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="grid grid-2" style={{ marginTop: "32px" }}>
                    <div className="card">
                      <div className="card-header">
                        <h3 style={{ margin: 0 }}>Recent Activity</h3>
                      </div>
                      <div className="card-content">
                        <div className="activity-list">
                          <div className="activity-item">
                            <div className="activity-icon success">
                              <CheckCircle size={16} />
                            </div>
                            <div className="activity-content">
                              <h4>Booking Confirmed</h4>
                              <p>John Deere Tractor - 2 days</p>
                            </div>
                          </div>
                          <div className="activity-item">
                            <div className="activity-icon success">
                              <DollarSign size={16} />
                            </div>
                            <div className="activity-content">
                              <h4>Payment Received</h4>
                              <p>₹1,200 for JCB rental</p>
                            </div>
                          </div>
                          <div className="activity-item">
                            <div className="activity-icon warning">
                              <Clock size={16} />
                            </div>
                            <div className="activity-content">
                              <h4>Rental Starting Soon</h4>
                              <p>Combine Harvester - Tomorrow</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="card">
                      <div className="card-header">
                        <h3 style={{ margin: 0 }}>Quick Actions</h3>
                      </div>
                      <div className="card-content">
                        <div className="quick-actions">
                          <button className="btn btn-primary">
                            <Plus size={16} />
                            {user.role === "farmer"
                              ? "Book Equipment"
                              : "Add Equipment"}
                          </button>
                          <button className="btn btn-secondary">
                            <Calendar size={16} />
                            View Schedule
                          </button>
                          <button className="btn btn-secondary">
                            <Package size={16} />
                            Browse Products
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}

              {activeTab === "profile" && (
                <>
                  <div className="page-header">
                    <h1 className="page-title">Profile Settings</h1>
                    <p className="page-description">
                      Manage your account information and preferences
                    </p>
                  </div>

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "24px",
                    }}
                  >
                    <h3 style={{ margin: 0 }}>Profile Information</h3>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        isEditing ? handleSave() : setIsEditing(true)
                      }
                    >
                      {isEditing ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>

                  <div className="grid grid-2">
                    <div className="form-group">
                      <label className="form-label">
                        <User size={16} style={{ marginRight: "8px" }} />
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        className="form-input"
                        value={formData.name}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Mail size={16} style={{ marginRight: "8px" }} />
                        Email Address
                      </label>
                      <input
                        type="email"
                        className="form-input"
                        value={user?.email}
                        disabled
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Phone size={16} style={{ marginRight: "8px" }} />
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-input"
                        value={formData.phone}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <MapPin size={16} style={{ marginRight: "8px" }} />
                        Location
                      </label>
                      <input
                        type="text"
                        name="location"
                        className="form-input"
                        value={formData.location}
                        onChange={handleInputChange}
                        disabled={!isEditing}
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Account Type</label>
                      <input
                        type="text"
                        className="form-input"
                        value={user?.role}
                        disabled
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <Calendar size={16} style={{ marginRight: "8px" }} />
                        Member Since
                      </label>
                      <input
                        type="text"
                        className="form-input"
                        value="January 2024"
                        disabled
                      />
                    </div>
                  </div>

                  {user?.role === "farmer" && (
                    <>
                      <h4 style={{ marginTop: "32px", marginBottom: "16px" }}>
                        Farm Details
                      </h4>
                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">
                            Farm Size (acres)
                          </label>
                          <input
                            type="number"
                            name="farmSize"
                            className="form-input"
                            value={formData.farmSize}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="e.g., 10"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Crop Types</label>
                          <input
                            type="text"
                            name="cropTypes"
                            className="form-input"
                            value={formData.cropTypes}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="e.g., Rice, Wheat, Corn"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Soil Type</label>
                          <select
                            name="soilType"
                            className="form-select"
                            value={formData.soilType}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                          >
                            <option value="">Select soil type</option>
                            <option value="clay">Clay</option>
                            <option value="sandy">Sandy</option>
                            <option value="loamy">Loamy</option>
                            <option value="silt">Silt</option>
                            <option value="peaty">Peaty</option>
                            <option value="chalky">Chalky</option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  {user?.role === "owner" && (
                    <>
                      <h4 style={{ marginTop: "32px", marginBottom: "16px" }}>
                        Business Details
                      </h4>
                      <div className="grid grid-2">
                        <div className="form-group">
                          <label className="form-label">Business Name</label>
                          <input
                            type="text"
                            name="businessName"
                            className="form-input"
                            value={formData.businessName}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="e.g., Kumar Equipment Rentals"
                          />
                        </div>

                        <div className="form-group">
                          <label className="form-label">Equipment Count</label>
                          <input
                            type="number"
                            name="equipmentCount"
                            className="form-input"
                            value={formData.equipmentCount}
                            onChange={handleInputChange}
                            disabled={!isEditing}
                            placeholder="Number of equipment you own"
                          />
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}

              {activeTab === "preferences" && (
                <>
                  <h3 style={{ marginBottom: "24px" }}>Preferences</h3>

                  <div className="form-group">
                    <label className="form-label">Language</label>
                    <select className="form-select">
                      <option value="en">English</option>
                      <option value="hi">Hindi</option>
                      <option value="ta">Tamil</option>
                      <option value="te">Telugu</option>
                      <option value="kn">Kannada</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Currency</label>
                    <select className="form-select">
                      <option value="inr">Indian Rupee (₹)</option>
                      <option value="usd">US Dollar ($)</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Time Zone</label>
                    <select className="form-select">
                      <option value="ist">India Standard Time (IST)</option>
                      <option value="utc">UTC</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Distance Unit</label>
                    <select className="form-select">
                      <option value="km">Kilometers</option>
                      <option value="miles">Miles</option>
                    </select>
                  </div>
                </>
              )}

              {activeTab === "notifications" && (
                <>
                  <h3 style={{ marginBottom: "24px" }}>
                    Notification Settings
                  </h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "16px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px",
                        backgroundColor: "#f8fafc",
                        borderRadius: "8px",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "500" }}>
                          Email Notifications
                        </div>
                        <div style={{ fontSize: "14px", color: "#64748b" }}>
                          Receive booking updates and important announcements
                        </div>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px",
                        backgroundColor: "#f8fafc",
                        borderRadius: "8px",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "500" }}>
                          SMS Notifications
                        </div>
                        <div style={{ fontSize: "14px", color: "#64748b" }}>
                          Get text messages for urgent updates
                        </div>
                      </div>
                      <input type="checkbox" />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px",
                        backgroundColor: "#f8fafc",
                        borderRadius: "8px",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "500" }}>
                          Marketing Communications
                        </div>
                        <div style={{ fontSize: "14px", color: "#64748b" }}>
                          Receive promotional offers and new feature updates
                        </div>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>

                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "16px",
                        backgroundColor: "#f8fafc",
                        borderRadius: "8px",
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: "500" }}>
                          AI Recommendations
                        </div>
                        <div style={{ fontSize: "14px", color: "#64748b" }}>
                          Get personalized equipment and crop suggestions
                        </div>
                      </div>
                      <input type="checkbox" defaultChecked />
                    </div>
                  </div>
                </>
              )}

              {activeTab === "security" && (
                <>
                  <h3 style={{ marginBottom: "24px" }}>Security Settings</h3>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "24px",
                    }}
                  >
                    <div className="card" style={{ padding: "16px" }}>
                      <h4 style={{ margin: "0 0 12px 0" }}>Change Password</h4>
                      <div className="form-group">
                        <label className="form-label">Current Password</label>
                        <input type="password" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">New Password</label>
                        <input type="password" className="form-input" />
                      </div>
                      <div className="form-group">
                        <label className="form-label">
                          Confirm New Password
                        </label>
                        <input type="password" className="form-input" />
                      </div>
                      <button className="btn btn-primary">
                        Update Password
                      </button>
                    </div>

                    <div className="card" style={{ padding: "16px" }}>
                      <h4 style={{ margin: "0 0 12px 0" }}>
                        Two-Factor Authentication
                      </h4>
                      <p style={{ color: "#64748b", marginBottom: "16px" }}>
                        Add an extra layer of security to your account
                      </p>
                      <button className="btn btn-secondary">Enable 2FA</button>
                    </div>

                    <div className="card" style={{ padding: "16px" }}>
                      <h4 style={{ margin: "0 0 12px 0" }}>Login Sessions</h4>
                      <p style={{ color: "#64748b", marginBottom: "16px" }}>
                        Manage your active login sessions
                      </p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "12px",
                          backgroundColor: "#f8fafc",
                          borderRadius: "8px",
                          marginBottom: "8px",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: "500" }}>
                            Current Session
                          </div>
                          <div style={{ fontSize: "14px", color: "#64748b" }}>
                            Chrome on Windows • Active now
                          </div>
                        </div>
                        <span className="badge badge-success">Current</span>
                      </div>
                      <button className="btn btn-danger">
                        Sign Out All Other Sessions
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
