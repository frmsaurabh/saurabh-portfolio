import React from "react";
import { Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from 'react-helmet';
import { useLocation } from "react-router-dom";

const projects = [
  {
    title: "Disbursement Bank Integration",
    description: "Enabled seamless end-to-end encrypted disbursements through bank APIs. Processing 70K+ payments daily.",
    tags: ["Banking", "API", "Insurance"],
  },
  {
    title: "GST Implementation",
    description: "Integrated GST compliance within Oracle Financials with complete India localization.",
    tags: ["Oracle", "GST", "Finance"],
  },
  {
    title: "Org Restructuring",
    description: "Moved from 4-tier to 3-tier org with TDS and payment centralization.",
    tags: ["Compliance", "Finance", "Oracle"],
  },
  {
    title: "NHCX & ABHA Integration",
    description: "Built portals for ABHA creation and claim processing via NHCX APIs.",
    tags: ["HealthTech", "GovTech", "Digital Insurance"],
  },
  {
    title: "ISD in Oracle",
    description: "Implemented Input Service Distribution with accurate tax split logic.",
    tags: ["Oracle", "Taxation", "ISD"],
  },
  {
    title: "GSTR Reconciliation",
    description: "RPA bots automated monthly returns and minimized input credit loss.",
    tags: ["Automation", "RPA", "GST"],
  },
  {
    title: "Finance RPA Deployment",
    description: "Used bots for automated reconciliation and reporting.",
    tags: ["Finance", "RPA", "Efficiency"],
  },
];

export default function Projects() {
  const location = useLocation();
  const isProjectsPage = location.pathname === "/projects";

  return (
    <>
      {isProjectsPage && (
        <Helmet>
          <title>Projects | Saurabh Chandra</title>
          <meta name="description" content="A showcase of projects led by Saurabh: GST rollout, ABHA & NHCX integrations, Oracle automation, RPA systems, and more." />
          <meta property="og:title" content="Projects | Oracle, GST, ABHA, and RPA" />
          <meta property="og:description" content="Dive into enterprise-scale projects solving critical challenges in India's insurance landscape." />
        </Helmet>
      )}

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 flex justify-center items-center gap-2">
          <Briefcase className="w-6 h-6" />
          Projects
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white/70 dark:bg-[#1e293b]/70 border border-gray-200 dark:border-gray-700 rounded-xl p-6 shadow-md hover:shadow-xl transition duration-300 backdrop-blur"
            >
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-3 py-1 rounded-full font-medium bg-gradient-to-br from-blue-100 to-blue-200 text-blue-900 dark:from-blue-900 dark:to-blue-700 dark:text-white"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  );
}
