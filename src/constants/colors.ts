// Projex Color System
// Based on logo gradient: Orange (#F97316) to Pink (#EC4899)

export const colors = {
  // Primary Brand Colors
  primary: {
    orange: "#F97316",
    pink: "#EC4899",
    gradient: "linear-gradient(135deg, #F97316 0%, #EC4899 100%)",
    gradientHover: "linear-gradient(135deg, #EA580C 0%, #DB2777 100%)",
  },

  // Text Colors
  text: {
    primary: "#1A1A2E",
    secondary: "#4A4A68",
    tertiary: "#6B7280",
    inverse: "#FFFFFF",
    muted: "#9CA3AF",
  },

  // Background Colors
  background: {
    primary: "#FFFFFF",
    secondary: "#F8F9FC",
    tertiary: "#F3F4F6",
    dark: "#1A1A2E",
    darkSecondary: "#2D2D44",
  },

  // Border Colors
  border: {
    light: "#E5E7EB",
    default: "#D1D5DB",
    dark: "#9CA3AF",
  },

  // Status Colors
  status: {
    success: "#10B981",
    successLight: "#D1FAE5",
    warning: "#F59E0B",
    warningLight: "#FEF3C7",
    error: "#EF4444",
    errorLight: "#FEE2E2",
    info: "#3B82F6",
    infoLight: "#DBEAFE",
  },

  // Issue Type Colors
  issueType: {
    epic: "#8B5CF6",
    story: "#10B981",
    bug: "#EF4444",
    task: "#3B82F6",
    subtask: "#6B7280",
  },

  // Priority Colors
  priority: {
    critical: "#DC2626",
    high: "#F97316",
    medium: "#F59E0B",
    low: "#6B7280",
  },

  // Board Column Colors (optional)
  board: {
    todo: "#E5E7EB",
    inProgress: "#DBEAFE",
    review: "#FEF3C7",
    done: "#D1FAE5",
  },
} as const;

// Tailwind CSS Compatible Color Config
export const tailwindColors = {
  primary: {
    50: "#FFF7ED",
    100: "#FFEDD5",
    200: "#FED7AA",
    300: "#FDBA74",
    400: "#FB923C",
    500: "#F97316", // Primary Orange
    600: "#EA580C",
    700: "#C2410C",
    800: "#9A3412",
    900: "#7C2D12",
  },
  accent: {
    50: "#FDF2F8",
    100: "#FCE7F3",
    200: "#FBCFE8",
    300: "#F9A8D4",
    400: "#F472B6",
    500: "#EC4899", // Primary Pink
    600: "#DB2777",
    700: "#BE185D",
    800: "#9D174D",
    900: "#831843",
  },
  dark: {
    50: "#F8F9FC",
    100: "#E5E7EB",
    200: "#D1D5DB",
    300: "#9CA3AF",
    400: "#6B7280",
    500: "#4A4A68",
    600: "#374151",
    700: "#2D2D44",
    800: "#1F2937",
    900: "#1A1A2E", // Primary Dark
  },
};

// CSS Variables (for :root)
export const cssVariables = {
  "--color-primary-orange": "#F97316",
  "--color-primary-pink": "#EC4899",
  "--color-primary-gradient": "linear-gradient(135deg, #F97316 0%, #EC4899 100%)",
  "--color-text-primary": "#1A1A2E",
  "--color-text-secondary": "#4A4A68",
  "--color-text-tertiary": "#6B7280",
  "--color-bg-primary": "#FFFFFF",
  "--color-bg-secondary": "#F8F9FC",
  "--color-border-light": "#E5E7EB",
  "--color-border-default": "#D1D5DB",
  "--color-success": "#10B981",
  "--color-warning": "#F59E0B",
  "--color-error": "#EF4444",
  "--color-info": "#3B82F6",
} as const;

// Type exports
export type Colors = typeof colors;
export type TailwindColors = typeof tailwindColors;
export type CSSVariables = typeof cssVariables;
