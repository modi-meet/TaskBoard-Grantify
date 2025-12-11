import React, { createContext, useState, useContext } from 'react'

const KanbanContext = createContext()

export const useKanban = () => useContext(KanbanContext)

export const KanbanProvider = ({ children }) => {
  const [columns, setColumns] = useState([
    {
      id: 'todo',
      title: 'To Do',
      tasks: []
    },
    {
      id: 'inprogress',
      title: 'In Progress',
      tasks: []
    },
    {
      id: 'done',
      title: 'Done',
      tasks: []
    }
  ])

  const addTask = (columnId, content) => {
    const newTask = {
      id: Date.now().toString(),
      content
    }

    setColumns(columns.map(col => {
      if (col.id === columnId) {
        return { ...col, tasks: [...col.tasks, newTask] }
      }
      return col
    }))
  }

  const deleteTask = (columnId, taskId) => {
    setColumns(columns.map(col => {
      if (col.id === columnId) {
        return { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
      }
      return col
    }))
  }

  return (
    <KanbanContext.Provider value={{ columns, setColumns, addTask, deleteTask }}>
      {children}
    </KanbanContext.Provider>
  )
}