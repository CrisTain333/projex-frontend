import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  FolderKanban,
  Bug,
  Lightbulb,
  Bookmark,
  CheckCircle2,
  Users,
  Settings,
  LayoutDashboard,
  Layers,
  Calendar,
  Plus,
  ArrowRight,
  Command,
} from "lucide-react";
import { useKeyboardShortcut, useDebounce } from "@/hooks";
import { useSpaces } from "@/hooks/api/useSpaces";
import { useMyIssues } from "@/hooks/api/useIssues";
import { Issue, IssueType } from "@/types";

interface CommandItem {
  id: string;
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
  action: () => void;
  category: "navigation" | "issues" | "spaces" | "actions";
}

const typeIcons: Record<IssueType, React.ReactNode> = {
  bug: <Bug size={16} className="text-[#EF4444]" />,
  feature: <Lightbulb size={16} className="text-[#10B981]" />,
  story: <Bookmark size={16} className="text-[#3B82F6]" />,
  task: <CheckCircle2 size={16} className="text-[#6B7280]" />,
  epic: <Layers size={16} className="text-[#8B5CF6]" />,
  subtask: <CheckCircle2 size={16} className="text-[#6B7280]" />,
};

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const debouncedQuery = useDebounce(query, 150);

  const { data: spaces } = useSpaces();
  const { data: myIssues } = useMyIssues();

  // Open command palette with Cmd+K or Ctrl+K
  useKeyboardShortcut("k", () => setIsOpen(true), { meta: true });
  useKeyboardShortcut("k", () => setIsOpen(true), { ctrl: true });

  // Close on Escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      return () => document.removeEventListener("keydown", handleEscape);
    }
  }, [isOpen]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      setQuery("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Build command items
  const commands = useMemo<CommandItem[]>(() => {
    const items: CommandItem[] = [];

    // Navigation items
    const navItems: CommandItem[] = [
      {
        id: "nav-dashboard",
        title: "Dashboard",
        subtitle: "Go to dashboard",
        icon: <LayoutDashboard size={16} />,
        action: () => navigate("/dashboard"),
        category: "navigation",
      },
      {
        id: "nav-spaces",
        title: "Spaces",
        subtitle: "View all spaces",
        icon: <Layers size={16} />,
        action: () => navigate("/dashboard/spaces"),
        category: "navigation",
      },
      {
        id: "nav-projects",
        title: "Projects",
        subtitle: "View all projects",
        icon: <FolderKanban size={16} />,
        action: () => navigate("/dashboard/projects"),
        category: "navigation",
      },
      {
        id: "nav-calendar",
        title: "Calendar",
        subtitle: "View calendar",
        icon: <Calendar size={16} />,
        action: () => navigate("/dashboard/calendar"),
        category: "navigation",
      },
      {
        id: "nav-team",
        title: "Team",
        subtitle: "View team members",
        icon: <Users size={16} />,
        action: () => navigate("/dashboard/team"),
        category: "navigation",
      },
      {
        id: "nav-settings",
        title: "Settings",
        subtitle: "Account settings",
        icon: <Settings size={16} />,
        action: () => navigate("/dashboard/settings"),
        category: "navigation",
      },
    ];

    // Action items
    const actionItems: CommandItem[] = [
      {
        id: "action-create-issue",
        title: "Create Issue",
        subtitle: "Create a new issue",
        icon: <Plus size={16} />,
        action: () => {
          // TODO: Open create issue modal
          navigate("/dashboard/projects");
        },
        category: "actions",
      },
      {
        id: "action-create-project",
        title: "Create Project",
        subtitle: "Start a new project",
        icon: <Plus size={16} />,
        action: () => navigate("/dashboard/projects/new"),
        category: "actions",
      },
    ];

    items.push(...navItems, ...actionItems);

    // Add spaces
    if (spaces) {
      spaces.forEach((space) => {
        items.push({
          id: `space-${space.id}`,
          title: space.name,
          subtitle: `Space • ${space.projectCount || 0} projects`,
          icon: (
            <div
              className="w-4 h-4 rounded"
              style={{ backgroundColor: space.color || "#F97316" }}
            />
          ),
          action: () => navigate(`/dashboard/spaces/${space.id}`),
          category: "spaces",
        });
      });
    }

    // Add recent issues
    if (myIssues) {
      myIssues.slice(0, 5).forEach((issue: Issue) => {
        items.push({
          id: `issue-${issue.id}`,
          title: issue.title,
          subtitle: `${issue.key} • ${issue.status.replace("_", " ")}`,
          icon: typeIcons[issue.type],
          action: () => navigate(`/dashboard/projects/${issue.projectId}/board?issue=${issue.id}`),
          category: "issues",
        });
      });
    }

    return items;
  }, [navigate, spaces, myIssues]);

  // Filter commands based on query
  const filteredCommands = useMemo(() => {
    if (!debouncedQuery) return commands;

    const lowerQuery = debouncedQuery.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(lowerQuery) ||
        cmd.subtitle?.toLowerCase().includes(lowerQuery)
    );
  }, [commands, debouncedQuery]);

  // Group by category
  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {
      navigation: [],
      actions: [],
      spaces: [],
      issues: [],
    };

    filteredCommands.forEach((cmd) => {
      groups[cmd.category].push(cmd);
    });

    return groups;
  }, [filteredCommands]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev < filteredCommands.length - 1 ? prev + 1 : 0
        );
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) =>
          prev > 0 ? prev - 1 : filteredCommands.length - 1
        );
      } else if (e.key === "Enter" && filteredCommands[selectedIndex]) {
        e.preventDefault();
        filteredCommands[selectedIndex].action();
        setIsOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, filteredCommands, selectedIndex]);

  // Reset selected index when filtered commands change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands]);

  const categoryLabels: Record<string, string> = {
    navigation: "Navigation",
    actions: "Actions",
    spaces: "Spaces",
    issues: "Recent Issues",
  };

  let flatIndex = -1;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-xl bg-white dark:bg-[#1A1A2E] rounded-xl shadow-2xl border border-[#E5E7EB] dark:border-[#2D2D44] overflow-hidden z-50"
          >
            {/* Search Input */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[#E5E7EB] dark:border-[#2D2D44]">
              <Search size={20} className="text-[#6B7280]" />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search or type a command..."
                className="flex-1 bg-transparent text-[#1A1A2E] dark:text-white placeholder-[#6B7280] focus:outline-none"
              />
              <kbd className="hidden sm:flex items-center gap-1 px-2 py-1 text-xs text-[#6B7280] bg-[#F3F4F6] dark:bg-[#2D2D44] rounded">
                <Command size={12} />K
              </kbd>
            </div>

            {/* Results */}
            <div className="max-h-96 overflow-y-auto p-2">
              {filteredCommands.length === 0 ? (
                <div className="py-8 text-center text-[#6B7280]">
                  <p>No results found</p>
                </div>
              ) : (
                Object.entries(groupedCommands).map(([category, items]) => {
                  if (items.length === 0) return null;

                  return (
                    <div key={category} className="mb-2">
                      <div className="px-3 py-2 text-xs font-medium text-[#6B7280] uppercase">
                        {categoryLabels[category]}
                      </div>
                      {items.map((cmd) => {
                        flatIndex++;
                        const isSelected = flatIndex === selectedIndex;

                        return (
                          <button
                            key={cmd.id}
                            onClick={() => {
                              cmd.action();
                              setIsOpen(false);
                            }}
                            className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-left transition-colors ${
                              isSelected
                                ? "bg-[#F97316]/10 text-[#F97316]"
                                : "hover:bg-[#F3F4F6] dark:hover:bg-[#2D2D44]"
                            }`}
                          >
                            <div
                              className={
                                isSelected
                                  ? "text-[#F97316]"
                                  : "text-[#6B7280]"
                              }
                            >
                              {cmd.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p
                                className={`text-sm font-medium truncate ${
                                  isSelected
                                    ? "text-[#F97316]"
                                    : "text-[#1A1A2E] dark:text-white"
                                }`}
                              >
                                {cmd.title}
                              </p>
                              {cmd.subtitle && (
                                <p className="text-xs text-[#6B7280] truncate">
                                  {cmd.subtitle}
                                </p>
                              )}
                            </div>
                            {isSelected && (
                              <ArrowRight size={14} className="text-[#F97316]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-[#E5E7EB] dark:border-[#2D2D44] text-xs text-[#6B7280]">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#F3F4F6] dark:bg-[#2D2D44] rounded">↑</kbd>
                  <kbd className="px-1.5 py-0.5 bg-[#F3F4F6] dark:bg-[#2D2D44] rounded">↓</kbd>
                  to navigate
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-[#F3F4F6] dark:bg-[#2D2D44] rounded">↵</kbd>
                  to select
                </span>
              </div>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[#F3F4F6] dark:bg-[#2D2D44] rounded">esc</kbd>
                to close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
