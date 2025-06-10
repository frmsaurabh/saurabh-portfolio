import React from "react";
import { Helmet } from "react-helmet";

const SEO = ({ title, description, url, image }) => {
  const defaultTitle = "Saurabh Chandra – Modular Insurance & Tech Portfolio";
  const defaultDescription = "Explore Saurabh Chandra’s portfolio, insurance tech projects, and insights.";
  const defaultUrl = "https://saurabhchandra.me/";
  const defaultImage = "https://saurabhchandra.me/default-og-image.png"; // Replace with your default OG image URL

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title || defaultTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title || defaultTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:url" content={url || defaultUrl} />
      <meta property="og:image" content={image || defaultImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title || defaultTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={image || defaultImage} />
    </Helmet>
  );
};

export default SEO;
