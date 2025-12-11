import React from 'react'
import Column from './Column'

const KanbanBoard = () => {
  const columns = [
    {
      id: 'todo',
      title: 'To Do',
      tasks: [{ id: 1, content: 'Analyze project requirements' }, { id: 2, content: 'Setup React environment' }]
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      tasks: [{ id: 3, content: 'Build UI components' }]
    },
    {
      id: 'done',
      title: 'Done',
      tasks: []
    }
  ]

  return (
    <div className="flex gap-6 overflow-x-auto items-start h-full pb-4">
      {columns.map((col) => (
        <Column key={col.id} title={col.title} tasks={col.tasks} />
      ))}
    </div>
  )
}

export default KanbanBoard