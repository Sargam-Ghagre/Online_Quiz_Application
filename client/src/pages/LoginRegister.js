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
      <div className="mx-auto flex max-w-5xl flex-col overflow-hidden rounded-3xl border-white/20 bg-white/10 backdrop-blur-2xl shadow-2xl lg:flex-row">
        <div className="flex-1 bg-gradient-to-br from-cyan-600 to-blue-700 p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-100">🎯 Online Quiz</p>
          <h1 className="mt-4 text-5xl font-black">Challenge Your Knowledge 🚀</h1>
          <p className="mt-4 text-lg text-cyan-50/90">
            Learn, compete, and improve your skills through interactive quizzes designed for every learner.
          </p>
          <div className="mt-10 space-y-4">
            {[
              "📚 50+ Practice Questions",
              "⏱️ Timed Quiz Experience",
              "📈 Instant Results",
              "🏆 Performance Tracking",
            ].map((item) => (
              <div
                key={item}
                className="rounded-xl bg-white/10 px-4 py-3 backdrop-blur"
              >
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 p-8 sm:p-10">
          <div className="mb-6 flex rounded-full bg-slate-800 p-1">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'login' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'font-medium tracking-wide text-slate-200'}`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${mode === 'register' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white' : 'font-medium tracking-wide text-slate-200'}`}
            >
              Register
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            autoComplete="off"
            className="space-y-4"
          >
            {mode === 'register' && (
              <div>
                <label className="mb-1 block text-sm font-medium tracking-wide text-slate-200">Username</label>
                <input
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                  className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none ring-0 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500/40 transition-all duration-300"
                  placeholder="Enter username"
                />
              </div>
            )}

            <div>
              <input
                name="email"
                type="email"
                autoComplete="off"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 outline-none ring-0 focus:border-cyan-500"
                placeholder="Enter email"
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium tracking-wide text-slate-200">Password</label>
              <input
                name="password"
                type="password"
                autoComplete="off"
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
              className="w-full rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 hover:scale-[1.02] shadow-lg hover:shadow-cyan-500/30 px-4 py-3 font-semibold text-white transition hover:bg-cyan-400 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? 'Please wait...' : mode === 'login' ? 'Login' : 'Create Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
