import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ShieldCheck, Building2 } from "lucide-react";

const CorporateSelectModel = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state;

  const handleSelect = (model) => {
    if (model === "single") {
      navigate("/corporate-modular/builder-single", { state });
    } else if (model === "multi") {
      navigate("/corporate-modular/builder-multi",{ state } );
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-6 py-12 flex flex-col items-center">
      <div className="max-w-4xl w-full">
        <h2 className="text-3xl font-bold text-center mb-8">
          Choose Your Corporate Insurance Model
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Single Insurer Card */}
          <div className="border rounded-2xl p-6 shadow hover:shadow-lg transition bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center mb-4 gap-3">
              <ShieldCheck className="w-8 h-8 text-blue-600" />
              <h3 className="text-xl font-semibold">Single Insurer – Multiple Covers</h3>
            </div>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
              Choose one insurer and build your plan using all available modules. Simple and unified management.
            </p>
            <button
              onClick={() => handleSelect("single")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Select This Model
            </button>
          </div>

          {/* Multiple Insurer Card */}
          <div className="border rounded-2xl p-6 shadow hover:shadow-lg transition bg-gray-50 dark:bg-gray-800">
            <div className="flex items-center mb-4 gap-3">
              <Building2 className="w-8 h-8 text-purple-600" />
              <h3 className="text-xl font-semibold">Multiple Insurers – Multiple Covers</h3>
            </div>
            <p className="mb-6 text-sm text-gray-600 dark:text-gray-300">
              Select a different insurer for each module. More flexibility, better customization for your needs.
            </p>
            <button
              onClick={() => handleSelect("multi")}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
            >
              Select This Model
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CorporateSelectModel;
