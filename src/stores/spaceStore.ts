import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Space } from '@/types';

interface SpaceState {
  // Current space
  currentSpace: Space | null;
  spaces: Space[];

  // Recent spaces for quick access
  recentSpaceIds: string[];

  // Actions
  setCurrentSpace: (space: Space | null) => void;
  setSpaces: (spaces: Space[]) => void;
  addSpace: (space: Space) => void;
  updateSpace: (id: string, updates: Partial<Space>) => void;
  removeSpace: (id: string) => void;
  addRecentSpace: (id: string) => void;
  clearSpaces: () => void;
}

const MAX_RECENT_SPACES = 5;

export const useSpaceStore = create<SpaceState>()(
  persist(
    (set) => ({
      currentSpace: null,
      spaces: [],
      recentSpaceIds: [],

      setCurrentSpace: (space) => {
        set({ currentSpace: space });
        if (space) {
          set((state) => {
            const filtered = state.recentSpaceIds.filter((id) => id !== space.id);
            return {
              recentSpaceIds: [space.id, ...filtered].slice(0, MAX_RECENT_SPACES),
            };
          });
        }
      },

      setSpaces: (spaces) => set({ spaces }),

      addSpace: (space) =>
        set((state) => ({
          spaces: [...state.spaces, space],
        })),

      updateSpace: (id, updates) =>
        set((state) => ({
          spaces: state.spaces.map((s) => (s.id === id ? { ...s, ...updates } : s)),
          currentSpace:
            state.currentSpace?.id === id
              ? { ...state.currentSpace, ...updates }
              : state.currentSpace,
        })),

      removeSpace: (id) =>
        set((state) => ({
          spaces: state.spaces.filter((s) => s.id !== id),
          currentSpace: state.currentSpace?.id === id ? null : state.currentSpace,
          recentSpaceIds: state.recentSpaceIds.filter((sid) => sid !== id),
        })),

      addRecentSpace: (id) =>
        set((state) => {
          const filtered = state.recentSpaceIds.filter((sid) => sid !== id);
          return {
            recentSpaceIds: [id, ...filtered].slice(0, MAX_RECENT_SPACES),
          };
        }),

      clearSpaces: () =>
        set({
          currentSpace: null,
          spaces: [],
          recentSpaceIds: [],
        }),
    }),
    {
      name: 'projex-space',
      partialize: (state) => ({
        recentSpaceIds: state.recentSpaceIds,
      }),
    }
  )
);
