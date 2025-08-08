import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { User, Mail, Lock, Phone, MapPin, Eye, EyeOff } from "lucide-react";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    location: "",
    role: "farmer",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setLoading(false);
      return;
    }

    const result = await register(formData);

    if (result.success) {
      navigate("/profile");
    } else {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="section">
      <div className="container">
        <div style={{ maxWidth: "500px", margin: "0 auto" }}>
          <div className="card">
            <div className="card-header">
              <h2 style={{ textAlign: "center", margin: 0 }}>Join AgriRent</h2>
              <p
                style={{
                  textAlign: "center",
                  margin: "8px 0 0",
                  color: "#64748b",
                }}
              >
                Create your account to get started
              </p>
            </div>
            <div className="card-content">
              {error && <div className="alert alert-error">{error}</div>}

              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label className="form-label">Full Name</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="text"
                      name="name"
                      className="form-input"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: "40px" }}
                    />
                    <User
                      size={20}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#9ca3af",
                      }}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type="email"
                      name="email"
                      className="form-input"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: "40px" }}
                    />
                    <Mail
                      size={20}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#9ca3af",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-2">
                  <div className="form-group">
                    <label className="form-label">Phone Number</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="tel"
                        name="phone"
                        className="form-input"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        style={{ paddingLeft: "40px" }}
                      />
                      <Phone
                        size={20}
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#9ca3af",
                        }}
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Location</label>
                    <div style={{ position: "relative" }}>
                      <input
                        type="text"
                        name="location"
                        className="form-input"
                        value={formData.location}
                        onChange={handleChange}
                        required
                        style={{ paddingLeft: "40px" }}
                        placeholder="City, State"
                      />
                      <MapPin
                        size={20}
                        style={{
                          position: "absolute",
                          left: "12px",
                          top: "50%",
                          transform: "translateY(-50%)",
                          color: "#9ca3af",
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Account Type</label>
                  <select
                    name="role"
                    className="form-select"
                    value={formData.role}
                    onChange={handleChange}
                    required
                  >
                    <option value="farmer">
                      Farmer - Rent equipment and buy products
                    </option>
                    <option value="owner">
                      Equipment Owner - List equipment for rent
                    </option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-input"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: "40px", paddingRight: "40px" }}
                    />
                    <Lock
                      size={20}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#9ca3af",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#9ca3af",
                      }}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Confirm Password</label>
                  <div style={{ position: "relative" }}>
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      className="form-input"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      style={{ paddingLeft: "40px", paddingRight: "40px" }}
                    />
                    <Lock
                      size={20}
                      style={{
                        position: "absolute",
                        left: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        color: "#9ca3af",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#9ca3af",
                      }}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={20} />
                      ) : (
                        <Eye size={20} />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ width: "100%", marginBottom: "16px" }}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </button>
              </form>

              <div style={{ textAlign: "center" }}>
                <p style={{ color: "#64748b", margin: 0 }}>
                  Already have an account?{" "}
                  <Link
                    to="/login"
                    style={{ color: "#059669", fontWeight: "500" }}
                  >
                    Sign in here
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
