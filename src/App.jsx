import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyEmail from "./pages/VerifyEmail";
import ResendVerification from "./pages/ResendVerification";
import Equipment from "./pages/Equipment";
import Products from "./pages/Products";
import AdminDashboard from "./pages/AdminDashboard";
import Profile from "./pages/Profile";
import Bookings from "./pages/Bookings";
import LandingPage from "./pages/LandingPage";

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
      <Routes>
        {/* Public routes */}
        <Route path="/" element={
          <>
            <main>
              <LandingPage />
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        
        {/* Auth routes - redirect to home if already authenticated */}
        <Route path="/login" element={
          user ? <Navigate to="/home" replace /> : <Login />
        } />
        <Route path="/register" element={
          user ? <Navigate to="/home" replace /> : <Register />
        } />
        <Route path="/forgot-password" element={
          user ? <Navigate to="/home" replace /> : <ForgotPassword />
        } />
        <Route path="/reset-password" element={
          user ? <Navigate to="/home" replace /> : <ResetPassword />
        } />
        <Route path="/verify-email" element={
          user ? <Navigate to="/home" replace /> : <VerifyEmail />
        } />
        <Route path="/resend-verification" element={
          user ? <Navigate to="/home" replace /> : <ResendVerification />
        } />

        {/* Application routes with header */}
        <Route path="/home" element={
          <>
            <Header />
            <main>
              <Home />
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/equipment" element={
          <>
            <Header />
            <main>
              <Equipment />
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/add-equipment" element={
          <>
            <Header />
            <main>
              <EquipmentForm />
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/products" element={
          <>
            <Header />
            <main>
              <Products />
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/knowledge-hub" element={
          <>
            <Header />
            <main>
              <KnowledgeHub />
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/crop-marketplace" element={
          <>
            <Header />
            <main>
              <CropMarketplace />
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/crop/:id" element={
          <>
            <Header />
            <main>
              <CropDetail />
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/forum" element={
          <>
            <Header />
            <main>
              <Forum />
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/forum/post/:id" element={
          <>
            <Header />
            <main>
              <ForumPost />
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/forum/new" element={
          <>
            <Header />
            <main>
              <NewForumPost />
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />

        {/* Protected routes */}
        <Route path="/admin" element={
          <>
            <Header />
            <main>
              <ProtectedRoute adminOnly>
                <AdminDashboard />
              </ProtectedRoute>
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/profile" element={
          <>
            <Header />
            <main>
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/bookings" element={
          <>
            <Header />
            <main>
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/crop-planner" element={
          <>
            <Header />
            <main>
              <ProtectedRoute>
                <CropPlanner />
              </ProtectedRoute>
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/ai-crop-planner" element={
          <>
            <Header />
            <main>
              <ProtectedRoute>
                <AICropPlanner />
              </ProtectedRoute>
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/disease-detection" element={
          <>
            <Header />
            <main>
              <ProtectedRoute>
                <DiseaseDetection />
              </ProtectedRoute>
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/sell-crop" element={
          <>
            <Header />
            <main>
              <ProtectedRoute>
                <SellCrop />
              </ProtectedRoute>
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/my-crops" element={
          <>
            <Header />
            <main>
              <ProtectedRoute>
                <MyCrops />
              </ProtectedRoute>
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
        <Route path="/my-orders" element={
          <>
            <Header />
            <main>
              <ProtectedRoute>
                <MyOrders />
              </ProtectedRoute>
            </main>
            <Footer />
            <ChatBot />
            <DiseaseDetectionLogo />
          </>
        } />
      </Routes>
    </div>
  );
}

export default App;
