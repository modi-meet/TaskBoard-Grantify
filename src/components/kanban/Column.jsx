import React, { useState } from 'react'
import { Droppable } from '@hello-pangea/dnd'
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
    <div className="w-80 flex-shrink-0 bg-white rounded-lg flex flex-col h-full border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-center px-4 py-3 border-b border-slate-100 bg-slate-50">
        <h2 className="font-500 text-slate-900 text-sm">{column.title}</h2>
        <span className="text-xs font-medium bg-slate-200 text-slate-700 px-2 py-0.5 rounded-md">{column.tasks.length}</span>
      </div>
      
      <Droppable droppableId={column.id}>
        {(provided) => (
          <div 
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex-1 overflow-y-auto p-3 space-y-2"
          >
            {column.tasks.length === 0 && !isAdding && (
              <div className="flex items-center justify-center h-32 text-slate-400 text-sm">
                <p>No tasks yet</p>
              </div>
            )}
            {column.tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} columnId={column.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isAdding ? (
        <form onSubmit={handleSubmit} className="border-t border-slate-100 p-3 bg-white">
          <textarea
            autoFocus
            className="w-full text-sm outline-none text-slate-700 resize-none placeholder-slate-400 rounded border border-slate-200 p-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-100"
            placeholder="Enter task..."
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
            <button type="button" onClick={() => setIsAdding(false)} className="p-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded transition-colors"><X size={16} /></button>
            <button type="submit" className="bg-blue-600 text-white text-xs font-medium px-3 py-1.5 rounded hover:bg-blue-700 transition-colors">Add</button>
          </div>
        </form>
      ) : (
        <button onClick={() => setIsAdding(true)} className="mx-3 mb-3 flex items-center gap-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 px-3 py-2 rounded transition-colors text-sm font-medium w-[calc(100%-24px)]">
          <Plus size={16} />
          <span>Add Task</span>
        </button>
      )}
    </div>
  )
}

export default Column