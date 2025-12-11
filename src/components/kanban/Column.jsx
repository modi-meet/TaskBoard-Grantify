import React, { useState } from 'react'
import { Plus, X } from 'lucide-react'
import TaskCard from './TaskCard'
import { useKanban } from '../../context/KanbanContext'

const Column = ({ column }) => {
  const { addTask } = useKanban()
  const [isAdding, setIsAdding] = useState(false)
  const [newTaskContent, setNewTaskContent] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!newTaskContent.trim()) return
    addTask(column.id, newTaskContent)
    setNewTaskContent('')
    setIsAdding(false)
  }

  return (
    <div className="w-80 shrink-0 bg-gray-100 rounded-xl p-4 flex flex-col gap-4 h-full border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">{column.title}</h2>
        <span className="text-gray-400 text-xs font-semibold bg-gray-200 px-2 py-1 rounded-full">{column.tasks.length}</span>
      </div>
      
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto min-h-[100px]">
        {column.tasks.map((task) => (
          <TaskCard key={task.id} task={task} columnId={column.id} />
        ))}
      </div>

      {isAdding ? (
        <form onSubmit={handleSubmit} className="bg-white p-3 rounded-lg border border-blue-200 shadow-sm">
          <textarea
            autoFocus
            className="w-full text-sm outline-none text-gray-700 resize-none placeholder-gray-400"
            placeholder="What needs to be done?"
            rows={2}
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault()
                handleSubmit(e)
              }
            }}
          />
          <div className="flex justify-end gap-2 mt-2">
            <button 
              type="button" 
              onClick={() => setIsAdding(false)}
              className="p-1 text-gray-500 hover:bg-gray-100 rounded"
            >
              <X size={16} />
            </button>
            <button 
              type="submit"
              className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-blue-700"
            >
              Add
            </button>
          </div>
        </form>
      ) : (
        <button 
          onClick={() => setIsAdding(true)}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 hover:bg-gray-200 p-2 rounded-lg transition-colors text-sm font-medium"
        >
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      )}
    </div>
  )
}

export default Column