import React from "react";

const Subscribe = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-6 text-center shadow-md mt-12">
      <h2 className="text-2xl font-semibold mb-2 text-gray-800 dark:text-white">
        Stay Updated
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-300">
        Subscribe to get updates when a new blog post goes live.
      </p>
      <form
        action="YOUR_MAILCHIMP_FORM_ACTION_URL"
        method="POST"
        target="_blank"
        noValidate
        className="flex flex-col sm:flex-row justify-center gap-3"
      >
        <input
          type="email"
          name="EMAIL"
          placeholder="Enter your email"
          required
          className="p-2 rounded-md border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white w-full sm:w-64"
        />
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default Subscribe;
