import React, { useEffect, useState } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

const BlogDashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const snapshot = await getDocs(collection(db, 'blogs'));
      const blogList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(blogList);
    };

    fetchBlogs();
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 mt-10 text-black dark:text-white">
      <h2 className="text-3xl font-semibold mb-6">Blog Dashboard</h2>
      {posts.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-400">No blog posts found.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <h3 className="text-xl font-bold mb-2">{post.title}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                Type: {post.type} | Date: {post.date?.toDate().toLocaleDateString()}
              </p>
              <Link
                to={`/blog/${post.id}`}
                className="text-blue-600 dark:text-blue-400 hover:underline"
              >
                View Post
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BlogDashboard;
