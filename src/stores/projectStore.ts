import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project } from '@/types';

interface ProjectState {
  // Current project
  currentProject: Project | null;
  projects: Project[];

  // Recent projects for quick access
  recentProjectIds: string[];

  // Actions
  setCurrentProject: (project: Project | null) => void;
  setProjects: (projects: Project[]) => void;
  addProject: (project: Project) => void;
  updateProject: (id: string, updates: Partial<Project>) => void;
  removeProject: (id: string) => void;
  addRecentProject: (id: string) => void;
  clearProjects: () => void;
}

const MAX_RECENT_PROJECTS = 5;

export const useProjectStore = create<ProjectState>()(
  persist(
    (set) => ({
      currentProject: null,
      projects: [],
      recentProjectIds: [],

      setCurrentProject: (project) => {
        set({ currentProject: project });
        if (project) {
          set((state) => {
            const filtered = state.recentProjectIds.filter((id) => id !== project.id);
            return {
              recentProjectIds: [project.id, ...filtered].slice(0, MAX_RECENT_PROJECTS),
            };
          });
        }
      },

      setProjects: (projects) => set({ projects }),

      addProject: (project) =>
        set((state) => ({
          projects: [...state.projects, project],
        })),

      updateProject: (id, updates) =>
        set((state) => ({
          projects: state.projects.map((p) => (p.id === id ? { ...p, ...updates } : p)),
          currentProject:
            state.currentProject?.id === id
              ? { ...state.currentProject, ...updates }
              : state.currentProject,
        })),

      removeProject: (id) =>
        set((state) => ({
          projects: state.projects.filter((p) => p.id !== id),
          currentProject: state.currentProject?.id === id ? null : state.currentProject,
          recentProjectIds: state.recentProjectIds.filter((pid) => pid !== id),
        })),

      addRecentProject: (id) =>
        set((state) => {
          const filtered = state.recentProjectIds.filter((pid) => pid !== id);
          return {
            recentProjectIds: [id, ...filtered].slice(0, MAX_RECENT_PROJECTS),
          };
        }),

      clearProjects: () =>
        set({
          currentProject: null,
          projects: [],
          recentProjectIds: [],
        }),
    }),
    {
      name: 'projex-project',
      partialize: (state) => ({
        recentProjectIds: state.recentProjectIds,
      }),
    }
  )
);
