import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { KanbanProvider } from './context/KanbanContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <KanbanProvider>
    <App />
  </KanbanProvider>
)