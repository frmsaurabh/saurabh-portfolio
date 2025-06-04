import React from "react";
import About from "./About";
import Projects from "./Projects";
import Contact from "./Contact";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import Subscribe from "./Subscribe";
import Credentials from "./Credentials";
import { Helmet } from "react-helmet";

const keywords = [
  "Techno-Functional",
  "Oracle Financials",
  "InsurTech",
  "BFSI",
  "Risk Management",
  "Digital Transformation",
];

export default function HomePage() {
  
  return (
    <>
      <Helmet>
        <title>Saurabh Chandra | Simplifying Insurance Through Tech</title>
        <meta name="description" content="Empowering insurers with digital transformation, Oracle Financials automation, and AI-driven clarity in policy design." />
        <meta property="og:title" content="Saurabh Chandra | Simplifying Insurance Through Tech" />
        <meta property="og:description" content="Explore Saurabh's unique blend of insurance domain expertise and technology leadership." />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="relative space-y-32 scroll-smooth">

        {/* Vertical Timeline Dots */}
        <div className="fixed left-4 top-1/3 z-50 hidden md:flex flex-col items-center gap-4">
          <a href="#about" className="w-3 h-3 rounded-full bg-gray-400 hover:bg-blue-500 transition" />
          <a href="#projects" className="w-3 h-3 rounded-full bg-gray-400 hover:bg-blue-500 transition" />
          <a href="#contact" className="w-3 h-3 rounded-full bg-gray-400 hover:bg-blue-500 transition" />
        </div>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-5xl text-4xl font-extrabold mb-4 text-gray-900 dark:text-white">
            Saurabh Chandra
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-6">
            Simplifying Insurance Through Tech
          </h2>
          <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 mb-4">
             Digital transformation meets insurance clarity.
          </p>


          {/* Animated Keywords */}
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl px-6">
            {keywords.map((word, i) => (
              <motion.span
                key={word}
                className="text-sm md:text-base px-3 py-1 rounded-full border dark:border-gray-700 border-gray-300 text-gray-600 dark:text-gray-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                {word}
              </motion.span>
            ))}
          </div>

          {/* Scroll Down Button */}
          <a href="#about" className="mt-10 animate-bounce text-blue-500 dark:text-blue-400 hover:text-blue-700 transition">
            <ChevronDown size={28} />
          </a>
        </section>

        {/* What I Do Section */}
        <section className="px-4 -mt-24">
          <div className="max-w-4xl mx-auto text-center bg-gray-100 dark:bg-gray-800 p-8 rounded-xl shadow-md">
            <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">What I Do</h3>
            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg leading-relaxed">
              I help insurance businesses modernize their legacy operations by blending domain expertise with modern technologies.
              From designing scalable architectures to implementing Oracle Financials and automating health claims,
              I specialize in delivering functional clarity, seamless integrations, and customer-first innovations.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="scroll-mt-20 px-4">
          <About />
        </section>

        {/* Projects Section */}
        <section id="projects" className="scroll-mt-20 px-4">
          <Projects />
        </section>

        {/* Credentials Section */}
        <section id="credentials" className="scroll-mt-20 px-4">
          <Credentials />
        </section>

        {/* Contact Section */}
        <section id="contact" className="scroll-mt-20 px-4">
          <Contact />
        </section>

        {/* Subscribe Section */}
        <Subscribe />
      </div>
    </>
  );
}
