import { useState } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FolderKanban,
  Calendar,
  Users,
  Settings,
  Search,
  Bell,
  ChevronDown,
  Menu,
  X,
  Plus,
  LogOut,
} from "lucide-react";
import brandLogo from "@/assets/brand_logo.png";
import { ThemeToggle } from "@/components/landing";

const sidebarLinks = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: FolderKanban, label: "Projects", href: "/dashboard/projects" },
  { icon: Calendar, label: "Calendar", href: "/dashboard/calendar" },
  { icon: Users, label: "Team", href: "/dashboard/team" },
  { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="min-h-screen bg-[#F8F9FC] dark:bg-[#0F0F1A]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white dark:bg-[#1A1A2E] border-r border-[#E5E7EB] dark:border-[#2D2D44] transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#E5E7EB] dark:border-[#2D2D44]">
          <Link to="/dashboard" className="flex items-center gap-2">
            <img src={brandLogo} alt="Projex" className="h-8 w-8" />
            <span className="text-xl font-bold text-[#1A1A2E] dark:text-white">
              Projex
            </span>
          </Link>
          <button
            className="lg:hidden p-1.5 text-[#6B7280] hover:text-[#1A1A2E] dark:hover:text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1">
          {sidebarLinks.map((link) => {
            const isActive = location.pathname === link.href;
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-colors ${
                  isActive
                    ? "bg-gradient-to-r from-[#F97316]/10 to-[#EC4899]/10 text-[#F97316]"
                    : "text-[#4A4A68] dark:text-[#9CA3AF] hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44]"
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <link.icon size={20} />
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Create Project Button */}
        <div className="absolute bottom-20 left-0 right-0 px-4">
          <Link
            to="/dashboard/projects/new"
            className="flex items-center justify-center gap-2 w-full py-2.5 text-white font-medium rounded-lg bg-gradient-to-r from-[#F97316] to-[#EC4899] hover:from-[#EA580C] hover:to-[#DB2777] transition-all"
          >
            <Plus size={20} />
            New Project
          </Link>
        </div>

        {/* User Section */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#E5E7EB] dark:border-[#2D2D44]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
              <span className="text-white font-semibold text-sm">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#1A1A2E] dark:text-white truncate">
                John Doe
              </p>
              <p className="text-xs text-[#6B7280] truncate">john@example.com</p>
            </div>
            <button className="p-1.5 text-[#6B7280] hover:text-[#EF4444] transition-colors">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-[#1A1A2E]/80 backdrop-blur-md border-b border-[#E5E7EB] dark:border-[#2D2D44]">
          <div className="flex items-center justify-between h-full px-4 lg:px-6">
            {/* Left - Mobile Menu & Search */}
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 text-[#4A4A68] dark:text-[#9CA3AF]"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu size={24} />
              </button>

              {/* Search */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-2 bg-[#F8F9FC] dark:bg-[#2D2D44] rounded-lg border border-[#E5E7EB] dark:border-[#3D3D54]">
                <Search size={18} className="text-[#6B7280]" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="bg-transparent text-sm text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none w-48"
                />
                <kbd className="hidden md:inline-flex items-center px-1.5 py-0.5 text-xs text-[#6B7280] bg-white dark:bg-[#1A1A2E] rounded border border-[#E5E7EB] dark:border-[#3D3D54]">
                  ⌘K
                </kbd>
              </div>
            </div>

            {/* Right - Actions */}
            <div className="flex items-center gap-3">
              <ThemeToggle />

              {/* Notifications */}
              <button className="relative p-2 text-[#4A4A68] dark:text-[#9CA3AF] hover:text-[#1A1A2E] dark:hover:text-white transition-colors">
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#F97316] rounded-full" />
              </button>

              {/* User Dropdown (Desktop) */}
              <button className="hidden lg:flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-lg hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44] transition-colors">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F97316] to-[#EC4899] flex items-center justify-center">
                  <span className="text-white font-semibold text-xs">JD</span>
                </div>
                <ChevronDown size={16} className="text-[#6B7280]" />
              </button>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
