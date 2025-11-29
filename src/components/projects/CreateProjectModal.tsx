import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal, Button, Input } from "@/components/ui";
import { useCreateProject } from "@/hooks/api/useProjects";
import { createProjectSchema, type CreateProjectFormData } from "@/utils/validators";
import { BOARD_TYPES } from "@/utils/constants";

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  spaceId?: string;
}

export function CreateProjectModal({ isOpen, onClose, spaceId }: CreateProjectModalProps) {
  const createMutation = useCreateProject();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<CreateProjectFormData>({
    resolver: zodResolver(createProjectSchema),
    defaultValues: {
      name: "",
      key: "",
      description: "",
      boardType: "kanban",
    },
  });

  const selectedBoardType = watch("boardType");
  const projectName = watch("name");

  // Auto-generate project key from name
  const generateKey = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase())
      .join("")
      .slice(0, 4);
  };

  const onSubmit = (data: CreateProjectFormData) => {
    createMutation.mutate(
      {
        ...data,
        spaceId: spaceId || "",
      },
      {
        onSuccess: () => {
          onClose();
          reset();
        },
      }
    );
  };

  const handleClose = () => {
    onClose();
    reset();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Create New Project"
      size="lg"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        {/* Project Name */}
        <Input
          label="Project Name"
          placeholder="e.g., Website Redesign, Mobile App"
          error={errors.name?.message}
          {...register("name", {
            onChange: (e) => {
              const key = generateKey(e.target.value);
              setValue("key", key);
            },
          })}
        />

        {/* Project Key */}
        <Input
          label="Project Key"
          placeholder="e.g., WEB, APP"
          error={errors.key?.message}
          {...register("key")}
          className="uppercase"
        />
        <p className="text-xs text-[#6B7280] -mt-3">
          This key will be used as a prefix for all issue keys (e.g., {projectName ? generateKey(projectName) : "KEY"}-1)
        </p>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-1.5">
            Description (optional)
          </label>
          <textarea
            placeholder="What is this project about?"
            className="w-full px-4 py-3 rounded-lg bg-[#F8F9FC] dark:bg-[#2D2D44] border border-[#E5E7EB] dark:border-[#3D3D54] text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none focus:border-[#F97316] focus:ring-2 focus:ring-[#F97316]/20 resize-none"
            rows={3}
            {...register("description")}
          />
          {errors.description && (
            <p className="mt-1.5 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Board Type */}
        <div>
          <label className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-2">
            Board Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(BOARD_TYPES).map(([key, { label, description }]) => (
              <button
                key={key}
                type="button"
                onClick={() => setValue("boardType", key as "kanban" | "scrum")}
                className={`p-4 rounded-lg border text-left transition-all ${
                  selectedBoardType === key
                    ? "border-[#F97316] bg-[#F97316]/5"
                    : "border-[#E5E7EB] dark:border-[#2D2D44] hover:border-[#F97316]/30"
                }`}
              >
                <p className="font-medium text-[#1A1A2E] dark:text-white mb-1">
                  {label}
                </p>
                <p className="text-xs text-[#6B7280]">{description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4">
          <Button type="button" variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button type="submit" isLoading={createMutation.isPending}>
            Create Project
          </Button>
        </div>
      </form>
    </Modal>
  );
}
