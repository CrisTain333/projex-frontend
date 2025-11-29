import { FolderKanban, CheckCircle2, Clock, Users } from "lucide-react";

const stats = [
  { label: "Active Projects", value: "12", icon: FolderKanban, change: "+2" },
  { label: "Completed Tasks", value: "48", icon: CheckCircle2, change: "+12" },
  { label: "In Progress", value: "23", icon: Clock, change: "+5" },
  { label: "Team Members", value: "8", icon: Users, change: "+1" },
];

const recentProjects = [
  { name: "Website Redesign", status: "In Progress", progress: 65 },
  { name: "Mobile App v2", status: "In Progress", progress: 40 },
  { name: "API Integration", status: "Review", progress: 90 },
  { name: "Marketing Campaign", status: "Planning", progress: 15 },
];

export function DashboardHome() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
          Dashboard
        </h1>
        <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
          Welcome back! Here's what's happening with your projects.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-[#1A1A2E] rounded-xl p-5 border border-[#E5E7EB] dark:border-[#2D2D44]"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F97316]/10 to-[#EC4899]/10 flex items-center justify-center">
                <stat.icon size={20} className="text-[#F97316]" />
              </div>
              <span className="text-xs font-medium text-[#10B981] bg-[#10B981]/10 px-2 py-0.5 rounded">
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-[#1A1A2E] dark:text-white">
              {stat.value}
            </p>
            <p className="text-sm text-[#6B7280]">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent Projects */}
      <div className="bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E5E7EB] dark:border-[#2D2D44]">
        <div className="p-5 border-b border-[#E5E7EB] dark:border-[#2D2D44]">
          <h2 className="text-lg font-semibold text-[#1A1A2E] dark:text-white">
            Recent Projects
          </h2>
        </div>
        <div className="divide-y divide-[#E5E7EB] dark:divide-[#2D2D44]">
          {recentProjects.map((project) => (
            <div
              key={project.name}
              className="p-5 flex items-center justify-between hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44]/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                  <FolderKanban size={20} className="text-white" />
                </div>
                <div>
                  <p className="font-medium text-[#1A1A2E] dark:text-white">
                    {project.name}
                  </p>
                  <p className="text-sm text-[#6B7280]">{project.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="hidden sm:block w-32">
                  <div className="h-2 bg-[#E5E7EB] dark:bg-[#2D2D44] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#F97316] to-[#EC4899] rounded-full"
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                </div>
                <span className="text-sm font-medium text-[#4A4A68] dark:text-[#9CA3AF] w-10 text-right">
                  {project.progress}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
