import React, { useEffect, useState } from "react";
import prebuiltPlans from "../data/prebuiltPlans"; // ✅ default import
import { useNavigate } from "react-router-dom";

const PrebuiltPlans = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const info = JSON.parse(localStorage.getItem("userInfo"));
    if (!info || !info.age) {
      navigate("/modular");
    } else {
      setUserInfo(info);
    }
  }, [navigate]);

  const filteredPlans = prebuiltPlans.filter(plan =>
    userInfo.age >= plan.ageRange[0] &&
    userInfo.age <= plan.ageRange[1] &&
    (!userInfo.budget || plan.premium <= userInfo.budget)
  );

  const handleSelect = (plan) => {
    localStorage.setItem("selectedPlan", JSON.stringify(plan));
    navigate("/confirmation");
  };

  const handleSkip = () => {
    if (userInfo.model === "single") {
      navigate("/builder-single", { state: userInfo });
    } else {
      navigate("/builder-multi", { state: userInfo });
    }
  };

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <p className="text-blue-700 dark:text-blue-300 italic text-center text-lg font-medium mb-4">
        “Pre-designed plans to simplify your choices — or build your own.”
      </p>

      <h2 className="text-2xl font-bold mb-2 text-center dark:text-white">
        Recommended Plans for You
      </h2>

      <p className="text-gray-600 text-center mb-6 dark:text-gray-300">
        Based on your age {userInfo.age}
        {userInfo.budget && <> and annual budget ₹{userInfo.budget}</>}
      </p>

      <div className="grid gap-4 md:grid-cols-2">
        {filteredPlans.length > 0 ? (
          filteredPlans.map((plan, index) => (
            <div
              key={index}
              className="border p-4 rounded-xl shadow hover:shadow-md transition bg-white dark:bg-gray-800"
            >
              <h3 className="text-xl font-semibold dark:text-white">{plan.name}</h3>
              <p className="text-sm text-gray-500 mb-2">{plan.tagline}</p>
              <ul className="text-sm mb-3 dark:text-gray-200">
                {Object.keys(plan.modules).map((mod, i) => (
                  <li key={i}>
                    ✅ {mod}: ₹{plan.modules[mod].sumInsured.toLocaleString()}
                  </li>
                ))}
              </ul>
              <p className="text-sm dark:text-gray-100">
                <strong>Premium:</strong> ₹{plan.premium}/yr + Taxes
                <br />
                <strong>Model:</strong> {plan.model}
                <br />
                <strong>Payment:</strong> {plan.payment}
              </p>
              <button
                onClick={() => handleSelect(plan)}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Select Plan
              </button>
            </div>
          ))
        ) : (
          <p className="text-center col-span-2 text-gray-500 dark:text-gray-300">
            No plans match your age {userInfo.age}
            {userInfo.budget && <> and budget ₹{userInfo.budget}</>}.
          </p>
        )}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500 mb-2 dark:text-gray-300">
          Want to build your own custom plan?
        </p>
        <button
          onClick={handleSkip}
          className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
        >
          Skip & Customize My Plan
        </button>
      </div>
    </div>
  );
};

export default PrebuiltPlans;
