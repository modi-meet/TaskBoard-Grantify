import React from "react";
import { LayoutGrid, Users, Calendar } from "lucide-react";

const Navbar = ({ currentPage, setCurrentPage }) => {
  return (
    <nav className="bg-slate-900 text-white px-6 py-2.5">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button
            onClick={() => setCurrentPage("board")}
            className="flex items-center gap-2.5 hover:opacity-90 transition-opacity"
          >
            <img
              src="/favicon.png"
              alt="AgileFlow"
              className="w-8 h-8 rounded-lg object-cover"
            />
            <span className="font-semibold text-base tracking-tight">
              AgileFlow
            </span>
          </button>
          <div className="hidden md:flex items-center gap-1 text-sm">
            <button
              onClick={() => setCurrentPage("board")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all font-medium ${
                currentPage === "board"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <LayoutGrid size={16} />
              Board
            </button>
            <button
              onClick={() => setCurrentPage("timeline")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all font-medium ${
                currentPage === "timeline"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Calendar size={16} />
              Timeline
            </button>
            <button
              onClick={() => setCurrentPage("team")}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-lg transition-all font-medium ${
                currentPage === "team"
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                  : "text-slate-400 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Users size={16} />
              Team
              <span className="text-[10px] bg-amber-500/20 text-amber-400 px-1.5 py-0.5 rounded-full font-semibold">
                Soon
              </span>
            </button>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-3 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            Online
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
