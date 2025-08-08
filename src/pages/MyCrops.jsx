import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Edit,
  Trash2,
  Eye,
  Package,
  DollarSign,
  TrendingUp,
  Users,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const MyCrops = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [crops, setCrops] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("listings");
  const [stats, setStats] = useState({
    totalListings: 0,
    activeListings: 0,
    totalOrders: 0,
    totalEarnings: 0,
  });

  useEffect(() => {
    if (user) {
      fetchCrops();
      fetchOrders();
      fetchStats();
    }
  }, [user, activeTab]);

  const fetchCrops = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/crop-sell/seller/my-listings", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setCrops(data.data);
      }
    } catch (error) {
      console.error("Error fetching crops:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/crop-sell/seller/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setOrders(data.data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const [cropsResponse, ordersResponse] = await Promise.all([
        fetch("/api/crop-sell/seller/my-listings", {
          headers: { Authorization: `Bearer ${token}` },
        }),
        fetch("/api/crop-sell/seller/orders", {
          headers: { Authorization: `Bearer ${token}` },
        }),
      ]);

      const cropsData = await cropsResponse.json();
      const ordersData = await ordersResponse.json();

      if (cropsData.success && ordersData.success) {
        const totalListings = cropsData.data.length;
        const activeListings = cropsData.data.filter(
          (crop) => crop.status === "available"
        ).length;
        const totalOrders = ordersData.data.length;
        const totalEarnings = ordersData.data
          .filter((order) => order.status === "delivered")
          .reduce((sum, order) => sum + order.totalAmount, 0);

        setStats({
          totalListings,
          activeListings,
          totalOrders,
          totalEarnings,
        });
      }
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  const handleDeleteCrop = async (cropId) => {
    if (!confirm("Are you sure you want to delete this crop listing?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/crop-sell/${cropId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        alert("Crop listing deleted successfully!");
        fetchCrops();
        fetchStats();
      } else {
        alert(data.message || "Failed to delete crop listing");
      }
    } catch (error) {
      console.error("Error deleting crop:", error);
      alert("Failed to delete crop listing");
    }
  };

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/crop-sell/orders/${orderId}/status`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });

      const data = await response.json();
      if (data.success) {
        alert("Order status updated successfully!");
        fetchOrders();
      } else {
        alert(data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      alert("Failed to update order status");
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "available":
        return "text-green-600 bg-green-100";
      case "sold":
        return "text-red-600 bg-red-100";
      case "reserved":
        return "text-yellow-600 bg-yellow-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getOrderStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "text-yellow-600 bg-yellow-100";
      case "confirmed":
        return "text-blue-600 bg-blue-100";
      case "shipped":
        return "text-purple-600 bg-purple-100";
      case "delivered":
        return "text-green-600 bg-green-100";
      case "cancelled":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Login Required
          </h2>
          <p className="text-gray-600 mb-4">
            You need to be logged in to view your crops.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  if (user.role !== "farmer") {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">
            Only farmers can access the crop management dashboard.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              🌾 My Crop Dashboard
            </h1>
            <p className="text-gray-600">
              Manage your crop listings and track your sales
            </p>
          </div>
          <Link
            to="/sell-crop"
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Add New Crop
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Listings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalListings}
                </p>
              </div>
              <Package className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Listings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.activeListings}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Orders
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {stats.totalOrders}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Earnings
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ₹{stats.totalEarnings.toFixed(2)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("listings")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "listings"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                My Listings ({crops.length})
              </button>
              <button
                onClick={() => setActiveTab("orders")}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "orders"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Orders ({orders.length})
              </button>
            </nav>
          </div>

          <div className="p-6">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="spinner"></div>
              </div>
            ) : (
              <>
                {/* My Listings Tab */}
                {activeTab === "listings" && (
                  <div>
                    {crops.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">🌾</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          No crop listings yet
                        </h3>
                        <p className="text-gray-600 mb-4">
                          Start selling your harvest by creating your first
                          listing.
                        </p>
                        <Link
                          to="/sell-crop"
                          className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                          List Your First Crop
                        </Link>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {crops.map((crop) => (
                          <div
                            key={crop._id}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {crop.cropName}
                              </h3>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(
                                  crop.status
                                )}`}
                              >
                                {crop.status}
                              </span>
                            </div>

                            {crop.images && crop.images.length > 0 && (
                              <img
                                src={crop.images[0]}
                                alt={crop.cropName}
                                className="w-full h-32 object-cover rounded-lg mb-3"
                              />
                            )}

                            <div className="space-y-2 mb-4">
                              <p className="text-sm text-gray-600">
                                Quantity: {crop.quantity} {crop.unit}
                              </p>
                              <p className="text-sm text-gray-600">
                                Price: ₹{crop.pricePerUnit}/{crop.unit}
                              </p>
                              <p className="text-sm text-gray-600">
                                Views: {crop.views}
                              </p>
                            </div>

                            <div className="flex gap-2">
                              <Link
                                to={`/crop/${crop._id}`}
                                className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-center text-sm"
                              >
                                <Eye size={16} className="inline mr-1" />
                                View
                              </Link>
                              <button
                                onClick={() =>
                                  navigate(`/edit-crop/${crop._id}`)
                                }
                                className="flex-1 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm"
                              >
                                <Edit size={16} className="inline mr-1" />
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteCrop(crop._id)}
                                className="flex-1 px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors text-sm"
                              >
                                <Trash2 size={16} className="inline mr-1" />
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Orders Tab */}
                {activeTab === "orders" && (
                  <div>
                    {orders.length === 0 ? (
                      <div className="text-center py-12">
                        <div className="text-6xl mb-4">📦</div>
                        <h3 className="text-xl font-semibold text-gray-900 mb-2">
                          No orders yet
                        </h3>
                        <p className="text-gray-600">
                          Orders from buyers will appear here once they place
                          them.
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order._id}
                            className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                          >
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">
                                  {order.cropSellId.cropName}
                                </h3>
                                <p className="text-sm text-gray-600">
                                  Buyer: {order.buyerId.name}
                                </p>
                              </div>
                              <span
                                className={`px-2 py-1 text-xs font-medium rounded-full ${getOrderStatusColor(
                                  order.status
                                )}`}
                              >
                                {order.status}
                              </span>
                            </div>

                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                              <div>
                                <p className="text-sm text-gray-600">
                                  Quantity
                                </p>
                                <p className="font-medium">
                                  {order.quantity} {order.unit}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Price</p>
                                <p className="font-medium">
                                  ₹{order.pricePerUnit}/{order.unit}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Total</p>
                                <p className="font-medium text-green-600">
                                  ₹{order.totalAmount}
                                </p>
                              </div>
                              <div>
                                <p className="text-sm text-gray-600">Date</p>
                                <p className="font-medium">
                                  {new Date(
                                    order.createdAt
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                            </div>

                            {order.status === "pending" && (
                              <div className="flex gap-2">
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(order._id, "confirmed")
                                  }
                                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                                >
                                  Confirm Order
                                </button>
                                <button
                                  onClick={() =>
                                    handleStatusUpdate(order._id, "cancelled")
                                  }
                                  className="px-3 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                                >
                                  Cancel Order
                                </button>
                              </div>
                            )}

                            {order.status === "confirmed" && (
                              <button
                                onClick={() =>
                                  handleStatusUpdate(order._id, "shipped")
                                }
                                className="px-3 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
                              >
                                Mark as Shipped
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCrops;
