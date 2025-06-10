import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import CorporateBrand from "../components/CorporateBrand";
import SEO from "../components/SEO"; // import SEO component

const PlanSummaryPage = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const {
    name,
    age,
    gender,
    insurer,
    hospitalization,
    maternity,
    modules,
    model,
  } = state || {};

  const seoTitle = "Corporate Insurance Plan Summary – Review Your Plan";
  const seoDescription =
    "Review your personalized corporate insurance plan details including covers, premiums, and payment options.";
  const seoUrl = "https://saurabhchandra.me/corporate-plan-summary";

  const selectedModules = {
    hospitalization,
    ...(gender === "Female" && maternity?.si ? { maternity } : {}),
    ...Object.fromEntries(
      Object.entries(modules || {}).filter(([_, mod]) => mod?.si)
    ),
  };

  const calculateDue = (sumInsured, frequency) => {
    const annual = parseInt(sumInsured) * 0.01;
    if (frequency === "Monthly") return (annual / 12).toFixed(2);
    if (frequency === "Quarterly") return (annual / 4).toFixed(2);
    return annual.toFixed(2); // Yearly
  };

  const breakdown = {
    salary: [],
    online: [],
  };

  Object.entries(selectedModules).forEach(([key, val]) => {
    const mod = {
      key,
      name:
        key === "hospitalization"
          ? "Hospitalization"
          : key === "maternity"
          ? "Maternity"
          : key.charAt(0).toUpperCase() + key.slice(1),
      sumInsured: val.si || val.sumInsured,
      frequency: val.frequency,
      payment: val.payment,
    };
    if (mod.payment === "Salary Deduction") {
      breakdown.salary.push(mod);
    } else {
      breakdown.online.push(mod);
    }
  });

  const sumAnnualPremiums = (list) =>
    list.reduce((sum, mod) => sum + parseFloat(mod.sumInsured) * 0.01, 0);

  const sumCurrentDue = (list) =>
    list.reduce(
      (sum, mod) => sum + parseFloat(calculateDue(mod.sumInsured, mod.frequency)),
      0
    );

  const annualSalary = sumAnnualPremiums(breakdown.salary);
  const annualOnline = sumAnnualPremiums(breakdown.online);
  const gstSalary = annualSalary * 0.18;
  const gstOnline = annualOnline * 0.18;

  const totalAnnualSalary = annualSalary + gstSalary;
  const totalAnnualOnline = annualOnline + gstOnline;

  const dueNowSalary = sumCurrentDue(breakdown.salary);
  const dueNowOnline = sumCurrentDue(breakdown.online);
  const gstDueSalary = dueNowSalary * 0.18;
  const gstDueOnline = dueNowOnline * 0.18;
  const totalDueSalary = dueNowSalary + gstDueSalary;
  const totalDueOnline = dueNowOnline + gstDueOnline;

  const handleProceedToPayment = () => {
    navigate("/corporate-payment", {
      state: {
        name,
        age,
        gender,
        insurer,
        hospitalization,
        maternity,
        modules,
        model,
        payableOnlineAnnual: totalAnnualOnline.toFixed(2),
        payableViaSalaryAnnual: totalAnnualSalary.toFixed(2),
        payableOnlineNow: totalDueOnline.toFixed(2),
        payableViaSalaryNow: totalDueSalary.toFixed(2),
        breakdown,
      },
    });
  };

  const handleGoBack = () => {
    navigate("/corporate-modular/builder-single", {
      state: { name, age, gender, insurer },
    });
  };

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />
      <div className="p-6 max-w-4xl mx-auto">
        <CorporateBrand />
        <h2 className="text-2xl font-bold mb-4">Review Your Plan</h2>
        <p className="mb-4 text-gray-600">
          Name: <strong>{name}</strong>, Age: <strong>{age}</strong>
          {model === "single" && (
            <>
              , Insurer: <strong>{insurer}</strong>
            </>
          )}
        </p>

        {/* Salary Deduction Covers */}
        {breakdown.salary.length > 0 && (
          <div className="bg-white p-4 rounded-xl shadow mb-6">
            <h3 className="font-semibold mb-2 text-lg">Salary Deduction Covers</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Module</th>
                  <th>Sum Insured</th>
                  <th>Frequency</th>
                  <th>Annual Premium</th>
                  <th>Current Due</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.salary.map((mod) => {
                  const annual = (parseInt(mod.sumInsured) * 0.01).toFixed(2);
                  const currentDue = calculateDue(mod.sumInsured, mod.frequency);
                  return (
                    <tr key={mod.key} className="border-b">
                      <td className="py-2">{mod.name}</td>
                      <td>{`₹${parseInt(mod.sumInsured).toLocaleString()}`}</td>
                      <td>{mod.frequency}</td>
                      <td>{`₹${annual}`}</td>
                      <td>{`₹${currentDue}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Online Payment Covers */}
        {breakdown.online.length > 0 && (
          <div className="bg-white p-4 rounded-xl shadow mb-6">
            <h3 className="font-semibold mb-2 text-lg">Online Payment Covers</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-2">Module</th>
                  <th>Sum Insured</th>
                  <th>Frequency</th>
                  <th>Annual Premium</th>
                  <th>Current Due</th>
                </tr>
              </thead>
              <tbody>
                {breakdown.online.map((mod) => {
                  const annual = (parseInt(mod.sumInsured) * 0.01).toFixed(2);
                  const currentDue = calculateDue(mod.sumInsured, mod.frequency);
                  return (
                    <tr key={mod.key} className="border-b">
                      <td className="py-2">{mod.name}</td>
                      <td>{`₹${parseInt(mod.sumInsured).toLocaleString()}`}</td>
                      <td>{mod.frequency}</td>
                      <td>{`₹${annual}`}</td>
                      <td>{`₹${currentDue}`}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Annual Premium Breakdown */}
        <div className="bg-gray-50 p-4 rounded-xl shadow mb-6">
          <h3 className="font-semibold mb-2 text-lg">Total Annual Premium Breakdown</h3>
          <div className="flex justify-between">
            <span>Via Salary Deduction (Incl. GST):</span>
            <span>{`₹${totalAnnualSalary.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>To be Paid Online (Incl. GST):</span>
            <span>{`₹${totalAnnualOnline.toFixed(2)}`}</span>
          </div>
        </div>

        {/* Current Due Premium Breakdown */}
        <div className="bg-yellow-50 p-4 rounded-xl shadow mb-6">
          <h3 className="font-semibold mb-2 text-lg">Current Due Premium Breakdown</h3>
          <div className="flex justify-between">
            <span>Via Salary Deduction (Incl. GST):</span>
            <span>{`₹${totalDueSalary.toFixed(2)}`}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>To be Paid Now Online (Incl. GST):</span>
            <span>{`₹${totalDueOnline.toFixed(2)}`}</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={handleGoBack}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300"
          >
            Go Back and Customize
          </button>
          <button
            onClick={handleProceedToPayment}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Proceed to Payment
          </button>
        </div>
      </div>
    </>
  );
};

export default PlanSummaryPage;
