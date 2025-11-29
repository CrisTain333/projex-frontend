const PREFIX = 'projex_';

export const storage = {
  get<T>(key: string): T | null {
    try {
      const item = localStorage.getItem(PREFIX + key);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  },

  set<T>(key: string, value: T): void {
    try {
      localStorage.setItem(PREFIX + key, JSON.stringify(value));
    } catch {
      console.error('Error saving to localStorage');
    }
  },

  remove(key: string): void {
    try {
      localStorage.removeItem(PREFIX + key);
    } catch {
      console.error('Error removing from localStorage');
    }
  },

  clear(): void {
    try {
      Object.keys(localStorage)
        .filter((key) => key.startsWith(PREFIX))
        .forEach((key) => localStorage.removeItem(key));
    } catch {
      console.error('Error clearing localStorage');
    }
  },
};

// Specific storage keys
export const STORAGE_KEYS = {
  TOKEN: 'token',
  THEME: 'theme',
  SIDEBAR_COLLAPSED: 'sidebar_collapsed',
  RECENT_PROJECTS: 'recent_projects',
  BOARD_VIEW_SETTINGS: 'board_view_settings',
} as const;
