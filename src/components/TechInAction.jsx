import React from "react";
import { Link } from "react-router-dom";

const TechInAction = () => {
  return (
    <section className="min-h-screen py-16 px-6 bg-gray-50 dark:bg-[#111827]">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white">
          Tech in Action
        </h1>

        {/* Modular Insurance POC - Horizontal Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-md transition p-5 flex flex-col md:flex-row items-center gap-6 mb-10">
          {/* Left Side - Image & CTA */}
          <div className="flex flex-col items-center justify-center w-full md:w-1/3">
            <img
              src="/assets/rocket-launch.png"
              alt="Modular Insurance Rocket"
              className="rounded-lg object-contain h-40 mb-4"
            />
            <Link
              to="/modular"
              className="text-sm bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
            >
              See It Take Off
            </Link>
          </div>

          {/* Right Side - Title & Description */}
          <div className="w-full md:w-2/3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Modular Insurance Builder
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              A personalized, micro-insurance builder that allows users to choose
              covers, sum insured, and payment frequency — with real-time premium,
              GST, and downloadable branded PDF.
              <p className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                <strong>Disclaimer:</strong> The projects showcased on this page are intended as functional prototypes or concept demonstrations. They are not production-grade applications and may be subject to changes, limitations, or future iterations.
              </p>
            </p>
          </div>
        </div>

        {/* Corporate Modular Insurance - Horizontal Card */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow hover:shadow-md transition p-5 flex flex-col md:flex-row items-center gap-6">
          {/* Left Side - Image & CTA */}
          <div className="flex flex-col items-center justify-center w-full md:w-1/3">
            <img
              src="/assets/team-insurance.png" // Add this image to /public/assets
              alt="Corporate Insurance"
              className="rounded-lg object-contain h-40 mb-4"
            />
            <Link
              to="/corporate-modular"
              className="text-sm bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
            >
              Launch Corporate Builder
            </Link>
          </div>

          {/* Right Side - Title & Description */}
          <div className="w-full md:w-2/3">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Corporate Modular Insurance
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              A dedicated corporate insurance builder where employees can select mandatory and optional covers, auto-deduct from salary, or pay directly — complete with branded PDF, plan sharing, and smart suggestions.
            </p>
            <p className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400 max-w-3xl mx-auto">
                <strong>Disclaimer:</strong> The projects showcased on this page are intended as functional prototypes or concept demonstrations. They are not production-grade applications and may be subject to changes, limitations, or future iterations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechInAction;
