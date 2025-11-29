import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UIState {
  // Sidebar
  sidebarCollapsed: boolean;

  // Modals
  createIssueModalOpen: boolean;
  createSpaceModalOpen: boolean;
  createProjectModalOpen: boolean;
  issueDetailModalOpen: boolean;

  // Active entities
  activeIssueId: string | null;

  // Command Palette
  commandPaletteOpen: boolean;

  // Theme (managed separately via ThemeProvider, but can sync here)
  theme: 'light' | 'dark' | 'system';

  // Actions
  toggleSidebar: () => void;
  setSidebarCollapsed: (collapsed: boolean) => void;

  openCreateIssueModal: () => void;
  closeCreateIssueModal: () => void;

  openCreateSpaceModal: () => void;
  closeCreateSpaceModal: () => void;

  openCreateProjectModal: () => void;
  closeCreateProjectModal: () => void;

  openIssueDetailModal: (issueId: string) => void;
  closeIssueDetailModal: () => void;

  setActiveIssue: (id: string | null) => void;

  toggleCommandPalette: () => void;
  openCommandPalette: () => void;
  closeCommandPalette: () => void;

  setTheme: (theme: 'light' | 'dark' | 'system') => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarCollapsed: false,
      createIssueModalOpen: false,
      createSpaceModalOpen: false,
      createProjectModalOpen: false,
      issueDetailModalOpen: false,
      activeIssueId: null,
      commandPaletteOpen: false,
      theme: 'system',

      toggleSidebar: () => set((state) => ({ sidebarCollapsed: !state.sidebarCollapsed })),
      setSidebarCollapsed: (collapsed) => set({ sidebarCollapsed: collapsed }),

      openCreateIssueModal: () => set({ createIssueModalOpen: true }),
      closeCreateIssueModal: () => set({ createIssueModalOpen: false }),

      openCreateSpaceModal: () => set({ createSpaceModalOpen: true }),
      closeCreateSpaceModal: () => set({ createSpaceModalOpen: false }),

      openCreateProjectModal: () => set({ createProjectModalOpen: true }),
      closeCreateProjectModal: () => set({ createProjectModalOpen: false }),

      openIssueDetailModal: (issueId) =>
        set({
          issueDetailModalOpen: true,
          activeIssueId: issueId,
        }),
      closeIssueDetailModal: () =>
        set({
          issueDetailModalOpen: false,
          activeIssueId: null,
        }),

      setActiveIssue: (id) => set({ activeIssueId: id }),

      toggleCommandPalette: () =>
        set((state) => ({ commandPaletteOpen: !state.commandPaletteOpen })),
      openCommandPalette: () => set({ commandPaletteOpen: true }),
      closeCommandPalette: () => set({ commandPaletteOpen: false }),

      setTheme: (theme) => set({ theme }),
    }),
    {
      name: 'projex-ui',
      partialize: (state) => ({
        sidebarCollapsed: state.sidebarCollapsed,
        theme: state.theme,
      }),
    }
  )
);
