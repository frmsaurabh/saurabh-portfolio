import React, { useState, useEffect } from "react";
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

const ModularBuilderCorporateMulti = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    name,
    age,
    gender,
    fromDetailsPage,
  } = location.state || {};

  const [selectedModules, setSelectedModules] = useState({
    Hospitalization: {
      sumInsured: "200000",
      frequency: "Monthly",
      paymentMethod: "Salary Deduction",
      isMandatory: true,
    },
  });

  const [maternity, setMaternity] = useState({
    si: "",
    freq: "Monthly",
    paymentMethod: "Salary Deduction",
  });

  const modules = [
    {
      name: "OPD Care",
      desc: "Outpatient consultations and diagnostics.",
      icon: <Stethoscope className="h-5 w-5" />,
    },
    {
      name: "Personal Accident",
      desc: "Financial support in case of accidental events.",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      name: "Mental Wellness",
      desc: "Counseling and therapy sessions.",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      name: "Cyber Insurance",
      desc: "Covers losses from online frauds.",
      icon: <UserCheck className="h-5 w-5" />,
    },
    {
      name: "Preventive Checkups",
      desc: "Annual health checkups and labs.",
      icon: <ShieldCheck className="h-5 w-5" />,
    },
    {
      name: "Electronic Gadget Cover",
      desc: "Covers smartphones, laptops, tablets.",
      icon: <Smartphone className="h-5 w-5" />,
    },
  ];

  const sumInsuredOptions = {
    "OPD Care": [5000, 10000, 15000],
    "Personal Accident": [100000, 200000, 500000],
    "Mental Wellness": [10000, 20000, 30000],
    "Cyber Insurance": [50000, 100000, 200000],
    "Preventive Checkups": [3000, 5000, 7000],
    "Electronic Gadget Cover": [10000, 20000, 50000],
  };

  const frequencies = ["Monthly", "Quarterly", "Annually"];
  const paymentMethods = ["Salary Deduction", "Pay Directly"];

  const handleModuleToggle = (moduleName) => {
    setSelectedModules((prev) => {
      const updated = { ...prev };
      if (updated[moduleName]) {
        delete updated[moduleName];
      } else {
        updated[moduleName] = {
          sumInsured: "",
          frequency: "Monthly",
          paymentMethod: "Salary Deduction",
        };
      }
      return updated;
    });
  };

  const handleChangeDetails = () => {
    navigate("/corporate-user-details", {
      state: { name, age, gender, fromBuilder: "multi" },
    });
  };

  return (
    <div className="px-4 py-6 max-w-6xl mx-auto">
      <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl p-5 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold">Corporate Multi-Cover Plan</h2>
          <p className="mt-1">
            Name: <strong>{name}</strong> &nbsp; Age: <strong>{age}</strong> &nbsp; Gender: <strong>{gender}</strong>
          </p>
        </div>
        {fromDetailsPage && (
          <button
            onClick={handleChangeDetails}
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-semibold hover:bg-blue-100"
          >
            Change Details
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[{ name: "Hospitalization", desc: "Covers inpatient hospitalization.", icon: <HeartPulse className="h-5 w-5" /> }, ...modules].map((module) => {
          const isMandatory = module.name === "Hospitalization";
          const isSelected = !!selectedModules[module.name];
          const moduleData = selectedModules[module.name] || {};

          return (
            <div key={module.name} className="bg-white rounded-xl shadow-sm p-5 flex flex-col gap-3 border">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 font-semibold text-lg mb-1">
                    {module.icon}
                    {module.name}
                    {isMandatory && <span className="text-sm text-red-500">(Mandatory)</span>}
                  </div>
                  <p className="text-sm text-gray-600">{module.desc}</p>
                </div>
                {!isMandatory && (
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
                )}
              </div>

              {isSelected && (
                <div className="flex flex-col md:flex-row gap-3 mt-2">
                  <div className="flex-1">
                    <label className="text-sm text-gray-700">Sum Insured</label>
                    <select
                      className="w-full mt-1 px-3 py-2 rounded-md border bg-gray-100"
                      value={moduleData.sumInsured}
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
                      {(sumInsuredOptions[module.name] || [200000, 300000, 500000]).map((amt) => (
                        <option key={amt} value={amt}>
                          ₹{amt.toLocaleString()}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex-1">
                    <label className="text-sm text-gray-700">Frequency</label>
                    <select
                      className="w-full mt-1 px-3 py-2 rounded-md border bg-gray-100"
                      value={moduleData.frequency}
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

                  <div className="flex-1">
                    <label className="text-sm text-gray-700">Payment Method</label>
                    <select
                      className="w-full mt-1 px-3 py-2 rounded-md border bg-gray-100"
                      value={moduleData.paymentMethod}
                      onChange={(e) =>
                        setSelectedModules((prev) => ({
                          ...prev,
                          [module.name]: {
                            ...prev[module.name],
                            paymentMethod: e.target.value,
                          },
                        }))
                      }
                    >
                      {paymentMethods.map((pm) => (
                        <option key={pm} value={pm}>
                          {pm}
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

      {/* Maternity Benefit */}
      {gender === "Female" && (
        <div className="mt-8 bg-pink-50 border border-pink-200 rounded-xl p-5">
          <div className="font-semibold text-lg flex items-center gap-2 mb-1">
            <Baby className="h-5 w-5 text-pink-400" />
            Maternity Benefit Rider
          </div>
          <p className="text-sm text-gray-600 mb-4">
            This rider provides maternity-related benefits tailored for females.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-700">Sum Insured</label>
              <select
                className="w-full mt-1 px-4 py-2 rounded-md border bg-gray-100"
                value={maternity.si}
                onChange={(e) =>
                  setMaternity((prev) => ({
                    ...prev,
                    si: e.target.value,
                  }))
                }
              >
                <option value="">Select</option>
                <option value="25000">₹25,000</option>
                <option value="50000">₹50,000</option>
                <option value="75000">₹75,000</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700">Frequency</label>
              <select
                className="w-full mt-1 px-4 py-2 rounded-md border bg-gray-100"
                value={maternity.freq}
                onChange={(e) =>
                  setMaternity((prev) => ({
                    ...prev,
                    freq: e.target.value,
                  }))
                }
              >
                {frequencies.map((f) => (
                  <option key={f} value={f}>
                    {f}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-700">Payment Method</label>
              <select
                className="w-full mt-1 px-4 py-2 rounded-md border bg-gray-100"
                value={maternity.paymentMethod}
                onChange={(e) =>
                  setMaternity((prev) => ({
                    ...prev,
                    paymentMethod: e.target.value,
                  }))
                }
              >
                {paymentMethods.map((pm) => (
                  <option key={pm} value={pm}>
                    {pm}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}

      <div className="mt-10 text-center">
        <button
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-full font-semibold shadow-md disabled:opacity-50"
          disabled={!selectedModules.Hospitalization}
          onClick={() =>
            navigate("/summary", {
              state: {
                name,
                age,
                gender,
                selectedModules,
                maternity: gender === "Female" ? maternity : null,
              },
            })
          }
        >
          Proceed to Summary
        </button>
      </div>
    </div>
  );
};

export default ModularBuilderCorporateMulti;


