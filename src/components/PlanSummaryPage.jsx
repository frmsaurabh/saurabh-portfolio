import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const PlanSummaryPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    name,
    age,
    gender,
    insurer,
    selectedModules = {},
    maternity,
    model,
  } = state || {};

  const calculateAnnual = (sumInsured) => (parseInt(sumInsured) * 0.01).toFixed(2);

  const calculateDueNow = (sumInsured, frequency) => {
    const annual = parseInt(sumInsured) * 0.01;
    if (frequency === "Monthly") return (annual / 12).toFixed(2);
    if (frequency === "Quarterly") return (annual / 4).toFixed(2);
    return annual.toFixed(2); // Yearly
  };

  const selectedList = Object.entries(selectedModules).map(([key, val]) => ({
    name: key,
    sumInsured: val.sumInsured,
    frequency: val.frequency,
    insurer: model === "single" ? insurer : val.insurer,
    annual: calculateAnnual(val.sumInsured),
    due: calculateDueNow(val.sumInsured, val.frequency),
  }));

  if (gender === "Female" && maternity?.si) {
    selectedList.push({
      name: "Maternity Benefit",
      sumInsured: maternity.si,
      frequency: maternity.frequency,
      insurer: maternity.insurer || "",
      annual: calculateAnnual(maternity.si),
      due: calculateDueNow(maternity.si, maternity.frequency),
    });
  }

  const sum = (list, field) =>
    list.reduce((total, item) => total + parseFloat(item[field]), 0);

  const annualBase = sum(selectedList, "annual");
  const gstAnnual = +(annualBase * 0.18).toFixed(2);
  const totalAnnual = (annualBase + gstAnnual).toFixed(2);

  const dueBase = sum(selectedList, "due");
  const gstDue = +(dueBase * 0.18).toFixed(2);
  const totalDue = (dueBase + gstDue).toFixed(2);

  const handleBack = () => {
    navigate(model === "single" ? "/builder-single" : "/builder-multi", {
      state: { name, age, gender, insurer },
    });
  };

  const handleProceed = () => {
    navigate("/payment", {
      state: {
        name,
        age,
        gender,
        insurer,
        selectedModules,
        maternity,
        model,
        premium: {
          total: totalAnnual,
          dueNow: totalDue,
        },
        datePaid: new Date().toISOString(),
        autoDebit: JSON.parse(localStorage.getItem("autoDebit")),
      },
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Review Your Plan</h2>
      <p className="text-gray-600 mb-4">
        Name: <strong>{name}</strong> | Age: <strong>{age}</strong> | Gender:{" "}
        <strong>{gender}</strong>
      </p>

      <div className="bg-white rounded-xl shadow p-4 mb-6">
        <h3 className="font-semibold mb-2 text-lg">Selected Covers</h3>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left">
              <th className="py-2">Module</th>
              <th>Sum Insured</th>
              <th>Frequency</th>
              <th>Insurer</th>
              <th>Premium (Annual)</th>
            </tr>
          </thead>
          <tbody>
            {selectedList.map((item, i) => (
              <tr key={i} className="border-b">
                <td className="py-2">{item.name}</td>
                <td>₹{parseInt(item.sumInsured).toLocaleString()}</td>
                <td>{item.frequency}</td>
                <td>{item.insurer || "—"}</td>
                <td>₹{parseFloat(item.annual).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="bg-gray-50 p-4 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-2 text-lg">Total Annual Premium Breakdown</h3>
        <div className="flex justify-between text-sm">
          <span>Subtotal (Annual Premium):</span>
          <span>₹{annualBase.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>GST (18%):</span>
          <span>₹{gstAnnual.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-base">
          <span>To be Paid Online (Incl. GST):</span>
          <span>₹{totalAnnual}</span>
        </div>
      </div>

      <div className="bg-yellow-50 p-4 rounded-xl shadow mb-6">
        <h3 className="font-semibold mb-2 text-lg">Current Due Premium Breakdown</h3>
        <div className="flex justify-between text-sm">
          <span>Subtotal (Due Now):</span>
          <span>₹{dueBase.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span>GST (18%):</span>
          <span>₹{gstDue.toFixed(2)}</span>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between font-semibold text-base">
          <span>To be Paid Now Online (Incl. GST):</span>
          <span>₹{totalDue}</span>
        </div>
      </div>

      <div className="flex justify-between">
        <button
          onClick={handleBack}
          className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
        >
          Go Back and Customize
        </button>
        <button
          onClick={handleProceed}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Proceed to Payment
        </button>
      </div>
    </div>
  );
};

export default PlanSummaryPage;
