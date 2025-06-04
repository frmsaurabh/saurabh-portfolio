import React, { useState, useContext } from 'react';
import { db } from '../../firebase';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthProvider';

const NewPostForm = () => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('manual');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      await addDoc(collection(db, 'blogs'), {
        title,
        content,
        type,
        author: 'Saurabh Chandra',
        date: Timestamp.now(),
      });

      setMessage('Post added successfully!');
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding blog post:', error);
      setMessage('Error saving post.');
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-gray-900 rounded shadow mt-10">
      <h2 className="text-2xl font-semibold mb-4">Add New Blog Post</h2>
      {message && <p className="mb-4 text-green-600">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label className="block mb-2">Post Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="mb-4 w-full p-2 border dark:bg-gray-800"
        >
          <option value="manual">Manual</option>
          <option value="linkedin">LinkedIn</option>
        </select>

        <label className="block mb-2">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="mb-4 w-full p-2 border dark:bg-gray-800"
          required
        />

        <label className="block mb-2">
          {type === 'manual' ? 'Content' : 'LinkedIn URL'}
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="mb-4 w-full p-2 border h-40 dark:bg-gray-800"
          required
        />

        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Publish Post
        </button>
      </form>
    </div>
  );
};

export default NewPostForm;
