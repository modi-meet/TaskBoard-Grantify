import React, { useState } from 'react'
import { Zap } from 'lucide-react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import KanbanBoard from './components/kanban/KanbanBoard'
import TimelineView from './pages/Timeline'
import Team from './pages/Team'
import { useKanban } from './context/KanbanContext'

function App() {
  const [currentPage, setCurrentPage] = useState('board')
  const { columns } = useKanban()

  const activeTasksCount = (columns.find(col => col.id === 'todo')?.tasks.length || 0) + 
                          (columns.find(col => col.id === 'inprogress')?.tasks.length || 0)

  if (currentPage === 'timeline') return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <TimelineView />
    </>
  )
  if (currentPage === 'team') return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <Team />
    </>
  )

  return (
    <>
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 flex flex-col">
        <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-8 py-6 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap size={20} className="text-amber-500" />
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full">Sprint Active</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Agile Workflow Board</h1>
            <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">
              Streamline your team's productivity with visual task management. 
              Drag and drop tasks across stages to track progress in real-time.
            </p>
            <div className="flex items-center justify-center gap-6 mt-4 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                {activeTasksCount} Active Task{activeTasksCount !== 1 ? 's' : ''}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                Sprint 12 • Week 2
              </span>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-hidden">
          <KanbanBoard />
        </main>

        <Footer />
      </div>
    </>
  )
}

export default App