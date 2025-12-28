import React from 'react'
import { Users, AlertCircle } from 'lucide-react'
import Footer from '../components/Footer'

const Team = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 flex flex-col">
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Users size={20} className="text-green-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-0.5 rounded-full">Team Management</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team Management</h1>
          <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">
            Manage team members, assignments, and collaboration.
          </p>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <AlertCircle size={32} className="text-green-600" />
          </div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-2">Coming Soon</h2>
          <p className="text-slate-500 max-w-sm">
            Team management features are currently under development. Soon you'll be able to manage team members and track assignments.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default Team
