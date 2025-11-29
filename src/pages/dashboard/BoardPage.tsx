import { useState } from "react";
import { useParams } from "react-router-dom";
import { Plus, Filter, Search } from "lucide-react";
import { KanbanBoard } from "@/components/board";
import { IssueModal, CreateIssueModal } from "@/components/issues";
import { Button, Spinner, EmptyState } from "@/components/ui";
import { useProjectIssues } from "@/hooks/api/useIssues";
import { useProject } from "@/hooks/api/useProjects";
import { useBoardStore } from "@/stores";
import { Issue } from "@/types";

export function BoardPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [selectedIssue, setSelectedIssue] = useState<Issue | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { setFilters, filters } = useBoardStore();
  const { data: project, isLoading: projectLoading } = useProject(projectId || "");
  const { data: issues, isLoading: issuesLoading } = useProjectIssues(projectId || "");

  const isLoading = projectLoading || issuesLoading;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
            {project?.name || "Board"}
          </h1>
          <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
            {project?.key ? `${project.key} Board` : "Manage your issues"}
          </p>
        </div>
        <div className="flex items-center gap-3">
          {/* Search */}
          <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1A1A2E] rounded-lg border border-[#E5E7EB] dark:border-[#2D2D44]">
            <Search size={18} className="text-[#6B7280]" />
            <input
              type="text"
              placeholder="Search issues..."
              value={filters.search}
              onChange={(e) => setFilters({ search: e.target.value })}
              className="bg-transparent text-sm text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none w-40"
            />
          </div>

          {/* Filter Button */}
          <Button variant="outline" leftIcon={<Filter size={18} />}>
            Filter
          </Button>

          {/* Create Issue */}
          <Button
            onClick={() => setIsCreateModalOpen(true)}
            leftIcon={<Plus size={18} />}
          >
            Create Issue
          </Button>
        </div>
      </div>

      {/* Board */}
      <div className="flex-1 overflow-hidden">
        {issues && issues.length > 0 ? (
          <KanbanBoard
            issues={issues}
            onIssueClick={(issue) => setSelectedIssue(issue)}
          />
        ) : (
          <EmptyState
            icon={<Plus size={48} />}
            title="No issues yet"
            description="Create your first issue to get started"
            action={
              <Button
                onClick={() => setIsCreateModalOpen(true)}
                leftIcon={<Plus size={18} />}
              >
                Create Issue
              </Button>
            }
          />
        )}
      </div>

      {/* Issue Detail Modal */}
      <IssueModal
        issue={selectedIssue}
        isOpen={!!selectedIssue}
        onClose={() => setSelectedIssue(null)}
      />

      {/* Create Issue Modal */}
      {projectId && (
        <CreateIssueModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          projectId={projectId}
        />
      )}
    </div>
  );
}
