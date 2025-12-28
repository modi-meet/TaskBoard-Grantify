import React from "react";
import { Calendar, CheckCircle2, Clock, AlertCircle } from "lucide-react";
import { useKanban } from "../context/KanbanContext";
import Footer from "../components/Footer";

const TimelineView = () => {
  const { columns } = useKanban();

  const allTasks = [];
  const statusMap = {
    todo: { label: "Work Assigned", color: "bg-slate-400", icon: AlertCircle },
    inprogress: { label: "In Progress", color: "bg-blue-400", icon: Clock },
    done: { label: "Completed", color: "bg-emerald-400", icon: CheckCircle2 },
  };

  columns.forEach((col) => {
    col.tasks.forEach((task) => {
      allTasks.push({
        ...task,
        columnId: col.id,
        status: statusMap[col.id],
      });
    });
  });

  const sortedTasks = [...allTasks].sort((a, b) => {
    const dateA = new Date(a.createdAt || 0);
    const dateB = new Date(b.createdAt || 0);
    return dateB - dateA;
  });

  const completedCount =
    columns.find((col) => col.id === "done")?.tasks.length || 0;
  const inProgressCount =
    columns.find((col) => col.id === "inprogress")?.tasks.length || 0;
  const assignedCount =
    columns.find((col) => col.id === "todo")?.tasks.length || 0;
  const totalTasks = assignedCount + inProgressCount + completedCount;
  const progressPercentage =
    totalTasks > 0 ? (completedCount / totalTasks) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-blue-50 flex flex-col">
      <header className="border-b border-slate-200/60 bg-white/80 backdrop-blur-sm sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-8 py-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Calendar size={20} className="text-blue-500" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
              Sprint Timeline
            </span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">
            Project Timeline
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto leading-relaxed">
            Track your sprint progress with a visual timeline of all tasks and
            milestones.
          </p>
        </div>
      </header>

      <main className="flex-1 overflow-auto p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <div className="text-sm text-slate-500 font-medium mb-2">
                Total Tasks
              </div>
              <div className="text-3xl font-bold text-slate-900">
                {totalTasks}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <div className="text-sm text-slate-500 font-medium mb-2">
                Assigned
              </div>
              <div className="text-3xl font-bold text-slate-400">
                {assignedCount}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <div className="text-sm text-slate-500 font-medium mb-2">
                In Progress
              </div>
              <div className="text-3xl font-bold text-blue-400">
                {inProgressCount}
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 border border-slate-200 shadow-sm">
              <div className="text-sm text-slate-500 font-medium mb-2">
                Completed
              </div>
              <div className="text-3xl font-bold text-emerald-400">
                {completedCount}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm mb-8">
            <div className="flex items-center justify-between mb-3">
              <h2 className="font-semibold text-slate-900">Sprint Progress</h2>
              <span className="text-sm font-semibold text-slate-600">
                {Math.round(progressPercentage)}%
              </span>
            </div>
            <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 transition-all duration-500"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="mt-3 text-xs text-slate-500">
              {completedCount} of {totalTasks} tasks completed
            </div>
          </div>

          {sortedTasks.length > 0 ? (
            <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
                <h2 className="font-semibold text-slate-900">Task Timeline</h2>
              </div>
              <div className="divide-y divide-slate-100">
                {sortedTasks.map((task, index) => {
                  const IconComponent = task.status.icon;
                  return (
                    <div
                      key={task.id}
                      className="px-6 py-4 hover:bg-slate-50 transition-colors group"
                    >
                      <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center mt-1">
                          <div
                            className={`w-3 h-3 rounded-full ${task.status.color}`}
                          ></div>
                          {index !== sortedTasks.length - 1 && (
                            <div className="w-0.5 h-12 bg-slate-200 mt-2"></div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <IconComponent
                              size={16}
                              className={task.status.color.replace(
                                "bg-",
                                "text-"
                              )}
                            />
                            <span
                              className={`text-xs font-semibold px-2 py-0.5 rounded-full ${task.status.color.replace(
                                "bg-",
                                "text-"
                              )} ${task.status.color
                                .replace("bg-", "bg-")
                                .replace("-400", "-50")
                                .replace("-500", "-50")}`}
                            >
                              {task.status.label}
                            </span>
                          </div>
                          <p className="text-sm font-medium text-slate-900 break-words">
                            {task.content}
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            {new Date(task.createdAt).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg p-12 border border-slate-200 shadow-sm text-center">
              <Calendar size={48} className="mx-auto text-slate-300 mb-4" />
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                No Tasks Yet
              </h3>
              <p className="text-slate-500 mb-4">
                Create tasks on the board to see them appear in the timeline.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TimelineView;
