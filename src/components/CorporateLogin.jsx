import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CorporateBrand from "../components/CorporateBrand";
import SEO from "./SEO";

const CorporateLogin = () => {
  const navigate = useNavigate();
  const [employeeCode, setEmployeeCode] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const seoTitle = "Corporate Employee Login – Creative Prototype Pvt. Ltd.";
  const seoDescription = "Secure login for corporate employees to access insurance plans and manage their benefits.";
  const seoUrl = "https://saurabhchandra.me/corporate-login";

  const handleLogin = () => {
    if (!employeeCode || !password) {
      setError("Required fields missing. Please use Skip Login to proceed.");
      return;
    }

    // Proceed with login logic here...
    // If successful:
    navigate("/corporate-user-details", {
      state: { employeeCode },
    });
  };

  const handleSkip = () => {
    navigate("/corporate-user-details", { state: { skip: true } });
  };

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />
      <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6 dark:bg-gray-900">
        <div className="max-w-xl w-full bg-white rounded-xl shadow-md p-8 dark:bg-gray-800 dark:text-white">
          <CorporateBrand />
          <h2 className="text-2xl font-bold mb-4 text-center">Corporate Employee Login</h2>

          <div className="mb-4">
            <label className="block text-sm font-medium">Employee Code</label>
            <input
              type="text"
              value={employeeCode}
              onChange={(e) => setEmployeeCode(e.target.value)}
              className="w-full border p-2 rounded mt-1 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded mt-1 dark:bg-gray-700 dark:border-gray-600"
            />
          </div>

          {error && <p className="text-red-500 text-sm mb-3">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3"
          >
            Login
          </button>

          <button
            onClick={handleSkip}
            className="w-full border border-gray-400 text-gray-700 dark:text-white py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            Skip Login
          </button>

          <div className="mt-6 text-sm text-center text-gray-500 dark:text-gray-400">
            <p>
              <strong>Note:</strong> This is a prototype. Login is optional. You may skip to proceed. If
              credentials are entered, data will be fetched from our internal system.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default CorporateLogin;
