import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CorporateBrand from "../components/CorporateBrand";
import SEO from "./SEO";

const CorporatePaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const seoTitle = "Corporate Payment – Complete Your Insurance Payment";
  const seoDescription =
    "Complete the payment for your corporate modular insurance plan with various payment options and auto-debit consent.";
  const seoUrl = "https://saurabhchandra.me/corporate-payment";

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [autoDebit, setAutoDebit] = useState(false);
  const [confirmDebit, setConfirmDebit] = useState(false);
  const [salaryConfirmed, setSalaryConfirmed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  if (!state) {
    return <div className="p-6 text-center">No data found. Please start again.</div>;
  }

  const {
    name,
    age,
    gender,
    insurer,
    hospitalization,
    maternity,
    modules,
    premium,
    model,
    payableOnlineNow,
    payableViaSalaryNow,
  } = state;

  const handlePay = () => {
    if (payableViaSalaryNow > 0 && !salaryConfirmed) {
      alert("Please confirm salary deduction to proceed.");
      return;
    }

    if (autoDebit && !confirmDebit) {
      alert("Please confirm auto debit authorization.");
      return;
    }

    const premium = {
      total: parseFloat(payableOnlineNow || 0) + parseFloat(payableViaSalaryNow || 0),
      breakdown: {
        online: parseFloat(payableOnlineNow || 0),
        salary: parseFloat(payableViaSalaryNow || 0),
      },
    };

    const enrichedModules = Object.fromEntries(
      Object.entries(modules || {})
        .filter(([_, mod]) => mod != null)
        .map(([key, mod]) => [
          key,
          {
            ...mod,
            frequency: mod.frequency || "Annual",
            payment: mod.payment || paymentMethod || "UPI",
          },
        ])
    );

    setShowSuccess(true);

    setTimeout(() => {
      navigate("/corporate-plan-download", {
        state: {
          name,
          age,
          gender,
          insurer,
          hospitalization,
          maternity,
          modules: enrichedModules,
          model,
          premium,
          paymentMethod,
          autoDebit,
          salaryConfirmed,
          paymentDate: new Date().toISOString(),
          payableOnlineNow,
          payableViaSalaryNow,
        },
      });
    }, 1500);
  };

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 flex justify-center items-start">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl p-6">
          <CorporateBrand />
          <h2 className="text-2xl font-bold mb-6 text-center">Complete Your Payment</h2>

          <div className="mb-6 space-y-2 text-gray-800 dark:text-gray-200">
            <div className="flex justify-between">
              <span>Premium to be deducted from salary:</span>
              <span className="font-medium">{`₹${parseFloat(payableViaSalaryNow).toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between">
              <span>Premium to be paid online now:</span>
              <span className="font-bold text-green-600 dark:text-green-400">
                ₹{parseFloat(payableOnlineNow).toFixed(2)}
              </span>
            </div>
          </div>

          {parseFloat(payableViaSalaryNow) > 0 && (
            <div className="mb-6">
              <label className="flex items-start gap-2 text-sm font-medium text-red-700 dark:text-red-300">
                <input
                  type="checkbox"
                  checked={salaryConfirmed}
                  onChange={() => setSalaryConfirmed(!salaryConfirmed)}
                />
                I confirm the salary deduction. If not authorized, this cover may cease.
              </label>
            </div>
          )}

          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            {["Credit Card", "Debit Card", "Online Banking", "UPI"].map((method) => (
              <label
                key={method}
                className={`border rounded-lg px-4 py-3 cursor-pointer ${
                  paymentMethod === method
                    ? "border-blue-600 bg-blue-50 dark:bg-blue-900 dark:border-blue-400"
                    : "border-gray-300 dark:border-gray-600"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method}
                  checked={paymentMethod === method}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="hidden"
                />
                <span className="font-medium text-gray-800 dark:text-gray-100">{method}</span>
              </label>
            ))}
          </div>

          <div className="mt-6">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={autoDebit}
                onChange={() => {
                  setAutoDebit(!autoDebit);
                  setConfirmDebit(false);
                }}
              />
              Enable Auto Debit / Standing Instructions
            </label>

            {autoDebit && (
              <div className="mt-3 pl-6">
                <label className="flex items-start gap-2 text-xs text-gray-600 dark:text-gray-400">
                  <input
                    type="checkbox"
                    checked={confirmDebit}
                    onChange={() => setConfirmDebit(!confirmDebit)}
                  />
                  I authorize recurring deductions from my selected payment method as per chosen frequency.
                </label>
              </div>
            )}
          </div>

          <div className="mt-8">
            <button
              onClick={handlePay}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl font-semibold transition"
            >
              Make Payment (Dummy)
            </button>
          </div>

          {showSuccess && (
            <div className="mt-6 text-green-600 text-center font-medium">
              Payment Successful! Redirecting...
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CorporatePaymentPage;
