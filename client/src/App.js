import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import Home from './pages/Home';
import Instructions from './pages/Instructions';
import LoginRegister from './pages/LoginRegister';
import Quiz from './pages/Quiz';
import Results from './pages/Results';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
}

function AppShell() {
  const { isAuthenticated } = useAuth();
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white">
      {isAuthenticated && <Navbar />}

      <main className="flex-1">
        <Routes>
          <Route path="/auth" element={<LoginRegister />} />
          <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/instructions" element={<ProtectedRoute><Instructions /></ProtectedRoute>} />
          <Route path="/quiz" element={<ProtectedRoute><Quiz /></ProtectedRoute>} />
          <Route path="/results" element={<ProtectedRoute><Results /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to={isAuthenticated ? '/home' : '/auth'} replace />} />
        </Routes>
      </main>

      {isAuthenticated && <Footer />}
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
