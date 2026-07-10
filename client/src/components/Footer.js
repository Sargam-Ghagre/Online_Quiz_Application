import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-900/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-8 py-6 md:flex-row">

        {/* Left */}
        <div>
          <h3 className="text-lg font-bold text-cyan-400">
            🎯 Online Quiz
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Learn • Practice • Improve
          </p>

          <p className="mt-2 text-xs text-slate-500">
            © {new Date().getFullYear()} Online Quiz. All rights reserved.
          </p>
        </div>

        {/* Center */}
        <div className="flex gap-6 text-sm">
          <Link
            to="/home"
            className="text-slate-400 transition hover:text-cyan-400"
          >
            Home
          </Link>

          <Link
            to="/instructions"
            className="text-slate-400 transition hover:text-cyan-400"
          >
            Instructions
          </Link>

          <Link
            to="/quiz"
            className="text-slate-400 transition hover:text-cyan-400"
          >
            Quiz
          </Link>

          <Link
            to="/results"
            className="text-slate-400 transition hover:text-cyan-400"
          >
            Results
          </Link>
        </div>

        {/* Right */}
        <div className="text-sm text-slate-400">
          Built with ❤️ using React & MongoDB
        </div>

      </div>
    </footer>
  );
}