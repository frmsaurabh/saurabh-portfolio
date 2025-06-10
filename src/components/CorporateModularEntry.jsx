import React from "react";
import { useNavigate } from "react-router-dom";
import CorporateBrand from "../components/CorporateBrand";
import SEO from "./SEO";

const CorporateModularEntry = () => {
  const navigate = useNavigate();

  const seoTitle = "Corporate Modular Insurance – Build Employee Plans";
  const seoDescription =
    "Start building customized modular insurance plans for your corporate employees with Creative Prototype Pvt. Ltd.";
  const seoUrl = "https://saurabhchandra.me/corporate-modular";

  const handleStart = () => {
    navigate("/corporate-login");
  };

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-white px-4 py-12 flex flex-col items-center justify-center">
        <div className="max-w-2xl text-center">
          <CorporateBrand />

          <h1 className="text-3xl font-bold mb-4">Corporate Modular Insurance</h1>
          <p className="text-lg mb-8">
            Build personalized insurance plans for your employees with ease. Start by choosing the right coverage model.
          </p>
          <button
            onClick={handleStart}
            className="text-lg px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl"
          >
            Start Building My Plan
          </button>
        </div>
      </div>
    </>
  );
};

export default CorporateModularEntry;
