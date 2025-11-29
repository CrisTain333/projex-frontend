import { IssueType, IssueStatus, Priority } from '@/types';

// Issue Types as array for iteration
export const ISSUE_TYPES: { value: IssueType; label: string; icon: string; color: string }[] = [
  { value: 'epic', label: 'Epic', icon: 'Zap', color: '#8B5CF6' },
  { value: 'story', label: 'Story', icon: 'BookOpen', color: '#10B981' },
  { value: 'feature', label: 'Feature', icon: 'Lightbulb', color: '#10B981' },
  { value: 'bug', label: 'Bug', icon: 'Bug', color: '#EF4444' },
  { value: 'task', label: 'Task', icon: 'CheckSquare', color: '#3B82F6' },
  { value: 'subtask', label: 'Subtask', icon: 'CornerDownRight', color: '#6B7280' },
];

// Issue Statuses as array for iteration
export const ISSUE_STATUSES: { value: IssueStatus; label: string; color: string }[] = [
  { value: 'backlog', label: 'Backlog', color: '#6B7280' },
  { value: 'todo', label: 'To Do', color: '#3B82F6' },
  { value: 'in_progress', label: 'In Progress', color: '#F59E0B' },
  { value: 'in_review', label: 'In Review', color: '#8B5CF6' },
  { value: 'done', label: 'Done', color: '#10B981' },
  { value: 'cancelled', label: 'Cancelled', color: '#EF4444' },
];

// Priorities as array for iteration
export const PRIORITIES: { value: Priority; label: string; color: string; icon: string }[] = [
  { value: 'highest', label: 'Highest', color: '#DC2626', icon: 'AlertTriangle' },
  { value: 'high', label: 'High', color: '#F97316', icon: 'ArrowUp' },
  { value: 'medium', label: 'Medium', color: '#FBBF24', icon: 'Minus' },
  { value: 'low', label: 'Low', color: '#22C55E', icon: 'ArrowDown' },
  { value: 'lowest', label: 'Lowest', color: '#6B7280', icon: 'ArrowDown' },
];

// Default Colors for Labels
export const LABEL_COLORS = [
  '#EF4444', // Red
  '#F97316', // Orange
  '#FBBF24', // Yellow
  '#22C55E', // Green
  '#10B981', // Emerald
  '#14B8A6', // Teal
  '#06B6D4', // Cyan
  '#3B82F6', // Blue
  '#6366F1', // Indigo
  '#8B5CF6', // Purple
  '#EC4899', // Pink
  '#6B7280', // Gray
];

// Member Roles
export const MEMBER_ROLES = {
  admin: { label: 'Admin', description: 'Full access to all project settings and members' },
  member: { label: 'Member', description: 'Can view and edit issues, but limited settings access' },
};

// Board Types
export const BOARD_TYPES = {
  kanban: { label: 'Kanban', description: 'Continuous flow with no sprints' },
  scrum: { label: 'Scrum', description: 'Sprint-based workflow with backlog' },
};

// Pagination
export const DEFAULT_PAGE_SIZE = 20;
export const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

// File Upload
export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
export const ALLOWED_FILE_TYPES = [
  'image/jpeg',
  'image/png',
  'image/gif',
  'image/webp',
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/plain',
  'text/csv',
];

// Keyboard Shortcuts
export const KEYBOARD_SHORTCUTS = {
  SEARCH: { key: 'k', modifier: 'cmd' },
  CREATE_ISSUE: { key: 'c', modifier: null },
  ESCAPE: { key: 'Escape', modifier: null },
};
