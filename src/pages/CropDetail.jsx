import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  MapPin,
  Calendar,
  Package,
  Star,
  Phone,
  Mail,
  ShoppingCart,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

const CropDetail = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showOrderModal, setShowOrderModal] = useState(false);
  const [orderForm, setOrderForm] = useState({
    quantity: "",
    deliveryAddress: {
      street: "",
      city: "",
      state: "",
      pincode: "",
    },
    paymentMethod: "cash",
    notes: "",
  });

  useEffect(() => {
    fetchCropDetails();
  }, [id]);

  const fetchCropDetails = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/crop-sell/${id}`);
      const data = await response.json();

      if (data.success) {
        setCrop(data.data);
      } else {
        alert("Crop not found");
        navigate("/crop-marketplace");
      }
    } catch (error) {
      console.error("Error fetching crop details:", error);
      alert("Failed to load crop details");
    } finally {
      setLoading(false);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      alert("Please login to place an order");
      return;
    }

    if (parseFloat(orderForm.quantity) > crop.quantity) {
      alert("Requested quantity exceeds available quantity");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`/api/crop-sell/${id}/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderForm),
      });

      const data = await response.json();

      if (data.success) {
        alert("Order placed successfully!");
        setShowOrderModal(false);
        navigate("/my-orders");
      } else {
        alert(data.message || "Failed to place order");
      }
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setOrderForm((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setOrderForm((prev) => ({
        ...prev,
        [name]: value,
      }));
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

  const getQualityColor = (quality) => {
    switch (quality) {
      case "premium":
        return "text-purple-600";
      case "good":
        return "text-green-600";
      case "average":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center items-center h-64">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!crop) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Crop Not Found
          </h2>
          <button
            onClick={() => navigate("/crop-marketplace")}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
          >
            Back to Marketplace
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/crop-marketplace")}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
      >
        <ArrowLeft size={20} />
        Back to Marketplace
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Column - Images and Basic Info */}
        <div>
          {/* Images */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            {crop.images && crop.images.length > 0 ? (
              <div className="relative">
                <img
                  src={crop.images[0]}
                  alt={crop.cropName}
                  className="w-full h-96 object-cover"
                />
                {crop.organic && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                      Organic
                    </span>
                  </div>
                )}
                <div className="absolute top-4 right-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      crop.status
                    )}`}
                  >
                    {crop.status}
                  </span>
                </div>
              </div>
            ) : (
              <div className="w-full h-96 bg-gray-200 flex items-center justify-center">
                <span className="text-6xl text-gray-400">🌾</span>
              </div>
            )}

            {/* Additional Images */}
            {crop.images && crop.images.length > 1 && (
              <div className="p-4">
                <div className="grid grid-cols-4 gap-2">
                  {crop.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${crop.cropName} ${index + 2}`}
                      className="w-full h-20 object-cover rounded-lg cursor-pointer hover:opacity-80"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Seller Information */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Seller Information
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-medium">Name:</span>
                <span>{crop.sellerId.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-gray-500" />
                <span>{crop.sellerId.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-gray-500" />
                <span>{crop.sellerId.phone}</span>
              </div>
              {crop.sellerId.farmDetails && (
                <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">
                    Farm Details
                  </h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    {crop.sellerId.farmDetails.farmSize && (
                      <p>
                        Farm Size: {crop.sellerId.farmDetails.farmSize} acres
                      </p>
                    )}
                    {crop.sellerId.farmDetails.cropTypes &&
                      crop.sellerId.farmDetails.cropTypes.length > 0 && (
                        <p>
                          Crops:{" "}
                          {crop.sellerId.farmDetails.cropTypes.join(", ")}
                        </p>
                      )}
                    {crop.sellerId.farmDetails.soilType && (
                      <p>Soil Type: {crop.sellerId.farmDetails.soilType}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Details and Order */}
        <div>
          {/* Crop Details */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold text-gray-900">
                {crop.cropName}
              </h1>
              <span
                className={`text-sm font-medium ${getQualityColor(
                  crop.quality
                )}`}
              >
                {crop.quality}
              </span>
            </div>

            <p className="text-gray-600 mb-6">{crop.description}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Category</p>
                <p className="font-medium">{crop.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Harvest Date</p>
                <p className="font-medium">
                  {new Date(crop.harvestDate).toLocaleDateString()}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="font-medium">{crop.location}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Views</p>
                <p className="font-medium">{crop.views}</p>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-2xl font-bold text-green-600">
                  ₹{crop.pricePerUnit}
                </span>
                <span className="text-gray-500">per {crop.unit}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Available Quantity</span>
                <span className="font-medium">
                  {crop.quantity} {crop.unit}
                </span>
              </div>
            </div>
          </div>

          {/* Order Section */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Place Order
            </h3>

            {!user ? (
              <div className="text-center py-6">
                <p className="text-gray-600 mb-4">
                  Please login to place an order
                </p>
                <button
                  onClick={() => navigate("/login")}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Login
                </button>
              </div>
            ) : user.id === crop.sellerId._id ? (
              <div className="text-center py-6">
                <p className="text-gray-600">
                  You cannot purchase your own crop
                </p>
              </div>
            ) : crop.status !== "available" ? (
              <div className="text-center py-6">
                <p className="text-gray-600">
                  This crop is not available for purchase
                </p>
              </div>
            ) : (
              <div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity ({crop.unit})
                  </label>
                  <input
                    type="number"
                    min="0.01"
                    max={crop.quantity}
                    step="0.01"
                    value={orderForm.quantity}
                    onChange={(e) =>
                      setOrderForm((prev) => ({
                        ...prev,
                        quantity: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder={`Max: ${crop.quantity} ${crop.unit}`}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Method
                  </label>
                  <select
                    name="paymentMethod"
                    value={orderForm.paymentMethod}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  >
                    <option value="cash">Cash on Delivery</option>
                    <option value="online">Online Payment</option>
                    <option value="bank_transfer">Bank Transfer</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Notes (Optional)
                  </label>
                  <textarea
                    name="notes"
                    value={orderForm.notes}
                    onChange={handleInputChange}
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Any special instructions or requests..."
                  />
                </div>

                <button
                  onClick={() => setShowOrderModal(true)}
                  disabled={
                    !orderForm.quantity || parseFloat(orderForm.quantity) <= 0
                  }
                  className="w-full px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={20} />
                  Place Order
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Modal */}
      {showOrderModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Complete Your Order
            </h3>

            <form onSubmit={handleOrderSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Delivery Address
                </label>
                <input
                  type="text"
                  name="deliveryAddress.street"
                  value={orderForm.deliveryAddress.street}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mb-2"
                  placeholder="Street Address"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    name="deliveryAddress.city"
                    value={orderForm.deliveryAddress.city}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="City"
                  />
                  <input
                    type="text"
                    name="deliveryAddress.state"
                    value={orderForm.deliveryAddress.state}
                    onChange={handleInputChange}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="State"
                  />
                </div>
                <input
                  type="text"
                  name="deliveryAddress.pincode"
                  value={orderForm.deliveryAddress.pincode}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent mt-2"
                  placeholder="Pincode"
                />
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Quantity:</span>
                  <span>
                    {orderForm.quantity} {crop.unit}
                  </span>
                </div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600">Price per {crop.unit}:</span>
                  <span>₹{crop.pricePerUnit}</span>
                </div>
                <div className="flex justify-between items-center font-semibold text-lg">
                  <span>Total Amount:</span>
                  <span className="text-green-600">
                    ₹
                    {(
                      parseFloat(orderForm.quantity) * crop.pricePerUnit
                    ).toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowOrderModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                >
                  Confirm Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default CropDetail;
