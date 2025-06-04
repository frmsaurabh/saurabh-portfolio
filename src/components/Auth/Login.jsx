import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/new-post');
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white dark:bg-gray-900 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      {error && <p className="text-red-600 mb-4">{error}</p>}
      <form onSubmit={handleLogin}>
        <label className="block mb-2">Email</label>
        <input
          type="email"
          className="w-full mb-4 p-2 border dark:bg-gray-800"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="block mb-2">Password</label>
        <input
          type="password"
          className="w-full mb-6 p-2 border dark:bg-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
