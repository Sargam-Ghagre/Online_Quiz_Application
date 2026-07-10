import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Results() {
  const location = useLocation();
  const { score = 0, totalQuestions = 0, percentage = 0 } = location.state || {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-16 text-white">
      <div className="mx-auto max-w-2xl rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">Results</p>
        <h1 className="mt-4 text-3xl font-semibold">Your quiz summary</h1>
        <p className="mt-3 text-slate-300">
          {percentage >= 80
            ? "🎉 Outstanding! Excellent performance."
            : percentage >= 60
              ? "👏 Great job! Keep practicing."
              : "💪 Keep learning. You'll do even better next time!"}
        </p>
        <div className="mt-8 rounded-3xl border border-white/10 bg-white/10 p-8 backdrop-blur-xl shadow-xl">
          <div className="flex items-center justify-between">
            <span className="text-slate-300">Score</span>
            <span className="text-2xl font-semibold text-cyan-400">{score}/{totalQuestions}</span>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <span className="text-slate-300">Percentage</span>
            <span className="text-2xl font-semibold text-emerald-400">{percentage}%</span>
          </div>
        </div>

        <Link
          to="/home"
          className="mt-8 inline-flex items-center rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-cyan-400 hover:to-blue-500"
        >
          🏠 Return Home
        </Link>

        <Link
          to="/quiz"
          className="ml-3 inline-flex rounded-xl border border-cyan-500 px-6 py-3 font-semibold text-cyan-300 transition hover:bg-cyan-500 hover:text-white"
        >
          🔄 Retry Quiz
        </Link>
      </div>
    </div>
  );
}
