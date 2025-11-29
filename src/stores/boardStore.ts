import { create } from 'zustand';
import { Issue, IssueStatus } from '@/types';

interface BoardFilters {
  search: string;
  assigneeIds: string[];
  labelIds: string[];
  priorities: string[];
  types: string[];
  epicId: string | null;
}

interface BoardState {
  // Issues grouped by status
  issues: Record<IssueStatus, Issue[]>;

  // Filters
  filters: BoardFilters;

  // View settings
  showSubtasks: boolean;
  compactMode: boolean;

  // Drag state
  isDragging: boolean;
  draggedIssueId: string | null;

  // Actions
  setIssues: (issues: Issue[]) => void;
  addIssue: (issue: Issue) => void;
  updateIssue: (id: string, updates: Partial<Issue>) => void;
  removeIssue: (id: string) => void;
  moveIssue: (issueId: string, toStatus: IssueStatus, toIndex: number) => void;

  // Filter actions
  setFilter: <K extends keyof BoardFilters>(key: K, value: BoardFilters[K]) => void;
  resetFilters: () => void;

  // View settings
  setShowSubtasks: (show: boolean) => void;
  setCompactMode: (compact: boolean) => void;

  // Drag actions
  setDragging: (isDragging: boolean, issueId?: string) => void;

  // Reset
  clearBoard: () => void;
}

const defaultFilters: BoardFilters = {
  search: '',
  assigneeIds: [],
  labelIds: [],
  priorities: [],
  types: [],
  epicId: null,
};

const defaultIssues: Record<IssueStatus, Issue[]> = {
  todo: [],
  in_progress: [],
  review: [],
  done: [],
};

export const useBoardStore = create<BoardState>((set) => ({
  issues: { ...defaultIssues },
  filters: { ...defaultFilters },
  showSubtasks: false,
  compactMode: false,
  isDragging: false,
  draggedIssueId: null,

  setIssues: (issues) => {
    const grouped = issues.reduce(
      (acc, issue) => {
        if (!acc[issue.status]) {
          acc[issue.status] = [];
        }
        acc[issue.status].push(issue);
        return acc;
      },
      { ...defaultIssues }
    );
    set({ issues: grouped });
  },

  addIssue: (issue) =>
    set((state) => ({
      issues: {
        ...state.issues,
        [issue.status]: [...state.issues[issue.status], issue],
      },
    })),

  updateIssue: (id, updates) =>
    set((state) => {
      const newIssues = { ...state.issues };

      // Find and update the issue
      for (const status of Object.keys(newIssues) as IssueStatus[]) {
        const index = newIssues[status].findIndex((i) => i.id === id);
        if (index !== -1) {
          const updatedIssue = { ...newIssues[status][index], ...updates };

          // If status changed, move to new column
          if (updates.status && updates.status !== status) {
            newIssues[status] = newIssues[status].filter((i) => i.id !== id);
            newIssues[updates.status] = [...newIssues[updates.status], updatedIssue];
          } else {
            newIssues[status][index] = updatedIssue;
          }
          break;
        }
      }

      return { issues: newIssues };
    }),

  removeIssue: (id) =>
    set((state) => {
      const newIssues = { ...state.issues };
      for (const status of Object.keys(newIssues) as IssueStatus[]) {
        newIssues[status] = newIssues[status].filter((i) => i.id !== id);
      }
      return { issues: newIssues };
    }),

  moveIssue: (issueId, toStatus, toIndex) =>
    set((state) => {
      const newIssues = { ...state.issues };
      let movedIssue: Issue | undefined;

      // Find and remove from current position
      for (const status of Object.keys(newIssues) as IssueStatus[]) {
        const index = newIssues[status].findIndex((i) => i.id === issueId);
        if (index !== -1) {
          [movedIssue] = newIssues[status].splice(index, 1);
          break;
        }
      }

      // Insert at new position
      if (movedIssue) {
        movedIssue.status = toStatus;
        newIssues[toStatus].splice(toIndex, 0, movedIssue);
      }

      return { issues: newIssues };
    }),

  setFilter: (key, value) =>
    set((state) => ({
      filters: { ...state.filters, [key]: value },
    })),

  resetFilters: () => set({ filters: { ...defaultFilters } }),

  setShowSubtasks: (showSubtasks) => set({ showSubtasks }),

  setCompactMode: (compactMode) => set({ compactMode }),

  setDragging: (isDragging, issueId) =>
    set({
      isDragging,
      draggedIssueId: issueId || null,
    }),

  clearBoard: () =>
    set({
      issues: { ...defaultIssues },
      filters: { ...defaultFilters },
      isDragging: false,
      draggedIssueId: null,
    }),
}));
