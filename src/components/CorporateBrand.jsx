import React from "react";
import SEO from "./SEO";

const CorporateBrand = () => {
  const seoTitle = "Creative Prototype Pvt. Ltd. - Corporate Insurance Solutions";
  const seoDescription = "Creative Prototype Pvt. Ltd. is your trusted partner in innovative insurance solutions for corporate clients.";
  const seoUrl = "https://saurabhchandra.me/corporate-brand";

  return (
    <>
      <SEO title={seoTitle} description={seoDescription} url={seoUrl} />
      <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight leading-snug text-center mb-2">
        <span className="bg-gradient-to-r from-yellow-300 via-pink-400 to-blue-500 bg-clip-text text-transparent">
          Creative Prototype Pvt. Ltd.
        </span>
      </h1>
    </>
  );
};

export default CorporateBrand;
