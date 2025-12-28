import React from 'react'
import { DragDropContext } from '@hello-pangea/dnd'
import Column from './Column'
import { useKanban } from '../../context/KanbanContext'

const KanbanBoard = () => {
  const { columns, moveTask } = useKanban()

  return (
    <DragDropContext onDragEnd={moveTask}>
      <div className="w-full h-full px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-center gap-6 items-start h-full pb-4">
          {columns.map((col, index) => (
            <Column key={col.id} column={col} colorIndex={index} />
          ))}
        </div>
      </div>
    </DragDropContext>
  )
}

export default KanbanBoard