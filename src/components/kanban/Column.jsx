import React from 'react'
import TaskCard from './TaskCard'

const Column = ({ title, tasks }) => {
  return (
    <div className="w-80 shrink-0 bg-gray-100 rounded-xl p-4 flex flex-col gap-4 h-full border border-gray-200">
      <div className="flex justify-between items-center">
        <h2 className="font-bold text-gray-700 text-sm uppercase tracking-wide">{title}</h2>
        <span className="text-gray-400 text-xs font-semibold bg-gray-200 px-2 py-1 rounded-full">{tasks.length}</span>
      </div>
      
      <div className="flex-1 flex flex-col gap-3 overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  )
}

export default Column