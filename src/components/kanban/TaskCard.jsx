import React from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { Trash2, GripVertical } from 'lucide-react'
import { useKanban } from '../../context/KanbanContext'

const TaskCard = ({ task, index, columnId }) => {
  const { deleteTask } = useKanban()

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`bg-white border border-slate-200 rounded-md p-3 transition-all ${
            snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-400' : 'shadow-sm hover:shadow-md'
          } group`}
          style={provided.draggableProps.style}
        >
          <div className="flex gap-2 items-start">
            <div 
              {...provided.dragHandleProps}
              className="text-slate-400 group-hover:text-slate-600 transition-colors mt-0.5 cursor-grab active:cursor-grabbing"
            >
              <GripVertical size={14} />
            </div>
            <p className="text-slate-700 text-sm leading-relaxed break-words flex-1 pt-0.5">
              {task.content}
            </p>
            <button 
              onClick={(e) => {
                e.stopPropagation()
                deleteTask(columnId, task.id)
              }}
              className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard