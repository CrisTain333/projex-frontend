import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { IssueCard } from "./IssueCard";
import { Issue } from "@/types";

interface SortableIssueCardProps {
  issue: Issue;
  onClick?: () => void;
}

export function SortableIssueCard({ issue, onClick }: SortableIssueCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: issue.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      <IssueCard issue={issue} onClick={onClick} />
    </div>
  );
}
