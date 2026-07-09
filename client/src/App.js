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
    <div className="min-h-screen bg-slate-950 text-white">
      {isAuthenticated && (
        <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-cyan-400">Quiz App</p>
              <h2 className="text-lg font-semibold">Online Quiz</h2>
            </div>
            <button
              onClick={logout}
              className="rounded-full border border-slate-700 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
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
