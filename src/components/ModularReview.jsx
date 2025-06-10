import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { modulesData } from "../data/modulesData";
import SEO from "../components/SEO";

const seoTitle = "Review Your Modular Insurance Plan | Saurabh Chandra";
const seoDescription =
  "Review and customize your selected insurance modules with detailed premium breakdown before proceeding to payment.";
const seoUrl = "https://saurabhchandra.me/modular-review";

const ModularReviewPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate("/modular");
    return null;
  }

  const { name, age, insurer, selectedModules, premium, model } = state;

  const formatPremium = (value) => `₹${parseFloat(value).toFixed(2)}`;

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />
      <div className="p-6">
        <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
          <div>
            <h2 className="text-2xl font-bold">Review Your Plan</h2>
            <p className="text-sm text-gray-600">
              Name: <strong>{name}</strong>, Age: <strong>{age}</strong>{" "}
              {insurer && (
                <>
                  , Insurer: <strong>{insurer}</strong>
                </>
              )}
            </p>
          </div>
          <button
            onClick={() =>
              navigate("/modular", {
                state: { name, age, insurer }, // retain values
              })
            }
            className="text-sm text-blue-600 underline mt-2 sm:mt-0"
          >
            Go Back and Customize
          </button>
        </div>

        {/* Selected Modules */}
        <div className="space-y-3">
          {Object.entries(selectedModules).map(([key, val]) => {
            const module = modulesData.find((m) => m.key === key);
            const premiumValue = (val.sumInsured * 0.01).toFixed(2);
            return (
              <div
                key={key}
                className="border p-4 rounded-xl shadow bg-white flex justify-between"
              >
                <div>
                  <h4 className="font-semibold text-lg">{module.name}</h4>
                  <p className="text-sm text-gray-500">{module.description}</p>
                  <p className="text-sm mt-1">
                    Sum Insured: <strong>₹{val.sumInsured}</strong>
                  </p>
                  <p className="text-sm">
                    Frequency: <strong>{val.frequency}</strong>
                  </p>
                  {val.insurer && (
                    <p className="text-sm">
                      Insurer: <strong>{val.insurer}</strong>
                    </p>
                  )}
                </div>
                <div className="text-right text-sm font-bold">
                  ₹{premiumValue}
                </div>
              </div>
            );
          })}
        </div>

        {/* Premium Breakdown */}
        <div className="mt-6 border p-4 rounded-xl bg-gray-50 shadow">
          <h4 className="text-lg font-semibold mb-2">Premium Summary</h4>
          <div className="flex justify-between">
            <span>Base Premium:</span>
            <span>{formatPremium(premium.base)}</span>
          </div>
          {premium.charge && (
            <div className="flex justify-between text-sm text-gray-600">
              <span>Professional Charge (5%):</span>
              <span>{formatPremium(premium.charge)}</span>
            </div>
          )}
          <div className="flex justify-between text-sm text-gray-600">
            <span>GST (18%):</span>
            <span>{formatPremium(premium.gst)}</span>
          </div>
          <div className="flex justify-between font-bold text-lg mt-2">
            <span>Total:</span>
            <span>{formatPremium(premium.total)}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1 italic">
            * This is annual premium. Payment value will be frequency-based.
          </p>

          <button
            onClick={() =>
              navigate("/payment", {
                state: { name, age, insurer, selectedModules, premium, model },
              })
            }
            className="mt-4 w-full bg-blue-600 text-white p-3 rounded-xl hover:bg-blue-700 transition"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default ModularReviewPage;
