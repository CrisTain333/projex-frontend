import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Bug,
  Lightbulb,
  Bookmark,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { useMyIssues } from "@/hooks/api/useIssues";
import { Spinner } from "@/components/ui";
import { IssueType } from "@/types";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isToday,
  parseISO,
} from "date-fns";

const typeIcons: Record<IssueType, React.ReactNode> = {
  bug: <Bug size={12} className="text-[#EF4444]" />,
  feature: <Lightbulb size={12} className="text-[#10B981]" />,
  story: <Bookmark size={12} className="text-[#3B82F6]" />,
  task: <CheckCircle2 size={12} className="text-[#6B7280]" />,
  epic: <AlertCircle size={12} className="text-[#8B5CF6]" />,
  subtask: <CheckCircle2 size={12} className="text-[#6B7280]" />,
};

const typeColors: Record<IssueType, string> = {
  bug: "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400",
  feature: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400",
  story: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400",
  task: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
  epic: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400",
  subtask: "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-400",
};

export function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const { data: issues, isLoading } = useMyIssues();

  // Get issues with due dates
  const issuesWithDueDates = useMemo(() => {
    if (!issues) return [];
    return issues.filter((issue) => issue.dueDate);
  }, [issues]);

  // Get issues for a specific date
  const getIssuesForDate = (date: Date) => {
    return issuesWithDueDates.filter((issue) => {
      if (!issue.dueDate) return false;
      const dueDate = parseISO(issue.dueDate);
      return isSameDay(dueDate, date);
    });
  };

  // Get issues for selected date
  const selectedDateIssues = selectedDate ? getIssuesForDate(selectedDate) : [];

  // Build calendar grid
  const calendarDays = useMemo(() => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const days: Date[] = [];
    let day = startDate;

    while (day <= endDate) {
      days.push(day);
      day = addDays(day, 1);
    }

    return days;
  }, [currentMonth]);

  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));
  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const goToToday = () => {
    setCurrentMonth(new Date());
    setSelectedDate(new Date());
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
            Calendar
          </h1>
          <p className="text-[#4A4A68] dark:text-[#9CA3AF]">
            View your issues and due dates
          </p>
        </div>
        <button
          onClick={goToToday}
          className="px-4 py-2 text-sm font-medium text-[#F97316] border border-[#F97316] rounded-lg hover:bg-[#F97316]/10 transition-colors"
        >
          Today
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E5E7EB] dark:border-[#2D2D44] overflow-hidden">
          {/* Month Navigation */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] dark:border-[#2D2D44]">
            <h2 className="text-lg font-semibold text-[#1A1A2E] dark:text-white">
              {format(currentMonth, "MMMM yyyy")}
            </h2>
            <div className="flex items-center gap-2">
              <button
                onClick={prevMonth}
                className="p-2 rounded-lg hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44] transition-colors"
              >
                <ChevronLeft size={20} className="text-[#6B7280]" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 rounded-lg hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44] transition-colors"
              >
                <ChevronRight size={20} className="text-[#6B7280]" />
              </button>
            </div>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-[#E5E7EB] dark:border-[#2D2D44]">
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <div
                key={day}
                className="px-2 py-3 text-center text-xs font-medium text-[#6B7280] uppercase"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7">
            {calendarDays.map((day, index) => {
              const dayIssues = getIssuesForDate(day);
              const isCurrentMonth = isSameMonth(day, currentMonth);
              const isSelected = selectedDate && isSameDay(day, selectedDate);
              const isTodayDate = isToday(day);

              return (
                <button
                  key={index}
                  onClick={() => setSelectedDate(day)}
                  className={`min-h-[100px] p-2 border-b border-r border-[#E5E7EB] dark:border-[#2D2D44] text-left transition-colors ${
                    !isCurrentMonth
                      ? "bg-[#F8F9FC] dark:bg-[#0F0F1A]"
                      : "hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44]/50"
                  } ${isSelected ? "ring-2 ring-inset ring-[#F97316]" : ""}`}
                >
                  <div
                    className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-medium mb-1 ${
                      isTodayDate
                        ? "bg-[#F97316] text-white"
                        : isCurrentMonth
                        ? "text-[#1A1A2E] dark:text-white"
                        : "text-[#9CA3AF] dark:text-[#4A4A68]"
                    }`}
                  >
                    {format(day, "d")}
                  </div>
                  <div className="space-y-1">
                    {dayIssues.slice(0, 2).map((issue) => (
                      <div
                        key={issue.id}
                        className={`text-xs px-1.5 py-0.5 rounded truncate ${typeColors[issue.type]}`}
                      >
                        {issue.key}
                      </div>
                    ))}
                    {dayIssues.length > 2 && (
                      <div className="text-xs text-[#6B7280] px-1">
                        +{dayIssues.length - 2} more
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Date Panel */}
        <div className="bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E5E7EB] dark:border-[#2D2D44]">
          <div className="px-5 py-4 border-b border-[#E5E7EB] dark:border-[#2D2D44]">
            <h3 className="font-semibold text-[#1A1A2E] dark:text-white">
              {selectedDate
                ? format(selectedDate, "EEEE, MMMM d, yyyy")
                : "Select a date"}
            </h3>
            {selectedDate && (
              <p className="text-sm text-[#6B7280]">
                {selectedDateIssues.length} issue
                {selectedDateIssues.length !== 1 ? "s" : ""} due
              </p>
            )}
          </div>

          <div className="p-4 max-h-[500px] overflow-y-auto">
            {!selectedDate ? (
              <p className="text-center text-[#6B7280] py-8">
                Click on a date to see issues
              </p>
            ) : selectedDateIssues.length === 0 ? (
              <p className="text-center text-[#6B7280] py-8">
                No issues due on this date
              </p>
            ) : (
              <div className="space-y-3">
                {selectedDateIssues.map((issue) => (
                  <Link
                    key={issue.id}
                    to={`/dashboard/projects/${issue.projectId}/board?issue=${issue.id}`}
                    className="block p-3 rounded-lg border border-[#E5E7EB] dark:border-[#2D2D44] hover:border-[#F97316]/30 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      <div className="mt-0.5">{typeIcons[issue.type]}</div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-[#1A1A2E] dark:text-white truncate">
                          {issue.title}
                        </p>
                        <p className="text-sm text-[#6B7280]">{issue.key}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className={`px-2 py-0.5 text-xs font-medium rounded capitalize ${
                          issue.priority === "highest" || issue.priority === "high"
                            ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                            : issue.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
                            : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
                        }`}
                      >
                        {issue.priority}
                      </span>
                      <span className="text-xs text-[#6B7280] capitalize">
                        {issue.status.replace("_", " ")}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Upcoming Issues */}
      <div className="bg-white dark:bg-[#1A1A2E] rounded-xl border border-[#E5E7EB] dark:border-[#2D2D44]">
        <div className="px-5 py-4 border-b border-[#E5E7EB] dark:border-[#2D2D44]">
          <h3 className="font-semibold text-[#1A1A2E] dark:text-white">
            Upcoming Due Dates
          </h3>
        </div>
        <div className="divide-y divide-[#E5E7EB] dark:divide-[#2D2D44]">
          {issuesWithDueDates.length === 0 ? (
            <p className="text-center text-[#6B7280] py-8">
              No issues with due dates
            </p>
          ) : (
            issuesWithDueDates
              .sort((a, b) => {
                if (!a.dueDate || !b.dueDate) return 0;
                return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
              })
              .slice(0, 5)
              .map((issue) => (
                <Link
                  key={issue.id}
                  to={`/dashboard/projects/${issue.projectId}/board?issue=${issue.id}`}
                  className="flex items-center gap-4 px-5 py-3 hover:bg-[#F8F9FC] dark:hover:bg-[#2D2D44]/50 transition-colors"
                >
                  <div>{typeIcons[issue.type]}</div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-[#1A1A2E] dark:text-white truncate">
                      {issue.title}
                    </p>
                    <p className="text-sm text-[#6B7280]">{issue.key}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-[#1A1A2E] dark:text-white">
                      {issue.dueDate && format(parseISO(issue.dueDate), "MMM d")}
                    </p>
                    <p className="text-xs text-[#6B7280]">
                      {issue.dueDate && format(parseISO(issue.dueDate), "yyyy")}
                    </p>
                  </div>
                </Link>
              ))
          )}
        </div>
      </div>
    </div>
  );
}
