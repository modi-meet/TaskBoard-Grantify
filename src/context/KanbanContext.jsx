import React, { createContext, useState, useContext, useEffect } from 'react'

const KanbanContext = createContext()

export const useKanban = () => useContext(KanbanContext)

export const KanbanProvider = ({ children }) => {
  const [columns, setColumns] = useState(() => {
    try {
      const savedData = localStorage.getItem('kanban-board-v1')
      if (savedData) {
        return JSON.parse(savedData)
      }
    } catch (error) {
      console.error('Failed to parse local storage', error)
    }
    
    return [
      { id: 'todo', title: 'To Do', tasks: [] },
      { id: 'inprogress', title: 'In Progress', tasks: [] },
      { id: 'done', title: 'Done', tasks: [] }
    ]
  })

  useEffect(() => {
    localStorage.setItem('kanban-board-v1', JSON.stringify(columns))
  }, [columns])

  const addTask = (columnId, content) => {
    const newTask = { id: Date.now().toString(), content }
    setColumns(columns.map(col => 
      col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
    ))
  }

  const deleteTask = (columnId, taskId) => {
    setColumns(columns.map(col => 
      col.id === columnId ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) } : col
    ))
  }

  const moveTask = (result) => {
    const { source, destination } = result
    if (!destination) return
    if (source.droppableId === destination.droppableId && source.index === destination.index) return

    const sourceColIndex = columns.findIndex(col => col.id === source.droppableId)
    const destColIndex = columns.findIndex(col => col.id === destination.droppableId)
    
    const sourceCol = columns[sourceColIndex]
    const destCol = columns[destColIndex]
    
    const sourceTasks = [...sourceCol.tasks]
    const [removed] = sourceTasks.splice(source.index, 1)

    if (source.droppableId === destination.droppableId) {
      sourceTasks.splice(destination.index, 0, removed)
      const newColumns = [...columns]
      newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks }
      setColumns(newColumns)
    } else {
      const destTasks = [...destCol.tasks]
      destTasks.splice(destination.index, 0, removed)
      const newColumns = [...columns]
      newColumns[sourceColIndex] = { ...sourceCol, tasks: sourceTasks }
      newColumns[destColIndex] = { ...destCol, tasks: destTasks }
      setColumns(newColumns)
    }
  }

  return (
    <KanbanContext.Provider value={{ columns, addTask, deleteTask, moveTask }}>
      {children}
    </KanbanContext.Provider>
  )
}