import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 px-6 py-16 text-white">
      <div className="mx-auto flex max-w-5xl flex-col items-start justify-between gap-10 rounded-3xl border border-slate-700 bg-slate-900/80 p-10 shadow-2xl lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-cyan-400">Welcome back</p>
          <h1 className="mt-4 text-4xl font-semibold sm:text-5xl">Ready for your next challenge?</h1>
          <p className="mt-5 text-lg text-slate-300">
            Test your knowledge with quick, polished quiz rounds and see your performance instantly.
          </p>
        </div>

        <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-800/80 p-6">
          <h2 className="text-xl font-semibold">Start the quiz</h2>
          <p className="mt-3 text-sm text-slate-300">You’ll be guided through instructions before the timer begins.</p>
          <Link
            to="/instructions"
            className="mt-6 inline-flex rounded-xl bg-cyan-500 px-5 py-3 font-semibold text-white transition hover:bg-cyan-400"
          >
            Proceed to Quiz
          </Link>
        </div>
      </div>
    </div>
  );
}
