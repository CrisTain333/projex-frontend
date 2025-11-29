import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Bug,
  Lightbulb,
  Bookmark,
  CheckCircle2,
  AlertCircle,
  Clock,
  User,
  Tag,
  Calendar,
  MessageSquare,
  Paperclip,
  MoreHorizontal,
  ChevronDown,
  Eye,
  EyeOff,
} from "lucide-react";
import { Issue, IssueType, Priority, IssueStatus } from "@/types";
import { Button, Avatar, Badge } from "@/components/ui";
import { useUpdateIssue, useWatchIssue, useDeleteIssue } from "@/hooks/api/useIssues";
import { formatRelativeTime } from "@/utils/formatters";
import { ISSUE_STATUSES, PRIORITIES } from "@/utils/constants";

interface IssueModalProps {
  issue: Issue | null;
  isOpen: boolean;
  onClose: () => void;
}

const typeIcons: Record<IssueType, React.ReactNode> = {
  bug: <Bug size={16} className="text-[#EF4444]" />,
  feature: <Lightbulb size={16} className="text-[#10B981]" />,
  story: <Bookmark size={16} className="text-[#3B82F6]" />,
  task: <CheckCircle2 size={16} className="text-[#6B7280]" />,
  epic: <AlertCircle size={16} className="text-[#8B5CF6]" />,
  subtask: <CheckCircle2 size={16} className="text-[#6B7280]" />,
};

const priorityColors: Record<Priority, string> = {
  lowest: "#6B7280",
  low: "#10B981",
  medium: "#F59E0B",
  high: "#F97316",
  highest: "#EF4444",
};

const statusColors: Record<IssueStatus, string> = {
  backlog: "#6B7280",
  todo: "#3B82F6",
  in_progress: "#F59E0B",
  in_review: "#8B5CF6",
  done: "#10B981",
  cancelled: "#EF4444",
};

export function IssueModal({ issue, isOpen, onClose }: IssueModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(issue?.title || "");

  const updateMutation = useUpdateIssue();
  const watchMutation = useWatchIssue();
  const deleteMutation = useDeleteIssue();

  if (!issue) return null;

  const handleTitleSave = () => {
    if (editedTitle.trim() && editedTitle !== issue.title) {
      updateMutation.mutate({
        id: issue.id,
        data: { title: editedTitle.trim() },
      });
    }
    setIsEditing(false);
  };

  const handleStatusChange = (status: IssueStatus) => {
    updateMutation.mutate({
      id: issue.id,
      data: { status },
    });
  };

  const handlePriorityChange = (priority: Priority) => {
    updateMutation.mutate({
      id: issue.id,
      data: { priority },
    });
  };

  const handleWatch = () => {
    watchMutation.mutate({
      id: issue.id,
      watch: !issue.isWatching,
    });
  };

  const getDisplayName = (user: { name?: string; firstName?: string; lastName?: string } | null) => {
    if (!user) return "Unknown";
    if (user.firstName && user.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    return user.name || "Unknown";
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-2xl bg-white dark:bg-[#1A1A2E] shadow-xl z-50 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] dark:border-[#2D2D44]">
              <div className="flex items-center gap-3">
                {typeIcons[issue.type]}
                <span className="text-sm font-medium text-[#6B7280]">
                  {issue.key}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleWatch}
                  className={`p-2 rounded-lg transition-colors ${
                    issue.isWatching
                      ? "text-[#F97316] bg-[#F97316]/10"
                      : "text-[#6B7280] hover:bg-[#F3F4F6] dark:hover:bg-[#2D2D44]"
                  }`}
                  title={issue.isWatching ? "Stop watching" : "Watch issue"}
                >
                  {issue.isWatching ? <Eye size={18} /> : <EyeOff size={18} />}
                </button>
                <button className="p-2 text-[#6B7280] hover:bg-[#F3F4F6] dark:hover:bg-[#2D2D44] rounded-lg">
                  <MoreHorizontal size={18} />
                </button>
                <button
                  onClick={onClose}
                  className="p-2 text-[#6B7280] hover:bg-[#F3F4F6] dark:hover:bg-[#2D2D44] rounded-lg"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-6 space-y-6">
                {/* Title */}
                {isEditing ? (
                  <input
                    type="text"
                    value={editedTitle}
                    onChange={(e) => setEditedTitle(e.target.value)}
                    onBlur={handleTitleSave}
                    onKeyDown={(e) => e.key === "Enter" && handleTitleSave()}
                    className="w-full text-xl font-semibold text-[#1A1A2E] dark:text-white bg-transparent border-b-2 border-[#F97316] focus:outline-none"
                    autoFocus
                  />
                ) : (
                  <h1
                    onClick={() => {
                      setEditedTitle(issue.title);
                      setIsEditing(true);
                    }}
                    className="text-xl font-semibold text-[#1A1A2E] dark:text-white cursor-pointer hover:text-[#F97316] transition-colors"
                  >
                    {issue.title}
                  </h1>
                )}

                {/* Status and Priority Row */}
                <div className="flex flex-wrap gap-4">
                  {/* Status Dropdown */}
                  <div className="relative group">
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E5E7EB] dark:border-[#2D2D44] hover:border-[#F97316]/30 transition-colors"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: statusColors[issue.status] }}
                      />
                      <span className="text-sm font-medium text-[#1A1A2E] dark:text-white">
                        {ISSUE_STATUSES.find((s) => s.value === issue.status)?.label || issue.status}
                      </span>
                      <ChevronDown size={14} className="text-[#6B7280]" />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-40 bg-white dark:bg-[#2D2D44] rounded-lg shadow-lg border border-[#E5E7EB] dark:border-[#3D3D54] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      {ISSUE_STATUSES.map((status) => (
                        <button
                          key={status.value}
                          onClick={() => handleStatusChange(status.value)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-[#F3F4F6] dark:hover:bg-[#1A1A2E] transition-colors"
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: statusColors[status.value] }}
                          />
                          {status.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Priority Dropdown */}
                  <div className="relative group">
                    <button
                      className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-[#E5E7EB] dark:border-[#2D2D44] hover:border-[#F97316]/30 transition-colors"
                    >
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: priorityColors[issue.priority] }}
                      />
                      <span className="text-sm font-medium text-[#1A1A2E] dark:text-white">
                        {PRIORITIES.find((p) => p.value === issue.priority)?.label || issue.priority}
                      </span>
                      <ChevronDown size={14} className="text-[#6B7280]" />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-32 bg-white dark:bg-[#2D2D44] rounded-lg shadow-lg border border-[#E5E7EB] dark:border-[#3D3D54] opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-10">
                      {PRIORITIES.map((priority) => (
                        <button
                          key={priority.value}
                          onClick={() => handlePriorityChange(priority.value)}
                          className="flex items-center gap-2 w-full px-3 py-2 text-sm text-left hover:bg-[#F3F4F6] dark:hover:bg-[#1A1A2E] transition-colors"
                        >
                          <div
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: priorityColors[priority.value] }}
                          />
                          {priority.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div>
                  <h3 className="text-sm font-medium text-[#6B7280] mb-2">
                    Description
                  </h3>
                  <div className="text-[#1A1A2E] dark:text-white prose dark:prose-invert max-w-none">
                    {issue.description ? (
                      <p>{issue.description}</p>
                    ) : (
                      <p className="text-[#6B7280] italic">No description provided</p>
                    )}
                  </div>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Assignee */}
                  <div>
                    <h3 className="text-sm font-medium text-[#6B7280] mb-2 flex items-center gap-2">
                      <User size={14} />
                      Assignee
                    </h3>
                    {issue.assignee ? (
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={issue.assignee.avatar}
                          name={getDisplayName(issue.assignee)}
                          size="sm"
                        />
                        <span className="text-sm text-[#1A1A2E] dark:text-white">
                          {getDisplayName(issue.assignee)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-[#6B7280]">Unassigned</span>
                    )}
                  </div>

                  {/* Reporter */}
                  <div>
                    <h3 className="text-sm font-medium text-[#6B7280] mb-2 flex items-center gap-2">
                      <User size={14} />
                      Reporter
                    </h3>
                    {issue.reporter ? (
                      <div className="flex items-center gap-2">
                        <Avatar
                          src={issue.reporter.avatar}
                          name={getDisplayName(issue.reporter)}
                          size="sm"
                        />
                        <span className="text-sm text-[#1A1A2E] dark:text-white">
                          {getDisplayName(issue.reporter)}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-[#6B7280]">Unknown</span>
                    )}
                  </div>

                  {/* Due Date */}
                  <div>
                    <h3 className="text-sm font-medium text-[#6B7280] mb-2 flex items-center gap-2">
                      <Calendar size={14} />
                      Due Date
                    </h3>
                    <span className="text-sm text-[#1A1A2E] dark:text-white">
                      {issue.dueDate
                        ? new Date(issue.dueDate).toLocaleDateString()
                        : "Not set"}
                    </span>
                  </div>

                  {/* Story Points */}
                  <div>
                    <h3 className="text-sm font-medium text-[#6B7280] mb-2 flex items-center gap-2">
                      <Clock size={14} />
                      Story Points
                    </h3>
                    <span className="text-sm text-[#1A1A2E] dark:text-white">
                      {issue.storyPoints || "Not estimated"}
                    </span>
                  </div>
                </div>

                {/* Labels */}
                {issue.labels && issue.labels.length > 0 && (
                  <div>
                    <h3 className="text-sm font-medium text-[#6B7280] mb-2 flex items-center gap-2">
                      <Tag size={14} />
                      Labels
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {issue.labels.map((label) => (
                        <Badge
                          key={label.id}
                          variant="default"
                          style={{
                            backgroundColor: `${label.color}20`,
                            color: label.color,
                          }}
                        >
                          {label.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Timestamps */}
                <div className="pt-4 border-t border-[#E5E7EB] dark:border-[#2D2D44] text-sm text-[#6B7280]">
                  <p>Created {formatRelativeTime(issue.createdAt)}</p>
                  <p>Updated {formatRelativeTime(issue.updatedAt)}</p>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-[#E5E7EB] dark:border-[#2D2D44] flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                <button className="flex items-center gap-1 hover:text-[#F97316] transition-colors">
                  <MessageSquare size={16} />
                  {issue.commentCount || 0} comments
                </button>
                <button className="flex items-center gap-1 hover:text-[#F97316] transition-colors">
                  <Paperclip size={16} />
                  {issue.attachmentCount || 0} attachments
                </button>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  if (confirm("Are you sure you want to delete this issue?")) {
                    deleteMutation.mutate(issue.id);
                    onClose();
                  }
                }}
                className="text-[#EF4444] hover:bg-[#EF4444]/10"
              >
                Delete
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
