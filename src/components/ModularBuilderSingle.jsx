import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  ShieldCheck,
  HeartPulse,
  Brain,
  Stethoscope,
  UserCheck,
  Smartphone,
  Baby,
} from "lucide-react";
import SEO from "../components/SEO";

const seoTitle = "Build Your Modular Insurance Plan | Modular Insurance";
const seoDescription =
  "Create your personalized modular insurance plan tailored to your needs. Select modules, sum insured, payment frequencies, and top insurers.";
const seoUrl = "https://saurabhchandra.me/modular-builder-single";

const ModularBuilderSingle = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const userData = location?.state || {};
  const { name, age, gender } = userData;

  const [insurer, setInsurer] = useState(userData.insurer || "");
  const [selectedModules, setSelectedModules] = useState({});
  const [maternity, setMaternity] = useState({ si: "", freq: "Monthly" });
  const [errors, setErrors] = useState({});

  const insurers = [
    "Good Cover Pvt Ltd.",
    "Kind Care Pvt. Ltd.",
    "Hope Plus Pvt. Ltd.",
    "Clean Cover Pvt. Ltd.",
    "Cover Plus Pvt. Ltd.",
  ];

  const modules = [
    {
      name: "OPD Care",
      desc: "Coverage for outpatient doctor visits and diagnostics.",
      icon: <Stethoscope className="h-5 w-5" />,
    },
    {
      name: "Personal Accident",
      desc: "Financial support in case of accidental injuries or death.",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      name: "Mental Wellness",
      desc: "Support for therapy, counseling and mental health sessions.",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      name: "Cyber Insurance",
      desc: "Covers losses from digital fraud or identity theft.",
      icon: <UserCheck className="h-5 w-5" />,
    },
    {
      name: "Hospitalization",
      desc: "Covers inpatient hospitalization costs.",
      icon: <HeartPulse className="h-5 w-5" />,
    },
    {
      name: "Preventive Checkups",
      desc: "Annual health checkups, lab tests and consultations.",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      name: "Electronic Gadget Cover",
      desc: "Protect your mobile, laptop, and devices from damage or theft.",
      icon: <Smartphone className="h-5 w-5" />,
    },
  ];

  const sumInsuredOptions = {
    "OPD Care": [5000, 10000, 15000],
    "Personal Accident": [100000, 200000, 500000],
    "Mental Wellness": [10000, 20000, 30000],
    "Cyber Insurance": [50000, 100000, 200000],
    "Hospitalization": [200000, 300000, 500000],
    "Preventive Checkups": [3000, 5000, 7000],
    "Electronic Gadget Cover": [10000, 20000, 50000],
  };

  const frequencies = ["Monthly", "Quarterly", "Annually"];

  const handleModuleToggle = (moduleName) => {
    if (!insurer) return alert("Please select an insurer first.");
    setSelectedModules((prev) => {
      const updated = { ...prev };
      if (updated[moduleName]) {
        delete updated[moduleName];
      } else {
        updated[moduleName] = { sumInsured: "", frequency: "Monthly" };
      }
      return updated;
    });
  };

  const handleProceed = () => {
    const newErrors = {};
    Object.entries(selectedModules).forEach(([mod, val]) => {
      if (!val.sumInsured) newErrors[mod] = "Please select Sum Insured";
    });

    const isAnyModuleSelected = Object.keys(selectedModules).length > 0;
    const isMaternitySelected = gender === "Female" && maternity.si;
    if (!isAnyModuleSelected && !isMaternitySelected) {
      alert("Please select at least one module or maternity benefit.");
      return;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    navigate("/summary", {
      state: {
        name,
        age,
        gender,
        insurer,
        selectedModules,
        maternity,
        model: "single",
        datePaid: new Date().toISOString(),
        autoDebit: JSON.parse(localStorage.getItem("autoDebit")),
      },
    });
  };

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />
      <div className="px-4 py-6 max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl p-5 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold">Build Your Modular Plan</h2>
            <p className="mt-1">
              Name: <strong>{name}</strong> &nbsp; Age: <strong>{age}</strong> &nbsp; Gender:{" "}
              <strong>{gender}</strong>
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-3 items-start md:items-center w-full md:w-auto">
            <select
              className="bg-white text-gray-700 px-3 py-2 rounded-md border w-full md:w-auto"
              value={insurer}
              onChange={(e) => setInsurer(e.target.value)}
            >
              <option value="">Select Insurer</option>
              {insurers.map((ins, idx) => (
                <option key={idx} value={ins}>
                  {ins}
                </option>
              ))}
            </select>
            <button
              onClick={() =>
                navigate("/modular", {
                  state: { name, age, gender, insurer, from: "builder-single" },
                })
              }
              className="bg-white text-blue-600 font-semibold px-4 py-2 border border-white rounded hover:bg-blue-100"
            >
              Change Details
            </button>
          </div>
        </div>

        {/* Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modules.map((module) => {
            const isSelected = !!selectedModules[module.name];
            return (
              <div key={module.name} className="bg-white rounded-xl shadow-sm p-5 border">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center gap-2 font-semibold text-lg mb-1">
                      {module.icon}
                      {module.name}
                    </div>
                    <p className="text-sm text-gray-600">{module.desc}</p>
                  </div>
                  <button
                    onClick={() => handleModuleToggle(module.name)}
                    className={`px-4 py-1 rounded-full text-sm font-semibold border ${
                      isSelected
                        ? "text-red-500 border-red-300 hover:bg-red-100"
                        : "text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    {isSelected ? "Remove" : "Add"}
                  </button>
                </div>

                {isSelected && (
                  <div className="mt-3 flex flex-col md:flex-row gap-3">
                    <div className="flex-1">
                      <label className="text-sm text-gray-700">Sum Insured</label>
                      <select
                        className="w-full mt-1 px-3 py-2 rounded-md border bg-gray-100"
                        value={selectedModules[module.name]?.sumInsured || ""}
                        onChange={(e) =>
                          setSelectedModules((prev) => ({
                            ...prev,
                            [module.name]: {
                              ...prev[module.name],
                              sumInsured: e.target.value,
                            },
                          }))
                        }
                      >
                        <option value="">Select</option>
                        {sumInsuredOptions[module.name].map((amt) => (
                          <option key={amt} value={amt}>
                            ₹{amt.toLocaleString()}
                          </option>
                        ))}
                      </select>
                      {errors[module.name] && (
                        <p className="text-sm text-red-500 mt-1">{errors[module.name]}</p>
                      )}
                    </div>

                    <div className="flex-1">
                      <label className="text-sm text-gray-700">Frequency</label>
                      <select
                        className="w-full mt-1 px-3 py-2 rounded-md border bg-gray-100"
                        value={selectedModules[module.name]?.frequency || "Monthly"}
                        onChange={(e) =>
                          setSelectedModules((prev) => ({
                            ...prev,
                            [module.name]: {
                              ...prev[module.name],
                              frequency: e.target.value,
                            },
                          }))
                        }
                      >
                        {frequencies.map((freq) => (
                          <option key={freq} value={freq}>
                            {freq}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Maternity */}
        {gender === "Female" && (
          <div className="mt-8 bg-pink-50 border border-pink-200 rounded-xl p-5">
            <div className="font-semibold text-lg flex items-center gap-2 mb-1">
              <Baby className="h-5 w-5 text-pink-400" />
              Maternity Benefit Rider
            </div>
            <p className="text-sm text-gray-600 mb-4">
              This rider provides maternity-related benefits tailored for females.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-700">Sum Insured</label>
                <select
                  className="w-full mt-1 px-4 py-2 rounded-md border bg-gray-100"
                  value={maternity.si}
                  onChange={(e) => setMaternity((prev) => ({ ...prev, si: e.target.value }))}
                >
                  <option value="">Select</option>
                  <option value="40000">₹40,000</option>
                  <option value="75000">₹75,000</option>
                  <option value="100000">₹1,00,000</option>
                </select>
              </div>

              <div>
                <label className="text-sm text-gray-700">Payment Frequency</label>
                <select
                  className="w-full mt-1 px-4 py-2 rounded-md border bg-gray-100"
                  value={maternity.freq}
                  onChange={(e) => setMaternity((prev) => ({ ...prev, freq: e.target.value }))}
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Annually">Annually</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* Proceed Button */}
        <div className="text-center mt-8">
          <button
            onClick={handleProceed}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl text-lg hover:bg-blue-700"
          >
            Proceed to Confirmation
          </button>
        </div>
      </div>
    </>
  );
};

export default ModularBuilderSingle;
