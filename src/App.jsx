import React from 'react'
import KanbanBoard from './components/kanban/KanbanBoard'

function App() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <h1 className="text-2xl font-600 text-slate-900 tracking-tight">Task Board</h1>
          <p className="text-sm text-slate-500 mt-1">Organize and manage your work efficiently</p>
        </div>
      </header>
      
      <main className="flex-1 overflow-hidden">
        <KanbanBoard />
      </main>
    </div>
  )
}

export default App