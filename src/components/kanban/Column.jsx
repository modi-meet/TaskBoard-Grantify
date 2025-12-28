import React, { useState } from "react";
import { Droppable } from "@hello-pangea/dnd";
import { Plus, Circle, Clock, CheckCircle2, Archive } from "lucide-react";
import TaskCard from "./TaskCard";
import { useKanban } from "../../context/KanbanContext";

const columnStyles = [
  {
    gradient: "from-slate-500 to-slate-600",
    badge: "bg-slate-100 text-slate-700",
    icon: Circle,
    iconColor: "text-slate-400",
  },
  {
    gradient: "from-blue-600 to-blue-700",
    badge: "bg-blue-100 text-blue-700",
    icon: Clock,
    iconColor: "text-blue-400",
  },
  {
    gradient: "from-emerald-500 to-teal-600",
    badge: "bg-emerald-100 text-emerald-700",
    icon: CheckCircle2,
    iconColor: "text-emerald-400",
  },
  {
    gradient: "from-purple-500 to-violet-600",
    badge: "bg-purple-100 text-purple-700",
    icon: Archive,
    iconColor: "text-purple-400",
  },
];

const Column = ({ column, colorIndex = 0 }) => {
  const { addTask } = useKanban();
  const [isAdding, setIsAdding] = useState(false);
  const [newTaskContent, setNewTaskContent] = useState("");

  const style = columnStyles[colorIndex % columnStyles.length];
  const IconComponent = style.icon;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTaskContent.trim()) return;
    addTask(column.id, newTaskContent);
    setNewTaskContent("");
    setIsAdding(false);
  };

  return (
    <div className="w-80 flex-shrink-0 bg-white rounded-xl flex flex-col h-full border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group/column">
      <div className={`h-1.5 bg-gradient-to-r ${style.gradient}`}></div>

      <div className="flex justify-between items-center px-4 py-3.5 border-b border-slate-100 bg-gradient-to-b from-slate-50 to-white">
        <div className="flex items-center gap-2">
          <IconComponent size={16} className={style.iconColor} />
          <h2 className="font-semibold text-slate-800 text-sm tracking-tight">
            {column.title}
          </h2>
        </div>
        <span
          className={`text-xs font-bold px-2.5 py-1 rounded-full ${style.badge}`}
        >
          {column.tasks.length}
        </span>
      </div>

      <Droppable droppableId={column.id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={`flex-1 overflow-y-auto p-3 space-y-2.5 transition-colors duration-200 ${
              snapshot.isDraggingOver ? "bg-blue-50/50" : "bg-transparent"
            }`}
          >
            {column.tasks.length === 0 && !isAdding && (
              <div className="flex flex-col items-center justify-center h-32 text-slate-400">
                <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mb-3">
                  <IconComponent size={20} className="text-slate-300" />
                </div>
                <p className="text-sm font-medium">No tasks yet</p>
                <p className="text-xs text-slate-300 mt-0.5">
                  Drop tasks here or add new
                </p>
              </div>
            )}
            {column.tasks.map((task, index) => (
              <TaskCard
                key={task.id}
                task={task}
                index={index}
                columnId={column.id}
                colorIndex={colorIndex}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {isAdding ? (
        <form
          onSubmit={handleSubmit}
          className="border-t border-slate-100 p-3 bg-gradient-to-t from-slate-50 to-white"
        >
          <textarea
            autoFocus
            className="w-full text-sm outline-none text-slate-700 resize-none placeholder-slate-400 rounded-lg border border-slate-200 p-3 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
            placeholder="What needs to be done?"
            rows={2}
            value={newTaskContent}
            onChange={(e) => setNewTaskContent(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
          />
          <div className="flex justify-between items-center mt-3">
            <span className="text-xs text-slate-400">Press Enter to add</span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setIsAdding(false)}
                className="px-3 py-1.5 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`bg-gradient-to-r ${style.gradient} text-white text-sm font-medium px-4 py-1.5 rounded-lg hover:opacity-90 transition-all shadow-sm`}
              >
                Add Task
              </button>
            </div>
          </div>
        </form>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mx-3 mb-3 flex items-center justify-center gap-2 text-slate-500 hover:text-slate-700 border-2 border-dashed border-slate-200 hover:border-slate-300 px-3 py-2.5 rounded-lg transition-all text-sm font-medium w-[calc(100%-24px)] hover:bg-slate-50 group"
        >
          <Plus
            size={16}
            className="group-hover:rotate-90 transition-transform duration-200"
          />
          <span>Add Task</span>
        </button>
      )}
    </div>
  );
};

export default Column;
