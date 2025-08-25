import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const VerifyEmail = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get("token");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { verifyEmail, user } = useAuth();

  useEffect(() => {
    const verifyToken = async () => {
      if (token) {
        setLoading(true);
        const result = await verifyEmail(token);
        
        if (result.success) {
          setMessage(result.message);
        } else {
          setError(result.error);
        }
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, verifyEmail]);

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Invalid or missing verification token.
          </div>
          {user && !user.isVerified && (
            <div className="text-center">
              <Link
                to="/resend-verification"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Resend Verification Email
              </Link>
            </div>
          )}
          <div className="text-center">
            <Link
              to="/"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Email Verification
          </h2>
        </div>

        {loading && (
          <div className="text-center">
            <p className="text-gray-600">Verifying your email...</p>
          </div>
        )}

        {message && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <div className="text-center space-y-4">
          {message && (
            <button
              onClick={() => navigate("/login")}
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Continue to Login
            </button>
          )}
          
          {error && (
            <Link
              to="/resend-verification"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Resend Verification Email
            </Link>
          )}
          
          <Link
            to="/"
            className="block font-medium text-green-600 hover:text-green-500"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
