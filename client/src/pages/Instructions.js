import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const rules = [
  'You have 60 seconds to answer each quiz round.',
  'Do not refresh the page while the quiz is in progress.',
  'Choose one option per question before moving on.',
  'Your score will be calculated automatically at the end.',
];

export default function Instructions() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-16 text-white">
      <div className="mx-auto max-w-3xl rounded-3xl border border-slate-700 bg-slate-900/80 p-8 shadow-2xl">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">Instructions</p>
        <h1 className="mt-4 text-3xl font-semibold">Before you begin</h1>
        <p className="mt-3 text-lg text-slate-300">Please read the rules carefully so your quiz experience goes smoothly.</p>

        <ul className="mt-8 space-y-3 rounded-2xl border border-slate-700 bg-slate-800/70 p-6">
          {rules.map((rule) => (
            <li key={rule} className="flex items-start gap-3 text-slate-200">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-400" />
              <span>{rule}</span>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-wrap gap-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-xl border border-slate-600 px-5 py-3 font-semibold text-slate-200 transition hover:border-cyan-400 hover:text-cyan-300"
          >
            Back
          </button>
          <Link
            to="/quiz"
            className="rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-400"
          >
            Start Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
