import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      const docRef = doc(db, 'blogs', slug);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost(docSnap.data());
      }
    };
    fetchPost();
  }, [slug]);

  if (!post) return <div className="text-center mt-10 text-gray-600">Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 mt-10 bg-white dark:bg-gray-900 text-black dark:text-white rounded shadow">
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        Posted by {post.author || 'Saurabh Chandra'} on{' '}
        {post.date?.toDate().toLocaleDateString()}
      </p>

      {post.type === 'linkedin' ? (
        <iframe
          src={post.content}
          title="LinkedIn Post"
          className="w-full h-[600px] border dark:border-gray-700"
        />
      ) : (
        <p className="whitespace-pre-wrap leading-relaxed text-lg">{post.content}</p>
      )}
    </div>
  );
};

export default BlogPost;
