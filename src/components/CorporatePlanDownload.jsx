import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CorporateBrand from "./CorporateBrand";
import SEO from "./SEO";  // import SEO
import { generateCorporatePDF } from "../utils/pdfUtils";

const CorporatePlanDownload = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const seoTitle = "Corporate Insurance Plan Download – Your Final Policy Summary";
  const seoDescription = "Download and review your finalized corporate insurance plan summary with premium details and payment information.";
  const seoUrl = "https://saurabhchandra.me/corporate-plan-download";

  const {
    name,
    age,
    gender,
    insurer,
    hospitalization,
    maternity,
    modules,
    model,
    paymentMethod,
    paymentDate,
    payableOnlineNow,
    payableViaSalaryNow,
    email: passedEmail,
    mobile: passedMobile,
  } = state || {};

  const allModules = {
    hospitalization,
    ...(gender === "Female" && maternity?.si ? { maternity } : {}),
    ...Object.fromEntries(Object.entries(modules || {}).filter(([_, m]) => m?.si)),
  };

  const [email, setEmail] = useState(passedEmail || "");
  const [mobile, setMobile] = useState(passedMobile || "");
  const [countryCode, setCountryCode] = useState("+91");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");

  useEffect(() => {
    if (passedEmail) validateEmail(passedEmail);
    if (passedMobile) validateMobile(passedMobile);
  }, []);

  const validateEmail = (val) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailError(regex.test(val) ? "" : "Invalid email format (e.g., user@domain.com)");
  };

  const validateMobile = (val) => {
    const valid = /^[0-9]{6,14}$/.test(val);
    setMobileError(valid ? "" : "Enter valid mobile number (6–14 digits)");
  };

  const calculateNextDue = (startDateStr, frequency) => {
    const date = new Date(startDateStr);
    switch (frequency) {
      case "Monthly":
        date.setMonth(date.getMonth() + 1);
        break;
      case "Quarterly":
        date.setMonth(date.getMonth() + 3);
        break;
      default:
        date.setFullYear(date.getFullYear() + 1);
    }
    return date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  const handleDownloadPDF = () => {
    generateCorporatePDF({
      name,
      age,
      gender,
      insurer,
      hospitalization,
      maternity,
      modules,
      model,
      paymentMethod,
      paymentDate,
      payableOnlineNow,
      payableViaSalaryNow,
    });
  };

  const handleSend = () => {
    if (!email || emailError || !mobile || mobileError) {
      alert("PDF sent successfully via Email and WhatsApp (mock).");
      return;
    }
    alert("Details will be sent to Email and WhatsApp (mock).");
  };

  if (!name || !insurer || !paymentDate) {
    return <div className="text-center text-red-600 p-10">Invalid or incomplete data. Please complete all steps.</div>;
  }

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6">
          <CorporateBrand />

          <h2 className="text-2xl font-bold text-green-600 text-center mb-2">✅ Thank you for your payment!</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Below is your final insurance plan summary.
          </p>

          {/* Summary Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-left border">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <th className="py-2 px-3">Module</th>
                  <th>Sum Insured</th>
                  <th>Frequency</th>
                  <th>Payment Method</th>
                  <th>Next Due Date</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(allModules).map(([key, mod]) => (
                  <tr key={key} className="border-t text-gray-800 dark:text-gray-100">
                    <td className="py-2 px-3 capitalize">{key}</td>
                    <td>₹{parseInt(mod.si || mod.sumInsured).toLocaleString()}</td>
                    <td>{mod.frequency}</td>
                    <td>{mod.payment}</td>
                    <td>{calculateNextDue(paymentDate, mod.frequency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Amount Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Total Paid Online</h4>
              <p className="text-green-600 text-lg font-bold">₹{parseFloat(payableOnlineNow).toFixed(2)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">To Be Deducted from Salary</h4>
              <p className="text-red-600 text-lg font-bold">₹{parseFloat(payableViaSalaryNow).toFixed(2)}</p>
            </div>
          </div>

          {/* PDF Download */}
          <div className="text-center mb-6">
            <button
              onClick={handleDownloadPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Download PDF Summary
            </button>
          </div>

          {/* Send to Email / WhatsApp */}
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-4 text-lg">Send Plan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    validateEmail(e.target.value);
                  }}
                  placeholder="e.g. user@domain.com"
                  className="w-full px-3 py-2 rounded border"
                />
                {emailError && <p className="text-xs text-red-500">{emailError}</p>}
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">Country Code</label>
                <select
                  className="w-full px-3 py-2 rounded border"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  <option value="+91">🇮🇳 +91</option>
                  <option value="+1">🇺🇸 +1</option>
                  <option value="+44">🇬🇧 +44</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-600 dark:text-gray-300">Mobile</label>
                <input
                  type="tel"
                  value={mobile}
                  onChange={(e) => {
                    setMobile(e.target.value);
                    validateMobile(e.target.value);
                  }}
                  placeholder="Enter mobile number"
                  className="w-full px-3 py-2 rounded border"
                />
                {mobileError && <p className="text-xs text-red-500">{mobileError}</p>}
              </div>
            </div>
            <div className="text-center mt-6">
              <button
                onClick={handleSend}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Send via Email & WhatsApp
              </button>
            </div>
          </div>

          {/* Return to Home */}
          <div className="text-center">
            <button
              onClick={() => navigate("/")}
              className="text-blue-600 hover:underline text-sm font-medium"
            >
              ← Return to Home
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CorporatePlanDownload;
