import { Link } from "react-router-dom";
import {
  Plus,
  Pencil,
  ArrowRight,
  UserPlus,
  UserMinus,
  Tag,
  MessageSquare,
  Paperclip,
  Calendar,
  Archive,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { Activity, ActivityAction } from "@/types";
import { formatTimeAgo } from "@/utils/formatters";
import { Spinner } from "@/components/ui";

interface ActivityFeedProps {
  activities: Activity[] | undefined;
  isLoading?: boolean;
  emptyMessage?: string;
  showIssueLink?: boolean;
}

const actionConfig: Record<
  ActivityAction,
  { icon: React.ReactNode; label: string; color: string }
> = {
  created: {
    icon: <Plus size={14} />,
    label: "created",
    color: "text-green-500",
  },
  updated: {
    icon: <Pencil size={14} />,
    label: "updated",
    color: "text-blue-500",
  },
  status_changed: {
    icon: <ArrowRight size={14} />,
    label: "changed status",
    color: "text-purple-500",
  },
  assigned: {
    icon: <UserPlus size={14} />,
    label: "assigned",
    color: "text-blue-500",
  },
  unassigned: {
    icon: <UserMinus size={14} />,
    label: "unassigned",
    color: "text-gray-500",
  },
  priority_changed: {
    icon: <AlertCircle size={14} />,
    label: "changed priority",
    color: "text-orange-500",
  },
  epic_changed: {
    icon: <Tag size={14} />,
    label: "changed epic",
    color: "text-purple-500",
  },
  label_added: {
    icon: <Tag size={14} />,
    label: "added label",
    color: "text-blue-500",
  },
  label_removed: {
    icon: <Tag size={14} />,
    label: "removed label",
    color: "text-gray-500",
  },
  comment_added: {
    icon: <MessageSquare size={14} />,
    label: "commented",
    color: "text-blue-500",
  },
  comment_edited: {
    icon: <Pencil size={14} />,
    label: "edited comment",
    color: "text-gray-500",
  },
  comment_deleted: {
    icon: <MessageSquare size={14} />,
    label: "deleted comment",
    color: "text-red-500",
  },
  attachment_added: {
    icon: <Paperclip size={14} />,
    label: "added attachment",
    color: "text-blue-500",
  },
  attachment_removed: {
    icon: <Paperclip size={14} />,
    label: "removed attachment",
    color: "text-gray-500",
  },
  subtask_added: {
    icon: <Plus size={14} />,
    label: "added subtask",
    color: "text-green-500",
  },
  subtask_completed: {
    icon: <CheckCircle2 size={14} />,
    label: "completed subtask",
    color: "text-green-500",
  },
  due_date_changed: {
    icon: <Calendar size={14} />,
    label: "changed due date",
    color: "text-orange-500",
  },
  archived: {
    icon: <Archive size={14} />,
    label: "archived",
    color: "text-gray-500",
  },
  restored: {
    icon: <RotateCcw size={14} />,
    label: "restored",
    color: "text-green-500",
  },
};

function getActivityDescription(activity: Activity): React.ReactNode {
  const { action, changes, relatedUser, actor } = activity;
  const config = actionConfig[action];

  switch (action) {
    case "status_changed":
      return (
        <>
          {config.label} from{" "}
          <span className="font-medium">
            {String(changes?.from || "").replace("_", " ")}
          </span>{" "}
          to{" "}
          <span className="font-medium">
            {String(changes?.to || "").replace("_", " ")}
          </span>
        </>
      );

    case "assigned":
      return (
        <>
          assigned to{" "}
          <span className="font-medium">
            {relatedUser?.name || "someone"}
          </span>
        </>
      );

    case "unassigned":
      return (
        <>
          removed assignment from{" "}
          <span className="font-medium">
            {relatedUser?.name || "someone"}
          </span>
        </>
      );

    case "priority_changed":
      return (
        <>
          changed priority from{" "}
          <span className="font-medium capitalize">
            {String(changes?.from || "")}
          </span>{" "}
          to{" "}
          <span className="font-medium capitalize">
            {String(changes?.to || "")}
          </span>
        </>
      );

    case "due_date_changed":
      return (
        <>
          {changes?.to
            ? `set due date to ${new Date(String(changes.to)).toLocaleDateString()}`
            : "removed due date"}
        </>
      );

    default:
      return config.label;
  }
}

function getInitials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function ActivityFeed({
  activities,
  isLoading,
  emptyMessage = "No activity yet",
  showIssueLink = true,
}: ActivityFeedProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Spinner size="md" />
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <div className="text-center py-8 text-[#6B7280]">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => {
        const config = actionConfig[activity.action];

        return (
          <div key={activity.id} className="flex gap-3">
            {/* Avatar */}
            <div className="flex-shrink-0">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                {activity.actor.avatar ? (
                  <img
                    src={activity.actor.avatar}
                    alt={activity.actor.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <span className="text-white text-xs font-medium">
                    {getInitials(activity.actor.name)}
                  </span>
                )}
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start gap-2">
                <div
                  className={`p-1 rounded ${config.color} bg-opacity-10`}
                  style={{ backgroundColor: "currentColor", opacity: 0.1 }}
                >
                  <span className={config.color}>{config.icon}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-[#1A1A2E] dark:text-white">
                    <span className="font-medium">{activity.actor.name}</span>{" "}
                    <span className="text-[#6B7280]">
                      {getActivityDescription(activity)}
                    </span>
                    {showIssueLink && (
                      <>
                        {" "}
                        <Link
                          to={`/dashboard/issues/${activity.issueId}`}
                          className="text-[#F97316] hover:underline font-medium"
                        >
                          {activity.issueKey}
                        </Link>
                      </>
                    )}
                  </p>
                  <p className="text-xs text-[#6B7280] mt-0.5">
                    {formatTimeAgo(activity.createdAt)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Compact version for sidebars
export function ActivityFeedCompact({
  activities,
  isLoading,
  limit = 5,
}: {
  activities: Activity[] | undefined;
  isLoading?: boolean;
  limit?: number;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-4">
        <Spinner size="sm" />
      </div>
    );
  }

  if (!activities || activities.length === 0) {
    return (
      <p className="text-sm text-[#6B7280] text-center py-4">No recent activity</p>
    );
  }

  return (
    <div className="space-y-3">
      {activities.slice(0, limit).map((activity) => {
        const config = actionConfig[activity.action];

        return (
          <div key={activity.id} className="flex items-start gap-2">
            <span className={`mt-0.5 ${config.color}`}>{config.icon}</span>
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#1A1A2E] dark:text-white truncate">
                <span className="font-medium">{activity.actor.name}</span>{" "}
                {config.label}{" "}
                <span className="text-[#F97316]">{activity.issueKey}</span>
              </p>
              <p className="text-xs text-[#6B7280]">
                {formatTimeAgo(activity.createdAt)}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
