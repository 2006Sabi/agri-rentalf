import React, { useState, useEffect } from "react";
import {
  Users,
  Tractor,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  XCircle,
  Eye,
  BarChart3,
  Package,
  AlertTriangle,
} from "lucide-react";
import axios from "axios";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState({});
  const [users, setUsers] = useState([]);
  const [equipment, setEquipment] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsRes, usersRes, equipmentRes, bookingsRes] = await Promise.all(
        [
          axios.get("/api/admin/stats"),
          axios.get("/api/admin/users?limit=5"),
          axios.get("/api/admin/equipment?status=pending&limit=5"),
          axios.get("/api/admin/bookings?limit=5"),
        ]
      );

      setStats(statsRes.data);
      setUsers(usersRes.data.users);
      setEquipment(equipmentRes.data.equipment);
      setBookings(bookingsRes.data.bookings);
    } catch (error) {
      console.error("Error fetching admin data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEquipmentApproval = async (equipmentId, status) => {
    try {
      await axios.put(`/api/admin/equipment/${equipmentId}/status`, { status });
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error("Error updating equipment status:", error);
    }
  };

  const handleUserStatusToggle = async (userId, isActive) => {
    try {
      await axios.put(`/api/admin/users/${userId}/status`, {
        isActive: !isActive,
      });
      fetchDashboardData(); // Refresh data
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul>
            <li>
              <button
                className={activeTab === "overview" ? "active" : ""}
                onClick={() => setActiveTab("overview")}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 24px",
                  color: activeTab === "overview" ? "#059669" : "#64748b",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <BarChart3 size={20} />
                Overview
              </button>
            </li>
            <li>
              <button
                className={activeTab === "users" ? "active" : ""}
                onClick={() => setActiveTab("users")}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 24px",
                  color: activeTab === "users" ? "#059669" : "#64748b",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <Users size={20} />
                Users
              </button>
            </li>
            <li>
              <button
                className={activeTab === "equipment" ? "active" : ""}
                onClick={() => setActiveTab("equipment")}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 24px",
                  color: activeTab === "equipment" ? "#059669" : "#64748b",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <Tractor size={20} />
                Equipment
              </button>
            </li>
            <li>
              <button
                className={activeTab === "bookings" ? "active" : ""}
                onClick={() => setActiveTab("bookings")}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 24px",
                  color: activeTab === "bookings" ? "#059669" : "#64748b",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <Calendar size={20} />
                Bookings
              </button>
            </li>
            <li>
              <button
                className={activeTab === "analytics" ? "active" : ""}
                onClick={() => setActiveTab("analytics")}
                style={{
                  background: "none",
                  border: "none",
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  gap: "12px",
                  padding: "12px 24px",
                  color: activeTab === "analytics" ? "#059669" : "#64748b",
                  textDecoration: "none",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                }}
              >
                <TrendingUp size={20} />
                Analytics
              </button>
            </li>
          </ul>
        </nav>
      </div>

      <div className="main-content">
        {activeTab === "overview" && (
          <>
            <div className="page-header">
              <h1 className="page-title">Admin Dashboard</h1>
              <p className="page-description">
                Manage users, equipment, and monitor platform activity
              </p>
            </div>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-card-title">Total Users</div>
                <div className="stat-card-value">{stats.totalUsers}</div>
                <div className="stat-card-change positive">
                  +{stats.monthlyUsers} this month
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card-title">Total Equipment</div>
                <div className="stat-card-value">{stats.totalEquipment}</div>
                <div className="stat-card-change positive">Active listings</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-title">Total Bookings</div>
                <div className="stat-card-value">{stats.totalBookings}</div>
                <div className="stat-card-change positive">
                  {stats.activeBookings} active
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-card-title">Total Revenue</div>
                <div className="stat-card-value">
                  ₹{stats.totalRevenue?.toLocaleString()}
                </div>
                <div className="stat-card-change positive">
                  Platform earnings
                </div>
              </div>
            </div>

            <div className="grid grid-2" style={{ marginTop: "32px" }}>
              <div className="card">
                <div className="card-header">
                  <h3 style={{ margin: 0 }}>Recent Users</h3>
                </div>
                <div className="card-content">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {users.slice(0, 5).map((user) => (
                      <div
                        key={user._id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 0",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: "500" }}>{user.name}</div>
                          <div style={{ fontSize: "14px", color: "#64748b" }}>
                            {user.role} • {user.location}
                          </div>
                        </div>
                        <span
                          className={`badge ${
                            user.isActive ? "badge-success" : "badge-danger"
                          }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 style={{ margin: 0 }}>Pending Approvals</h3>
                </div>
                <div className="card-content">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    {equipment.slice(0, 5).map((item) => (
                      <div
                        key={item._id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "8px 0",
                        }}
                      >
                        <div>
                          <div style={{ fontWeight: "500" }}>{item.name}</div>
                          <div style={{ fontSize: "14px", color: "#64748b" }}>
                            {item.category} • {item.owner.name}
                          </div>
                        </div>
                        <div style={{ display: "flex", gap: "4px" }}>
                          <button
                            className="btn btn-primary"
                            style={{ padding: "4px 8px", fontSize: "12px" }}
                            onClick={() =>
                              handleEquipmentApproval(item._id, "approved")
                            }
                          >
                            <CheckCircle size={14} />
                          </button>
                          <button
                            className="btn btn-danger"
                            style={{ padding: "4px 8px", fontSize: "12px" }}
                            onClick={() =>
                              handleEquipmentApproval(item._id, "rejected")
                            }
                          >
                            <XCircle size={14} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === "users" && (
          <>
            <div className="page-header">
              <h1 className="page-title">User Management</h1>
              <p className="page-description">
                Manage farmers, equipment owners, and their account status
              </p>
            </div>

            <div className="card">
              <div className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Location</th>
                    <th>Status</th>
                    <th>Joined</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>
                        <div>
                          <div style={{ fontWeight: "500" }}>{user.name}</div>
                          <div style={{ fontSize: "14px", color: "#64748b" }}>
                            {user.phone}
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td>
                        <span
                          className={`badge ${
                            user.role === "admin"
                              ? "badge-danger"
                              : user.role === "owner"
                              ? "badge-warning"
                              : "badge-info"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td>{user.location}</td>
                      <td>
                        <span
                          className={`badge ${
                            user.isActive ? "badge-success" : "badge-danger"
                          }`}
                        >
                          {user.isActive ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: "4px 8px" }}
                          >
                            <Eye size={16} />
                          </button>
                          <button
                            className={`btn ${
                              user.isActive ? "btn-danger" : "btn-primary"
                            }`}
                            style={{ padding: "4px 8px" }}
                            onClick={() =>
                              handleUserStatusToggle(user._id, user.isActive)
                            }
                          >
                            {user.isActive ? "Deactivate" : "Activate"}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </div>
            </div>
          </>
        )}

        {activeTab === "equipment" && (
          <>
            <div className="page-header">
              <h1 className="page-title">Equipment Management</h1>
              <p className="page-description">
                Review and approve equipment listings
              </p>
            </div>

            <div className="card">
              <div className="table">
                <thead>
                  <tr>
                    <th>Equipment</th>
                    <th>Owner</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Status</th>
                    <th>Submitted</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {equipment.map((item) => (
                    <tr key={item._id}>
                      <td>
                        <div>
                          <div style={{ fontWeight: "500" }}>{item.name}</div>
                          <div style={{ fontSize: "14px", color: "#64748b" }}>
                            {item.location.city}, {item.location.state}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div style={{ fontWeight: "500" }}>
                            {item.owner.name}
                          </div>
                          <div style={{ fontSize: "14px", color: "#64748b" }}>
                            {item.owner.phone}
                          </div>
                        </div>
                      </td>
                      <td>{item.category}</td>
                      <td>₹{item.pricing.daily}/day</td>
                      <td>
                        <span
                          className={`badge ${
                            item.status === "approved"
                              ? "badge-success"
                              : item.status === "rejected"
                              ? "badge-danger"
                              : "badge-warning"
                          }`}
                        >
                          {item.status}
                        </span>
                      </td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button
                            className="btn btn-secondary"
                            style={{ padding: "4px 8px" }}
                          >
                            <Eye size={16} />
                          </button>
                          {item.status === "pending" && (
                            <>
                              <button
                                className="btn btn-primary"
                                style={{ padding: "4px 8px" }}
                                onClick={() =>
                                  handleEquipmentApproval(item._id, "approved")
                                }
                              >
                                <CheckCircle size={16} />
                              </button>
                              <button
                                className="btn btn-danger"
                                style={{ padding: "4px 8px" }}
                                onClick={() =>
                                  handleEquipmentApproval(item._id, "rejected")
                                }
                              >
                                <XCircle size={16} />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </div>
            </div>
          </>
        )}

        {activeTab === "bookings" && (
          <>
            <div className="page-header">
              <h1 className="page-title">Booking Management</h1>
              <p className="page-description">
                Monitor and manage all equipment bookings
              </p>
            </div>

            <div className="card">
              <div className="table">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Renter</th>
                    <th>Equipment</th>
                    <th>Duration</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>
                        <div style={{ fontWeight: "500" }}>
                          {booking.bookingId}
                        </div>
                      </td>
                      <td>
                        <div>
                          <div style={{ fontWeight: "500" }}>
                            {booking.renter.name}
                          </div>
                          <div style={{ fontSize: "14px", color: "#64748b" }}>
                            {booking.renter.phone}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div style={{ fontWeight: "500" }}>
                            {booking.equipment.name}
                          </div>
                          <div style={{ fontSize: "14px", color: "#64748b" }}>
                            {booking.equipment.category}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div>
                          <div>
                            {new Date(
                              booking.rentalPeriod.startDate
                            ).toLocaleDateString()}
                          </div>
                          <div style={{ fontSize: "14px", color: "#64748b" }}>
                            to{" "}
                            {new Date(
                              booking.rentalPeriod.endDate
                            ).toLocaleDateString()}
                          </div>
                        </div>
                      </td>
                      <td>₹{booking.pricing.totalAmount}</td>
                      <td>
                        <span
                          className={`badge ${
                            booking.status === "completed"
                              ? "badge-success"
                              : booking.status === "cancelled"
                              ? "badge-danger"
                              : booking.status === "in_progress"
                              ? "badge-info"
                              : "badge-warning"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-secondary"
                          style={{ padding: "4px 8px" }}
                        >
                          <Eye size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </div>
            </div>
          </>
        )}

        {activeTab === "analytics" && (
          <>
            <div className="page-header">
              <h1 className="page-title">Analytics & Reports</h1>
              <p className="page-description">
                Platform performance and usage statistics
              </p>
            </div>

            <div className="grid grid-2">
              <div className="card">
                <div className="card-header">
                  <h3 style={{ margin: 0 }}>User Distribution</h3>
                </div>
                <div className="card-content">
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
                      }}
                    >
                      <span>Farmers</span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "100px",
                            height: "8px",
                            backgroundColor: "#e2e8f0",
                            borderRadius: "4px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${
                                (stats.totalFarmers / stats.totalUsers) * 100
                              }%`,
                              height: "100%",
                              backgroundColor: "#059669",
                            }}
                          ></div>
                        </div>
                        <span style={{ fontWeight: "500" }}>
                          {stats.totalFarmers}
                        </span>
                      </div>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <span>Equipment Owners</span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                        }}
                      >
                        <div
                          style={{
                            width: "100px",
                            height: "8px",
                            backgroundColor: "#e2e8f0",
                            borderRadius: "4px",
                            overflow: "hidden",
                          }}
                        >
                          <div
                            style={{
                              width: `${
                                (stats.totalOwners / stats.totalUsers) * 100
                              }%`,
                              height: "100%",
                              backgroundColor: "#f59e0b",
                            }}
                          ></div>
                        </div>
                        <span style={{ fontWeight: "500" }}>
                          {stats.totalOwners}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 style={{ margin: 0 }}>Platform Health</h3>
                </div>
                <div className="card-content">
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "12px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <CheckCircle size={16} style={{ color: "#059669" }} />
                      <span>All systems operational</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <TrendingUp size={16} style={{ color: "#059669" }} />
                      <span>User growth: +{stats.monthlyUsers} this month</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <Package size={16} style={{ color: "#059669" }} />
                      <span>{stats.totalEquipment} equipment listings</span>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                      }}
                    >
                      <DollarSign size={16} style={{ color: "#059669" }} />
                      <span>
                        ₹{stats.totalRevenue?.toLocaleString()} total revenue
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
