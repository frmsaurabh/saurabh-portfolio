import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Baby, Brain, CreditCard, Shield, Stethoscope } from "lucide-react";
import SEO from "../components/SEO"; // Added SEO import

const dummyInsurers = [
  "Good Cover Pvt. Ltd.",
  "Kind Care Pvt. Ltd.",
  "Cover Plus Pvt. Ltd.",
  "Hope Plus Pvt. Ltd.",
  "Clean Cover Pvt. Ltd.",
];

const modulesData = [
  {
    key: "opd",
    name: "OPD Care",
    icon: <Stethoscope className="w-5 h-5 mr-2" />,
    description: "Outpatient doctor visits, diagnostics, and medicines.",
    sumInsuredOptions: [5000, 10000, 15000],
  },
  {
    key: "mental",
    name: "Mental Wellness",
    icon: <Brain className="w-5 h-5 mr-2" />,
    description: "Psychiatric consultations and mental wellness therapy.",
    sumInsuredOptions: [10000, 20000, 30000],
  },
  {
    key: "cyber",
    name: "Cyber Insurance",
    icon: <CreditCard className="w-5 h-5 mr-2" />,
    description: "Protection from digital fraud and identity theft.",
    sumInsuredOptions: [50000, 100000, 200000],
  },
  {
    key: "hospitalization",
    name: "Hospitalization",
    icon: <Shield className="w-5 h-5 mr-2" />,
    description: "Covers expenses during hospital admissions.",
    sumInsuredOptions: [100000, 200000, 300000],
  },
  {
    key: "accident",
    name: "Personal Accident",
    icon: <Shield className="w-5 h-5 mr-2" />,
    description: "Covers accidental injuries, disability, or death.",
    sumInsuredOptions: [200000, 500000, 1000000],
  },
  {
    key: "gadget",
    name: "Electronic Gadget",
    icon: <CreditCard className="w-5 h-5 mr-2" />,
    description: "Damage protection for mobile, laptop, or tablet.",
    sumInsuredOptions: [10000, 20000, 30000],
  },
];

const ModularBuilderMulti = () => {
  const location = useLocation();
  const { state } = location || {};
  const navigate = useNavigate();

  if (!state) {
    return (
      <div className="p-6 text-red-600 text-center">
        Invalid access. Please start from Modular Entry page.
      </div>
    );
  }

  const { name, age, gender, dob, email, mobile } = state;

  const [selectedModules, setSelectedModules] = useState({});
  const [maternity, setMaternity] = useState({ si: "", insurer: "" });

  const handleToggle = (key) => {
    setSelectedModules((prev) => ({
      ...prev,
      [key]: prev[key]
        ? undefined
        : {
            sumInsured: "",
            frequency: "Monthly",
            insurer: "",
          },
    }));
  };

  const handleChange = (key, field, value) => {
    setSelectedModules((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        [field]: value,
      },
    }));
  };

  const frequencies = ["Monthly", "Quarterly", "Yearly"];

  const handleProceed = () => {
    const selectedKeys = Object.keys(selectedModules);
    const hasModules = selectedKeys.length > 0 || maternity.si;
    if (!hasModules) {
      alert("Please select at least one module.");
      return;
    }

    for (const [key, val] of Object.entries(selectedModules)) {
      if (!val.sumInsured || !val.insurer) {
        alert(`Please select Sum Insured and Insurer for the selected cover.`);
        return;
      }
    }

    // Validate maternity insurer and sum insured
    if (maternity.si) {
      if (!maternity.insurer || maternity.insurer === "") {
        alert("Please select an insurer for Maternity Benefit.");
        return;
      }
    }

    const moduleFrequencies = {};
    Object.keys(selectedModules).forEach((mod) => {
      moduleFrequencies[mod] = selectedModules[mod].frequency || "Annual";
    });

    const maternityWithInsurer = {
      ...maternity,
      insurer: maternity.insurer || "",
    };

    navigate("/summary", {
      state: {
        name,
        age,
        dob,
        gender,
        email,
        mobile,
        selectedModules,
        frequencies: moduleFrequencies,
        insurer: "",
        maternity: maternityWithInsurer,
        model: "multi",
        datePaid: new Date().toISOString(),
        autoDebit: JSON.parse(localStorage.getItem("autoDebit")),
      },
    });
  };

  const handleBack = () => {
    navigate("/modular", {
      state: {
        name,
        age,
        dob,
        gender,
        email,
        mobile,
        from: "builder-multi",
      },
    });
  };

  // SEO meta tags info
  const seoTitle = "Modular Insurance Builder - Multi-Insurer Aggregator Model";
  const seoDescription = "Build your customized modular insurance plan with multiple insurers and flexible cover options.";
  const seoUrl = "https://saurabhchandra.me/modular-builder-multi";

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />

      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold">Modular Plan – Aggregator Model</h2>
            <p className="text-sm text-gray-600">
              Name: <strong>{name}</strong>, Age: <strong>{age}</strong>, Gender:{" "}
              <strong>{gender}</strong>
            </p>
          </div>
          <button onClick={handleBack} className="text-sm text-blue-600 underline">
            Change Details
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {modulesData.map((m) => {
            const selected = selectedModules[m.key];
            return (
              <div key={m.key} className="border rounded-xl p-4 shadow">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    {m.icon}
                    <h3 className="font-semibold">{m.name}</h3>
                  </div>
                  <button
                    onClick={() => handleToggle(m.key)}
                    className={`text-sm px-2 py-1 rounded ${
                      selected ? "bg-red-100 text-red-600" : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {selected ? "Remove" : "Add"}
                  </button>
                </div>
                <p className="text-sm text-gray-500">{m.description}</p>

                {selected && (
                  <div className="space-y-2 mt-3">
                    <div>
                      <label className="text-sm">Sum Insured:</label>
                      <select
                        className="w-full mt-1 p-2 border rounded"
                        value={selected.sumInsured}
                        onChange={(e) =>
                          handleChange(m.key, "sumInsured", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        {m.sumInsuredOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            ₹{opt.toLocaleString()}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm">Payment Frequency:</label>
                      <select
                        className="w-full mt-1 p-2 border rounded"
                        value={selected.frequency}
                        onChange={(e) =>
                          handleChange(m.key, "frequency", e.target.value)
                        }
                      >
                        {frequencies.map((f) => (
                          <option key={f}>{f}</option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="text-sm">Insurer:</label>
                      <select
                        className="w-full mt-1 p-2 border rounded"
                        value={selected.insurer}
                        onChange={(e) =>
                          handleChange(m.key, "insurer", e.target.value)
                        }
                      >
                        <option value="">Select</option>
                        {dummyInsurers.map((ins) => (
                          <option key={ins} value={ins}>
                            {ins}
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
                  <option value="40000">₹40,000</option>
                  <option value="75000">₹75,000</option>
                  <option value="100000">₹1,00,000</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700">Payment Frequency</label>
                <select
                  className="w-full mt-1 px-4 py-2 rounded-md border bg-gray-100"
                  value={maternity.frequency || "Monthly"}
                  onChange={(e) =>
                    setMaternity((prev) => ({
                      ...prev,
                      frequency: e.target.value,
                    }))
                  }
                >
                  <option value="Monthly">Monthly</option>
                  <option value="Quarterly">Quarterly</option>
                  <option value="Yearly">Yearly</option>
                </select>
              </div>
              <div>
                <label className="text-sm text-gray-700">Insurer</label>
                <select
                  className="w-full mt-1 px-4 py-2 rounded-md border bg-gray-100"
                  value={maternity.insurer || ""}
                  onChange={(e) =>
                    setMaternity((prev) => ({
                      ...prev,
                      insurer: e.target.value,
                    }))
                  }
                >
                  <option value="">Select</option>
                  {dummyInsurers.map((ins) => (
                    <option key={ins} value={ins}>
                      {ins}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleProceed}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow hover:bg-blue-700"
          >
            Proceed to Confirmation
          </button>
        </div>
      </div>
    </>
  );
};

export default ModularBuilderMulti;
