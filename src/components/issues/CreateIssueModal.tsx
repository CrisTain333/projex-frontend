import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Button, Input } from "@/components/ui";
import { useCreateIssue } from "@/hooks/api/useIssues";
import { createIssueSchema, type CreateIssueFormData } from "@/utils/validators";
import { ISSUE_TYPES, PRIORITIES } from "@/utils/constants";
import { Bug, Lightbulb, Bookmark, CheckCircle2, AlertCircle } from "lucide-react";
import { IssueType, Priority } from "@/types";

interface CreateIssueModalProps {
  isOpen: boolean;
  onClose: () => void;
  projectId: string;
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
  highest: "#EF4444",
  high: "#F97316",
  medium: "#F59E0B",
  low: "#10B981",
  lowest: "#6B7280",
};

export function CreateIssueModal({ isOpen, onClose, projectId }: CreateIssueModalProps) {
  const createMutation = useCreateIssue();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateIssueFormData>({
    resolver: zodResolver(createIssueSchema),
    defaultValues: {
      projectId,
      type: "task",
      priority: "medium",
      title: "",
      description: "",
    },
  });

  const selectedType = watch("type");
  const selectedPriority = watch("priority");

  const onSubmit = (data: CreateIssueFormData) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        onClose();
        reset();
      },
    });
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create Issue"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Issue Type */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-2">
            Issue Type
          </label>
          <div className="flex flex-wrap gap-2">
            {ISSUE_TYPES.map((type) => (
              <button
                key={type.value}
                type="button"
                onClick={() => setValue("type", type.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                  selectedType === type.value
                    ? "border-[#F97316] bg-[#F97316]/5"
                    : "border-[#E5E7EB] dark:border-[#2D2D44] hover:border-[#F97316]/30"
                }`}
              >
                {typeIcons[type.value]}
                <span className="text-sm font-medium text-[#1A1A2E] dark:text-white">
                  {type.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <Input
          label="Title"
          placeholder="What needs to be done?"
          error={errors.title?.message}
          {...register("title")}
        />

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5">
            Description
          </label>
          <textarea
            placeholder="Add more details about this issue..."
            className="w-full px-4 py-3 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 resize-none"
            rows={4}
            {...register("description")}
          />
          {errors.description && (
            <p className="mt-1.5 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Priority */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-2">
            Priority
          </label>
          <div className="flex flex-wrap gap-2">
            {PRIORITIES.map((priority) => (
              <button
                key={priority.value}
                type="button"
                onClick={() => setValue("priority", priority.value)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg border transition-all ${
                  selectedPriority === priority.value
                    ? "border-[#F97316] bg-[#F97316]/5"
                    : "border-[#E5E7EB] dark:border-[#2D2D44] hover:border-[#F97316]/30"
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: priorityColors[priority.value] }}
                />
                <span className="text-sm font-medium text-[#1A1A2E] dark:text-white">
                  {priority.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Story Points */}
        <Input
          label="Story Points (optional)"
          type="number"
          placeholder="Estimate the effort"
          {...register("storyPoints", { valueAsNumber: true })}
        />

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={createMutation.isPending}>
            Create Issue
          </Button>
        </div>
      </form>
    </Modal>
  );
}
