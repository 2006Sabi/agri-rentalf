import React, { useState, useEffect, useRef } from "react";
import {
  Calendar,
  MapPin,
  Thermometer,
  Droplets,
  Sun,
  CloudRain,
  Leaf,
  TrendingUp,
  Brain,
  Clock,
  Package,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  BarChart3,
  Target,
  Zap,
  Shield,
  Lightbulb,
  Download,
  Share2,
  Mic,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import VoiceInput from "../components/VoiceInput";
import VoiceResult from "../components/VoiceResult";
import "./AICropPlanner.css";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const AICropPlanner = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    crop: "",
    region: "",
    soilType: "",
    farmSize: "",
    budget: "",
    experience: "",
    variety: "",
  });
  const [cropPlan, setCropPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [availableCrops, setAvailableCrops] = useState([]);
  const [weatherData, setWeatherData] = useState(null);
  const [sowingPrediction, setSowingPrediction] = useState(null);
  const [activeTab, setActiveTab] = useState("plan");
  const [cropsLoading, setCropsLoading] = useState(true);
  const [pdfGenerating, setPdfGenerating] = useState(false);
  const [voiceResult, setVoiceResult] = useState(null);
  const [showVoiceInput, setShowVoiceInput] = useState(false);

  useEffect(() => {
    fetchAvailableCrops();
  }, []);

  const fetchAvailableCrops = async () => {
    try {
      setCropsLoading(true);
      const response = await fetch("/api/crop-planner/crops");
      const data = await response.json();
      if (data.success) {
        setAvailableCrops(data.data);
      } else {
        console.error("Error fetching crops:", data.message);
        // Fallback to static crops if API fails
        setAvailableCrops(staticCrops);
      }
    } catch (error) {
      console.error("Error fetching crops:", error);
      // Fallback to static crops if API fails
      setAvailableCrops(staticCrops);
    } finally {
      setCropsLoading(false);
    }
  };

  const fetchWeatherData = async (region) => {
    try {
      const response = await fetch(`/api/crop-planner/weather/${region}`);
      const data = await response.json();
      if (data.success) {
        setWeatherData(data.data);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Fetch weather data when region changes
    if (name === "region" && value) {
      fetchWeatherData(value);
    }
  };

  const handleVoiceResult = (result) => {
    setVoiceResult(result);
    setShowVoiceInput(false);
    
    // Parse voice input and update form data
    const translatedText = result.translatedText.toLowerCase();
    
    // Extract crop information
    const cropKeywords = {
      'rice': 'rice',
      'wheat': 'wheat', 
      'maize': 'maize',
      'corn': 'corn',
      'cotton': 'cotton',
      'sugarcane': 'sugarcane',
      'soybean': 'soybean',
      'mustard': 'mustard',
      'chickpea': 'chickpea',
      'tomato': 'tomato',
      'onion': 'onion',
      'potato': 'potato',
      'chili': 'chili'
    };

    // Extract region information
    const regionKeywords = {
      'tamil nadu': 'Tamil Nadu',
      'punjab': 'Punjab',
      'maharashtra': 'Maharashtra',
      'karnataka': 'Karnataka',
      'uttar pradesh': 'Uttar Pradesh',
      'gujarat': 'Gujarat',
      'rajasthan': 'Rajasthan',
      'madhya pradesh': 'Madhya Pradesh'
    };

    // Extract soil type information
    const soilKeywords = {
      'clay': 'clay',
      'sandy': 'sandy',
      'loamy': 'loamy',
      'silt': 'silt',
      'black': 'black',
      'red': 'red'
    };

    // Extract farm size
    const farmSizeMatch = translatedText.match(/(\d+)\s*(acre|acres|hectare|hectares)/i);
    if (farmSizeMatch) {
      const size = parseInt(farmSizeMatch[1]);
      setFormData(prev => ({ ...prev, farmSize: size.toString() }));
    }

    // Extract crop
    for (const [keyword, cropId] of Object.entries(cropKeywords)) {
      if (translatedText.includes(keyword)) {
        setFormData(prev => ({ ...prev, crop: cropId }));
        break;
      }
    }

    // Extract region
    for (const [keyword, region] of Object.entries(regionKeywords)) {
      if (translatedText.includes(keyword)) {
        setFormData(prev => ({ ...prev, region }));
        break;
      }
    }

    // Extract soil type
    for (const [keyword, soilType] of Object.entries(soilKeywords)) {
      if (translatedText.includes(keyword)) {
        setFormData(prev => ({ ...prev, soilType }));
        break;
      }
    }
  };

  const handleUseVoiceText = (text) => {
    // Allow user to manually use the voice text
    setVoiceResult(null);
  };

  const predictSowingTime = async () => {
    if (!formData.crop || !formData.region || !formData.soilType) {
      alert("Please fill in crop, region, and soil type for sowing prediction");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/crop-planner/predict-sowing", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          crop: formData.crop,
          region: formData.region,
          soilType: formData.soilType,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSowingPrediction(data.data);
        setActiveTab("prediction");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error predicting sowing time:", error);
      alert("Error predicting sowing time");
    } finally {
      setLoading(false);
    }
  };

  const generateCropPlan = async () => {
    if (
      !formData.crop ||
      !formData.region ||
      !formData.soilType ||
      !formData.farmSize
    ) {
      alert("Please fill in all required fields");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("/api/crop-planner/generate-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        setCropPlan(data.data);
        setActiveTab("plan");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error generating crop plan:", error);
      alert("Error generating crop plan");
    } finally {
      setLoading(false);
    }
  };

  const getSuitabilityColor = (score) => {
    if (score >= 0.8) return "#059669";
    if (score >= 0.6) return "#d97706";
    return "#dc2626";
  };

  const getSuitabilityIcon = (score) => {
    if (score >= 0.8) return <CheckCircle size={16} />;
    if (score >= 0.6) return <AlertTriangle size={16} />;
    return <XCircle size={16} />;
  };

  const downloadPlanAsPDF = async () => {
    if (!cropPlan) return;

    setPdfGenerating(true);
    try {
      // Create a temporary div for PDF content
      const pdfContent = document.createElement('div');
      pdfContent.style.width = '800px';
      pdfContent.style.padding = '20px';
      pdfContent.style.backgroundColor = 'white';
      pdfContent.style.fontFamily = 'Arial, sans-serif';
      pdfContent.style.fontSize = '12px';
      pdfContent.style.lineHeight = '1.4';

      // Add logo and header
      pdfContent.innerHTML = `
        <div style="text-align: center; margin-bottom: 30px; border-bottom: 2px solid #22c55e; padding-bottom: 20px;">
          <img src="/logo.svg" style="width: 80px; height: 80px; margin-bottom: 10px;" />
          <h1 style="color: #166534; margin: 0; font-size: 24px;">AgriRental</h1>
          <h2 style="color: #22c55e; margin: 10px 0; font-size: 20px;">AI Crop Planning Report</h2>
          <p style="color: #666; margin: 0;">Generated on ${new Date().toLocaleDateString()}</p>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #166534; border-bottom: 1px solid #22c55e; padding-bottom: 5px;">Crop Overview</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Crop</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${cropPlan.crop} - ${cropPlan.variety}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Area Allocation</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${cropPlan.areaAllocation}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Suitability Score</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${(cropPlan.sowingPrediction.suitabilityScore * 100).toFixed(1)}%</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Optimal Sowing Date</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${cropPlan.sowingPrediction.optimalSowingDate}</td>
            </tr>
          </table>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #166534; border-bottom: 1px solid #22c55e; padding-bottom: 5px;">Input Requirements</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Seeds</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${cropPlan.inputs.seeds}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Basal Fertilizer</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${cropPlan.inputs.fertilizers.basal}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Top Dress</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${cropPlan.inputs.fertilizers.topDress}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Micronutrients</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${cropPlan.inputs.fertilizers.micronutrients}</td>
            </tr>
          </table>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #166534; border-bottom: 1px solid #22c55e; padding-bottom: 5px;">Equipment Needs</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            ${cropPlan.equipment.map(equipment => `<li style="margin-bottom: 5px;">${equipment}</li>`).join('')}
          </ul>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #166534; border-bottom: 1px solid #22c55e; padding-bottom: 5px;">Financial Projection</h3>
          <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Total Investment</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${cropPlan.financialProjection.totalInvestment}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Expected Revenue</td>
              <td style="padding: 8px; border: 1px solid #ddd;">${cropPlan.financialProjection.expectedRevenue}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">Net Profit</td>
              <td style="padding: 8px; border: 1px solid #ddd; color: #059669;">${cropPlan.financialProjection.netProfit}</td>
            </tr>
            <tr>
              <td style="padding: 8px; border: 1px solid #ddd; font-weight: bold; background-color: #f9f9f9;">ROI</td>
              <td style="padding: 8px; border: 1px solid #ddd; color: #059669;">${cropPlan.financialProjection.roi}</td>
            </tr>
          </table>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #166534; border-bottom: 1px solid #22c55e; padding-bottom: 5px;">Risk Assessment</h3>
          ${cropPlan.riskAssessment.map(risk => `
            <div style="margin-bottom: 15px; padding: 10px; border: 1px solid #ddd; border-radius: 5px;">
              <div style="font-weight: bold; margin-bottom: 5px;">${risk.factor}</div>
              <div style="color: #666; margin-bottom: 5px;">Impact: ${risk.impact}</div>
              <div><strong>Mitigation:</strong> ${risk.mitigation}</div>
            </div>
          `).join('')}
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="color: #166534; border-bottom: 1px solid #22c55e; padding-bottom: 5px;">AI Recommendations</h3>
          <ul style="margin: 10px 0; padding-left: 20px;">
            ${cropPlan.recommendations.map(rec => `<li style="margin-bottom: 5px;">${rec}</li>`).join('')}
          </ul>
        </div>

        <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 2px solid #22c55e; color: #666;">
          <p>This report was generated by AgriRental's AI Crop Planning System</p>
          <p>For more information, visit our platform</p>
        </div>
      `;

      // Append to body temporarily
      document.body.appendChild(pdfContent);

      // Convert to canvas
      const canvas = await html2canvas(pdfContent, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Remove temporary element
      document.body.removeChild(pdfContent);

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download PDF
      const fileName = `crop-plan-${cropPlan.crop.toLowerCase()}-${new Date().toISOString().split('T')[0]}.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setPdfGenerating(false);
    }
  };

  // Static crops as fallback
  const staticCrops = [
    { id: "rice", name: "Rice" },
    { id: "wheat", name: "Wheat" },
    { id: "maize", name: "Maize" },
    { id: "cotton", name: "Cotton" },
    { id: "sugarcane", name: "Sugarcane" },
    { id: "corn", name: "Corn" },
    { id: "soybean", name: "Soybean" },
    { id: "mustard", name: "Mustard" },
    { id: "chickpea", name: "Chickpea" },
    { id: "tomato", name: "Tomato" },
    { id: "onion", name: "Onion" },
    { id: "potato", name: "Potato" },
    { id: "chili", name: "Chili" },
  ];

  const regions = [
    "Tamil Nadu",
    "Punjab",
    "Maharashtra",
    "Karnataka",
    "Uttar Pradesh",
    "Gujarat",
    "Rajasthan",
    "Madhya Pradesh",
  ];

  const soilTypes = ["clay", "sandy", "loamy", "silt", "black", "red"];

  const budgetRanges = [
    { value: "low", label: "₹50,000 - ₹1,00,000" },
    { value: "medium", label: "₹1,00,000 - ₹3,00,000" },
    { value: "high", label: "₹3,00,000 - ₹5,00,000" },
    { value: "premium", label: "Above ₹5,00,000" },
  ];

  const experienceLevels = [
    { value: "beginner", label: "Beginner (0-2 years)" },
    { value: "intermediate", label: "Intermediate (3-10 years)" },
    { value: "expert", label: "Expert (10+ years)" },
  ];

  return (
    <div className="section">
      <div className="container">
        {/* Enhanced Header */}
        <div className="ai-crop-planner-header">
          <div className="ai-crop-planner-icon">
            <Brain size={32} />
          </div>
          <h1 className="ai-crop-planner-title">AI Crop Planner</h1>
          <p className="ai-crop-planner-subtitle">
            Get ML-powered recommendations for optimal sowing time, tools, and
            fertilizers based on your crop, region, and soil conditions
          </p>
          <div className="ai-crop-planner-features">
            <div className="ai-crop-planner-feature">
              <Target size={16} />
              <span>Optimal Sowing Time</span>
            </div>
            <div className="ai-crop-planner-feature">
              <Package size={16} />
              <span>Tool Recommendations</span>
            </div>
            <div className="ai-crop-planner-feature">
              <Leaf size={16} />
              <span>Fertilizer Planning</span>
            </div>
          </div>
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
                <Brain size={20} />
                AI Planning Parameters
              </h3>
            </div>
            <div className="card-content">
              {/* Voice Input Section */}
              <div className="voice-input-section">
                <div className="voice-input-header">
                  <h4 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Mic size={16} />
                    Voice Input (Multilingual)
                  </h4>
                  <button
                    className="btn btn-outline"
                    onClick={() => setShowVoiceInput(!showVoiceInput)}
                    style={{ fontSize: '0.875rem', padding: '0.5rem 1rem' }}
                  >
                    {showVoiceInput ? 'Hide Voice Input' : 'Show Voice Input'}
                  </button>
                </div>
                
                {showVoiceInput && (
                  <div className="voice-input-wrapper">
                    <VoiceInput 
                      onVoiceResult={handleVoiceResult}
                      placeholder="Speak your crop planning requirements..."
                    />
                  </div>
                )}

                {voiceResult && (
                  <div className="voice-result-wrapper">
                    <VoiceResult 
                      result={voiceResult}
                      onUseTranslation={handleUseVoiceText}
                      onUseOriginal={handleUseVoiceText}
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label className="form-label">
                  <Leaf size={16} style={{ marginRight: "8px" }} />
                  Select Crop *
                </label>
                <select
                  name="crop"
                  className="form-select"
                  value={formData.crop}
                  onChange={handleInputChange}
                  disabled={cropsLoading}
                >
                  <option value="">
                    {cropsLoading ? "Loading crops..." : "Choose a crop"}
                  </option>
                  {availableCrops.map((crop) => (
                    <option key={crop.id} value={crop.id}>
                      {crop.name}{" "}
                      {crop.varieties && `(${crop.varieties.length} varieties)`}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">
                  <MapPin size={16} style={{ marginRight: "8px" }} />
                  Region *
                </label>
                <select
                  name="region"
                  className="form-select"
                  value={formData.region}
                  onChange={handleInputChange}
                >
                  <option value="">Select your region</option>
                  {regions.map((region) => (
                    <option key={region} value={region}>
                      {region}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Soil Type *</label>
                <select
                  name="soilType"
                  className="form-select"
                  value={formData.soilType}
                  onChange={handleInputChange}
                >
                  <option value="">Select soil type</option>
                  {soilTypes.map((soil) => (
                    <option key={soil} value={soil}>
                      {soil.charAt(0).toUpperCase() + soil.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Farm Size (acres) *</label>
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
                <label className="form-label">Budget Range</label>
                <select
                  name="budget"
                  className="form-select"
                  value={formData.budget}
                  onChange={handleInputChange}
                >
                  <option value="">Select budget range</option>
                  {budgetRanges.map((budget) => (
                    <option key={budget.value} value={budget.value}>
                      {budget.label}
                    </option>
                  ))}
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
                  {experienceLevels.map((exp) => (
                    <option key={exp.value} value={exp.value}>
                      {exp.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="ai-crop-planner-actions">
                <button
                  className="btn btn-secondary"
                  onClick={predictSowingTime}
                  disabled={
                    loading ||
                    !formData.crop ||
                    !formData.region ||
                    !formData.soilType
                  }
                >
                  <Clock size={16} />
                  Predict Sowing Time
                </button>
                <button
                  className="btn btn-primary"
                  onClick={generateCropPlan}
                  disabled={
                    loading ||
                    !formData.crop ||
                    !formData.region ||
                    !formData.soilType ||
                    !formData.farmSize
                  }
                >
                  <Brain size={16} />
                  Generate AI Plan
                </button>
              </div>
            </div>
          </div>

          {/* Results Section */}
          <div className="card">
            <div className="card-header">
              <div className="ai-crop-planner-tabs">
                <button
                  className={`ai-crop-planner-tab ${
                    activeTab === "plan" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("plan")}
                >
                  <BarChart3 size={16} />
                  Crop Plan
                </button>
                <button
                  className={`ai-crop-planner-tab ${
                    activeTab === "prediction" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("prediction")}
                >
                  <Target size={16} />
                  Sowing Prediction
                </button>
              </div>
            </div>
            <div className="card-content">
              {loading && (
                <div className="ai-crop-planner-loading">
                  <div className="spinner"></div>
                  <p>AI is analyzing your parameters...</p>
                </div>
              )}

              {!loading && !cropPlan && !sowingPrediction && (
                <div className="ai-crop-planner-empty">
                  <Brain size={48} />
                  <h3>Ready for AI Analysis</h3>
                  <p>
                    Fill in your farm details to get ML-powered crop planning
                    recommendations.
                  </p>
                </div>
              )}

              {/* Sowing Time Prediction */}
              {!loading && sowingPrediction && activeTab === "prediction" && (
                <div className="ai-crop-planner-prediction">
                  <div className="prediction-header">
                    <h3>Sowing Time Prediction</h3>
                    <div className="prediction-score">
                      <span>Suitability Score:</span>
                      <div
                        className="prediction-score-value"
                        style={{
                          color: getSuitabilityColor(
                            sowingPrediction.suitabilityScore
                          ),
                        }}
                      >
                        {(sowingPrediction.suitabilityScore * 100).toFixed(1)}%
                      </div>
                    </div>
                  </div>

                  <div className="prediction-details">
                    <div className="prediction-item">
                      <strong>Optimal Sowing Date:</strong>
                      <span className="prediction-date">
                        {sowingPrediction.optimalSowingDate}
                      </span>
                    </div>
                    <div className="prediction-item">
                      <strong>Season:</strong>
                      <span className="prediction-season">
                        {sowingPrediction.season}
                      </span>
                    </div>
                  </div>

                  <div className="climate-analysis">
                    <h4>Climate Analysis</h4>
                    <div className="climate-grid">
                      {Object.entries(sowingPrediction.climateAnalysis).map(
                        ([factor, data]) => (
                          <div key={factor} className="climate-factor">
                            <div className="climate-factor-header">
                              <span className="climate-factor-name">
                                {factor.charAt(0).toUpperCase() +
                                  factor.slice(1)}
                              </span>
                              {getSuitabilityIcon(data.score)}
                            </div>
                            <div className="climate-factor-status">
                              {data.status}
                            </div>
                            <div className="climate-factor-score">
                              Score: {(data.score * 100).toFixed(1)}%
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Comprehensive Crop Plan */}
              {!loading && cropPlan && activeTab === "plan" && (
                <div className="ai-crop-planner-results">
                  {/* Crop Overview */}
                  <div className="crop-overview">
                    <div className="crop-overview-header">
                      <h3>
                        {cropPlan.crop} - {cropPlan.variety}
                      </h3>
                      <div className="crop-overview-score">
                        <span>Suitability:</span>
                        <div
                          className="crop-overview-score-value"
                          style={{
                            color: getSuitabilityColor(
                              cropPlan.sowingPrediction.suitabilityScore
                            ),
                          }}
                        >
                          {(
                            cropPlan.sowingPrediction.suitabilityScore * 100
                          ).toFixed(1)}
                          %
                        </div>
                      </div>
                    </div>
                    <div className="crop-overview-details">
                      <div className="crop-overview-item">
                        <strong>Area Allocation:</strong>{" "}
                        {cropPlan.areaAllocation}
                      </div>
                      <div className="crop-overview-item">
                        <strong>Optimal Sowing:</strong>{" "}
                        {cropPlan.sowingPrediction.optimalSowingDate}
                      </div>
                    </div>
                  </div>

                  {/* Input Requirements */}
                  <div className="input-requirements">
                    <h4>
                      <Package size={16} />
                      Input Requirements
                    </h4>
                    <div className="input-grid">
                      <div className="input-item">
                        <strong>Seeds:</strong> {cropPlan.inputs.seeds}
                      </div>
                      <div className="input-item">
                        <strong>Fertilizers:</strong>
                        <div className="fertilizer-details">
                          <div>Basal: {cropPlan.inputs.fertilizers.basal}</div>
                          <div>
                            Top Dress: {cropPlan.inputs.fertilizers.topDress}
                          </div>
                          <div>
                            Micronutrients:{" "}
                            {cropPlan.inputs.fertilizers.micronutrients}
                          </div>
                        </div>
                      </div>
                      <div className="input-item">
                        <strong>Pest Management:</strong>
                        <div className="pest-management">
                          {cropPlan.inputs.pesticides.map((method, index) => (
                            <span key={index} className="pest-method">
                              {method}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Equipment Needs */}
                  <div className="equipment-needs">
                    <h4>
                      <Zap size={16} />
                      Recommended Equipment
                    </h4>
                    <div className="equipment-grid">
                      {cropPlan.equipment.map((equipment, index) => (
                        <div key={index} className="equipment-item">
                          {equipment}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="crop-timeline">
                    <h4>
                      <Clock size={16} />
                      Growth Timeline
                    </h4>
                    <div className="timeline">
                      {cropPlan.timeline.map((stage, index) => (
                        <div key={index} className="timeline-stage">
                          <div className="timeline-stage-header">
                            <div className="timeline-stage-dot"></div>
                            <strong>{stage.stage}</strong>
                            <span className="timeline-duration">
                              {stage.duration}
                            </span>
                          </div>
                          <div className="timeline-activities">
                            {stage.activities.map((activity, actIndex) => (
                              <span
                                key={actIndex}
                                className="timeline-activity"
                              >
                                {activity}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Financial Projection */}
                  <div className="financial-projection">
                    <h4>
                      <TrendingUp size={16} />
                      Financial Projection
                    </h4>
                    <div className="financial-grid">
                      <div className="financial-item">
                        <strong>Total Investment:</strong>{" "}
                        {cropPlan.financialProjection.totalInvestment}
                      </div>
                      <div className="financial-item">
                        <strong>Expected Revenue:</strong>{" "}
                        {cropPlan.financialProjection.expectedRevenue}
                      </div>
                      <div className="financial-item profit">
                        <strong>Net Profit:</strong>{" "}
                        {cropPlan.financialProjection.netProfit}
                      </div>
                      <div className="financial-item roi">
                        <strong>ROI:</strong> {cropPlan.financialProjection.roi}
                      </div>
                    </div>
                  </div>

                  {/* Risk Assessment */}
                  <div className="risk-assessment">
                    <h4>
                      <AlertTriangle size={16} />
                      Risk Assessment
                    </h4>
                    <div className="risk-grid">
                      {cropPlan.riskAssessment.map((risk, index) => (
                        <div key={index} className="risk-item">
                          <div className="risk-header">
                            <strong>{risk.factor}</strong>
                            <span
                              className={`risk-impact ${risk.impact.toLowerCase()}`}
                            >
                              {risk.impact} Impact
                            </span>
                          </div>
                          <div className="risk-mitigation">
                            <strong>Mitigation:</strong> {risk.mitigation}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div className="recommendations">
                    <h4>
                      <Lightbulb size={16} />
                      AI Recommendations
                    </h4>
                    <ul className="recommendations-list">
                      {cropPlan.recommendations.map((recommendation, index) => (
                        <li key={index}>{recommendation}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Buttons */}
                  <div className="crop-plan-actions">
                    <button 
                      className="btn btn-secondary"
                      onClick={downloadPlanAsPDF}
                      disabled={pdfGenerating}
                    >
                      {pdfGenerating ? (
                        <>
                          <div className="spinner" style={{ width: '16px', height: '16px', marginRight: '8px' }}></div>
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <Download size={16} />
                          Download Plan
                        </>
                      )}
                    </button>
                    <button className="btn btn-primary">
                      <Share2 size={16} />
                      Share Plan
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Weather Information */}
        {weatherData && (
          <div className="card weather-info">
            <div className="card-header">
              <h3>
                <Thermometer size={20} />
                Weather Information - {formData.region}
              </h3>
            </div>
            <div className="card-content">
              <div className="weather-grid">
                <div className="weather-item">
                  <strong>Annual Temperature:</strong>{" "}
                  {weatherData.temperature.annual}°C
                </div>
                <div className="weather-item">
                  <strong>Annual Rainfall:</strong>{" "}
                  {weatherData.rainfall.annual}mm
                </div>
                <div className="weather-item">
                  <strong>Annual Humidity:</strong>{" "}
                  {weatherData.humidity.annual}%
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AICropPlanner;
