import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, MapPin, Calendar, DollarSign, Eye, Star } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const MyOrders = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("/api/crop-sell/buyer/orders", {
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

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return "⏳";
      case "confirmed":
        return "✅";
      case "shipped":
        return "🚚";
      case "delivered":
        return "📦";
      case "cancelled":
        return "❌";
      default:
        return "📋";
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (activeTab === "all") return true;
    return order.status === activeTab;
  });

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Login Required
          </h2>
          <p className="text-gray-600 mb-4">
            You need to be logged in to view your orders.
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

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">📦 My Orders</h1>
        <p className="text-gray-600">
          Track your crop purchases and order history
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.length}
              </p>
            </div>
            <Package className="h-8 w-8 text-blue-600" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((order) => order.status === "pending").length}
              </p>
            </div>
            <div className="text-2xl">⏳</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Delivered</p>
              <p className="text-2xl font-bold text-gray-900">
                {orders.filter((order) => order.status === "delivered").length}
              </p>
            </div>
            <div className="text-2xl">📦</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Spent</p>
              <p className="text-2xl font-bold text-gray-900">
                ₹
                {orders
                  .reduce((sum, order) => sum + order.totalAmount, 0)
                  .toFixed(2)}
              </p>
            </div>
            <DollarSign className="h-8 w-8 text-green-600" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-md">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { key: "all", label: "All Orders", count: orders.length },
              {
                key: "pending",
                label: "Pending",
                count: orders.filter((o) => o.status === "pending").length,
              },
              {
                key: "confirmed",
                label: "Confirmed",
                count: orders.filter((o) => o.status === "confirmed").length,
              },
              {
                key: "shipped",
                label: "Shipped",
                count: orders.filter((o) => o.status === "shipped").length,
              },
              {
                key: "delivered",
                label: "Delivered",
                count: orders.filter((o) => o.status === "delivered").length,
              },
              {
                key: "cancelled",
                label: "Cancelled",
                count: orders.filter((o) => o.status === "cancelled").length,
              },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.key
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.label} ({tab.count})
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="spinner"></div>
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📦</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {activeTab === "all"
                  ? "No orders yet"
                  : `No ${activeTab} orders`}
              </h3>
              <p className="text-gray-600 mb-4">
                {activeTab === "all"
                  ? "Start shopping for fresh crops from local farmers."
                  : `You don't have any ${activeTab} orders at the moment.`}
              </p>
              {activeTab === "all" && (
                <Link
                  to="/crop-marketplace"
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Browse Crops
                </Link>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredOrders.map((order) => (
                <div
                  key={order._id}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-start gap-4">
                      {order.cropSellId.images &&
                      order.cropSellId.images.length > 0 ? (
                        <img
                          src={order.cropSellId.images[0]}
                          alt={order.cropSellId.cropName}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center">
                          <span className="text-2xl">🌾</span>
                        </div>
                      )}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">
                          {order.cropSellId.cropName}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Seller: {order.sellerId.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          Order ID: {order._id.slice(-8)}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusIcon(order.status)} {order.status}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-500">Quantity</p>
                      <p className="font-medium">
                        {order.quantity} {order.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Price</p>
                      <p className="font-medium">
                        ₹{order.pricePerUnit}/{order.unit}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Total</p>
                      <p className="font-medium text-green-600">
                        ₹{order.totalAmount}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Payment</p>
                      <p className="font-medium capitalize">
                        {order.paymentMethod}
                      </p>
                    </div>
                  </div>

                  {/* Delivery Address */}
                  <div className="mb-4 p-3 bg-white rounded-lg border">
                    <div className="flex items-center gap-2 mb-2">
                      <MapPin size={16} className="text-gray-500" />
                      <span className="text-sm font-medium text-gray-700">
                        Delivery Address
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      {order.deliveryAddress.street},{" "}
                      {order.deliveryAddress.city},{" "}
                      {order.deliveryAddress.state} -{" "}
                      {order.deliveryAddress.pincode}
                    </p>
                  </div>

                  {/* Order Notes */}
                  {order.notes && (
                    <div className="mb-4 p-3 bg-white rounded-lg border">
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Notes:</span>{" "}
                        {order.notes}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Link
                      to={`/crop/${order.cropSellId._id}`}
                      className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm flex items-center gap-2"
                    >
                      <Eye size={16} />
                      View Crop
                    </Link>

                    {order.status === "delivered" && (
                      <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm flex items-center gap-2">
                        <Star size={16} />
                        Rate & Review
                      </button>
                    )}

                    {order.status === "shipped" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(order._id, "delivered")
                        }
                        className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm"
                      >
                        Mark as Delivered
                      </button>
                    )}

                    {order.status === "pending" && (
                      <button
                        onClick={() =>
                          handleStatusUpdate(order._id, "cancelled")
                        }
                        className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm"
                      >
                        Cancel Order
                      </button>
                    )}
                  </div>

                  {/* Status Timeline */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} />
                        <span>
                          Ordered:{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      {order.status !== "pending" &&
                        order.status !== "cancelled" && (
                          <div className="flex items-center gap-2">
                            <span>
                              Confirmed:{" "}
                              {new Date(order.updatedAt).toLocaleDateString()}
                            </span>
                          </div>
                        )}
                      {order.status === "delivered" && (
                        <div className="flex items-center gap-2">
                          <span>
                            Delivered:{" "}
                            {new Date(order.updatedAt).toLocaleDateString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
