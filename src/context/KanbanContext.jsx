import React, { createContext, useState, useContext, useEffect, useRef } from 'react'
import * as api from '../services/api'

const KanbanContext = createContext()

export const useKanban = () => useContext(KanbanContext)

export const KanbanProvider = ({ children }) => {
  const [columns, setColumns] = useState([
    { id: 'todo', title: 'Work Assigned', tasks: [] },
    { id: 'inprogress', title: 'In Progress', tasks: [] },
    { id: 'done', title: 'Done', tasks: [] }
  ])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  // Store previous state for optimistic update rollback on API failure
  const previousStateRef = useRef(null)

  // Fetch tasks from API on component mount
  useEffect(() => {
    loadTasks()
  }, [])

  const loadTasks = async () => {
    try {
      setLoading(true)
      setError(null)
      const tasks = await api.getTasks()
      
      // Map MongoDB _id to frontend id, group tasks by columnId
      setColumns(prev => prev.map(col => ({
        ...col,
        tasks: tasks.filter(task => task.columnId === col.id).map(task => ({
          id: task._id,
          content: task.content,
          createdAt: task.createdAt
        }))
      })))
    } catch (err) {
      setError(err.message)
      console.error('Failed to load tasks:', err)
    } finally {
      setLoading(false)
    }
  }

  const addTask = async (columnId, content) => {
    try {
      const optimisticTask = { id: Date.now().toString(), content, createdAt: new Date().toISOString() }
      setColumns(prev => prev.map(col =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, optimisticTask] } : col
      ))

      // Send to API and replace temp ID with MongoDB _id
      const createdTask = await api.createTask(content, columnId)
      
      setColumns(prev => prev.map(col =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map(task =>
                task.id === optimisticTask.id
                  ? { id: createdTask._id, content: createdTask.content, createdAt: createdTask.createdAt }
                  : task
              )
            }
          : col
      ))
    } catch (err) {
      setError(err.message)
      loadTasks()
    }
  }

  const updateTaskContent = async (columnId, taskId, newContent) => {
    try {
      previousStateRef.current = JSON.parse(JSON.stringify(columns))

      setColumns(prev => prev.map(col =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map(task =>
                task.id === taskId ? { ...task, content: newContent } : task
              )
            }
          : col
      ))

      await api.updateTask(taskId, { content: newContent })
    } catch (err) {
      setError(err.message)
      if (previousStateRef.current) {
        setColumns(previousStateRef.current)
      }
      console.error('Failed to update task:', err)
    }
  }

  const deleteTask = async (columnId, taskId) => {
    try {
      previousStateRef.current = JSON.parse(JSON.stringify(columns))
      
      setColumns(prev => prev.map(col =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter(task => task.id !== taskId) }
          : col
      ))

      await api.deleteTask(taskId)
    } catch (err) {
      setError(err.message)
      // Revert if API call fails
      if (previousStateRef.current) {
        setColumns(previousStateRef.current)
      }
      console.error('Failed to delete task:', err)
    }
  }

  const moveTask = async (result) => {
    const { source, destination, draggableId } = result
    
    if (!destination) return
    // Ignore if dropped in same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) return

    try {
      previousStateRef.current = JSON.parse(JSON.stringify(columns))

      // Deep copy to avoid mutation
      const updatedColumns = columns.map(col => ({
        ...col,
        tasks: [...col.tasks]
      }))

      const sourceColIndex = updatedColumns.findIndex(col => col.id === source.droppableId)
      const destColIndex = updatedColumns.findIndex(col => col.id === destination.droppableId)

      const sourceCol = updatedColumns[sourceColIndex]
      const destCol = updatedColumns[destColIndex]

      const sourceTasks = sourceCol.tasks
      const [movedTask] = sourceTasks.splice(source.index, 1)

      const destTasks = destCol.tasks
      destTasks.splice(destination.index, 0, movedTask)

      setColumns(updatedColumns)

      // Persist to database
      await api.updateTask(draggableId, { columnId: destination.droppableId })
    } catch (err) {
      setError(err.message)
      if (previousStateRef.current) {
        setColumns(previousStateRef.current)
      }
      console.error('Failed to move task:', err)
    }
  }

  return (
    <KanbanContext.Provider value={{ columns, addTask, deleteTask, updateTaskContent, moveTask, loading, error, loadTasks }}>
      {children}
    </KanbanContext.Provider>
  )
}