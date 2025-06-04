import React from "react";
import { Helmet } from 'react-helmet';
import { useLocation } from "react-router-dom";

export default function About() {
  const location = useLocation();
  const isAboutPage = location.pathname === "/about";  // case-sensitive path

  return (
    <>
      {isAboutPage && (
        <Helmet>
          <title>About | Saurabh Chandra</title>
          <meta name="description" content="Assistant Manager at New India Assurance, certified in FRM, JAIIB, AML, and Oracle systems. Public sector tech specialist." />
          <meta property="og:title" content="About Saurabh | Insurance Tech Leader" />
          <meta property="og:description" content="Discover Saurabh's journey from finance to technology and impactful leadership in public insurance." />
        </Helmet>
      )}

      <section className="max-w-5xl mx-auto px-6 py-16">
        <h2 className="text-4xl font-bold text-center mb-12">About Me</h2>
        <div className="grid md:grid-cols-2 gap-10 text-lg text-gray-800 dark:text-gray-300 leading-relaxed">

          <div className="space-y-6">
            <p>
              Hello, I’m <strong>Saurabh Chandra</strong> — a techno-functional consultant with deep expertise in insurance, finance, and digital transformation.
            </p>
            <p>
              I currently serve as an <strong>Assistant Manager in IT at The New India Assurance Co. Ltd.</strong>, where I lead core financial systems, policy digitization, and process automation for over <strong>1 crore policies anually and 40,000+ daily health claims</strong>.
            </p>
            <p>
              My role combines strategic planning with hands-on execution — spanning Oracle Financials, NHCX & ABHA integration, KPI restructuring, and automated GST compliance.
            </p>
          </div>

          <div className="space-y-6">
            <p>
              I’ve held prior roles in <strong>Allahabad Bank</strong> and <strong>Cognizant</strong>, giving me cross-domain fluency in banking, technology, and customer operations.
            </p>
            <p>
              I also contribute to industry research, train at National Insurance Academy and Insurance Institute of India, and write on the future of insurtech and risk management.
            </p>
            <p className="italic text-blue-600 dark:text-blue-400 font-medium">
              I don’t just build solutions — I simplify systems that touch millions.
            </p>
          </div>

        </div>
      </section>
    </>
  );
}
