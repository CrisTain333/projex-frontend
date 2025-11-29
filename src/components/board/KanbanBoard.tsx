import { useState, useMemo } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { KanbanColumn } from "./KanbanColumn";
import { IssueCard } from "./IssueCard";
import { Issue, IssueStatus } from "@/types";
import { useBoardStore } from "@/stores";
import { useUpdateIssueStatus } from "@/hooks/api/useIssues";

interface KanbanBoardProps {
  issues: Issue[];
  onIssueClick?: (issue: Issue) => void;
}

const COLUMNS: { id: IssueStatus; title: string }[] = [
  { id: "backlog", title: "Backlog" },
  { id: "todo", title: "To Do" },
  { id: "in_progress", title: "In Progress" },
  { id: "in_review", title: "In Review" },
  { id: "done", title: "Done" },
];

export function KanbanBoard({ issues, onIssueClick }: KanbanBoardProps) {
  const [activeIssue, setActiveIssue] = useState<Issue | null>(null);
  const updateStatusMutation = useUpdateIssueStatus();
  const { filters } = useBoardStore();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Filter issues based on board filters
  const filteredIssues = useMemo(() => {
    return issues.filter((issue) => {
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        if (
          !issue.title.toLowerCase().includes(searchLower) &&
          !issue.key.toLowerCase().includes(searchLower)
        ) {
          return false;
        }
      }
      if (filters.assigneeIds.length > 0 && issue.assigneeId) {
        if (!filters.assigneeIds.includes(issue.assigneeId)) {
          return false;
        }
      }
      if (filters.priorities.length > 0) {
        if (!filters.priorities.includes(issue.priority)) {
          return false;
        }
      }
      if (filters.types.length > 0) {
        if (!filters.types.includes(issue.type)) {
          return false;
        }
      }
      if (filters.labelIds.length > 0) {
        const issueLabels = issue.labels?.map((l) => l.id) || [];
        if (!filters.labelIds.some((labelId: string) => issueLabels.includes(labelId))) {
          return false;
        }
      }
      return true;
    });
  }, [issues, filters]);

  // Group issues by status
  const issuesByStatus = useMemo(() => {
    const grouped: Record<IssueStatus, Issue[]> = {
      backlog: [],
      todo: [],
      in_progress: [],
      in_review: [],
      done: [],
      cancelled: [],
    };

    filteredIssues.forEach((issue) => {
      if (grouped[issue.status]) {
        grouped[issue.status].push(issue);
      }
    });

    // Sort by order within each column
    Object.keys(grouped).forEach((status) => {
      grouped[status as IssueStatus].sort((a, b) => (a.order || 0) - (b.order || 0));
    });

    return grouped;
  }, [filteredIssues]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const issue = filteredIssues.find((i) => i.id === active.id);
    if (issue) {
      setActiveIssue(issue);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    // Handle drag over if needed for visual feedback
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveIssue(null);

    if (!over) return;

    const activeIssue = filteredIssues.find((i) => i.id === active.id);
    if (!activeIssue) return;

    // Determine the target column
    let targetStatus: IssueStatus;

    // Check if dropped over a column
    if (COLUMNS.some((col) => col.id === over.id)) {
      targetStatus = over.id as IssueStatus;
    } else {
      // Dropped over another issue - find which column it's in
      const overIssue = filteredIssues.find((i) => i.id === over.id);
      if (!overIssue) return;
      targetStatus = overIssue.status;
    }

    // Update status if changed
    if (activeIssue.status !== targetStatus) {
      updateStatusMutation.mutate({
        id: activeIssue.id,
        status: targetStatus,
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4 h-full">
        {COLUMNS.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            issues={issuesByStatus[column.id]}
            onIssueClick={onIssueClick}
          />
        ))}
      </div>

      <DragOverlay>
        {activeIssue ? (
          <IssueCard issue={activeIssue} isDragging />
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
