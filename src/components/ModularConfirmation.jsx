import { useLocation } from "react-router-dom";
import { generateRetailPDF } from "../utils/pdfRetailUtils";
import React, { useState } from "react";
import SEO from "../components/SEO";

// SEO values as per your table (adjust as needed)
const seoTitle = "Modular Insurance Confirmation | Your Insurance Plan Summary";
const seoDescription =
  "Thank you for your payment. Review your modular insurance plan summary with premium details, selected modules, and download your policy PDF.";
const seoUrl = "https://saurabhchandra.me/modular-confirmation";

const ModularConfirmation = () => {
  const location = useLocation();
  const [preEmail, setPreEmail] = useState("");
  const [preMobile, setPreMobile] = useState("");
  const { dob } = location.state || {};
  const state = location?.state || {};

  const {
    name = "",
    age = "",
    gender = "",
    insurer = "Not Selected",
    selectedModules = {},
    premium = {},
    model = "",
    paymentMethod = "",
    autoDebit = false,
    frequency = "Not Set",
    maternity = {},
    paymentDate = "",
    paymentConfirmed = false,
  } = state || {};
  const { total = 0, dueNow = 0 } = premium || {};
  const [email, setEmail] = useState(preEmail || "");
  const [mobile, setMobile] = useState(preMobile || "");
  const [error, setError] = useState("");

  // Build full modules object including maternity
  // For multi model, insurer per module from module data
  // For single model, use the single insurer for all
  const allModules = {
    ...(gender === "Female" && maternity?.si ? { maternity } : {}),
    ...Object.fromEntries(
      Object.entries(selectedModules || {}).filter(
        ([_, mod]) => mod?.si || mod?.sumInsured
      )
    ),
  };

  // Convert allModules into an array with insurer resolved correctly
  const selectedList = Object.entries(allModules).map(([key, mod]) => ({
    key,
    name: key === "maternity" ? "Maternity Benefit" : key.charAt(0).toUpperCase() + key.slice(1),
    sumInsured: mod.si || mod.sumInsured,
    frequency: mod.frequency || mod.freq,
    insurer: model === "single" ? insurer : mod.insurer || "",
  }));

  const validateInputs = () => {
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
      setError("Please enter a valid email address.");
      return false;
    }
    if (mobile && !/^\+\d{1,4}\d{10}$/.test(mobile)) {
      setError("Please enter a valid mobile number with country code.");
      return false;
    }
    setError("");
    return true;
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
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const downloadPDF = () => {
    generateRetailPDF({
      name,
      age,
      gender,
      dob,
      insurer,
      selectedModules: allModules,
      maternity,
      premium,
      model,
      email,
      mobile,
      datePaid: paymentDate || new Date(),
    });
  };

  const handleSend = () => {
    if (validateInputs()) {
      alert("PDF sent successfully via Email and WhatsApp (mock).");
    }
  };

  if (!paymentConfirmed || !selectedModules) {
    return (
      <div className="p-6 text-red-600 font-semibold text-center">
        Invalid confirmation. Please complete payment first.
      </div>
    );
  }

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-xl rounded-xl p-6">
          <h2 className="text-2xl font-bold text-green-600 text-center mb-2">✅ Thank you for your payment!</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">
            Below is your final insurance plan summary.
          </p>

          {/* Plan Summary Table */}
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm text-left border">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white">
                  <th className="py-2 px-3">Module</th>
                  <th>Sum Insured</th>
                  <th>Frequency</th>
                  <th>Insurer</th> {/* NEW column */}
                  <th>Next Due Date</th>
                </tr>
              </thead>
              <tbody>
                {selectedList.map(({ key, name, sumInsured, frequency, insurer }) => (
                  <tr key={key} className="border-t text-gray-800 dark:text-gray-100">
                    <td className="py-2 px-3">{name}</td>
                    <td>₹{parseInt(sumInsured).toLocaleString()}</td>
                    <td>{frequency}</td>
                    <td>{insurer || "—"}</td> {/* Show insurer or dash */}
                    <td>{calculateNextDue(paymentDate || new Date(), frequency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Premium Summary */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Total Annual Premium</h4>
              <p className="text-green-600 text-lg font-bold">₹{parseFloat(premium?.total || 0).toFixed(2)}</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <h4 className="font-semibold mb-2 text-gray-700 dark:text-gray-200">Paid Today</h4>
              <p className="text-blue-600 text-lg font-bold">₹{parseFloat(premium?.dueNow || 0).toFixed(2)}</p>
            </div>
          </div>

          {/* Download & Share Section */}
          <div className="text-center mb-6">
            <button
              onClick={downloadPDF}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold"
            >
              Download PDF Summary
            </button>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-4 text-lg">Send Plan Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="email"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                placeholder="Enter Mobile with Country Code (e.g. +919123456789)"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
              />
            </div>
            {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            <div className="text-center mt-4">
              <button
                onClick={handleSend}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-semibold"
              >
                Send via Email & WhatsApp
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              onClick={() => (window.location.href = "/")}
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

export default ModularConfirmation;
