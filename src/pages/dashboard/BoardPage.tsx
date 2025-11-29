import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, MoreHorizontal, GripVertical } from "lucide-react";

interface Task {
  id: string;
  title: string;
  description?: string;
  assignee?: { name: string; initials: string };
  priority?: "low" | "medium" | "high" | "critical";
  labels?: string[];
}

interface Column {
  id: string;
  title: string;
  tasks: Task[];
}

const initialColumns: Column[] = [
  {
    id: "todo",
    title: "To Do",
    tasks: [
      {
        id: "1",
        title: "Design system documentation",
        description: "Create comprehensive docs for the design system",
        assignee: { name: "Alice", initials: "AL" },
        priority: "high",
        labels: ["Design", "Docs"],
      },
      {
        id: "2",
        title: "User authentication flow",
        assignee: { name: "Bob", initials: "BO" },
        priority: "critical",
        labels: ["Backend"],
      },
      {
        id: "3",
        title: "Dashboard analytics",
        description: "Add charts and metrics to dashboard",
        assignee: { name: "Charlie", initials: "CH" },
        priority: "medium",
      },
    ],
  },
  {
    id: "in-progress",
    title: "In Progress",
    tasks: [
      {
        id: "4",
        title: "API integration",
        description: "Connect frontend with backend APIs",
        assignee: { name: "Diana", initials: "DI" },
        priority: "high",
        labels: ["Frontend", "Backend"],
      },
      {
        id: "5",
        title: "Mobile responsive design",
        assignee: { name: "Eve", initials: "EV" },
        priority: "medium",
        labels: ["Design"],
      },
    ],
  },
  {
    id: "review",
    title: "Review",
    tasks: [
      {
        id: "6",
        title: "Code review for auth module",
        assignee: { name: "Frank", initials: "FR" },
        priority: "high",
        labels: ["Review"],
      },
    ],
  },
  {
    id: "done",
    title: "Done",
    tasks: [],
  },
];

const priorityColors = {
  low: "bg-[#6B7280]",
  medium: "bg-[#F59E0B]",
  high: "bg-[#F97316]",
  critical: "bg-[#EF4444]",
};

export function BoardPage() {
  const { projectId } = useParams();
  const [columns] = useState<Column[]>(initialColumns);

  const addTask = (columnId: string) => {
    // TODO: Open modal to create task
    console.log("Add task to column:", columnId);
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
          Board
        </h1>
        <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
          Project ID: {projectId}
        </p>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-4 h-full">
        {columns.map((column) => (
          <div
            key={column.id}
            className="flex-shrink-0 w-72 bg-[#F3F4F6] dark:bg-[#1A1A2E] rounded-xl"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between p-3 border-b border-[#E5E7EB] dark:border-[#2D2D44]">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-[#1A1A2E] dark:text-white">
                  {column.title}
                </h3>
                <span className="px-2 py-0.5 text-xs font-medium text-[#6B7280] bg-white dark:bg-[#2D2D44] rounded">
                  {column.tasks.length}
                </span>
              </div>
              <button className="p-1 text-[#6B7280] hover:text-[#1A1A2E] dark:hover:text-white">
                <MoreHorizontal size={18} />
              </button>
            </div>

            {/* Tasks */}
            <div className="p-2 space-y-2 max-h-[calc(100%-8rem)] overflow-y-auto">
              {column.tasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-white dark:bg-[#2D2D44] rounded-lg p-3 border border-[#E5E7EB] dark:border-[#3D3D54] hover:border-[#F97316]/30 cursor-pointer group transition-all"
                >
                  {/* Drag Handle */}
                  <div className="flex items-start gap-2">
                    <button className="mt-0.5 text-[#D1D5DB] dark:text-[#4A4A68] opacity-0 group-hover:opacity-100 transition-opacity cursor-grab">
                      <GripVertical size={16} />
                    </button>
                    <div className="flex-1 min-w-0">
                      {/* Labels */}
                      {task.labels && task.labels.length > 0 && (
                        <div className="flex flex-wrap gap-1 mb-2">
                          {task.labels.map((label) => (
                            <span
                              key={label}
                              className="px-2 py-0.5 text-xs font-medium rounded bg-gradient-to-r from-[#F97316]/10 to-[#EC4899]/10 text-[#F97316]"
                            >
                              {label}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Title */}
                      <h4 className="text-sm font-medium text-[#1A1A2E] dark:text-white mb-1">
                        {task.title}
                      </h4>

                      {/* Description */}
                      {task.description && (
                        <p className="text-xs text-[#6B7280] line-clamp-2 mb-2">
                          {task.description}
                        </p>
                      )}

                      {/* Footer */}
                      <div className="flex items-center justify-between mt-2">
                        {/* Priority */}
                        {task.priority && (
                          <div
                            className={`w-2 h-2 rounded-full ${priorityColors[task.priority]}`}
                            title={`${task.priority} priority`}
                          />
                        )}

                        {/* Assignee */}
                        {task.assignee && (
                          <div
                            className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center"
                            title={task.assignee.name}
                          >
                            <span className="text-white text-[10px] font-medium">
                              {task.assignee.initials}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Task Button */}
            <div className="p-2">
              <button
                onClick={() => addTask(column.id)}
                className="flex items-center justify-center gap-2 w-full py-2 text-sm text-[#6B7280] hover:text-[#F97316] hover:bg-white dark:hover:bg-[#2D2D44] rounded-lg transition-colors"
              >
                <Plus size={18} />
                Add task
              </button>
            </div>
          </div>
        ))}

        {/* Add Column Button */}
        <div className="flex-shrink-0 w-72">
          <button className="flex items-center justify-center gap-2 w-full py-3 text-sm text-[#6B7280] hover:text-[#F97316] bg-[#F3F4F6] dark:bg-[#1A1A2E] hover:bg-[#E5E7EB] dark:hover:bg-[#2D2D44] rounded-xl transition-colors">
            <Plus size={18} />
            Add column
          </button>
        </div>
      </div>
    </div>
  );
}
