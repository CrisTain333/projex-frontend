import {
  Bug,
  Lightbulb,
  Bookmark,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import { Issue, IssueType, Priority } from "@/types";
import { Avatar } from "@/components/ui";

interface IssueCardProps {
  issue: Issue;
  isDragging?: boolean;
  onClick?: () => void;
}

const typeIcons: Record<IssueType, React.ReactNode> = {
  bug: <Bug size={14} className="text-[#EF4444]" />,
  feature: <Lightbulb size={14} className="text-[#10B981]" />,
  story: <Bookmark size={14} className="text-[#3B82F6]" />,
  task: <CheckCircle2 size={14} className="text-[#6B7280]" />,
  epic: <AlertCircle size={14} className="text-[#8B5CF6]" />,
  subtask: <CheckCircle2 size={14} className="text-[#6B7280]" />,
};

const priorityColors: Record<Priority, string> = {
  highest: "#EF4444",
  high: "#F97316",
  medium: "#F59E0B",
  low: "#10B981",
  lowest: "#6B7280",
};

const priorityLabels: Record<Priority, string> = {
  highest: "Highest",
  high: "High",
  medium: "Medium",
  low: "Low",
  lowest: "Lowest",
};

export function IssueCard({ issue, isDragging, onClick }: IssueCardProps) {
  return (
    <div
      onClick={onClick}
      className={`bg-white dark:bg-[#2D2D44] rounded-lg p-3 border border-[#E5E7EB] dark:border-[#3D3D54] cursor-pointer group transition-all ${
        isDragging
          ? "shadow-lg ring-2 ring-[#F97316] opacity-90"
          : "hover:border-[#F97316]/30 hover:shadow-md"
      }`}
    >
      {/* Labels */}
      {issue.labels && issue.labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {issue.labels.slice(0, 3).map((label) => (
            <span
              key={label.id}
              className="px-2 py-0.5 text-xs font-medium rounded"
              style={{
                backgroundColor: `${label.color}20`,
                color: label.color,
              }}
            >
              {label.name}
            </span>
          ))}
          {issue.labels.length > 3 && (
            <span className="px-2 py-0.5 text-xs font-medium text-[#6B7280] bg-[#F3F4F6] dark:bg-[#1A1A2E] rounded">
              +{issue.labels.length - 3}
            </span>
          )}
        </div>
      )}

      {/* Issue Key & Type */}
      <div className="flex items-center gap-2 mb-1">
        {typeIcons[issue.type]}
        <span className="text-xs font-medium text-[#6B7280]">{issue.key}</span>
      </div>

      {/* Title */}
      <h4 className="text-sm font-medium text-[#1A1A2E] dark:text-white mb-2 line-clamp-2">
        {issue.title}
      </h4>

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        {/* Priority */}
        <div
          className="flex items-center gap-1 px-1.5 py-0.5 rounded text-xs font-medium"
          style={{
            backgroundColor: `${priorityColors[issue.priority]}15`,
            color: priorityColors[issue.priority],
          }}
          title={`${priorityLabels[issue.priority]} priority`}
        >
          <div
            className="w-2 h-2 rounded-full"
            style={{ backgroundColor: priorityColors[issue.priority] }}
          />
          {priorityLabels[issue.priority]}
        </div>

        {/* Assignee */}
        {issue.assignee && (
          <Avatar
            src={issue.assignee.avatar}
            name={issue.assignee.name || `${issue.assignee.firstName || ''} ${issue.assignee.lastName || ''}`}
            size="xs"
          />
        )}
      </div>

      {/* Story Points */}
      {issue.storyPoints !== null && issue.storyPoints !== undefined && (
        <div className="mt-2 flex items-center justify-end">
          <span className="text-xs font-medium text-[#6B7280] bg-[#F3F4F6] dark:bg-[#1A1A2E] px-1.5 py-0.5 rounded">
            {issue.storyPoints} pts
          </span>
        </div>
      )}
    </div>
  );
}
