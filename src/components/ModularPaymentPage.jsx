import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../components/SEO";

const seoTitle = "Modular Insurance Payment | Confirm Your Payment";
const seoDescription =
  "Select your preferred payment method for your modular insurance plan. Confirm your payment securely and proceed to your confirmation.";
const seoUrl = "https://saurabhchandra.me/modular-payment";

const ModularPaymentPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/modular");
    return null;
  }

  const { name, age, insurer, selectedModules, premium, model } = state;

  const [paymentMethod, setPaymentMethod] = useState("");
  const [autoDebitConsent, setAutoDebitConsent] = useState(false);
  const [error, setError] = useState("");

  const handleConfirmPayment = () => {
    if (!paymentMethod) {
      setError("Please select a payment method.");
      return;
    }
    if (
      paymentMethod === "Auto Debit/Standing Instructions" &&
      !autoDebitConsent
    ) {
      setError("Please confirm the Auto Debit authorization.");
      return;
    }
    // Proceed to confirmation
    navigate("/confirmation", {
      state: {
        name,
        age,
        insurer,
        selectedModules,
        premium,
        model,
        paymentMethod,
        paymentConfirmed: true,
      },
    });
  };

  const paymentOptions = [
    "Auto Debit/Standing Instructions",
    "UPI",
    "Credit Card",
    "Debit Card",
    "Net Banking",
  ];

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />
      <div className="p-6 max-w-3xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Payment</h2>

        <div className="bg-white shadow rounded-xl p-4 space-y-4">
          <p className="text-sm text-gray-600">
            Please choose your preferred method of payment for the selected
            covers.
          </p>

          <div className="space-y-3">
            {paymentOptions.map((option) => (
              <label key={option} className="block">
                <input
                  type="radio"
                  name="paymentMethod"
                  value={option}
                  className="mr-2"
                  checked={paymentMethod === option}
                  onChange={(e) => {
                    setPaymentMethod(e.target.value);
                    setError("");
                  }}
                />
                {option}
              </label>
            ))}
          </div>

          {paymentMethod === "Auto Debit/Standing Instructions" && (
            <div className="mt-2 ml-4 border-l-2 pl-4 border-blue-200">
              <label className="text-sm">
                <input
                  type="checkbox"
                  checked={autoDebitConsent}
                  onChange={(e) => setAutoDebitConsent(e.target.checked)}
                  className="mr-2"
                />
                I authorize the platform to set up Auto Debit for the selected
                amount as per the chosen frequency. I understand this amount will
                be deducted automatically on each due date.
              </label>
            </div>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <div className="border-t pt-4 mt-4 text-right">
            <p className="font-semibold text-lg mb-2">
              Total Payable Now: ₹{premium.total}
            </p>
            <button
              onClick={handleConfirmPayment}
              className="bg-green-600 text-white px-6 py-2 rounded-xl hover:bg-green-700 transition"
            >
              Confirm Payment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModularPaymentPage;
