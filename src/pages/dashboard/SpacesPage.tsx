import { useState } from "react";
import { Link } from "react-router-dom";
import { Plus, Search, MoreHorizontal, Layers, Users, FolderKanban } from "lucide-react";
import { useSpaces, useCreateSpace } from "@/hooks/api/useSpaces";
import { Button, Modal, Input, Spinner, EmptyState } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createSpaceSchema, type CreateSpaceFormData } from "@/utils/validators";

export function SpacesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const { data: spaces, isLoading } = useSpaces();
  const createSpaceMutation = useCreateSpace();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSpaceFormData>({
    resolver: zodResolver(createSpaceSchema),
  });

  const filteredSpaces = spaces?.filter((space) =>
    space.name.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const onCreateSpace = (data: CreateSpaceFormData) => {
    createSpaceMutation.mutate(data, {
      onSuccess: () => {
        setIsCreateModalOpen(false);
        reset();
      },
    });
  };

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
            Spaces
          </h1>
          <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
            Organize your projects into workspaces
          </p>
        </div>
        <Button
          onClick={() => setIsCreateModalOpen(true)}
          leftIcon={<Plus size={20} />}
        >
          New Space
        </Button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1A1A2E] rounded-lg border border-[#E5E7EB] dark:border-[#2D2D44] max-w-md">
        <Search size={18} className="text-[#6B7280]" />
        <input
          type="text"
          placeholder="Search spaces..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none"
        />
      </div>

      {/* Spaces Grid */}
      {filteredSpaces.length === 0 ? (
        <EmptyState
          icon={<Layers size={48} />}
          title="No spaces yet"
          description="Create your first space to start organizing projects"
          action={
            <Button onClick={() => setIsCreateModalOpen(true)} leftIcon={<Plus size={18} />}>
              Create Space
            </Button>
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpaces.map((space) => (
            <Link
              key={space.id}
              to={`/dashboard/spaces/${space.id}`}
              className="bg-white dark:bg-[#1A1A2E] rounded-xl p-5 border border-[#E5E7EB] dark:border-[#2D2D44] hover:border-[#F97316]/30 hover:shadow-lg transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: space.color || "#F97316" }}
                >
                  {space.icon || space.name[0].toUpperCase()}
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
                {space.name}
              </h3>
              {space.description && (
                <p className="text-sm text-[#6B7280] mb-4 line-clamp-2">
                  {space.description}
                </p>
              )}

              {/* Stats */}
              <div className="flex items-center gap-4 text-sm text-[#6B7280]">
                <div className="flex items-center gap-1">
                  <FolderKanban size={16} />
                  <span>{space.projectCount || 0} projects</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users size={16} />
                  <span>{space.memberCount || 0} members</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Create Space Modal */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Create New Space"
      >
        <form onSubmit={handleSubmit(onCreateSpace)} className="space-y-4">
          <Input
            label="Space Name"
            placeholder="e.g., Engineering, Marketing"
            error={errors.name?.message}
            {...register("name")}
          />
          <Input
            label="Description"
            placeholder="What is this space for?"
            error={errors.description?.message}
            {...register("description")}
          />
          <Input
            label="Slug (URL-friendly name)"
            placeholder="e.g., engineering, marketing (auto-generated if empty)"
            error={errors.slug?.message}
            {...register("slug")}
          />
          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsCreateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              isLoading={createSpaceMutation.isPending}
            >
              Create Space
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
