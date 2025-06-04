import React from 'react';
import Subscribe from "./Subscribe";
import BlogDashboard from './Blog/BlogDashboard';
import { Helmet } from "react-helmet";

const Blog = () => {
  return (
    <>
    <Helmet>
      <title>Blog | Saurabh Chandra</title>
      <meta name="description" content="Latest thoughts and posts by Saurabh Chandra on insurance clarity, financial systems, and digital growth." />
      <meta property="og:title" content="Blog | Insurance, Finance, and Risk Tech" />
      <meta property="og:description" content="Read engaging perspectives from inside India's largest insurer — simplified for all." />
    </Helmet>

    <div>
      <BlogDashboard />
      <Subscribe />
    </div>
  </>
  );
};

export default Blog;
