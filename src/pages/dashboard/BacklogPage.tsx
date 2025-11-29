import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  Plus,
  Search,
  Play,
  CheckCircle2,
  MoreHorizontal,
  ChevronDown,
  ChevronRight,
  Calendar,
  Target,
  Clock,
  Bug,
  Lightbulb,
  Bookmark,
  AlertCircle,
  ArrowLeft,
} from "lucide-react";
import { useProject } from "@/hooks/api/useProjects";
import {
  useProjectSprints,
  useActiveSprint,
  useCreateSprint,
  useStartSprint,
  useCompleteSprint,
} from "@/hooks/api/useSprints";
import { useProjectIssues } from "@/hooks/api/useIssues";
import { Button, Modal, Input, Spinner, EmptyState } from "@/components/ui";
import { CreateIssueModal } from "@/components/issues/CreateIssueModal";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Sprint, Issue, IssueType } from "@/types";
import { format, differenceInDays } from "date-fns";

const typeIcons: Record<IssueType, React.ReactNode> = {
  bug: <Bug size={14} className="text-[#EF4444]" />,
  feature: <Lightbulb size={14} className="text-[#10B981]" />,
  story: <Bookmark size={14} className="text-[#3B82F6]" />,
  task: <CheckCircle2 size={14} className="text-[#6B7280]" />,
  epic: <AlertCircle size={14} className="text-[#8B5CF6]" />,
  subtask: <CheckCircle2 size={14} className="text-[#6B7280]" />,
};

const createSprintSchema = z.object({
  name: z.string().min(1, "Sprint name is required"),
  goal: z.string().optional(),
});

const startSprintSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
});

type CreateSprintFormData = z.infer<typeof createSprintSchema>;
type StartSprintFormData = z.infer<typeof startSprintSchema>;

export function BacklogPage() {
  const { projectId } = useParams<{ projectId: string }>();
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedSprints, setExpandedSprints] = useState<Set<string>>(new Set(["backlog"]));
  const [isCreateSprintOpen, setIsCreateSprintOpen] = useState(false);
  const [isStartSprintOpen, setIsStartSprintOpen] = useState(false);
  const [isCreateIssueOpen, setIsCreateIssueOpen] = useState(false);
  const [selectedSprintId, setSelectedSprintId] = useState<string | null>(null);

  const { data: project, isLoading: projectLoading } = useProject(projectId || "");
  const { data: sprints, isLoading: sprintsLoading } = useProjectSprints(projectId || "");
  const { data: activeSprint } = useActiveSprint(projectId || "");
  const { data: issues, isLoading: issuesLoading } = useProjectIssues(projectId || "");

  const createSprintMutation = useCreateSprint();
  const startSprintMutation = useStartSprint();
  const completeSprintMutation = useCompleteSprint();

  const {
    register: registerCreate,
    handleSubmit: handleCreateSubmit,
    reset: resetCreate,
    formState: { errors: createErrors },
  } = useForm<CreateSprintFormData>({
    resolver: zodResolver(createSprintSchema),
  });

  const {
    register: registerStart,
    handleSubmit: handleStartSubmit,
    reset: resetStart,
    formState: { errors: startErrors },
  } = useForm<StartSprintFormData>({
    resolver: zodResolver(startSprintSchema),
    defaultValues: {
      startDate: format(new Date(), "yyyy-MM-dd"),
      endDate: format(new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), "yyyy-MM-dd"),
    },
  });

  const isLoading = projectLoading || sprintsLoading || issuesLoading;

  // Filter issues by sprint
  const backlogIssues = issues?.filter((issue) => !issue.sprintId) || [];
  const getSprintIssues = (sprintId: string) =>
    issues?.filter((issue) => issue.sprintId === sprintId) || [];

  const filteredBacklogIssues = backlogIssues.filter(
    (issue) =>
      issue.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      issue.key.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleSprint = (sprintId: string) => {
    setExpandedSprints((prev) => {
      const next = new Set(prev);
      if (next.has(sprintId)) {
        next.delete(sprintId);
      } else {
        next.add(sprintId);
      }
      return next;
    });
  };

  const onCreateSprint = (data: CreateSprintFormData) => {
    if (!projectId) return;
    createSprintMutation.mutate(
      { projectId, name: data.name, goal: data.goal },
      {
        onSuccess: () => {
          setIsCreateSprintOpen(false);
          resetCreate();
        },
      }
    );
  };

  const onStartSprint = (data: StartSprintFormData) => {
    if (!selectedSprintId) return;
    startSprintMutation.mutate(
      { sprintId: selectedSprintId, data },
      {
        onSuccess: () => {
          setIsStartSprintOpen(false);
          resetStart();
          setSelectedSprintId(null);
        },
      }
    );
  };

  const handleCompleteSprint = (sprintId: string) => {
    completeSprintMutation.mutate(sprintId);
  };

  const openStartSprint = (sprintId: string) => {
    setSelectedSprintId(sprintId);
    setIsStartSprintOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <p className="text-[#6B7280] mb-4">Project not found</p>
        <Link to="/dashboard/projects">
          <Button variant="outline" leftIcon={<ArrowLeft size={18} />}>
            Back to Projects
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-[#6B7280]">
        <Link to="/dashboard/projects" className="hover:text-[#F97316]">
          Projects
        </Link>
        <span>/</span>
        <Link
          to={`/dashboard/projects/${projectId}/board`}
          className="hover:text-[#F97316]"
        >
          {project.name}
        </Link>
        <span>/</span>
        <span className="text-[#1A1A2E] dark:text-white">Backlog</span>
      </div>

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
            Backlog
          </h1>
          <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
            Plan and organize your sprints
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            onClick={() => setIsCreateSprintOpen(true)}
            leftIcon={<Plus size={18} />}
          >
            Create Sprint
          </Button>
          <Button
            onClick={() => setIsCreateIssueOpen(true)}
            leftIcon={<Plus size={18} />}
          >
            Create Issue
          </Button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1A1A2E] rounded-lg border border-[#E5E7EB] dark:border-[#2D2D44] max-w-md">
        <Search size={18} className="text-[#6B7280]" />
        <input
          type="text"
          placeholder="Search issues..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none"
        />
      </div>

      {/* Sprints */}
      <div className="space-y-4">
        {/* Active Sprint */}
        {activeSprint && (
          <SprintSection
            sprint={activeSprint}
            issues={getSprintIssues(activeSprint.id)}
            isExpanded={expandedSprints.has(activeSprint.id)}
            onToggle={() => toggleSprint(activeSprint.id)}
            onComplete={() => handleCompleteSprint(activeSprint.id)}
            isActive
          />
        )}

        {/* Planning Sprints */}
        {sprints
          ?.filter((s) => s.status === "planning")
          .map((sprint) => (
            <SprintSection
              key={sprint.id}
              sprint={sprint}
              issues={getSprintIssues(sprint.id)}
              isExpanded={expandedSprints.has(sprint.id)}
              onToggle={() => toggleSprint(sprint.id)}
              onStart={() => openStartSprint(sprint.id)}
            />
          ))}

        {/* Backlog */}
        <div className="bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E5E7EB] dark:border-[#2D2D44]">
          <button
            onClick={() => toggleSprint("backlog")}
            className="w-full flex items-center justify-between p-4 hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44]/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              {expandedSprints.has("backlog") ? (
                <ChevronDown size={20} className="text-[#6B7280]" />
              ) : (
                <ChevronRight size={20} className="text-[#6B7280]" />
              )}
              <h3 className="font-semibold text-[#1A1A2E] dark:text-white">
                Backlog
              </h3>
              <span className="text-sm text-[#6B7280]">
                {filteredBacklogIssues.length} issues
              </span>
            </div>
          </button>

          {expandedSprints.has("backlog") && (
            <div className="border-t border-[#E5E7EB] dark:border-[#2D2D44]">
              {filteredBacklogIssues.length === 0 ? (
                <div className="p-8 text-center text-[#6B7280]">
                  <p>No issues in backlog</p>
                </div>
              ) : (
                <div className="divide-y divide-[#E5E7EB] dark:divide-[#2D2D44]">
                  {filteredBacklogIssues.map((issue) => (
                    <IssueRow key={issue.id} issue={issue} projectId={projectId!} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Completed Sprints */}
        {sprints
          ?.filter((s) => s.status === "completed")
          .slice(0, 3)
          .map((sprint) => (
            <SprintSection
              key={sprint.id}
              sprint={sprint}
              issues={getSprintIssues(sprint.id)}
              isExpanded={expandedSprints.has(sprint.id)}
              onToggle={() => toggleSprint(sprint.id)}
              isCompleted
            />
          ))}
      </div>

      {/* Create Sprint Modal */}
      <Modal
        isOpen={isCreateSprintOpen}
        onClose={() => setIsCreateSprintOpen(false)}
        title="Create Sprint"
      >
        <form onSubmit={handleCreateSubmit(onCreateSprint)} className="space-y-4">
          <Input
            label="Sprint Name"
            placeholder="e.g., Sprint 1"
            error={createErrors.name?.message}
            {...registerCreate("name")}
          />
          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5">
              Sprint Goal (optional)
            </label>
            <textarea
              placeholder="What do you want to achieve in this sprint?"
              className="w-full px-4 py-3 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 resize-none"
              rows={3}
              {...registerCreate("goal")}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateSprintOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={createSprintMutation.isPending}>
              Create Sprint
            </Button>
          </div>
        </form>
      </Modal>

      {/* Start Sprint Modal */}
      <Modal
        isOpen={isStartSprintOpen}
        onClose={() => setIsStartSprintOpen(false)}
        title="Start Sprint"
      >
        <form onSubmit={handleStartSubmit(onStartSprint)} className="space-y-4">
          <Input
            label="Start Date"
            type="date"
            error={startErrors.startDate?.message}
            {...registerStart("startDate")}
          />
          <Input
            label="End Date"
            type="date"
            error={startErrors.endDate?.message}
            {...registerStart("endDate")}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsStartSprintOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" isLoading={startSprintMutation.isPending}>
              Start Sprint
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Issue Modal */}
      <CreateIssueModal
        isOpen={isCreateIssueOpen}
        onClose={() => setIsCreateIssueOpen(false)}
        projectId={projectId!}
      />
    </div>
  );
}

// Sprint Section Component
interface SprintSectionProps {
  sprint: Sprint;
  issues: Issue[];
  isExpanded: boolean;
  onToggle: () => void;
  onStart?: () => void;
  onComplete?: () => void;
  isActive?: boolean;
  isCompleted?: boolean;
}

function SprintSection({
  sprint,
  issues,
  isExpanded,
  onToggle,
  onStart,
  onComplete,
  isActive,
  isCompleted,
}: SprintSectionProps) {
  const daysRemaining = sprint.endDate
    ? differenceInDays(new Date(sprint.endDate), new Date())
    : null;

  return (
    <div
      className={`bg-white dark:bg-[#1A1A2E] rounded-xl border ${
        isActive
          ? "border-[#F97316]"
          : "border-[#E5E7EB] dark:border-[#2D2D44]"
      }`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44]/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          {isExpanded ? (
            <ChevronDown size={20} className="text-[#6B7280]" />
          ) : (
            <ChevronRight size={20} className="text-[#6B7280]" />
          )}
          <div className="text-left">
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-[#1A1A2E] dark:text-white">
                {sprint.name}
              </h3>
              {isActive && (
                <span className="px-2 py-0.5 text-xs font-medium rounded bg-[#F97316]/10 text-[#F97316]">
                  Active
                </span>
              )}
              {isCompleted && (
                <span className="px-2 py-0.5 text-xs font-medium rounded bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                  Completed
                </span>
              )}
            </div>
            {sprint.goal && (
              <p className="text-sm text-[#6B7280] mt-0.5">{sprint.goal}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Stats */}
          <div className="hidden sm:flex items-center gap-4 text-sm text-[#6B7280]">
            <div className="flex items-center gap-1">
              <Target size={14} />
              <span>
                {sprint.completedCount}/{sprint.issueCount}
              </span>
            </div>
            {sprint.storyPoints > 0 && (
              <div className="flex items-center gap-1">
                <Clock size={14} />
                <span>
                  {sprint.completedPoints}/{sprint.storyPoints} pts
                </span>
              </div>
            )}
            {isActive && daysRemaining !== null && (
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{daysRemaining} days left</span>
              </div>
            )}
          </div>

          {/* Actions */}
          {!isCompleted && (
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {sprint.status === "planning" && onStart && (
                <Button size="sm" variant="outline" onClick={onStart}>
                  <Play size={14} className="mr-1" />
                  Start
                </Button>
              )}
              {isActive && onComplete && (
                <Button size="sm" variant="outline" onClick={onComplete}>
                  <CheckCircle2 size={14} className="mr-1" />
                  Complete
                </Button>
              )}
              <button className="p-1 text-[#6B7280] hover:text-[#1A1A2E] dark:hover:text-white">
                <MoreHorizontal size={18} />
              </button>
            </div>
          )}
        </div>
      </button>

      {isExpanded && (
        <div className="border-t border-[#E5E7EB] dark:border-[#2D2D44]">
          {issues.length === 0 ? (
            <div className="p-8 text-center text-[#6B7280]">
              <p>No issues in this sprint</p>
              <p className="text-sm mt-1">Drag issues here to add them</p>
            </div>
          ) : (
            <div className="divide-y divide-[#E5E7EB] dark:divide-[#2D2D44]">
              {issues.map((issue) => (
                <IssueRow key={issue.id} issue={issue} projectId={sprint.projectId} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// Issue Row Component
function IssueRow({ issue, projectId }: { issue: Issue; projectId: string }) {
  return (
    <Link
      to={`/dashboard/projects/${projectId}/board?issue=${issue.id}`}
      className="flex items-center gap-3 px-4 py-3 hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44]/50 transition-colors"
    >
      <div>{typeIcons[issue.type]}</div>
      <span className="text-sm font-medium text-[#6B7280] w-20">{issue.key}</span>
      <p className="flex-1 text-sm text-[#1A1A2E] dark:text-white truncate">
        {issue.title}
      </p>
      <span
        className={`px-2 py-0.5 text-xs font-medium rounded capitalize ${
          issue.priority === "highest" || issue.priority === "high"
            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
            : issue.priority === "medium"
            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
        }`}
      >
        {issue.priority}
      </span>
      {issue.storyPoints && (
        <span className="w-6 h-6 flex items-center justify-center text-xs font-medium bg-[#F8F9FC] dark:bg-[#2D2D44] rounded">
          {issue.storyPoints}
        </span>
      )}
      {issue.assignee && (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
          {issue.assignee.avatar ? (
            <img
              src={issue.assignee.avatar}
              alt={issue.assignee.name}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-white text-[10px] font-medium">
              {issue.assignee.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
