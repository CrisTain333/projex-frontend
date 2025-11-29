import { Link } from "react-router-dom";
import { FolderKanban, CheckCircle2, Clock, Users, Bug, Lightbulb, Bookmark, AlertCircle } from "lucide-react";
import { useProjects } from "@/hooks/api/useProjects";
import { useSpaces } from "@/hooks/api/useSpaces";
import { useMyIssues } from "@/hooks/api/useIssues";
import { Spinner } from "@/components/ui";
import { useAuthStore } from "@/stores";
import { IssueType } from "@/types";

const typeIcons: Record<IssueType, React.ReactNode> = {
  bug: <Bug size={16} className="text-[#EF4444]" />,
  feature: <Lightbulb size={16} className="text-[#10B981]" />,
  story: <Bookmark size={16} className="text-[#3B82F6]" />,
  task: <CheckCircle2 size={16} className="text-[#6B7280]" />,
  epic: <AlertCircle size={16} className="text-[#8B5CF6]" />,
  subtask: <CheckCircle2 size={16} className="text-[#6B7280]" />,
};

export function DashboardHome() {
  const { user } = useAuthStore();
  const { data: projects, isLoading: projectsLoading } = useProjects();
  const { data: spaces, isLoading: spacesLoading } = useSpaces();
  const { data: myIssues, isLoading: issuesLoading } = useMyIssues();

  const isLoading = projectsLoading || spacesLoading || issuesLoading;

  // Calculate stats
  const totalProjects = projects?.length || 0;
  const totalSpaces = spaces?.length || 0;
  const totalIssues = myIssues?.length || 0;
  const completedIssues = myIssues?.filter(issue => issue.status === "done").length || 0;
  const inProgressIssues = myIssues?.filter(issue => issue.status === "in_progress").length || 0;

  const stats = [
    { label: "Active Projects", value: String(totalProjects), icon: FolderKanban, color: "#F97316" },
    { label: "Total Issues", value: String(totalIssues), icon: Clock, color: "#3B82F6" },
    { label: "Completed", value: String(completedIssues), icon: CheckCircle2, color: "#10B981" },
    { label: "In Progress", value: String(inProgressIssues), icon: Users, color: "#8B5CF6" },
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
          Welcome back, {user?.name?.split(" ")[0] || "User"}!
        </h1>
        <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
          Here's what's happening with your projects.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-[#1A1A2E] rounded-xl p-5 border border-[#E5E7EB] dark:border-[#2D2D44]"
          >
            <div className="flex items-center justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: `${stat.color}15` }}
              >
                <stat.icon size={20} style={{ color: stat.color }} />
              </div>
            </div>
            <p className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm text-[#6B7280]">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <div className="bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E5E7EB] dark:border-[#2D2D44]">
          <div className="p-5 border-b border-[#E5E7EB] dark:border-[#2D2D44] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1A1A2E] dark:text-white">
              Recent Projects
            </h2>
            <Link
              to="/dashboard/projects"
              className="text-sm text-[#F97316] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-[#E5E7EB] dark:divide-[#2D2D44]">
            {projects?.slice(0, 5).map((project) => (
              <Link
                key={project.id}
                to={`/dashboard/projects/${project.id}/board`}
                className="p-4 flex items-center gap-4 hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center flex-shrink-0">
                  <FolderKanban size={20} className="text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#1A1A2E] dark:text-white truncate">
                    {project.name}
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    {project.issueCount} issues • {project.memberCount} members
                  </p>
                </div>
                <span className="px-2.5 py-1 text-xs font-medium rounded bg-[#F8F9FC] dark:bg-[#2D2D44] text-[#4A4A68] dark:text-[#9CA3AF] uppercase">
                  {project.key}
                </span>
              </Link>
            ))}
            {(!projects || projects.length === 0) && (
              <div className="p-8 text-center text-[#6B7280]">
                No projects yet. Create your first project to get started!
              </div>
            )}
          </div>
        </div>

        {/* My Issues */}
        <div className="bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E5E7EB] dark:border-[#2D2D44]">
          <div className="p-5 border-b border-[#E5E7EB] dark:border-[#2D2D44] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1A1A2E] dark:text-white">
              My Issues
            </h2>
            <span className="text-sm text-[#6B7280]">
              {totalIssues} total
            </span>
          </div>
          <div className="divide-y divide-[#E5E7EB] dark:divide-[#2D2D44]">
            {myIssues?.slice(0, 5).map((issue) => (
              <Link
                key={issue.id}
                to={`/dashboard/projects/${issue.projectId}/board?issue=${issue.id}`}
                className="p-4 flex items-center gap-3 hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44]/50 transition-colors"
              >
                <div className="flex-shrink-0">
                  {typeIcons[issue.type]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[#1A1A2E] dark:text-white truncate">
                    {issue.title}
                  </p>
                  <p className="text-sm text-[#6B7280]">
                    {issue.key} • {issue.status.replace("_", " ")}
                  </p>
                </div>
                <span className={`px-2 py-0.5 text-xs font-medium rounded capitalize ${
                  issue.priority === "highest" || issue.priority === "high"
                    ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                    : issue.priority === "medium"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400"
                }`}>
                  {issue.priority}
                </span>
              </Link>
            ))}
            {(!myIssues || myIssues.length === 0) && (
              <div className="p-8 text-center text-[#6B7280]">
                No issues assigned to you yet.
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Spaces */}
      {spaces && spaces.length > 0 && (
        <div className="bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E5E7EB] dark:border-[#2D2D44]">
          <div className="p-5 border-b border-[#E5E7EB] dark:border-[#2D2D44] flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#1A1A2E] dark:text-white">
              Your Spaces
            </h2>
            <Link
              to="/dashboard/spaces"
              className="text-sm text-[#F97316] hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="p-4 flex flex-wrap gap-3">
            {spaces.slice(0, 6).map((space) => (
              <Link
                key={space.id}
                to={`/dashboard/spaces/${space.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#2D2D44] hover:border-[#F97316]/30 transition-colors"
              >
                <div
                  className="w-6 h-6 rounded flex items-center justify-center text-white text-xs font-bold"
                  style={{ backgroundColor: space.color || "#F97316" }}
                >
                  {space.icon || space.name[0].toUpperCase()}
                </div>
                <span className="font-medium text-[#1A1A2E] dark:text-white">
                  {space.name}
                </span>
                <span className="text-sm text-[#6B7280]">
                  {space.projectCount || 0}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
