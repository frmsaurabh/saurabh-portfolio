import React, { useState, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import SEO from "./SEO";

export default function ModularInsurance() {
  const [step, setStep] = useState(1);
  const [confirmed, setConfirmed] = useState(false);
  const [paymentDone, setPaymentDone] = useState(false);

  // SEO meta info
  const seoTitle = "Modular Insurance Entry – Build Your Plan";
  const seoDescription = "Start building your modular insurance plan tailored to your needs.";
  const seoUrl = "https://saurabhchandra.me/modular";

  const [userInfo, setUserInfo] = useState({
    name: "",
    age: "",
    email: "",
    mobile: "",
    city: ""
  });

  const [modules, setModules] = useState([
    { id: "opd", name: "OPD Care", selected: false, sumInsured: 5000 },
    { id: "accident", name: "Personal Accident", selected: false, sumInsured: 100000 },
    { id: "mental", name: "Mental Wellness", selected: false, sumInsured: 20000 },
    { id: "cyber", name: "Cyber Insurance", selected: false, sumInsured: 10000 },
    { id: "hospital", name: "Hospitalization", selected: false, sumInsured: 300000 },
    { id: "family", name: "Family Cover", selected: false, sumInsured: 200000 },
    { id: "checkup", name: "Preventive Checkups", selected: false, sumInsured: 5000 }
  ]);

  const [paymentFrequency, setPaymentFrequency] = useState("monthly");

  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  const toggleModule = (id) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, selected: !m.selected } : m
      )
    );
  };

  const updateSumInsured = (id, value) => {
    setModules((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, sumInsured: Number(value) } : m
      )
    );
  };

  const calculatePremium = () => {
    const annualPremium = modules
      .filter((m) => m.selected)
      .reduce((acc, m) => acc + m.sumInsured * 0.005, 0); // 0.5% annually

    const divisor = {
      annually: 1,
      halfyearly: 2,
      quarterly: 4,
      monthly: 12
    }[paymentFrequency];

    return Math.round(annualPremium / divisor);
  };

  const proceedToSummary = () => {
    if (!paymentDone) {
      alert("Please click to pay before proceeding.");
      return;
    }
    setStep(4);
  };

  const handleConfirm = () => {
    setConfirmed(true);
  };

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
    documentTitle: `InsurancePlan_${userInfo.name}`,
  });

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />

      <div className="py-10">
        {/* Step 1 - Personal Info */}
        {step === 1 && (
          <div className="max-w-2xl mx-auto bg-white p-8 shadow-lg rounded-xl">
            <h2 className="text-2xl font-semibold mb-6 text-center">Build Your Modular Insurance Plan</h2>
            <div className="space-y-4">
              {["name", "age", "email", "mobile", "city"].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium capitalize">
                    {field} {field === "name" || field === "age" ? "*" : ""}
                  </label>
                  <input
                    type={field === "age" ? "number" : "text"}
                    name={field}
                    value={userInfo[field]}
                    onChange={handleChange}
                    required={field === "name" || field === "age"}
                    className="w-full border px-4 py-2 rounded-md"
                  />
                </div>
              ))}
            </div>
            <button
              onClick={() => {
                if (!userInfo.name || !userInfo.age) {
                  alert("Please enter both Name and Age.");
                  return;
                }
                setStep(2);
              }}
              className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Start Building
            </button>
          </div>
        )}

        {/* Step 2 - Select Modules */}
        {step === 2 && (
          <div className="max-w-5xl mx-auto bg-white p-8 shadow-lg rounded-xl">
            <h2 className="text-2xl font-bold mb-6 text-center">Select Your Coverages</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className={`p-4 rounded-lg border ${
                    module.selected ? "border-blue-500 bg-blue-50" : "border-gray-300"
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <h3 className="text-lg font-medium">{module.name}</h3>
                    <input
                      type="checkbox"
                      checked={module.selected}
                      onChange={() => toggleModule(module.id)}
                    />
                  </div>
                  {module.selected && (
                    <div className="mt-4">
                      <label className="block text-sm font-medium">Sum Insured (₹)</label>
                      <input
                        type="number"
                        value={module.sumInsured}
                        onChange={(e) =>
                          updateSumInsured(module.id, e.target.value)
                        }
                        className="w-full border px-4 py-2 rounded-md mt-1"
                        min={1000}
                        step={1000}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="bg-gray-500 text-white py-2 px-6 rounded-md hover:bg-gray-600 transition"
              >
                ← Back
              </button>
              <button
                onClick={() => {
                  const anySelected = modules.some((m) => m.selected);
                  if (!anySelected) {
                    alert("Please select at least one module to proceed.");
                    return;
                  }
                  setStep(3);
                }}
                className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Payment + Summary */}
        {step === 3 && (
          <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-xl text-center">
            <h2 className="text-2xl font-bold mb-6">Choose Payment Frequency</h2>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {["monthly", "quarterly", "halfyearly", "annually"].map((option) => (
                <button
                  key={option}
                  onClick={() => setPaymentFrequency(option)}
                  className={`px-4 py-2 rounded-full border ${
                    paymentFrequency === option
                      ? "bg-blue-600 text-white border-blue-600"
                      : "border-gray-400"
                  }`}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>

            <p className="text-lg font-medium text-gray-700 mb-2">
              Estimated Premium: ₹{calculatePremium()} / {paymentFrequency}
            </p>

            <div className="text-left max-w-md mx-auto mt-4 mb-6">
              <h3 className="text-lg font-semibold mb-2">Selected Modules:</h3>
              <ul className="list-disc list-inside text-gray-700">
                {modules.filter((m) => m.selected).map((m) => (
                  <li key={m.id}>
                    {m.name} — ₹{m.sumInsured.toLocaleString()}
                  </li>
                ))}
              </ul>
            </div>

            {!paymentDone ? (
              <button
                onClick={() => setPaymentDone(true)}
                className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
              >
                Click to Pay ₹{calculatePremium()}
              </button>
            ) : (
              <>
                <p className="text-green-600 font-semibold mt-2">✅ Payment Received</p>
                <button
                  onClick={proceedToSummary}
                  className="mt-4 bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700 transition"
                >
                  Proceed to Summary
                </button>
              </>
            )}

            <div className="mt-6">
              <button
                onClick={() => setStep(2)}
                className="text-sm text-gray-500 underline hover:text-gray-700"
              >
                ← Back to Cover Selection
              </button>
            </div>
          </div>
        )}

        {/* Step 4 - Summary & Confirmation */}
        {step === 4 && (
          <div className="max-w-3xl mx-auto bg-white p-8 shadow-lg rounded-xl">
            {!confirmed ? (
              <>
                <div ref={printRef} className="text-left space-y-4">
                  <h2 className="text-2xl font-bold text-center">Plan Summary</h2>

                  <div className="flex justify-between border-b pb-2">
                    <span><strong>Name:</strong> {userInfo.name}</span>
                    <span><strong>Age:</strong> {userInfo.age}</span>
                  </div>

                  {userInfo.city && <div><strong>City:</strong> {userInfo.city}</div>}

                  <div>
                    <h3 className="font-semibold mt-4 mb-2">Selected Modules:</h3>
                    <ul className="list-disc list-inside text-gray-700">
                      {modules.filter((m) => m.selected).map((m) => (
                        <li key={m.id}>{m.name} — ₹{m.sumInsured.toLocaleString()}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="border-t pt-3 space-y-1">
                    <div><strong>Payment Frequency:</strong> {paymentFrequency}</div>
                    <div><strong>Total Premium:</strong> ₹{calculatePremium()} / {paymentFrequency}</div>
                    <div><strong>Plan ID:</strong> INS-{Math.random().toString(36).substring(2, 6).toUpperCase()}-{Math.random().toString(36).substring(2, 6).toUpperCase()}</div>
                    {userInfo.email && (
                      <div><strong>Email:</strong> {userInfo.email}</div>
                    )}
                  </div>
                </div>

                <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
                  <button
                    onClick={handlePrint}
                    className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
                  >
                    Download PDF
                  </button>
                  <button
                    onClick={handleConfirm}
                    className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition"
                  >
                    Confirm & Save Plan
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h2 className="text-2xl font-bold text-green-700 mb-4">🎉 Your plan has been saved!</h2>
                <p className="text-gray-600">Thank you for using Modular Insurance.</p>
                <p className="mt-4 text-sm text-gray-500">This was a working prototype — no actual policy generated.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
