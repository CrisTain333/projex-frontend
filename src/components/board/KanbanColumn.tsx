import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Plus, MoreHorizontal } from "lucide-react";
import { SortableIssueCard } from "./SortableIssueCard";
import { Issue, IssueStatus } from "@/types";

interface KanbanColumnProps {
  id: IssueStatus;
  title: string;
  issues: Issue[];
  onIssueClick?: (issue: Issue) => void;
  onAddClick?: () => void;
}

const statusColors: Record<IssueStatus, string> = {
  backlog: "#6B7280",
  todo: "#3B82F6",
  in_progress: "#F59E0B",
  in_review: "#8B5CF6",
  done: "#10B981",
  cancelled: "#EF4444",
};

export function KanbanColumn({
  id,
  title,
  issues,
  onIssueClick,
  onAddClick,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      className={`flex-shrink-0 w-72 bg-[#F3F4F6] dark:bg-[#1A1A2E] rounded-xl flex flex-col max-h-full transition-colors ${
        isOver ? "ring-2 ring-[#F97316]/50" : ""
      }`}
    >
      {/* Column Header */}
      <div className="flex items-center justify-between p-3 border-b border-[#E5E7EB] dark:border-[#2D2D44]">
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full"
            style={{ backgroundColor: statusColors[id] }}
          />
          <h3 className="font-semibold text-[#1A1A2E] dark:text-white">
            {title}
          </h3>
          <span className="px-2 py-0.5 text-xs font-medium text-[#6B7280] bg-white dark:bg-[#2D2D44] rounded">
            {issues.length}
          </span>
        </div>
        <button className="p-1 text-[#6B7280] hover:text-[#1A1A2E] dark:hover:text-white">
          <MoreHorizontal size={18} />
        </button>
      </div>

      {/* Issues */}
      <div className="flex-1 p-2 space-y-2 overflow-y-auto">
        <SortableContext
          items={issues.map((i) => i.id)}
          strategy={verticalListSortingStrategy}
        >
          {issues.map((issue) => (
            <SortableIssueCard
              key={issue.id}
              issue={issue}
              onClick={() => onIssueClick?.(issue)}
            />
          ))}
        </SortableContext>
      </div>

      {/* Add Task Button */}
      <div className="p-2 border-t border-[#E5E7EB] dark:border-[#2D2D44]">
        <button
          onClick={onAddClick}
          className="flex items-center justify-center gap-2 w-full py-2 text-sm text-[#6B7280] hover:text-[#F97316] hover:bg-white dark:hover:bg-[#2D2D44] rounded-lg transition-colors"
        >
          <Plus size={18} />
          Add issue
        </button>
      </div>
    </div>
  );
}
