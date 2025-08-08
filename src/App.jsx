import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatBot from "./components/ChatBot";
import DiseaseDetectionLogo from "./components/DiseaseDetectionLogo";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Equipment from "./pages/Equipment";
import Products from "./pages/Products";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";

import CropPlanner from "./pages/CropPlanner";
import AICropPlanner from "./pages/AICropPlanner";
import DiseaseDetection from "./pages/DiseaseDetection";
import KnowledgeHub from "./pages/KnowledgeHub";
import EquipmentForm from "./pages/EquipmentForm";
import CropMarketplace from "./pages/CropMarketplace";
import SellCrop from "./pages/SellCrop";
import MyCrops from "./pages/MyCrops";
import CropDetail from "./pages/CropDetail";
import MyOrders from "./pages/MyOrders";
import Forum from "./pages/Forum";
import ForumPost from "./pages/ForumPost";
import NewForumPost from "./pages/NewForumPost";

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/equipment" element={<Equipment />} />
          <Route path="/add-equipment" element={<EquipmentForm />} />
          <Route path="/products" element={<Products />} />
          <Route path="/knowledge-hub" element={<KnowledgeHub />} />
          <Route path="/crop-marketplace" element={<CropMarketplace />} />
          <Route path="/crop/:id" element={<CropDetail />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/post/:id" element={<ForumPost />} />
          <Route path="/forum/new" element={<NewForumPost />} />

          <Route
            path="/admin"
            element={
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />

          <Route
            path="/crop-planner"
            element={
              <ProtectedRoute>
                <CropPlanner />
              </ProtectedRoute>
            }
          />

          <Route
            path="/ai-crop-planner"
            element={
              <ProtectedRoute>
                <AICropPlanner />
              </ProtectedRoute>
            }
          />

          <Route
            path="/disease-detection"
            element={
              <ProtectedRoute>
                <DiseaseDetection />
              </ProtectedRoute>
            }
          />

          <Route
            path="/sell-crop"
            element={
              <ProtectedRoute>
                <SellCrop />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-crops"
            element={
              <ProtectedRoute>
                <MyCrops />
              </ProtectedRoute>
            }
          />

          <Route
            path="/my-orders"
            element={
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      <Footer />
      <ChatBot />
      <DiseaseDetectionLogo />
    </div>
  );
}

export default App;
