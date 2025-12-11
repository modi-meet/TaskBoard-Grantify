import React from 'react'
import KanbanBoard from './components/kanban/KanbanBoard'

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Grantify Task Board</h1>
        <p className="text-gray-500 mt-2">Project Management Challenge</p>
      </header>
      
      <main className="h-[calc(100vh-150px)]">
        <KanbanBoard />
      </main>
    </div>
  )
}

export default App