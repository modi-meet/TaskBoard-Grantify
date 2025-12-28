# AgileFlow - Workflow Management system

A minimal, elegant, and performant Kanban board application built with the MERN stack (MongoDB, Express, React, Node.js). For users who value clean UI, efficient task management, and robust architecture.

Live deployment - https://task-board-kanban-one.vercel.app/

## Features

- **Full Stack Architecture** – Complete MERN stack implementation with RESTful API
- **Complete Task Management** – Create, read, update, and delete tasks with a clean interface
- **Drag & Drop Interface** – Smooth, intuitive task movement across columns using `@hello-pangea/dnd`
- **Timeline View** – Visual sprint progress tracking with task timeline
- **Persistent Storage** – MongoDB database ensures secure and scalable data persistence
- **Service Layer Pattern** – Decoupled API logic for better maintainability and testing
- **Reusable Components** – Modular Navbar and Footer components for consistent UI
- **Minimal & Professional UI** – Clean, distraction-free interface built with Tailwind CSS

## Architecture & Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                          AgileFlow App                          │
└────────────────────┬────────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────▼───────┐          ┌──────▼───────┐
    │ KanbanBoard│          │    Navbar    │
    │ (Layout)   │          │ (Navigation) │
    └────┬───────┘          └──────────────┘
         │
    ┌────┴─────────┬──────────────┬──────────────┐
    │              │              │              │
┌───▼──────┐   ┌────▼────┐   ┌─────▼─────┐  ┌────▼────┐
│ Column   │   │ Column  │   │ Column    │  │ Column  │
│(assigned)│   │(In Prog)│   │(Completed)   │ │ ... | │
└───┬──────┘   └────┬────┘   └─────┬─────┘  └────┬────┘
    │               │              │             │
    │    ┌──────────┴──────────────┴─────────────┤
    │    │                                       │
    │    ▼                                       │
    │ ┌─────────────────────────┐                │
    │ │  KanbanContext (State)  │                │
    │ │ • Optimistic Updates    │                │
    │ │ • Error Rollback        │                │
    │ └────┬────────────────────┘                │
    │      │                                     │
    │      ▼                                     │
    │ ┌─────────────────────────┐                │
    │ │    Service Layer        │                │
    │ │   (src/services/api.js) │                │
    │ └────┬────────────────────┘                │
    │      │                                     │
    │      ▼                                     │
    │ ┌─────────────────────────┐                │
    │ │      REST API           │                │
    │ │   (Node/Express)        │                │
    │ └────┬────────────────────┘                │
    │      │                                     │
    │      ▼                                     │
    │    MongoDB                                 │
    │   (Database)                               │
    └────────────────────────────────────────────┘
```

### Data Flow

1. **User Action** – User drags a task, edits content, adds a new item, or deletes.
2. **Optimistic Update** – UI updates immediately via `KanbanContext` before server response.
3. **Service Call** – `api.js` sends asynchronous request to the backend.
4. **Server Processing** – Express controller validates and updates MongoDB.
5. **Confirmation/Rollback** – If successful, state is confirmed. If failed, UI reverts to previous state.

## Tech Stack

| Category | Technology
|----------|-----------
| **Frontend** | React 19, Vite, Tailwind CSS v4
| **Backend** | Node.js, Express.js
| **Database** | MongoDB, Mongoose
| **State Management** | React Context API
| **Drag & Drop** | @hello-pangea/dnd
| **Icons** | Lucide React

## Installation & Setup

### Prerequisites
- Node.js (v14+)
- MongoDB (Local or Atlas URI)

### 1. Clone the Repository
```bash
git clone https://github.com/modi-meet/AgileFlow-Kanban-Board.git
cd AgileFlow-Kanban-Board
```

### 2. Setup Backend
```bash
cd server
npm install
```
Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```
Start the server:
```bash
npm start
```

### 3. Setup Frontend
Open a new terminal in the root directory:
```bash
npm install
```
Create a `.env.local` file in the root directory:
```env
VITE_API_URL=http://localhost:5000/api
```
Start the frontend:
```bash
npm run dev
```

The app will be available at `http://localhost:5173`

## Project Structure

```
├── public/
├── server/
│   ├── config/        # Database configuration
│   ├── controllers/   # Request handlers
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API route definitions
│   └── index.js       # Server entry point
├── src/
│   ├── components/    # React components (Navbar, Footer, kanban/)
│   ├── context/       # Global state (KanbanContext)
│   ├── pages/         # Page views (Timeline, Team)
│   ├── services/      # API Service Layer
│   ├── utils/         # Utility functions
│   ├── App.jsx        # Main application component
│   └── main.jsx       # Entry point
└── ...config files
```

## Key Implementation Highlights

### 1. Service Layer Pattern
API calls are abstracted into `src/services/api.js`, keeping components clean and separating concerns.
```javascript
// src/services/api.js
export const getTasks = async () => { /* ... */ }
export const createTask = async (content, columnId) => { /* ... */ }
export const updateTask = async (taskId, updates) => { /* ... */ }
export const deleteTask = async (taskId) => { /* ... */ }
```

### 2. Optimistic UI Updates
The UI updates instantly for a snappy user experience, while the backend processes the request in the background.
```javascript
// KanbanContext.jsx
const updateTaskContent = (columnId, taskId, newContent) => {
  // 1. Optimistically update state
  setColumns(prev => ...);
  
  // 2. Perform API call
  api.updateTask(taskId, ...).catch(err => {
    // 3. Rollback on error
    setColumns(previousState);
    setError("Failed to update task");
  });
};
```

### 3. Edit Task Functionality
Click the pencil icon on any task to inline-edit its content. Use `Enter` to save or `Escape` to cancel.
- Supports multi-line task descriptions
- Real-time validation and API sync
- Automatic rollback on network errors

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## Author

**Meet Modi** – Full Stack Developer

- [GitHub](https://github.com/modi-meet)
- [LinkedIn](https://www.linkedin.com/in/modi-meet-profile)
- [Email](mailto:mail.modimeet@gmail.com)

---

**Built with ❤️ and modern web technologies**
