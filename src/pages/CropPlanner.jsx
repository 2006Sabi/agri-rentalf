import React, { useState } from "react";
import {
  Calendar,
  MapPin,
  Thermometer,
  Droplets,
  Sun,
  CloudRain,
  Leaf,
  TrendingUp,
} from "lucide-react";

const CropPlanner = () => {
  const [formData, setFormData] = useState({
    location: "",
    farmSize: "",
    soilType: "",
    irrigationType: "",
    budget: "",
    experience: "",
    preferredCrops: [],
  });
  const [cropPlan, setCropPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableCrops, setAvailableCrops] = useState([]);

  useEffect(() => {
    fetchAvailableCrops();
  }, []);

  const fetchAvailableCrops = async () => {
    try {
      const response = await fetch("/api/crop-planner/crops");
      const data = await response.json();
      if (data.success) {
        setAvailableCrops(data.data);
      }
    } catch (error) {
      console.error("Error fetching crops:", error);
      // Fallback to static list if API fails
      setAvailableCrops(cropOptions);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCropSelection = (crop) => {
    const updatedCrops = formData.preferredCrops.includes(crop)
      ? formData.preferredCrops.filter((c) => c !== crop)
      : [...formData.preferredCrops, crop];

    setFormData({
      ...formData,
      preferredCrops: updatedCrops,
    });
  };

  const generateCropPlan = () => {
    setLoading(true);

    // Simulate AI processing
    setTimeout(() => {
      setCropPlan({
        location: formData.location || "Tamil Nadu, India",
        farmSize: formData.farmSize || "10 acres",
        seasons: {
          kharif: {
            name: "Kharif Season (June - October)",
            weather: {
              temperature: "25-35°C",
              rainfall: "600-1200mm",
              humidity: "70-85%",
            },
            recommendedCrops: [
              {
                name: "Rice",
                area: "6 acres",
                variety: "ADT-43",
                sowingDate: "June 15 - July 15",
                harvestDate: "October 15 - November 15",
                expectedYield: "4-5 tons/acre",
                profitability: "High",
                waterRequirement: "High",
                equipment: ["Tractor", "Puddler", "Transplanter"],
                inputs: {
                  seeds: "25 kg/acre",
                  fertilizers: "NPK 20-20-0 @ 250 kg/acre",
                  pesticides: "As per IPM schedule",
                },
                timeline: [
                  {
                    stage: "Land Preparation",
                    period: "May 15 - June 10",
                    activities: ["Plowing", "Puddling", "Leveling"],
                  },
                  {
                    stage: "Sowing/Transplanting",
                    period: "June 15 - July 15",
                    activities: ["Nursery preparation", "Transplanting"],
                  },
                  {
                    stage: "Vegetative Growth",
                    period: "July 15 - August 30",
                    activities: ["Weeding", "Fertilizer application"],
                  },
                  {
                    stage: "Reproductive Phase",
                    period: "September 1 - October 15",
                    activities: ["Pest monitoring", "Water management"],
                  },
                  {
                    stage: "Harvesting",
                    period: "October 15 - November 15",
                    activities: ["Harvesting", "Threshing", "Storage"],
                  },
                ],
              },
              {
                name: "Cotton",
                area: "4 acres",
                variety: "Suraj",
                sowingDate: "June 1 - June 30",
                harvestDate: "November 1 - January 31",
                expectedYield: "15-20 quintals/acre",
                profitability: "Medium",
                waterRequirement: "Medium",
                equipment: ["Tractor", "Seed Drill", "Sprayer"],
                inputs: {
                  seeds: "1.5 kg/acre",
                  fertilizers: "NPK 17-17-17 @ 200 kg/acre",
                  pesticides: "Integrated pest management",
                },
              },
            ],
          },
          rabi: {
            name: "Rabi Season (November - March)",
            weather: {
              temperature: "15-25°C",
              rainfall: "50-200mm",
              humidity: "50-70%",
            },
            recommendedCrops: [
              {
                name: "Wheat",
                area: "8 acres",
                variety: "HD-2967",
                sowingDate: "November 15 - December 15",
                harvestDate: "March 15 - April 15",
                expectedYield: "25-30 quintals/acre",
                profitability: "High",
                waterRequirement: "Medium",
                equipment: ["Tractor", "Seed Drill", "Combine Harvester"],
                inputs: {
                  seeds: "40 kg/acre",
                  fertilizers: "NPK 12-32-16 @ 150 kg/acre",
                  pesticides: "Fungicides as needed",
                },
              },
              {
                name: "Mustard",
                area: "2 acres",
                variety: "Pusa Bold",
                sowingDate: "October 15 - November 15",
                harvestDate: "February 15 - March 15",
                expectedYield: "8-12 quintals/acre",
                profitability: "Medium",
                waterRequirement: "Low",
                equipment: ["Tractor", "Seed Drill"],
                inputs: {
                  seeds: "4 kg/acre",
                  fertilizers: "NPK 18-46-0 @ 100 kg/acre",
                  pesticides: "Aphid control measures",
                },
              },
            ],
          },
          zaid: {
            name: "Zaid Season (April - June)",
            weather: {
              temperature: "30-45°C",
              rainfall: "0-100mm",
              humidity: "40-60%",
            },
            recommendedCrops: [
              {
                name: "Fodder Maize",
                area: "5 acres",
                variety: "African Tall",
                sowingDate: "March 15 - April 15",
                harvestDate: "June 15 - July 15",
                expectedYield: "300-400 quintals/acre (green fodder)",
                profitability: "Medium",
                waterRequirement: "High",
                equipment: ["Tractor", "Seed Drill", "Chaff Cutter"],
                inputs: {
                  seeds: "25 kg/acre",
                  fertilizers: "Urea @ 150 kg/acre",
                  pesticides: "Minimal requirement",
                },
              },
              {
                name: "Summer Vegetables",
                area: "3 acres",
                variety: "Tomato, Brinjal, Okra",
                sowingDate: "February 15 - March 15",
                harvestDate: "May 1 - June 30",
                expectedYield: "Varies by crop",
                profitability: "High",
                waterRequirement: "High",
                equipment: ["Drip irrigation", "Sprayer"],
                inputs: {
                  seeds: "As per crop requirement",
                  fertilizers: "Organic compost + NPK",
                  pesticides: "IPM approach",
                },
              },
            ],
          },
        },
        yearlyProjection: {
          totalInvestment: "₹2,50,000",
          expectedRevenue: "₹4,20,000",
          netProfit: "₹1,70,000",
          roi: "68%",
        },
        riskFactors: [
          {
            factor: "Weather Dependency",
            impact: "High",
            mitigation: "Crop insurance, weather monitoring",
          },
          {
            factor: "Market Price Fluctuation",
            impact: "Medium",
            mitigation: "Contract farming, storage facilities",
          },
          {
            factor: "Pest and Disease",
            impact: "Medium",
            mitigation: "IPM practices, regular monitoring",
          },
        ],
        sustainabilityTips: [
          "Implement crop rotation to maintain soil health",
          "Use organic fertilizers and bio-pesticides",
          "Install drip irrigation for water conservation",
          "Practice intercropping to maximize land use",
          "Maintain farm records for better planning",
        ],
      });
      setLoading(false);
    }, 3000);
  };

  const cropOptions = [
    "Rice",
    "Wheat",
    "Maize",
    "Cotton",
    "Sugarcane",
    "Corn",
    "Soybean",
    "Mustard",
    "Chickpea",
    "Tomato",
    "Onion",
    "Potato",
    "Chili",
  ];

  return (
    <div className="section">
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">AI Crop Planner</h1>
          <p className="page-description">
            Get a comprehensive yearly crop plan with optimal sowing times,
            equipment needs, and profitability analysis
          </p>
        </div>

        <div
          className="grid grid-2"
          style={{ gap: "32px", alignItems: "start" }}
        >
          {/* Input Form */}
          <div className="card">
            <div className="card-header">
              <h3
                style={{
                  margin: 0,
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <Leaf size={20} />
                Farm Planning Details
              </h3>
            </div>
            <div className="card-content">
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
                  placeholder="City, State"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Farm Size (acres)</label>
                <input
                  type="number"
                  name="farmSize"
                  className="form-input"
                  value={formData.farmSize}
                  onChange={handleInputChange}
                  placeholder="e.g., 10"
                />
              </div>

              <div className="form-group">
                <label className="form-label">Soil Type</label>
                <select
                  name="soilType"
                  className="form-select"
                  value={formData.soilType}
                  onChange={handleInputChange}
                >
                  <option value="">Select soil type</option>
                  <option value="clay">Clay</option>
                  <option value="sandy">Sandy</option>
                  <option value="loamy">Loamy</option>
                  <option value="silt">Silt</option>
                  <option value="black">Black Cotton</option>
                  <option value="red">Red Soil</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Droplets size={16} style={{ marginRight: "8px" }} />
                  Irrigation Type
                </label>
                <select
                  name="irrigationType"
                  className="form-select"
                  value={formData.irrigationType}
                  onChange={handleInputChange}
                >
                  <option value="">Select irrigation type</option>
                  <option value="drip">Drip Irrigation</option>
                  <option value="sprinkler">Sprinkler</option>
                  <option value="flood">Flood Irrigation</option>
                  <option value="rainfed">Rain-fed</option>
                  <option value="mixed">Mixed System</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Annual Budget</label>
                <select
                  name="budget"
                  className="form-select"
                  value={formData.budget}
                  onChange={handleInputChange}
                >
                  <option value="">Select budget range</option>
                  <option value="low">₹50,000 - ₹1,00,000</option>
                  <option value="medium">₹1,00,000 - ₹3,00,000</option>
                  <option value="high">₹3,00,000 - ₹5,00,000</option>
                  <option value="premium">Above ₹5,00,000</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Farming Experience</label>
                <select
                  name="experience"
                  className="form-select"
                  value={formData.experience}
                  onChange={handleInputChange}
                >
                  <option value="">Select experience level</option>
                  <option value="beginner">Beginner (0-2 years)</option>
                  <option value="intermediate">
                    Intermediate (3-10 years)
                  </option>
                  <option value="expert">Expert (10+ years)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Preferred Crops (Optional)</label>
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "8px",
                    marginTop: "8px",
                  }}
                >
                  {availableCrops.length > 0
                    ? availableCrops.map((crop) => (
                        <button
                          key={crop.name}
                          type="button"
                          className={`btn ${
                            formData.preferredCrops.includes(crop.name)
                              ? "btn-primary"
                              : "btn-secondary"
                          }`}
                          style={{ padding: "4px 12px", fontSize: "14px" }}
                          onClick={() => handleCropSelection(crop.name)}
                        >
                          {crop.name}
                        </button>
                      ))
                    : cropOptions.map((crop) => (
                        <button
                          key={crop}
                          type="button"
                          className={`btn ${
                            formData.preferredCrops.includes(crop)
                              ? "btn-primary"
                              : "btn-secondary"
                          }`}
                          style={{ padding: "4px 12px", fontSize: "14px" }}
                          onClick={() => handleCropSelection(crop)}
                        >
                          {crop}
                        </button>
                      ))}
                </div>
              </div>

              <button
                className="btn btn-primary"
                onClick={generateCropPlan}
                disabled={loading}
                style={{ width: "100%" }}
              >
                {loading ? "Generating Crop Plan..." : "Generate AI Crop Plan"}
              </button>
            </div>
          </div>

          {/* Crop Plan Results */}
          <div className="card">
            <div className="card-header">
              <h3 style={{ margin: 0 }}>Yearly Crop Plan</h3>
            </div>
            <div className="card-content">
              {!cropPlan && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "40px 20px",
                    color: "#64748b",
                  }}
                >
                  <Calendar
                    size={48}
                    style={{ marginBottom: "16px", opacity: 0.5 }}
                  />
                  <p>
                    Fill in your farm details to get a comprehensive yearly crop
                    planning strategy.
                  </p>
                </div>
              )}

              {loading && (
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                  <div
                    className="spinner"
                    style={{ margin: "0 auto 16px" }}
                  ></div>
                  <p style={{ color: "#64748b" }}>
                    AI is creating your personalized crop plan...
                  </p>
                </div>
              )}

              {cropPlan && (
                <div>
                  {/* Farm Overview */}
                  <div
                    className="card"
                    style={{
                      marginBottom: "24px",
                      padding: "16px",
                      backgroundColor: "#f0fdf4",
                    }}
                  >
                    <h4 style={{ margin: "0 0 12px 0", color: "#059669" }}>
                      Farm Overview
                    </h4>
                    <div
                      className="grid grid-2"
                      style={{ fontSize: "14px", gap: "8px" }}
                    >
                      <div>
                        <strong>Location:</strong> {cropPlan.location}
                      </div>
                      <div>
                        <strong>Farm Size:</strong> {cropPlan.farmSize}
                      </div>
                      <div>
                        <strong>Expected ROI:</strong>{" "}
                        {cropPlan.yearlyProjection.roi}
                      </div>
                      <div>
                        <strong>Net Profit:</strong>{" "}
                        {cropPlan.yearlyProjection.netProfit}
                      </div>
                    </div>
                  </div>

                  {/* Seasonal Plans */}
                  {Object.entries(cropPlan.seasons).map(
                    ([seasonKey, season]) => (
                      <div
                        key={seasonKey}
                        className="card"
                        style={{ marginBottom: "24px", padding: "16px" }}
                      >
                        <h4
                          style={{
                            margin: "0 0 16px 0",
                            color: "#059669",
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                          }}
                        >
                          {seasonKey === "kharif" && <CloudRain size={20} />}
                          {seasonKey === "rabi" && <Sun size={20} />}
                          {seasonKey === "zaid" && <Thermometer size={20} />}
                          {season.name}
                        </h4>

                        {/* Weather Info */}
                        <div
                          style={{
                            backgroundColor: "#f8fafc",
                            padding: "12px",
                            borderRadius: "8px",
                            marginBottom: "16px",
                          }}
                        >
                          <div
                            className="grid grid-3"
                            style={{ fontSize: "14px", gap: "12px" }}
                          >
                            <div>
                              <strong>Temperature:</strong>{" "}
                              {season.weather.temperature}
                            </div>
                            <div>
                              <strong>Rainfall:</strong>{" "}
                              {season.weather.rainfall}
                            </div>
                            <div>
                              <strong>Humidity:</strong>{" "}
                              {season.weather.humidity}
                            </div>
                          </div>
                        </div>

                        {/* Recommended Crops */}
                        {season.recommendedCrops.map((crop, index) => (
                          <div
                            key={index}
                            className="card"
                            style={{
                              marginBottom: "16px",
                              padding: "16px",
                              border: "1px solid #e2e8f0",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "start",
                                marginBottom: "12px",
                              }}
                            >
                              <h5 style={{ margin: 0, fontWeight: "600" }}>
                                {crop.name} ({crop.variety})
                              </h5>
                              <span
                                className={`badge ${
                                  crop.profitability === "High"
                                    ? "badge-success"
                                    : "badge-warning"
                                }`}
                              >
                                {crop.profitability} Profit
                              </span>
                            </div>

                            <div
                              className="grid grid-2"
                              style={{
                                fontSize: "14px",
                                gap: "8px",
                                marginBottom: "12px",
                              }}
                            >
                              <div>
                                <strong>Area:</strong> {crop.area}
                              </div>
                              <div>
                                <strong>Expected Yield:</strong>{" "}
                                {crop.expectedYield}
                              </div>
                              <div>
                                <strong>Sowing:</strong> {crop.sowingDate}
                              </div>
                              <div>
                                <strong>Harvest:</strong> {crop.harvestDate}
                              </div>
                            </div>

                            {crop.timeline && (
                              <div style={{ marginTop: "16px" }}>
                                <h6
                                  style={{
                                    margin: "0 0 8px 0",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                  }}
                                >
                                  Growth Timeline:
                                </h6>
                                {crop.timeline.map((stage, i) => (
                                  <div
                                    key={i}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "8px",
                                      marginBottom: "4px",
                                      fontSize: "13px",
                                    }}
                                  >
                                    <div
                                      style={{
                                        width: "8px",
                                        height: "8px",
                                        backgroundColor: "#059669",
                                        borderRadius: "50%",
                                      }}
                                    ></div>
                                    <strong>{stage.stage}:</strong>{" "}
                                    {stage.period}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )
                  )}

                  {/* Financial Projection */}
                  <div
                    className="card"
                    style={{
                      marginBottom: "24px",
                      padding: "16px",
                      backgroundColor: "#fffbeb",
                    }}
                  >
                    <h4
                      style={{
                        margin: "0 0 16px 0",
                        color: "#d97706",
                        display: "flex",
                        alignItems: "center",
                        gap: "8px",
                      }}
                    >
                      <TrendingUp size={20} />
                      Yearly Financial Projection
                    </h4>
                    <div
                      className="grid grid-2"
                      style={{ fontSize: "16px", gap: "12px" }}
                    >
                      <div>
                        <strong>Total Investment:</strong>{" "}
                        {cropPlan.yearlyProjection.totalInvestment}
                      </div>
                      <div>
                        <strong>Expected Revenue:</strong>{" "}
                        {cropPlan.yearlyProjection.expectedRevenue}
                      </div>
                      <div>
                        <strong>Net Profit:</strong>{" "}
                        <span style={{ color: "#059669" }}>
                          {cropPlan.yearlyProjection.netProfit}
                        </span>
                      </div>
                      <div>
                        <strong>ROI:</strong>{" "}
                        <span style={{ color: "#059669" }}>
                          {cropPlan.yearlyProjection.roi}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Risk Factors */}
                  <div
                    className="card"
                    style={{ marginBottom: "24px", padding: "16px" }}
                  >
                    <h4 style={{ margin: "0 0 16px 0" }}>Risk Assessment</h4>
                    {cropPlan.riskFactors.map((risk, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: "12px",
                          padding: "12px",
                          backgroundColor: "#fef2f2",
                          borderRadius: "8px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "4px",
                          }}
                        >
                          <strong>{risk.factor}</strong>
                          <span
                            className={`badge ${
                              risk.impact === "High"
                                ? "badge-danger"
                                : "badge-warning"
                            }`}
                          >
                            {risk.impact} Impact
                          </span>
                        </div>
                        <div style={{ fontSize: "14px", color: "#64748b" }}>
                          <strong>Mitigation:</strong> {risk.mitigation}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Sustainability Tips */}
                  <div
                    className="card"
                    style={{ padding: "16px", backgroundColor: "#f0fdf4" }}
                  >
                    <h4 style={{ margin: "0 0 16px 0", color: "#059669" }}>
                      Sustainability Recommendations
                    </h4>
                    <ul style={{ margin: 0, paddingLeft: "20px" }}>
                      {cropPlan.sustainabilityTips.map((tip, index) => (
                        <li
                          key={index}
                          style={{ marginBottom: "8px", color: "#374151" }}
                        >
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropPlanner;
