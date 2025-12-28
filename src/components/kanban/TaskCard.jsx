import React, { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import {
  Trash2,
  GripVertical,
  Pencil,
  Check,
  X,
  Clock,
  Flag,
} from "lucide-react";
import { useKanban } from "../../context/KanbanContext";
import { getRelativeTime } from "../../utils/time";

const priorityColors = [
  "border-l-slate-300",
  "border-l-blue-400",
  "border-l-emerald-400",
  "border-l-purple-400",
];

const TaskCard = ({ task, index, columnId, colorIndex = 0 }) => {
  const { deleteTask, updateTaskContent } = useKanban();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(task.content);

  const handleSave = () => {
    if (editedContent.trim() !== "") {
      updateTaskContent(columnId, task.id, editedContent);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditedContent(task.content);
    setIsEditing(false);
  };

  const taskIdNum = parseInt(task.id.replace(/\D/g, "")) || 0;
  const priority = ["Low", "Medium", "High"][taskIdNum % 3];
  const priorityStyle = {
    Low: "text-slate-400 bg-slate-50",
    Medium: "text-amber-500 bg-amber-50",
    High: "text-rose-500 bg-rose-50",
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          className={`bg-white border border-slate-200 rounded-lg p-3.5 border-l-4 ${
            priorityColors[colorIndex % priorityColors.length]
          } ${
            snapshot.isDragging
              ? "shadow-xl ring-2 ring-blue-400"
              : "shadow-sm hover:shadow-md"
          } group`}
          style={provided.draggableProps.style}
        >
          <div className="flex gap-2 items-start">
            <div
              {...provided.dragHandleProps}
              className="text-slate-400 group-hover:text-slate-600 transition-colors mt-0.5 cursor-grab active:cursor-grabbing"
            >
              <GripVertical size={14} />
            </div>

            {isEditing ? (
              <div className="flex-1 flex gap-2">
                <textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full text-sm p-1 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                  rows={2}
                  autoFocus
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSave();
                    }
                    if (e.key === "Escape") {
                      handleCancel();
                    }
                  }}
                />
                <div className="flex flex-col gap-1">
                  <button
                    onClick={handleSave}
                    className="text-green-500 hover:bg-green-50 p-1 rounded"
                    title="Save"
                  >
                    <Check size={14} />
                  </button>
                  <button
                    onClick={handleCancel}
                    className="text-red-500 hover:bg-red-50 p-1 rounded"
                    title="Cancel"
                  >
                    <X size={14} />
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1">
                  <p className="text-slate-700 text-sm leading-relaxed break-words font-medium">
                    {task.content}
                  </p>
                  <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-slate-100">
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full flex items-center gap-1 ${priorityStyle[priority]}`}
                    >
                      <Flag size={10} />
                      {priority}
                    </span>
                    <span className="text-[10px] text-slate-400 flex items-center gap-1">
                      <Clock size={10} />
                      {getRelativeTime(task.createdAt)}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setIsEditing(true);
                      setEditedContent(task.content);
                    }}
                    className="text-slate-400 hover:text-blue-500 transition-colors p-1.5 rounded-md hover:bg-blue-50 flex-shrink-0"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTask(columnId, task.id);
                    }}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1.5 rounded-md hover:bg-red-50 flex-shrink-0"
                    title="Delete"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default TaskCard;
