# Task Board

A minimal, elegant, and performant Kanban board application built with modern web technologies. For users who value clean UI and efficient task management.

## Features

- **Drag & Drop Interface** – Smooth, intuitive task movement across columns with visual feedback
- **Persistent Storage** – Debounced localStorage saves ensure data persists across sessions
- **Minimal & Professional UI** – Clean minimal UI
- **Empty State Handling** – Clear messaging when columns are empty

## Architecture & Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                          Task Board App                          │
└────────────────────┬────────────────────────────────────────────┘
                     │
         ┌───────────┴───────────┐
         │                       │
    ┌────▼───────┐          ┌──────▼───────┐
    │ KanbanBoard           │ App Header   │
    │ (Layout)              │ (Navigation) │
    └────┬───────┘          └──────────────┘
         │
    ┌────────────────────────────────────┐
    │    DragDropContext (@hello-pangea) │
    └────┬───────────────────────────────┘
         │
    ┌────┴─────────┬──────────────┬──────────────┐
    │              │              │              │
┌───▼───┐   ┌────▼────┐   ┌─────▼─────┐  ┌────▼────┐
│ Column│   │ Column  │   │ Column    │  │ Column  │
│(To Do)│   │(In Prog)│   │  (Done)   │  │ ...     │
└───┬───┘   └────┬────┘   └─────┬─────┘  └────┬────┘
    │            │              │             │
    │    ┌───────┴──────────────┴─────────────┤
    │    │                                     │
    │    ▼                                     │
    │ ┌─────────────────────────┐              │
    │ │  KanbanContext (State)  │              │
    │ │ • columns[]             │              │
    │ │ • addTask()             │              │
    │ │ • deleteTask()          │              │
    │ │ • moveTask()            │              │
    │ └────┬────────────────────┘              │
    │      │                                   │
    │      ├───────► localStorage              │
    │      │         (Persisted)               │
    │      │                                   │
    │      └─────────────────────────────────► │
    │                                          │
    └──────────────────────────────────────────┘
```

### Data Flow

1. **User Action** – Add/Delete/Move task
2. **State Update** – Functional setState ensures closure safety
3. **Context Propagation** – Changes reflected in all child components
4. **Debounced Save** – After 500ms of inactivity, data persists to localStorage
5. **UI Re-render** – Components update with new state

## Tech Stack

| Category | Technology
|----------|-----------
| **Framework** | React 
| **Build Tool** | Vite
| **Styling** | Tailwind CSS
| **Drag & Drop** | @hello-pangea/dnd
| **Icons** | Lucide React

## 📦 Installation & Setup


### Clone & Install

```bash
git clone https://github.com/modi-meet/TaskBoard-Grantify.git
cd TaskBoard-Grantify
npm install
```

### Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```


## Project Structure

```
src/
├── App.jsx                    # Main app component
├── main.jsx                   # React entry point
├── index.css                  # Global styles + Tailwind
├── components/
│   └── kanban/
│       ├── KanbanBoard.jsx   # Board layout & DragDropContext
│       ├── Column.jsx        # Column container with add task form
│       └── TaskCard.jsx      # Individual task card with delete
├── context/
│   └── KanbanContext.jsx     # Global state management
├── hooks/                     # (Extensible for custom hooks)
└── utils/                     # (Extensible for utilities)
```

##  Key Implementation Highlights

### 1. **Functional State Updates**
All state mutations use functional `setColumns(prev => ...)` to avoid stale closure bugs:

```javascript
const addTask = (columnId, content) => {
  const newTask = { id: Date.now().toString(), content }
  setColumns(prev => prev.map(col => 
    col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
  ))
}
```

### 2. **Drag & Drop Integration**
Uses `@hello-pangea/dnd` (maintained fork of react-beautiful-dnd) for smooth, accessible drag operations with visual feedback.

##  Code Quality

- ✅ **No Prop Drilling** – Context API handles global state
- ✅ **Error Handling** – Try/catch blocks for localStorage operations
- ✅ **Industry Standards** – Follows React hooks best practices

##  Design Philosophy

This board prioritizes:
- **Minimalism** – Only essential UI elements
- **Clarity** – Clear visual hierarchy and information architecture
- **Performance** – No unnecessary re-renders or heavy libraries

##  Future Enhancements

Potential features for expansion:
- [ ] A CRUD API (using Node.js, Express, etc) to store tasks in a database (e.g., MongoDB)
- [ ] Deploy the app

## Contributing

While this is a showcase project, improvements are always welcome. Please:

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

## Quick Start (TL;DR)

```bash
git clone https://github.com/modi-meet/TaskBoard-Grantify.git
cd TaskBoard-Grantify
npm install
npm run dev
```

Open `http://localhost:5173` and start managing tasks!

---

**Built with ❤️ and modern web technologies**
