import React from "react";
import { Mail } from "lucide-react";
import linkedinLogo from "../assets/linkedin.png"; // Place LinkedIn logo in src/assets
import { Helmet } from "react-helmet";

export default function Contact() {
  const isContactPage = window.location.pathname === "/contact";

  return (
    <>
      {isContactPage && (
        <Helmet>
          <title>Contact | Saurabh Chandra</title>
          <meta
            name="description"
            content="Reach out for collaborations in insurance transformation, Oracle automation, or guest speaking engagements."
          />
          <meta property="og:title" content="Contact Saurabh Chandra" />
          <meta
            property="og:description"
            content="Let’s explore how we can build clarity and efficiency in insurance together."
          />
        </Helmet>
      )}

      <section className="max-w-3xl mx-auto py-16 px-4">
        <h2 className="text-3xl font-bold mb-6 text-center">Contact</h2>
        <p className="text-center text-gray-600 dark:text-gray-400 mb-10">
          Let's connect and explore how we can drive innovation in insurance and tech together.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-6">
          <a
            href="mailto:saurabh.31403@gmail.com"
            className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-5 py-3 rounded-lg hover:shadow-md transition text-black dark:text-white"
          >
            <Mail size={20} />
            <span className="text-sm font-medium">saurabh.31403@gmail.com</span>
          </a>

          <a
            href="https://www.linkedin.com/in/chandra-saurabh/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 bg-gray-100 dark:bg-gray-800 px-5 py-3 rounded-lg hover:shadow-md transition text-black dark:text-white"
          >
            <img src={linkedinLogo} alt="LinkedIn" className="w-5 h-5" />
            <span className="text-sm font-medium">LinkedIn Profile</span>
          </a>
        </div>
      </section>
    </>
  );
}
