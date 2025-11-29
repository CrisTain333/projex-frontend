import { useState } from "react";
import { Search, Plus, Mail, MoreHorizontal, Users } from "lucide-react";
import { Button, Modal, Input, Spinner, EmptyState } from "@/components/ui";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Mock team data - in a real app, this would come from an API
const mockTeamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "admin" as const,
    avatar: null,
    projects: 5,
    status: "active" as const,
  },
  {
    id: "2",
    name: "Alice Smith",
    email: "alice@example.com",
    role: "member" as const,
    avatar: null,
    projects: 3,
    status: "active" as const,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "member" as const,
    avatar: null,
    projects: 4,
    status: "active" as const,
  },
  {
    id: "4",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "member" as const,
    avatar: null,
    projects: 2,
    status: "pending" as const,
  },
];

const inviteSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  role: z.enum(["admin", "member"]),
});

type InviteFormData = z.infer<typeof inviteSchema>;

export function TeamPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isInviteModalOpen, setIsInviteModalOpen] = useState(false);
  const [isLoading] = useState(false);

  const teamMembers = mockTeamMembers;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<InviteFormData>({
    resolver: zodResolver(inviteSchema),
    defaultValues: {
      role: "member",
    },
  });

  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onInvite = (data: InviteFormData) => {
    console.log("Inviting:", data);
    // In a real app, this would call an API
    setIsInviteModalOpen(false);
    reset();
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
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
            Team
          </h1>
          <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
            Manage your team members and invitations
          </p>
        </div>
        <Button
          onClick={() => setIsInviteModalOpen(true)}
          leftIcon={<Plus size={20} />}
        >
          Invite Member
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-[#1A1A2E] rounded-xl p-4 border border-[#E5E7EB] dark:border-[#2D2D44]">
          <p className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
            {teamMembers.length}
          </p>
          <p className="text-sm text-[#6B7280]">Total Members</p>
        </div>
        <div className="bg-white dark:bg-[#1A1A2E] rounded-xl p-4 border border-[#E5E7EB] dark:border-[#2D2D44]">
          <p className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
            {teamMembers.filter((m) => m.status === "active").length}
          </p>
          <p className="text-sm text-[#6B7280]">Active</p>
        </div>
        <div className="bg-white dark:bg-[#1A1A2E] rounded-xl p-4 border border-[#E5E7EB] dark:border-[#2D2D44]">
          <p className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
            {teamMembers.filter((m) => m.status === "pending").length}
          </p>
          <p className="text-sm text-[#6B7280]">Pending</p>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1A1A2E] rounded-lg border border-[#E5E7EB] dark:border-[#2D2D44] max-w-md">
        <Search size={18} className="text-[#6B7280]" />
        <input
          type="text"
          placeholder="Search team members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1 bg-transparent text-sm text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none"
        />
      </div>

      {/* Team Grid */}
      {filteredMembers.length === 0 ? (
        <EmptyState
          icon={<Users size={48} />}
          title="No team members found"
          description={
            searchQuery
              ? "Try adjusting your search"
              : "Invite team members to start collaborating"
          }
          action={
            !searchQuery && (
              <Button
                onClick={() => setIsInviteModalOpen(true)}
                leftIcon={<Plus size={18} />}
              >
                Invite Member
              </Button>
            )
          }
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className="bg-white dark:bg-[#1A1A2E] rounded-xl p-5 border border-[#E5E7EB] dark:border-[#2D2D44] hover:border-[#F97316]/30 transition-all"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                  {member.avatar ? (
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <span className="text-white font-semibold text-lg">
                      {getInitials(member.name)}
                    </span>
                  )}
                </div>
                <button className="p-1 text-[#6B7280] hover:text-[#1A1A2E] dark:hover:text-white">
                  <MoreHorizontal size={20} />
                </button>
              </div>

              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold text-[#1A1A2E] dark:text-white">
                  {member.name}
                </h3>
                {member.status === "pending" && (
                  <span className="px-2 py-0.5 text-xs font-medium rounded bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
                    Pending
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1 text-sm text-[#6B7280] mb-3">
                <Mail size={14} />
                {member.email}
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB] dark:border-[#2D2D44]">
                <span
                  className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                    member.role === "admin"
                      ? "bg-[#F97316]/10 text-[#F97316]"
                      : "bg-[#6B7280]/10 text-[#6B7280]"
                  }`}
                >
                  {member.role === "admin" ? "Admin" : "Member"}
                </span>
                <span className="text-sm text-[#6B7280]">
                  {member.projects} projects
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Invite Modal */}
      <Modal
        isOpen={isInviteModalOpen}
        onClose={() => setIsInviteModalOpen(false)}
        title="Invite Team Member"
      >
        <form onSubmit={handleSubmit(onInvite)} className="space-y-4">
          <Input
            label="Email Address"
            type="email"
            placeholder="colleague@company.com"
            error={errors.email?.message}
            {...register("email")}
          />

          <div>
            <label className="block text-sm font-medium text-[#1A1A2E] dark:text-white mb-2">
              Role
            </label>
            <div className="flex gap-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="member"
                  {...register("role")}
                  className="w-4 h-4 text-[#F97316] border-[#E5E7EB] focus:ring-[#F97316]"
                />
                <span className="text-sm text-[#1A1A2E] dark:text-white">
                  Member
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  value="admin"
                  {...register("role")}
                  className="w-4 h-4 text-[#F97316] border-[#E5E7EB] focus:ring-[#F97316]"
                />
                <span className="text-sm text-[#1A1A2E] dark:text-white">
                  Admin
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsInviteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Send Invitation</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
