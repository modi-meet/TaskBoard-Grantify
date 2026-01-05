import React from 'react'
import { Github } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="border-t border-slate-200/60 bg-white/50 backdrop-blur-sm py-3 px-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-400">
        <span>© {new Date().getFullYear()} AgileFlow • Built for modern teams</span>
        <div className="flex items-center gap-4">
          <a 
            href="https://github.com/modi-meet/AgileFlow-Kanban-Board" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-slate-600 transition-colors"
          >
            <Github size={14} />
            GitHub
          </a>
          <span className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full"></span>
            All systems operational
          </span>
        </div>
      </div>
    </footer>
  )
}

export default Footer
