import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Plus,
  Search,
  Settings,
  Users,
  FolderKanban,
  MoreHorizontal,
  ArrowLeft,
  Pencil,
  Trash2,
} from "lucide-react";
import { useSpace } from "@/hooks/api/useSpaces";
import { useSpaceProjects } from "@/hooks/api/useProjects";
import { Button, Spinner, EmptyState, Modal, Input } from "@/components/ui";
import { CreateProjectModal } from "@/components/projects/CreateProjectModal";

export function SpaceDetailPage() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateProjectOpen, setIsCreateProjectOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"projects" | "members" | "settings">("projects");

  const { data: space, isLoading: spaceLoading } = useSpace(spaceId || "");
  const { data: projects, isLoading: projectsLoading } = useSpaceProjects(spaceId || "");

  const isLoading = spaceLoading || projectsLoading;

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

  if (!space) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-[#6B7280] mb-4">Space not found</p>
        <Link to="/dashboard/spaces">
          <Button variant="outline" leftIcon={<ArrowLeft size={18} />}>
            Back to Spaces
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#6B7280]">
        <Link to="/dashboard/spaces" className="hover:text-[#F97316]">
          Spaces
        </Link>
        <span>/</span>
        <span className="text-[#1A1A2E] dark:text-white">{space.name}</span>
      </div>

      {/* Space Header */}
      <div className="bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E5E7EB] dark:border-[#2D2D44] p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          <div className="flex items-start gap-4">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
              style={{ backgroundColor: space.color || "#F97316" }}
            >
              {space.icon || space.name[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
                {space.name}
              </h1>
              {space.description && (
                <p className="text-[#6B7280] mt-1">{space.description}</p>
              )}
              <div className="flex items-center gap-4 mt-3 text-sm text-[#6B7280]">
                <div className="flex items-center gap-1">
                  <FolderKanban size={16} />
                  <span>{space.projectCount || 0} projects</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{space.memberCount || 0} members</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => setIsSettingsOpen(true)}
              leftIcon={<Settings size={18} />}
            >
              Settings
            </Button>
            <Button
              onClick={() => setIsCreateProjectOpen(true)}
              leftIcon={<Plus size={18} />}
            >
              New Project
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-1 border-b border-[#E5E7EB] dark:border-[#2D2D44]">
        {[
          { id: "projects" as const, label: "Projects", icon: FolderKanban },
          { id: "members" as const, label: "Members", icon: Users },
          { id: "settings" as const, label: "Settings", icon: Settings },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-[#F97316] text-[#F97316]"
                : "border-transparent text-[#6B7280] hover:text-[#1A1A2E] dark:hover:text-white"
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "projects" && (
        <div className="space-y-4">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1A1A2E] rounded-lg border border-[#E5E7EB] dark:border-[#2D2D44] max-w-md">
            <Search size={18} className="text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-sm text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none"
            />
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <EmptyState
              icon={<FolderKanban size={48} />}
              title="No projects in this space"
              description="Create your first project to get started"
              action={
                <Button
                  onClick={() => setIsCreateProjectOpen(true)}
                  leftIcon={<Plus size={18} />}
                >
                  Create Project
                </Button>
              }
            />
          ) : (
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

                  <div className="flex items-center gap-4 text-sm text-[#6B7280] mb-4">
                    <span className="px-2.5 py-1 bg-[#F8F9FC] dark:bg-[#2D2D44] rounded text-xs font-medium uppercase">
                      {project.key}
                    </span>
                    <span>{project.boardType === "kanban" ? "Kanban" : "Scrum"}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm pt-3 border-t border-[#E5E7EB] dark:border-[#2D2D44]">
                    <span className="text-[#6B7280]">{project.issueCount} issues</span>
                    <span className="text-[#6B7280]">{project.memberCount} members</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === "members" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1A1A2E] rounded-lg border border-[#E5E7EB] dark:border-[#2D2D44] max-w-md">
              <Search size={18} className="text-[#6B7280]" />
              <input
                type="text"
                placeholder="Search members..."
                className="flex-1 bg-transparent text-sm text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none"
              />
            </div>
            <Button variant="outline" leftIcon={<Plus size={18} />}>
              Invite Member
            </Button>
          </div>

          <div className="bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E5E7EB] dark:border-[#2D2D44]">
            <div className="p-8 text-center text-[#6B7280]">
              <Users size={48} className="mx-auto mb-4 opacity-50" />
              <p>Member management coming soon</p>
              <p className="text-sm mt-1">You'll be able to manage space members here</p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "settings" && (
        <div className="bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E5E7EB] dark:border-[#2D2D44] p-6">
          <h2 className="text-lg font-semibold text-[#1A1A2E] dark:text-white mb-6">
            Space Settings
          </h2>

          <div className="space-y-6">
            {/* General Settings */}
            <div className="space-y-4">
              <h3 className="font-medium text-[#1A1A2E] dark:text-white">General</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Space Name"
                  defaultValue={space.name}
                  placeholder="Enter space name"
                />
                <Input
                  label="Slug"
                  defaultValue={space.slug}
                  placeholder="space-slug"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5">
                  Description
                </label>
                <textarea
                  defaultValue={space.description || ""}
                  placeholder="What is this space about?"
                  className="w-full px-4 py-3 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 resize-none"
                  rows={3}
                />
              </div>
              <Button leftIcon={<Pencil size={18} />}>Save Changes</Button>
            </div>

            {/* Danger Zone */}
            <div className="pt-6 border-t border-[#E5E7EB] dark:border-[#2D2D44]">
              <h3 className="font-medium text-red-600 mb-2">Danger Zone</h3>
              <p className="text-sm text-[#6B7280] mb-4">
                Permanently delete this space and all its projects. This action cannot be undone.
              </p>
              <Button
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                leftIcon={<Trash2 size={18} />}
              >
                Delete Space
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create Project Modal */}
      <CreateProjectModal
        isOpen={isCreateProjectOpen}
        onClose={() => setIsCreateProjectOpen(false)}
        spaceId={spaceId}
      />

      {/* Settings Modal (Quick access) */}
      <Modal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        title="Space Settings"
      >
        <div className="space-y-4">
          <Input
            label="Space Name"
            defaultValue={space.name}
            placeholder="Enter space name"
          />
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5">
              Color
            </label>
            <div className="flex gap-2">
              {["#F97316", "#EC4899", "#8B5CF6", "#3B82F6", "#10B981", "#EF4444"].map(
                (color) => (
                  <button
                    key={color}
                    className={`w-8 h-8 rounded-full border-2 ${
                      space.color === color
                        ? "border-[#1A1A2E] dark:border-white"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color }}
                  />
                )
              )}
            </div>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setIsSettingsOpen(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
