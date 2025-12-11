import React, { useState } from 'react'
import { Draggable } from '@hello-pangea/dnd'
import { Trash2, GripVertical, Pencil, Check, X } from 'lucide-react'
import { useKanban } from '../../context/KanbanContext'

const TaskCard = ({ task, index, columnId }) => {
  const { deleteTask, updateTaskContent } = useKanban()
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(task.content)

  const handleSave = () => {
    if (editedContent.trim() !== '') {
      updateTaskContent(columnId, task.id, editedContent)
      setIsEditing(false)
    }
  }

  const handleCancel = () => {
    setEditedContent(task.content)
    setIsEditing(false)
  }

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
            
            {isEditing ? (
              <div className="flex-1 flex gap-2">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full text-sm p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  rows={2}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault()
                      handleSave()
                    }
                    if (e.key === 'Escape') {
                      handleCancel()
                    }
                  }}
                />
                <div className="flex flex-col gap-1">
                  <button onClick={handleSave} className="text-green-500 hover:bg-green-50 p-1 rounded" title="Save">
                    <Check size={14} />
                  </button>
                  <button onClick={handleCancel} className="text-red-500 hover:bg-red-50 p-1 rounded" title="Cancel">
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="text-slate-700 text-sm leading-relaxed break-words flex-1 pt-0.5">
                  {task.content}
                </p>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      setIsEditing(true)
                      setEditedContent(task.content)
                    }}
                    className="text-slate-400 hover:text-blue-500 transition-colors p-1 rounded hover:bg-blue-50 flex-shrink-0"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button 
                    onClick={(e) => {
                      e.stopPropagation()
                      deleteTask(columnId, task.id)
                    }}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50 flex-shrink-0"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Draggable>
  )
}

export default TaskCard