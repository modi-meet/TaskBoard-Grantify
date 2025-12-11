import React from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import Column from './Column'
import { useKanban } from '../../context/KanbanContext'

const KanbanBoard = () => {
  const { columns, moveTask } = useKanban()

  return (
    <DragDropContext onDragEnd={moveTask}>
      <div className="flex gap-4 overflow-x-auto items-start h-full p-6">
        {columns.map((col) => (
          <Column key={col.id} column={col} />
        ))}
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard