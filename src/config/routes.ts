export const ROUTES = {
  // Auth Routes (Public)
  LOGIN: '/login',
  SIGNUP: '/signup',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password/:token',
  VERIFY_EMAIL: '/verify-email/:token',
  ACCEPT_INVITE: '/invite/:token',

  // Dashboard (Protected)
  DASHBOARD: '/',
  MY_WORK: '/my-work',

  // Space Routes
  SPACE: '/s/:spaceSlug',
  SPACE_PROJECTS: '/s/:spaceSlug/projects',
  SPACE_MEMBERS: '/s/:spaceSlug/members',
  SPACE_SETTINGS: '/s/:spaceSlug/settings',

  // Project Routes
  PROJECT_BOARD: '/s/:spaceSlug/p/:projectKey/board',
  PROJECT_BACKLOG: '/s/:spaceSlug/p/:projectKey/backlog',
  PROJECT_EPICS: '/s/:spaceSlug/p/:projectKey/epics',
  PROJECT_ROADMAP: '/s/:spaceSlug/p/:projectKey/roadmap',
  PROJECT_SETTINGS: '/s/:spaceSlug/p/:projectKey/settings',

  // Issue Route (Modal overlay on board/backlog)
  ISSUE: '/s/:spaceSlug/p/:projectKey/issue/:issueKey',

  // Profile Routes
  PROFILE: '/profile',
  NOTIFICATIONS: '/notifications',

  // Error Routes
  NOT_FOUND: '/404',
  FORBIDDEN: '/403',
  SERVER_ERROR: '/500',
} as const;

// Helper functions to generate dynamic routes
export const routes = {
  space: (spaceSlug: string) => `/s/${spaceSlug}`,
  spaceProjects: (spaceSlug: string) => `/s/${spaceSlug}/projects`,
  spaceMembers: (spaceSlug: string) => `/s/${spaceSlug}/members`,
  spaceSettings: (spaceSlug: string) => `/s/${spaceSlug}/settings`,

  projectBoard: (spaceSlug: string, projectKey: string) =>
    `/s/${spaceSlug}/p/${projectKey}/board`,
  projectBacklog: (spaceSlug: string, projectKey: string) =>
    `/s/${spaceSlug}/p/${projectKey}/backlog`,
  projectEpics: (spaceSlug: string, projectKey: string) =>
    `/s/${spaceSlug}/p/${projectKey}/epics`,
  projectRoadmap: (spaceSlug: string, projectKey: string) =>
    `/s/${spaceSlug}/p/${projectKey}/roadmap`,
  projectSettings: (spaceSlug: string, projectKey: string) =>
    `/s/${spaceSlug}/p/${projectKey}/settings`,

  issue: (spaceSlug: string, projectKey: string, issueKey: string) =>
    `/s/${spaceSlug}/p/${projectKey}/issue/${issueKey}`,

  resetPassword: (token: string) => `/reset-password/${token}`,
  verifyEmail: (token: string) => `/verify-email/${token}`,
  acceptInvite: (token: string) => `/invite/${token}`,
};
