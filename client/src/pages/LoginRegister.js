import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { loginUser, registerUser } from '../services/api';

const initialState = {
  username: '',
  email: '',
  password: '',
};

export default function LoginRegister() {
  const [mode, setMode] = useState('login');
  const [formData, setFormData] = useState(initialState);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const payload = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      const response = mode === 'login'
        ? await loginUser({ email: payload.email, password: payload.password })
        : await registerUser(payload);

      if (response.token) {
        login(response.user || { email: formData.email, username: formData.username }, response.token);
        navigate('/home');
      } else {
        setError(response.message || 'Authentication failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-4 py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl border border-slate-700 bg-slate-900/80 shadow-2xl lg:flex-row">
        <div className="flex-1 bg-gradient-to-br from-cyan-600 to-blue-700 p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-100">Online Quiz</p>
          <h1 className="mt-4 text-4xl font-semibold">Challenge yourself with smart quizzes</h1>
          <p className="mt-4 text-lg text-cyan-50/90">
            Sign in to begin or create an account to track your progress and scores.
          </p>
        </div>

        <div className="flex-1 p-8 sm:p-10">
          <div className="mb-6 flex rounded-full bg-slate-800 p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'login' ? 'bg-cyan-500 text-white' : 'text-slate-300'}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'register' ? 'bg-cyan-500 text-white' : 'text-slate-300'}`}
            >
              Register
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="mb-1 block text-sm text-slate-300">Username</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none ring-0 focus:border-cyan-500"
                  placeholder="Enter username"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-sm text-slate-300">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none ring-0 focus:border-cyan-500"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm text-slate-300">Password</label>
              <input
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none ring-0 focus:border-cyan-500"
                placeholder="Enter password"
              />
            </div>

            {error && <div className="rounded-xl border border-rose-500/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-300">{error}</div>}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-cyan-500 px-4 py-3 font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
