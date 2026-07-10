import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Instructions from './pages/Instructions';
import LoginRegister from './pages/LoginRegister';
import Quiz from './pages/Quiz';
import Results from './pages/Results';

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
}

function AppShell() {
  const { isAuthenticated, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      {isAuthenticated && (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/70 backdrop-blur-xl shadow-lg">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">

            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 text-xl shadow-lg">
                🎯
              </div>

              <div>
                <p className="text-xs uppercase tracking-[0.45em] text-cyan-300">
                  Quiz Platform
                </p>

                <h2 className="text-2xl font-bold bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent">
                  Online Quiz
                </h2>
              </div>
            </div>

            <button
              onClick={logout}
              className="rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-2.5 font-semibold text-red-200 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-500 hover:text-white hover:shadow-lg"
            >
              Logout
            </button>

          </div>
        </header>
      )}

      <Routes>
        <Route path="/auth" element={<LoginRegister />} />
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/instructions" element={<ProtectedRoute><Instructions /></ProtectedRoute>} />
        <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
        <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
        <Route path="*" element={<Navigate to={isAuthenticated ? '/home' : '/auth'} replace />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}
