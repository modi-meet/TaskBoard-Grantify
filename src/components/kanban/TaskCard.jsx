import React from 'react'

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 cursor-grab hover:shadow-md transition-shadow">
      <p className="text-gray-700 text-sm font-medium">{task.content}</p>
    </div>
  )
}

export default TaskCard