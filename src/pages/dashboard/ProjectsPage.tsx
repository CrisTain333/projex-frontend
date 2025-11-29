import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Grid, List, MoreHorizontal, FolderKanban } from "lucide-react";
import { useProjects } from "@/hooks/api/useProjects";
import { Button, Spinner, EmptyState } from "@/components/ui";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";

export function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: projects, isLoading } = useProjects();

  const filteredProjects = projects?.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
            Projects
          </h1>
          <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
            Manage and track all your projects
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<Plus size={20} />}
        >
          New Project
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1A1A2E] rounded-lg border border-[#E5E7EB] dark:border-[#2D2D44]">
          <Search size={18} className="text-[#6B7280]" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode("grid")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "grid"
                ? "bg-[#F97316]/10 text-[#F97316]"
                : "bg-white dark:bg-[#1A1A2E] text-[#6B7280] border border-[#E5E7EB] dark:border-[#2D2D44]"
            }`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={`p-2 rounded-lg transition-colors ${
              viewMode === "list"
                ? "bg-[#F97316]/10 text-[#F97316]"
                : "bg-white dark:bg-[#1A1A2E] text-[#6B7280] border border-[#E5E7EB] dark:border-[#2D2D44]"
            }`}
          >
            <List size={20} />
          </button>
        </div>
      </div>

      {/* Projects Grid/List */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={<FolderKanban size={48} />}
          title="No projects yet"
          description="Create your first project to start managing tasks"
          action={
            <Button onClick={() => setIsCreateModalOpen(true)} leftIcon={<Plus size={18} />}>
              Create Project
            </Button>
          }
        />
      ) : viewMode === "grid" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredProjects.map((project) => (
            <Link
              key={project.id}
              to={`/dashboard/projects/${project.id}/board`}
              className="bg-white dark:bg-[#1A1A2E] rounded-xl p-5 border border-[#E5E7EB] dark:border-[#2D2D44] hover:border-[#F97316]/30 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                  <FolderKanban size={24} className="text-white" />
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    // TODO: Show dropdown menu
                  }}
                  className="p-1 text-[#6B7280] hover:text-[#1A1A2E] dark:hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <h3 className="font-semibold text-[#1A1A2E] dark:text-white mb-1">
                {project.name}
              </h3>
              <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">
                {project.description || "No description"}
              </p>

              {/* Project Info */}
              <div className="flex items-center gap-4 text-sm text-[#6B7280] mb-4">
                <span className="px-2.5 py-1 bg-[#F8F9FC] dark:bg-[#2D2D44] rounded text-xs font-medium uppercase">
                  {project.key}
                </span>
                <span>{project.boardType === "kanban" ? "Kanban" : "Scrum"}</span>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm pt-3 border-t border-[#E5E7EB] dark:border-[#2D2D44]">
                <span className="text-[#6B7280]">
                  {project.issueCount} issues
                </span>
                <div className="flex items-center gap-1 text-[#6B7280]">
                  <span>{project.memberCount} members</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E5E7EB] dark:border-[#2D2D44] overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#E5E7EB] dark:border-[#2D2D44]">
                <th className="text-left px-5 py-3 text-sm font-medium text-[#6B7280]">
                  Project
                </th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[#6B7280] hidden sm:table-cell">
                  Key
                </th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[#6B7280] hidden md:table-cell">
                  Type
                </th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[#6B7280] hidden lg:table-cell">
                  Issues
                </th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#2D2D44]">
              {filteredProjects.map((project) => (
                <tr
                  key={project.id}
                  className="hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44]/50 transition-colors cursor-pointer"
                >
                  <td className="px-5 py-4">
                    <Link
                      to={`/dashboard/projects/${project.id}/board`}
                      className="flex items-center gap-3"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                        <FolderKanban size={20} className="text-white" />
                      </div>
                      <div>
                        <p className="font-medium text-[#1A1A2E] dark:text-white">
                          {project.name}
                        </p>
                        <p className="text-sm text-[#6B7280] hidden sm:block">
                          {project.description || "No description"}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded bg-[#F8F9FC] dark:bg-[#2D2D44] text-[#4A4A68] dark:text-[#9CA3AF] uppercase">
                      {project.key}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <span className="text-sm text-[#6B7280]">
                      {project.boardType === "kanban" ? "Kanban" : "Scrum"}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm text-[#6B7280]">
                      {project.issueCount}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <button className="p-1 text-[#6B7280] hover:text-[#1A1A2E] dark:hover:text-white">
                      <MoreHorizontal size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}
