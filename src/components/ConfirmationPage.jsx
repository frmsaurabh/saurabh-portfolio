import React from "react";
import { useLocation } from "react-router-dom";
import SEO from "./SEO";

const ConfirmationPage = () => {
  const { state } = useLocation();
  console.log("CONFIRM STATE", state);

  const seoTitle = "Insurance Confirmation – Thank You for Your Payment | saurabhchandra.me";
  const seoDescription = "View the summary of your insurance plan, payment details, and download your policy confirmation.";
  const seoUrl = "https://saurabhchandra.me/confirmation";

  if (
    !state ||
    !state.selectedModules ||
    !Array.isArray(state.selectedModules) ||
    state.selectedModules.length === 0
  ) {
    return <div className="p-6 text-center">Invalid confirmation. Please complete payment first.</div>;
  }

  const {
    name,
    age,
    gender,
    insurer,
    selectedModules,
    premium,
    model,
    paymentMethod,
    autoDebit,
    paymentDate,
    maternity,
  } = state;

  const gstRate = 0.18;
  const professionalChargeRate = model === "multi" ? 0.05 : 0;

  const totalPremium = selectedModules.reduce(
    (sum, mod) => sum + (parseFloat(mod.premium) || 0),
    0
  );

  const professionalCharge = totalPremium * professionalChargeRate;
  const gstAmount = (totalPremium + professionalCharge) * gstRate;
  const grandTotal = totalPremium + professionalCharge + gstAmount;

  const getNextDueDate = (frequency) => {
    const base = paymentDate ? new Date(paymentDate) : new Date();
    const next = new Date(base);
    if (frequency === "Monthly") next.setMonth(next.getMonth() + 1);
    else if (frequency === "Quarterly") next.setMonth(next.getMonth() + 3);
    else if (frequency === "Half-Yearly") next.setMonth(next.getMonth() + 6);
    else next.setFullYear(next.getFullYear() + 1);
    return next.toLocaleDateString("en-IN");
  };

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-10 px-4 flex justify-center items-start">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl p-6">
          <h2 className="text-2xl font-bold text-center mb-6">Thank you for your payment</h2>

          <div className="mb-6 space-y-2 text-gray-800 dark:text-gray-200">
            <p><strong>Name:</strong> {name}</p>
            <p><strong>Age:</strong> {age}</p>
            <p><strong>Gender:</strong> {gender}</p>
            <p><strong>Payment Method:</strong> {paymentMethod}</p>
            {model === "single" && <p><strong>Insurer:</strong> {insurer}</p>}
          </div>

          <h3 className="text-lg font-semibold mb-2">Selected Covers</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border dark:border-gray-700 mb-4">
              <thead className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                <tr>
                  <th className="p-2 border">Cover</th>
                  <th className="p-2 border">Sum Insured</th>
                  {model === "multi" && <th className="p-2 border">Insurer</th>}
                  <th className="p-2 border">Frequency</th>
                  <th className="p-2 border">Premium</th>
                  <th className="p-2 border">Next Due Date</th>
                </tr>
              </thead>
              <tbody>
                {selectedModules.map((mod, i) => (
                  <tr key={i} className="text-center">
                    <td className="p-2 border">{mod.name}</td>
                    <td className="p-2 border">₹{mod.si}</td>
                    {model === "multi" && (
                      <td className="p-2 border">{mod.insurer}</td>
                    )}
                    <td className="p-2 border">{mod.frequency}</td>
                    <td className="p-2 border">₹{mod.premium}</td>
                    <td className="p-2 border">{getNextDueDate(mod.frequency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {gender === "Female" && maternity?.si && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Maternity Rider</h3>
              <div className="text-sm text-gray-800 dark:text-gray-200 space-y-1">
                <p><strong>Sum Insured:</strong> ₹{maternity.si}</p>
              </div>
            </div>
          )}

          <h3 className="text-lg font-semibold mt-6 mb-2">Total Premium Breakdown</h3>
          <ul className="text-sm text-gray-800 dark:text-gray-200 mb-4 space-y-1">
            <li>Total Premium: ₹{totalPremium.toFixed(2)}</li>
            {model === "multi" && (
              <li>
                Professional Charges (5%): ₹{professionalCharge.toFixed(2)}{" "}
                <span className="text-xs text-gray-500">(admin + claim handling)</span>
              </li>
            )}
            <li>GST (18%): ₹{gstAmount.toFixed(2)}</li>
            <li className="font-semibold">Grand Total: ₹{grandTotal.toFixed(2)}</li>
          </ul>

          <h3 className="text-lg font-semibold mt-6 mb-2">Current Premium Breakdown</h3>
          <ul className="text-sm text-gray-800 dark:text-gray-200 space-y-1">
            <li>
              Due Today: ₹{(totalPremium + professionalCharge).toFixed(2)} + ₹
              {gstAmount.toFixed(2)} GST
            </li>
          </ul>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <input
              type="email"
              placeholder="Enter Email to Send Policy"
              className="w-full border rounded px-4 py-2"
            />
            <input
              type="tel"
              placeholder="Enter Mobile to Send via WhatsApp"
              className="w-full border rounded px-4 py-2"
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
              Send
            </button>
            <button className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-2 rounded">
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ConfirmationPage;
