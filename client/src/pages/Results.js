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
        <div className="mt-8 rounded-2xl border border-slate-700 bg-slate-800/70 p-6">
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
          className="mt-8 inline-flex rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-400"
        >
          Return Home
        </Link>
      </div>
    </div>
  );
}
