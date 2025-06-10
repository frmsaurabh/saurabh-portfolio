// components/PaymentPage.jsx

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [autoDebit, setAutoDebit] = useState(false);
  const [confirmDebit, setConfirmDebit] = useState(false);

  if (!state) {
    return <div className="p-6 text-center">No data found. Please start again.</div>;
  }

  const {
    name,
    age,
    selectedModules,
    premium,
    model,
    insurer,
    gender,
    frequency,
    maternity,
  } = state;

  const handlePay = () => {
    if (autoDebit && !confirmDebit) {
      return alert("Please confirm auto debit authorization.");
    }

    let totalAnnual = 0;
    let totalDue = 0;

    if (premium && premium.total) {
      totalAnnual = premium.total;
      totalDue = premium.dueNow;
    }

    if (model && model.toLowerCase() === "multi") {
      navigate("/confirmation", {
        state: {
          name,
          age,
          gender,
          selectedModules,
          premium: {
            total: totalAnnual || 0,
            dueNow: totalDue || 0,
          },
          model: "multi",
          paymentMethod,
          autoDebit,
          frequency: model?.toLowerCase() === "multi" ? "Per Module" : (frequency || "Annual"),
          maternity,
          paymentDate: new Date().toISOString(),
          paymentConfirmed: true,
        },
      });
    } else {
      navigate("/confirmation", {
        state: {
          name,
          age,
          gender,
          insurer: insurer || "Not Selected",
          selectedModules,
          premium: {
            total: totalAnnual || 0,
            dueNow: totalDue || 0,
          },
          model: "single",
          paymentMethod,
          autoDebit,
          frequency: frequency || "Annual",
          maternity,
          paymentDate: new Date().toISOString(),
          paymentConfirmed: true,
        },
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 flex justify-center items-start">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-2xl p-6">
        <h2 className="text-2xl font-bold mb-6 text-center">Select Payment Method</h2>

        <div className="grid gap-4 sm:grid-cols-2">
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
                I authorize deduction of the premium amount from my selected payment mode on a recurring basis as per the chosen frequency.
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
      </div>
    </div>
  );
};

export default PaymentPage;
