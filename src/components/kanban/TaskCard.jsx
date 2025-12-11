import React from 'react'
import { Trash2 } from 'lucide-react'
import { useKanban } from '../../context/KanbanContext'

const TaskCard = ({ task, columnId }) => {
  const { deleteTask } = useKanban()

  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200 cursor-grab hover:shadow-md transition-shadow flex justify-between items-start gap-2">
      <p className="text-gray-700 text-sm font-medium leading-relaxed wrap-break-word w-full">
        {task.content}
      </p>
      
      <button 
        onClick={(e) => {
          e.stopPropagation()
          deleteTask(columnId, task.id)
        }}
        className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50 shrink-0"
        aria-label="Delete task"
      >
        <Trash2 size={15} />
      </button>
    </div>
  )
}

export default TaskCard