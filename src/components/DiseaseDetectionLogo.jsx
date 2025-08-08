import React, { useState, useRef } from "react";
import { Leaf, Camera, X } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import "./DiseaseDetectionLogo.css";

const DiseaseDetectionLogo = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

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

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  const startScan = () => {
    setIsScanning(true);
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

      const data = await response.json();

      if (data.success) {
        setPrediction(data.prediction);
        // Store the prediction in the backend
        await storePrediction(data.prediction);
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

  const storePrediction = async (predictionData) => {
    try {
      const formData = new FormData();
      formData.append("image", selectedImage);
      formData.append("diseaseName", predictionData.diseaseName);
      formData.append("confidence", predictionData.confidence);
      formData.append("severity", predictionData.severity);
      formData.append("description", predictionData.description);
      formData.append("treatment", predictionData.treatment);
      formData.append("prevention", JSON.stringify(predictionData.prevention));
      formData.append(
        "allPredictions",
        JSON.stringify(predictionData.allPredictions)
      );
      formData.append(
        "fertilizer",
        JSON.stringify(predictionData.fertilizer || {})
      );
      formData.append("notes", "");
      formData.append("isPublic", "false");

      const response = await fetch("/api/predictions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();
      if (data.success) {
        console.log("Prediction stored successfully:", data.prediction.id);
      }
    } catch (error) {
      console.error("Error storing prediction:", error);
    }
  };

  const resetAnalysis = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setPrediction(null);
    setError(null);
    setIsScanning(false);
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

  if (!isOpen) {
    return (
      <div className="disease-detection-logo">
        <button
          className="logo-container"
          onClick={() => setIsOpen(true)}
          title="AI Disease Detection"
        >
          <Leaf size={24} />
          <span>Disease Detection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="disease-detection-container">
      <div className="disease-detection-header">
        <div>
          <h3 style={{ margin: 0, fontSize: "16px" }}>AI Disease Detection</h3>
          <p style={{ margin: 0, fontSize: "12px", opacity: 0.8 }}>
            Scan or upload plant images for disease detection
          </p>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          style={{
            background: "none",
            border: "none",
            color: "white",
            cursor: "pointer",
            padding: "4px",
          }}
        >
          <X size={20} />
        </button>
      </div>

      <div className="disease-detection-content">
        {!previewUrl ? (
          <div className="scan-upload-options">
            <div className="scan-option" onClick={startScan}>
              <Camera size={32} />
              <h4>Scan with Camera</h4>
              <p>Use your device camera for instant scanning</p>
              <button className="btn btn-secondary">
                <Camera size={16} />
                Start Scan
              </button>
            </div>

            <div
              className="upload-option"
              onClick={() => fileInputRef.current?.click()}
            >
              <Leaf size={32} />
              <h4>Upload Image</h4>
              <p>Choose an image from your device</p>
              <button className="btn btn-outline">Choose File</button>
            </div>
          </div>
        ) : (
          <div className="image-preview-section">
            <img src={previewUrl} alt="Preview" className="preview-image" />
            <div className="image-actions">
              <button
                className="btn btn-outline"
                onClick={() => fileInputRef.current?.click()}
              >
                Change Image
              </button>
              <button className="btn btn-outline" onClick={resetAnalysis}>
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
            <span>{error}</span>
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

        {prediction && (
          <div className="prediction-results">
            <div className="result-header">
              <h4>{prediction.diseaseName}</h4>
              <span
                className="severity-badge"
                style={{
                  backgroundColor: getSeverityColor(prediction.severity),
                }}
              >
                {prediction.severity} Severity
              </span>
            </div>

            <p className="disease-description">{prediction.description}</p>

            <div className="treatment-section">
              <h5>Treatment</h5>
              <p>{prediction.treatment}</p>
            </div>

            <div className="fertilizer-section">
              <h5>Recommended Fertilizer</h5>
              {(() => {
                const fertilizer = getFertilizerRecommendation(
                  prediction.diseaseName
                );
                return (
                  <div className="fertilizer-card">
                    <h6>{fertilizer.name}</h6>
                    <p>{fertilizer.description}</p>
                    <div className="fertilizer-details">
                      <div>
                        <strong>Application:</strong> {fertilizer.application}
                      </div>
                      <div>
                        <strong>Dosage:</strong> {fertilizer.dosage}
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiseaseDetectionLogo;
