import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { logout } = useAuth();
  const location = useLocation();

  const linkStyle = (path) =>
    `transition ${
      location.pathname === path
        ? "text-cyan-400 font-semibold"
        : "text-slate-300 hover:text-cyan-400"
    }`;

  return (
    <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-900/80 backdrop-blur-lg">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        <Link
  to="/home"
  className="flex items-center gap-3"
>
  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 shadow-lg">
    🎯
  </div>

  <div>
    <p className="text-xs uppercase tracking-[0.35em] text-cyan-300">
      Quiz Platform
    </p>

    <h2 className="text-xl font-bold text-white">
      Online Quiz
    </h2>
  </div>
</Link>

        <div className="flex items-center gap-6">
          <Link className={linkStyle("/home")} to="/home">
            Home
          </Link>

          <Link className={linkStyle("/instructions")} to="/instructions">
  Instructions
</Link>

          <Link className={linkStyle("/quiz")} to="/quiz">
            Quiz
          </Link>

          <Link className={linkStyle("/results")} to="/results">
            Results
          </Link>

          <button
            onClick={logout}
            className="rounded-xl border border-red-400/30 bg-red-500/10 px-5 py-2 font-semibold text-red-200 transition-all duration-300 hover:bg-red-500 hover:text-white hover:shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}