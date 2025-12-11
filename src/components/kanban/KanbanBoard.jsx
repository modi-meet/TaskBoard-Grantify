import React from 'react'
import Column from './Column'
import { useKanban } from '../../context/KanbanContext'

const KanbanBoard = () => {
  const { columns } = useKanban()

  return (
    <div className="flex gap-6 overflow-x-auto items-start h-full pb-4 px-2">
      {columns.map((col) => (
        <Column key={col.id} column={col} />
      ))}
    </div>
  )
}

export default KanbanBoard