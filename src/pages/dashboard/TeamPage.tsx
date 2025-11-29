import { Search, Plus, Mail, MoreHorizontal } from "lucide-react";

const teamMembers = [
  {
    id: "1",
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
    initials: "JD",
    projects: 5,
  },
  {
    id: "2",
    name: "Alice Smith",
    email: "alice@example.com",
    role: "Member",
    initials: "AS",
    projects: 3,
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob@example.com",
    role: "Member",
    initials: "BJ",
    projects: 4,
  },
  {
    id: "4",
    name: "Charlie Brown",
    email: "charlie@example.com",
    role: "Member",
    initials: "CB",
    projects: 2,
  },
];

export function TeamPage() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
            Team
          </h1>
          <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
            Manage your team members
          </p>
        </div>
        <button className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-white font-medium rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all">
          <Plus size={20} />
          Invite Member
        </button>
      </div>

      {/* Search */}
      <div className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-[#1A1A2E] rounded-lg border border-[#E5E7EB] dark:border-[#2D2D44] max-w-md">
        <Search size={18} className="text-[#6B7280]" />
        <input
          type="text"
          placeholder="Search team members..."
          className="flex-1 bg-transparent text-sm text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none"
        />
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-[#1A1A2E] rounded-xl p-5 border border-[#E5E7EB] dark:border-[#2D2D44] hover:border-[#F97316]/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                <span className="text-white font-semibold text-lg">
                  {member.initials}
                </span>
              </div>
              <button className="p-1 text-[#6B7280] hover:text-[#1A1A2E] dark:hover:text-white">
                <MoreHorizontal size={20} />
              </button>
            </div>

            <h3 className="font-semibold text-[#1A1A2E] dark:text-white mb-1">
              {member.name}
            </h3>
            <div className="flex items-center gap-1 text-sm text-[#6B7280] mb-3">
              <Mail size={14} />
              {member.email}
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-[#E5E7EB] dark:border-[#2D2D44]">
              <span
                className={`px-2.5 py-1 text-xs font-medium rounded-full ${
                  member.role === "Admin"
                    ? "bg-[#F97316]/10 text-[#F97316]"
                    : "bg-[#6B7280]/10 text-[#6B7280]"
                }`}
              >
                {member.role}
              </span>
              <span className="text-sm text-[#6B7280]">
                {member.projects} projects
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
