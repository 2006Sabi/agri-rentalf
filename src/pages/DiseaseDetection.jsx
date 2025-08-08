import React, { useState, useRef } from "react";
import {
  Upload,
  Camera,
  AlertTriangle,
  CheckCircle,
  Info,
  Download,
  Share2,
  RotateCcw,
  Leaf,
  Scan,
  Droplets,
  Zap,
  History,
  Save,
  Eye,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "./DiseaseDetection.css";

const DiseaseDetection = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [showAllPredictions, setShowAllPredictions] = useState(false);
  const [scanMode, setScanMode] = useState(false);
  const [predictionHistory, setPredictionHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);
  const [notes, setNotes] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const fileInputRef = useRef(null);
  const { token } = useAuth();

  const handleFileSelect = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedImage(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setPrediction(null);
    } else {
      setError("Please select a valid image file.");
    }
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const startScan = () => {
    setScanMode(true);
    // In a real implementation, this would access the device camera
    // For now, we'll simulate by opening file picker
    fileInputRef.current?.click();
  };

  const analyzeImage = async () => {
    if (!selectedImage) {
      setError("Please select an image first.");
      return;
    }

    setIsAnalyzing(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedImage);

      const response = await fetch("/api/disease-detection/predict", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        setPrediction(data.prediction);
        // Store additional notes and public setting if provided
        if (notes || isPublic) {
          await updatePrediction(data.prediction.predictionId, notes, isPublic);
        }
      } else {
        setError(data.message || "Error analyzing image");
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      setError("Failed to analyze image. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const updatePrediction = async (predictionId, notes, isPublic) => {
    try {
      const response = await fetch(`/api/predictions/${predictionId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          notes,
          isPublic,
        }),
      });

      if (!response.ok) {
        console.error("Failed to update prediction with notes");
      }
    } catch (error) {
      console.error("Error updating prediction:", error);
    }
  };

  const fetchPredictionHistory = async () => {
    try {
      const response = await fetch("/api/predictions", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (data.success) {
        setPredictionHistory(data.predictions);
      }
    } catch (error) {
      console.error("Error fetching prediction history:", error);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setPrediction(null);
    setError(null);
    setScanMode(false);
    setNotes("");
    setIsPublic(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return "#ef4444";
      case "moderate":
        return "#f59e0b";
      case "low":
        return "#10b981";
      default:
        return "#6b7280";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity?.toLowerCase()) {
      case "high":
        return <AlertTriangle size={20} color="#ef4444" />;
      case "moderate":
        return <AlertTriangle size={20} color="#f59e0b" />;
      case "low":
        return <Info size={20} color="#10b981" />;
      default:
        return <CheckCircle size={20} color="#10b981" />;
    }
  };

  const getFertilizerRecommendation = (diseaseName) => {
    const recommendations = {
      leaf_blight: {
        name: "NPK 20-20-20 + Copper Fungicide",
        description:
          "Balanced fertilizer with copper-based fungicide to control leaf blight",
        application: "Apply every 2 weeks during growing season",
        dosage: "2-3 kg per acre",
      },
      rust: {
        name: "NPK 15-15-15 + Sulfur-based Fungicide",
        description: "Sulfur-based treatment effective against rust diseases",
        application: "Apply at first sign of rust, repeat every 10-14 days",
        dosage: "1.5-2 kg per acre",
      },
      powdery_mildew: {
        name: "NPK 10-10-10 + Potassium Bicarbonate",
        description:
          "Potassium bicarbonate provides natural protection against powdery mildew",
        application: "Apply weekly during humid conditions",
        dosage: "2-2.5 kg per acre",
      },
      default: {
        name: "NPK 15-15-15 Balanced Fertilizer",
        description:
          "General purpose balanced fertilizer for healthy plant growth",
        application: "Apply monthly during growing season",
        dosage: "2-3 kg per acre",
      },
    };

    return (
      recommendations[diseaseName?.toLowerCase()] || recommendations.default
    );
  };

  return (
    <div className="disease-detection-page">
      <div className="container">
        <div className="page-header">
          <h1>AI Crop Disease Detection</h1>
          <p>
            Scan or upload a photo of your crop to detect diseases and get
            treatment recommendations
          </p>
          <div className="header-actions">
            <button
              className="btn btn-outline"
              onClick={() => {
                setShowHistory(!showHistory);
                if (!showHistory) {
                  fetchPredictionHistory();
                }
              }}
            >
              <History size={16} />
              {showHistory ? "Hide History" : "View History"}
            </button>
          </div>
        </div>

        {showHistory && (
          <div className="history-section">
            <h3>Prediction History</h3>
            <div className="history-grid">
              {predictionHistory.map((pred) => (
                <div key={pred._id} className="history-card">
                  <div className="history-header">
                    <h4>{pred.prediction.diseaseName}</h4>
                    <span
                      className="severity-badge"
                      style={{
                        backgroundColor: getSeverityColor(
                          pred.prediction.severity
                        ),
                      }}
                    >
                      {pred.prediction.severity}
                    </span>
                  </div>
                  <p>Confidence: {pred.prediction.confidence}%</p>
                  <p>Date: {new Date(pred.createdAt).toLocaleDateString()}</p>
                  <div className="history-actions">
                    <button className="btn btn-sm btn-outline">
                      <Eye size={14} />
                      View
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="detection-grid">
          {/* Image Upload Section */}
          <div className="upload-section">
            <div className="upload-card">
              <h3>Scan or Upload Crop Image</h3>

              {!previewUrl ? (
                <div className="upload-options">
                  <div
                    className={`upload-area ${dragActive ? "drag-active" : ""}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload size={48} />
                    <h4>Click to upload or drag and drop</h4>
                    <p>Supports JPG, PNG, GIF up to 10MB</p>
                    <button className="btn btn-primary">
                      <Upload size={16} />
                      Choose Image
                    </button>
                  </div>

                  <div className="scan-option">
                    <div className="scan-card" onClick={startScan}>
                      <Scan size={48} />
                      <h4>Scan with Camera</h4>
                      <p>Use your device camera for instant scanning</p>
                      <button className="btn btn-secondary">
                        <Camera size={16} />
                        Start Scan
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="image-preview">
                  <img src={previewUrl} alt="Preview" />
                  <div className="image-actions">
                    <button
                      className="btn btn-outline"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Upload size={16} />
                      Change Image
                    </button>
                    <button className="btn btn-outline" onClick={resetAnalysis}>
                      <RotateCcw size={16} />
                      Reset
                    </button>
                  </div>
                </div>
              )}

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileInput}
                style={{ display: "none" }}
              />

              {error && (
                <div className="error-message">
                  <AlertTriangle size={16} />
                  {error}
                </div>
              )}

              {previewUrl && (
                <button
                  className="btn btn-primary analyze-btn"
                  onClick={analyzeImage}
                  disabled={isAnalyzing}
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Image"}
                </button>
              )}
            </div>
          </div>

          {/* Results Section */}
          <div className="results-section">
            {prediction ? (
              <div className="results-card">
                <div className="result-header">
                  <h3>Analysis Results</h3>
                  <div className="confidence-badge">
                    {prediction.confidence}% Confidence
                  </div>
                </div>

                <div className="disease-info">
                  <div className="disease-header">
                    {getSeverityIcon(prediction.severity)}
                    <div>
                      <h4>{prediction.diseaseName}</h4>
                      <span
                        className="severity-badge"
                        style={{
                          backgroundColor: getSeverityColor(
                            prediction.severity
                          ),
                        }}
                      >
                        {prediction.severity} Severity
                      </span>
                    </div>
                  </div>

                  <p className="disease-description">
                    {prediction.description}
                  </p>

                  <div className="treatment-section">
                    <h5>Treatment Recommendations</h5>
                    <p>{prediction.treatment}</p>
                  </div>

                  {/* Fertilizer Recommendation */}
                  <div className="fertilizer-section">
                    <h5>
                      <Droplets size={16} />
                      Recommended Fertilizer
                    </h5>
                    {(() => {
                      const fertilizer = getFertilizerRecommendation(
                        prediction.diseaseName
                      );
                      return (
                        <div className="fertilizer-card">
                          <div className="fertilizer-header">
                            <h6>{fertilizer.name}</h6>
                            <span className="fertilizer-badge">
                              <Zap size={12} />
                              Recommended
                            </span>
                          </div>
                          <p className="fertilizer-description">
                            {fertilizer.description}
                          </p>
                          <div className="fertilizer-details">
                            <div className="fertilizer-detail">
                              <strong>Application:</strong>{" "}
                              {fertilizer.application}
                            </div>
                            <div className="fertilizer-detail">
                              <strong>Dosage:</strong> {fertilizer.dosage}
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  <div className="prevention-section">
                    <h5>Prevention Tips</h5>
                    <ul>
                      {prediction.prevention.map((tip, index) => (
                        <li key={index}>{tip}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Notes and Public Settings */}
                  <div className="notes-section">
                    <h5>Additional Notes</h5>
                    <textarea
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any additional notes about this prediction..."
                      className="notes-textarea"
                    />
                    <div className="public-setting">
                      <label>
                        <input
                          type="checkbox"
                          checked={isPublic}
                          onChange={(e) => setIsPublic(e.target.checked)}
                        />
                        Make this prediction public (share with community)
                      </label>
                    </div>
                  </div>

                  <button
                    className="btn btn-outline"
                    onClick={() => setShowAllPredictions(!showAllPredictions)}
                  >
                    {showAllPredictions ? "Hide" : "Show"} All Predictions
                  </button>

                  {showAllPredictions && (
                    <div className="all-predictions">
                      <h5>All Disease Predictions</h5>
                      <div className="predictions-list">
                        {prediction.allPredictions.map((pred, index) => (
                          <div key={index} className="prediction-item">
                            <span className="disease-name">
                              {pred.disease
                                .replace(/_/g, " ")
                                .replace(/\b\w/g, (l) => l.toUpperCase())}
                            </span>
                            <span className="prediction-confidence">
                              {pred.confidence}%
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="result-actions">
                    <button className="btn btn-outline">
                      <Download size={16} />
                      Download Report
                    </button>
                    <button className="btn btn-outline">
                      <Share2 size={16} />
                      Share Results
                    </button>
                    <button className="btn btn-primary">
                      <Save size={16} />
                      Save to History
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="results-placeholder">
                <div className="placeholder-content">
                  <Camera size={64} />
                  <h4>No Analysis Yet</h4>
                  <p>
                    Scan or upload an image and click "Analyze Image" to get
                    started
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className="tips-section">
          <h3>Tips for Better Results</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <h4>Good Lighting</h4>
              <p>Take photos in natural daylight for clearer images</p>
            </div>
            <div className="tip-card">
              <h4>Close-up Shots</h4>
              <p>Focus on the affected area while keeping the image clear</p>
            </div>
            <div className="tip-card">
              <h4>Multiple Angles</h4>
              <p>Take photos from different angles for better analysis</p>
            </div>
            <div className="tip-card">
              <h4>Clean Images</h4>
              <p>Avoid shadows, reflections, and blurry shots</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiseaseDetection;
