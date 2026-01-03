// In production on Netlify, use relative path since functions are on the same domain
// For local development with netlify dev, relative paths also work
const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const getTasks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`)
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching tasks:', error)
    throw error
  }
}

/**
 * Create a new task
 * @param {string} content - Task content/description
 * @param {string} columnId - Column ID (todo, inprogress, done)
 */
export const createTask = async (content, columnId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ content, columnId }),
    })
    if (!response.ok) {
      throw new Error(`Failed to create task: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error creating task:', error)
    throw error
  }
}

/**
 * Update a task (used for moving between columns)
 * @param {string} taskId - Task MongoDB ID
 * @param {object} updates - Fields to update (columnId, content, etc.)
 */
export const updateTask = async (taskId, updates) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    })
    if (!response.ok) {
      throw new Error(`Failed to update task: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error updating task:', error)
    throw error
  }
}

/**
 * Delete a task
 * @param {string} taskId - Task MongoDB ID
 */
export const deleteTask = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/tasks/${taskId}`, {
      method: 'DELETE',
    })
    if (!response.ok) {
      throw new Error(`Failed to delete task: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error deleting task:', error)
    throw error
  }
}
