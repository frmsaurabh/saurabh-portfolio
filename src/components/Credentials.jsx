import React from "react";
import { Briefcase, GraduationCap, FileText } from "lucide-react";
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";

const timeline = [
  {
    title: "Assistant Manager – IT",
    org: "New India Assurance Co. Ltd.",
    year: "December 2017–Present",
    icon: <Briefcase size={20} />,
    description:
      "Leading Oracle Financials and driving digital transformation across finance, health, and reinsurance domains.",
  },
  {
    title: "Probationary Officer",
    org: "Allahabad Bank (Now Indian Bank)",
    year: "July 2017–December 2017",
    icon: <Briefcase size={20} />,
    description:
      "Handled branch operations, mutual fund sales, and operational compliance.",
  },
  {
    title: "Building Myself",
    year: "November 2014–July 2017",
    icon: <Briefcase size={20} />,
    description:
      "Learning, upskilling, preparing for insurance and finance industry roles.",
  },
  {
    title: "Programmer Analyst Trainee",
    org: "Cognizant",
    year: "July 2014–November 2014",
    icon: <Briefcase size={20} />,
    description:
      "Trained in Basic programming languages.",
  },
];

const certifications = [
  "FRM Part 1 – GARP",
  "JAIIB – IIBF",
  "AML KYC – IIBF",
  "Licentiate – III",
  "Associate – III",
  "Fellow – III",
];

const contributions = [
  {
    title: "CAT Bonds & Climate Risk",
    desc: "Co-authored research in BimaQuest on CAT Bonds for climate risk (2022).",
    link: "https://bimaquest.niapune.org.in/index.php/bimaquest/article/view/118/84",
  },
  {
    title: "Securitization in Insurance",
    desc: "Published article in GI Council Newsletter.",
    link: "https://www.gicouncil.in/news-media/gic-in-the-news/securitization-in-insurance/",
  },
  {
    title: "Guest Faculty – NIA Pune",
    desc: "Delivered sessions on Oracle Financials at National Insurance Academy.",
  },
  {
    title: "Guest Faculty – III Mumbai",
    desc: "Regular trainer on insurance technology and ops.",
  },
];

export default function Credentials() {
  const location = useLocation();
  const isCredentialsPage = location.pathname === "/credentials"; // Ensure route matches exactly

  return (
    <>
      {isCredentialsPage && (
        <Helmet>
          <title>Credentials | Saurabh Chandra</title>
          <meta
            name="description"
            content="Certifications, achievements, and qualifications that establish Saurabh Chandra's domain and technical credibility."
          />
          <meta property="og:title" content="Credentials | Saurabh Chandra" />
          <meta
            property="og:description"
            content="Explore verified milestones in insurance, risk, and digital transformation."
          />
        </Helmet>
      )}

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">The Journey So Far</h2>

        {/* Experience Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {timeline.map((item, i) => (
            <div
              key={i}
              className="relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition"
            >
              <div className="absolute -top-4 left-4 bg-blue-600 text-white p-2 rounded-full">
                {item.icon}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">{item.year}</p>
              <h3 className="text-lg font-semibold">{item.title}</h3>
              {item.org && (
                <p className="text-sm italic text-gray-700 dark:text-gray-300 mb-2">{item.org}</p>
              )}
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Certifications */}
        <div className="mb-12">
          <h3 className="flex items-center gap-2 text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            <GraduationCap size={20} /> Certifications
          </h3>
          <div className="flex flex-wrap gap-3">
            {certifications.map((cert, i) => (
              <span
                key={i}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-800 dark:text-gray-300 border border-gray-300 dark:border-gray-600"
              >
                {cert}
              </span>
            ))}
          </div>
        </div>

        {/* Contributions */}
        <div>
          <h3 className="flex items-center gap-2 text-xl font-semibold mb-4 text-blue-600 dark:text-blue-400">
            <FileText size={20} /> Thought Leadership & Contributions
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            {contributions.map((item, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-5 rounded-xl hover:shadow-lg transition"
              >
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item.link ? (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      {item.title}
                    </a>
                  ) : (
                    item.title
                  )}
                </h4>
                <p className="text-sm text-gray-700 dark:text-gray-300">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
