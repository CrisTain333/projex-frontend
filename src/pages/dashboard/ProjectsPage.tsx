import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, Grid, List, MoreHorizontal, FolderKanban } from "lucide-react";

const projects = [
  {
    id: "1",
    name: "Website Redesign",
    description: "Complete overhaul of the company website",
    status: "In Progress",
    progress: 65,
    members: 5,
    tasks: { completed: 24, total: 36 },
  },
  {
    id: "2",
    name: "Mobile App v2",
    description: "Version 2 of the mobile application",
    status: "In Progress",
    progress: 40,
    members: 4,
    tasks: { completed: 12, total: 30 },
  },
  {
    id: "3",
    name: "API Integration",
    description: "Third-party API integrations",
    status: "Review",
    progress: 90,
    members: 3,
    tasks: { completed: 18, total: 20 },
  },
  {
    id: "4",
    name: "Marketing Campaign",
    description: "Q1 marketing campaign planning",
    status: "Planning",
    progress: 15,
    members: 6,
    tasks: { completed: 3, total: 20 },
  },
];

export function ProjectsPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <Link
          to="/dashboard/projects/new"
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white font-medium rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all"
        >
          <Plus size={20} />
          New Project
        </Link>
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
      {viewMode === "grid" ? (
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
                {project.description}
              </p>

              {/* Progress */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs text-[#6B7280]">Progress</span>
                  <span className="text-xs font-medium text-[#4A4A68] dark:text-[#9CA3AF]">
                    {project.progress}%
                  </span>
                </div>
                <div className="h-2 bg-[#E5E7EB] dark:bg-[#2D2D44] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#F97316] to-[#EC4899] rounded-full"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-sm">
                <span className="text-[#6B7280]">
                  {project.tasks.completed}/{project.tasks.total} tasks
                </span>
                <div className="flex -space-x-2">
                  {[...Array(Math.min(project.members, 3))].map((_, i) => (
                    <div
                      key={i}
                      className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F97316] to-[#EC4899] border-2 border-white dark:border-[#1A1A2E] flex items-center justify-center"
                    >
                      <span className="text-white text-[10px] font-medium">
                        {String.fromCharCode(65 + i)}
                      </span>
                    </div>
                  ))}
                  {project.members > 3 && (
                    <div className="w-6 h-6 rounded-full bg-[#E5E7EB] dark:bg-[#2D2D44] border-2 border-white dark:border-[#1A1A2E] flex items-center justify-center">
                      <span className="text-[10px] font-medium text-[#6B7280]">
                        +{project.members - 3}
                      </span>
                    </div>
                  )}
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
                  Status
                </th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[#6B7280] hidden md:table-cell">
                  Progress
                </th>
                <th className="text-left px-5 py-3 text-sm font-medium text-[#6B7280] hidden lg:table-cell">
                  Tasks
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
                          {project.description}
                        </p>
                      </div>
                    </Link>
                  </td>
                  <td className="px-5 py-4 hidden sm:table-cell">
                    <span className="inline-flex px-2.5 py-1 text-xs font-medium rounded-full bg-[#F97316]/10 text-[#F97316]">
                      {project.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 hidden md:table-cell">
                    <div className="flex items-center gap-3">
                      <div className="w-24 h-2 bg-[#E5E7EB] dark:bg-[#2D2D44] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-[#F97316] to-[#EC4899] rounded-full"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-sm text-[#6B7280]">
                        {project.progress}%
                      </span>
                    </div>
                  </td>
                  <td className="px-5 py-4 hidden lg:table-cell">
                    <span className="text-sm text-[#6B7280]">
                      {project.tasks.completed}/{project.tasks.total}
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
    </div>
  );
}
