import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Baby, Shield, Stethoscope, HeartPulse, Brain, ShieldCheck, MonitorSmartphone, ShieldAlert
} from "lucide-react";
import CorporateBrand from "../components/CorporateBrand";
import SEO from "../components/SEO";  // <-- Added SEO import

const ModularBuilderCorporateSingle = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { name, age, dob, gender, email, mobile, fromDetailsPage } = state || {};

  const frequencies = ["Monthly", "Quarterly", "Yearly"];
  const paymentMethods = ["Salary Deduction", "Pay Directly"];
  const insurers = [
    "Good Cover Pvt Ltd.",
    "Kind Care Pvt. Ltd.",
    "Hope Plus Pvt. Ltd.",
    "Clean Cover Pvt. Ltd.",
    "Cover Plus Pvt. Ltd.",
  ];

  const [insurer, setInsurer] = useState(state?.insurer || "");
  const [insurerError, setInsurerError] = useState(false);

  const [hospitalization, setHospitalization] = useState({
    sumInsured: "200000",
    frequency: "Monthly",
    payment: "Salary Deduction",
  });

  const [maternity, setMaternity] = useState({
    si: "",
    frequency: "Monthly",
    payment: "Pay Directly",
  });

  const [modules, setModules] = useState({
    opd: null,
    accident: null,
    mental: null,
    cyber: null,
    checkup: null,
    gadget: null,
  });

  const handleModuleChange = (key, field, value) => {
    setModules((prev) => ({
      ...prev,
      [key]: { ...prev[key], [field]: value },
    }));
  };

  const calculatePremium = () => {
    let base = 0;
    if (hospitalization.sumInsured) base += parseInt(hospitalization.sumInsured) * 0.01;
    if (gender === "Female" && maternity.si) base += parseInt(maternity.si) * 0.01;
    Object.values(modules).forEach((mod) => {
      if (mod?.si) base += parseInt(mod.si) * 0.01;
    });
    const charge = +(base * 0.05).toFixed(2);
    const gst = +((base + charge) * 0.18).toFixed(2);
    return {
      base: base.toFixed(2),
      charge: charge.toFixed(2),
      gst: gst.toFixed(2),
      total: (base + charge + gst).toFixed(2),
    };
  };

  const premium = calculatePremium();

  const moduleConfig = [
    {
      key: "hospitalization",
      label: "Hospitalization (Mandatory)",
      icon: <Shield className="text-blue-500 w-5 h-5" />,
      isMandatory: true,
      state: hospitalization,
      setState: setHospitalization,
      siOptions: ["100000", "200000", "300000"],
    },
    {
      key: "opd",
      label: "OPD Care",
      icon: <Stethoscope className="text-purple-500 w-5 h-5" />,
      description: "Consultations, diagnostics, outpatient procedures.",
    },
    {
      key: "accident",
      label: "Personal Accident",
      icon: <ShieldAlert className="text-red-500 w-5 h-5" />,
      description: "Covers accidental injuries & permanent disabilities.",
    },
    {
      key: "mental",
      label: "Mental Wellness",
      icon: <Brain className="text-indigo-500 w-5 h-5" />,
      description: "Therapies, counseling, mental health sessions.",
    },
    {
      key: "cyber",
      label: "Cyber Insurance",
      icon: <MonitorSmartphone className="text-green-600 w-5 h-5" />,
      description: "Covers fraud, data theft, and cyber threats.",
    },
    {
      key: "checkup",
      label: "Preventive Checkups",
      icon: <HeartPulse className="text-rose-500 w-5 h-5" />,
      description: "Annual checkups and early screenings.",
    },
    {
      key: "gadget",
      label: "Gadget Protection",
      icon: <ShieldCheck className="text-gray-600 w-5 h-5" />,
      description: "Covers damage/loss of devices.",
    },
  ];

  const handleProceed = () => {
    if (!insurer) {
      setInsurerError(true);
      return;
    }
  
   // Validate SI for all selected optional modules
   const missingSI = Object.entries(modules).some(
    ([key, mod]) => mod && (!mod.si || mod.si.trim() === "")
   );
   const maternitySIRequired = gender === "Female" && maternity.si !== "" && !maternity.si.trim();

 
   if (missingSI || maternitySIRequired) {
     alert("Please select Sum Insured for all added covers.");
     return;
   }

    navigate("/corporate-plan-summary", {
      state: {
        name, age, dob, gender, email, mobile, insurer,
        hospitalization,
        maternity: gender === "Female" ? maternity : null,
        modules,
        model: "single",
        premium,
        datePaid: new Date().toISOString(),
        autoDebit: JSON.parse(localStorage.getItem("autoDebit")),
      },
    });
  };

  const handleBack = () => {
    const { salary, employeeId } = state || {};
    navigate("/corporate-user-details", {
      state: {
        from: "change-details",
        name, age, dob, gender, email, mobile, salary, employeeId
      },
    });
  };

  // SEO meta tags info
  const seoTitle = "Corporate Modular Insurance Builder - Single Insurer Plan";
  const seoDescription = "Build your corporate modular insurance plan with a single insurer. Customize covers, frequency, and payment options.";
  const seoUrl = "https://saurabhchandra.me/corporate-modular-builder-single";

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />

      <div className="px-4 py-6 max-w-6xl mx-auto">
        <div className="bg-gradient-to-r from-indigo-500 to-blue-500 text-white rounded-xl p-5 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="text-center mb-6">
            <CorporateBrand />
            <h2 className="text-xl md:text-2xl font-semibold text-white opacity-90">Corporate Plan</h2>
            <p className="mt-1 text-sm text-white opacity-90">
              Tailored modular insurance solutions for your workforce
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
            <select className="bg-white text-gray-700 px-3 py-2 rounded-md border w-full md:w-auto"
              value={insurer}
              onChange={(e) => {
                setInsurer(e.target.value);
                setInsurerError(false);
              }}
            >
              <option value="">Select Insurer</option>
              {insurers.map((ins) => (
                <option key={ins} value={ins}>{ins}</option>
              ))}
            </select>
            {fromDetailsPage && (
              <button onClick={handleBack} className="bg-white text-blue-600 font-semibold px-4 py-2 border border-white rounded hover:bg-blue-100">
                Change Details
              </button>
            )}
          </div>
        </div>

        {insurerError && (
          <p className="text-red-500 text-sm text-center mb-4">Please select an insurer before proceeding.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {moduleConfig.map((mod) => {
            const isMandatory = mod.isMandatory;
            const modState = isMandatory ? mod.state : modules[mod.key];
            const updateState = isMandatory
              ? mod.setState
              : (val) => handleModuleChange(mod.key, val.field, val.value);

            return (
              <div key={mod.key} className="bg-white border rounded-xl p-5 shadow-sm">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 font-semibold text-lg">
                    {mod.icon}
                    {mod.label}
                  </div>
                  {!isMandatory && (
                    <button
                      onClick={() => {
                        if (!insurer) {
                          alert("Please select an insurer before choosing any cover.");
                          return;
                        }
                        modules[mod.key]
                          ? setModules((prev) => {
                              const updated = { ...prev };
                              delete updated[mod.key];
                              return updated;
                            })
                          : setModules((prev) => ({
                              ...prev,
                              [mod.key]: {
                                si: "",
                                frequency: "Monthly",
                                payment: "Pay Directly",
                              },
                            }));
                        }}
                        className={`px-4 py-1 rounded-full text-sm font-semibold border ${
                          modules[mod.key]
                            ? "text-red-500 border-red-300 hover:bg-red-100"
                            : "text-emerald-600 border-emerald-300 hover:bg-emerald-50"
                        }`}
                      >
                        {modules[mod.key] ? "Remove" : "Add"}
                      </button>
                    )}
                </div>
                {!isMandatory && <p className="text-sm text-gray-600 mb-2">{mod.description}</p>}
                {(isMandatory || modules[mod.key]) && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm">Sum Insured</label>
                      <select className="w-full mt-1 p-2 border rounded"
                        value={modState?.si || modState?.sumInsured || ""}
                        onChange={(e) =>
                          isMandatory
                            ? updateState({ ...modState, sumInsured: e.target.value })
                            : updateState({ field: "si", value: e.target.value })
                        }
                      >
                        <option value="">Select</option>
                        {(mod.siOptions || ["10000", "25000", "50000"]).map((amt) => (
                          <option key={amt} value={amt}>₹{parseInt(amt).toLocaleString()}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm">Frequency</label>
                      <select className="w-full mt-1 p-2 border rounded"
                        value={modState?.frequency || "Monthly"}
                        onChange={(e) =>
                          isMandatory
                            ? updateState({ ...modState, frequency: e.target.value })
                            : updateState({ field: "frequency", value: e.target.value })
                        }
                      >
                        {frequencies.map((f) => (
                          <option key={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm">Payment Method</label>
                      <select className="w-full mt-1 p-2 border rounded"
                        value={modState?.payment || "Pay Directly"}
                        onChange={(e) =>
                          isMandatory
                            ? null
                            : updateState({ field: "payment", value: e.target.value })
                        }
                        disabled={isMandatory}
                      >
                        {paymentMethods.map((p) => (
                          <option key={p}>{p}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

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
                <label className="text-sm">Sum Insured</label>
                <select className="w-full mt-1 px-4 py-2 rounded-md border bg-gray-100"
                  value={maternity.si}
                  onChange={(e) => setMaternity((prev) => ({ ...prev, si: e.target.value }))}
                >
                  <option value="">Select</option>
                  <option value="25000">₹25,000</option>
                  <option value="50000">₹50,000</option>
                  <option value="75000">₹75,000</option>
                </select>
              </div>
              <div>
                <label className="text-sm">Frequency</label>
                <select className="w-full mt-1 px-4 py-2 rounded-md border bg-gray-100"
                  value={maternity.frequency}
                  onChange={(e) => setMaternity((prev) => ({ ...prev, frequency: e.target.value }))}
                >
                  {frequencies.map((f) => (
                    <option key={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm">Payment Method</label>
                <select className="w-full mt-1 px-4 py-2 rounded-md border bg-gray-100"
                  value={maternity.payment}
                  onChange={(e) => setMaternity((prev) => ({ ...prev, payment: e.target.value }))}
                >
                  {paymentMethods.map((p) => (
                    <option key={p}>{p}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 text-center">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold shadow-md"
            onClick={handleProceed}
          >
            Proceed to Confirmation
          </button>
        </div>
      </div>
    </>
  );
};

export default ModularBuilderCorporateSingle;
