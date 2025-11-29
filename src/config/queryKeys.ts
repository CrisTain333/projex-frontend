export const QUERY_KEYS = {
  // Auth
  AUTH: ['auth'] as const,
  USER: ['user'] as const,
  USER_PROFILE: ['user', 'profile'] as const,

  // Spaces
  SPACES: ['spaces'] as const,
  SPACE: (id: string) => ['spaces', id] as const,

  // Projects
  PROJECTS: ['projects'] as const,
  SPACE_PROJECTS: (spaceId: string) => ['projects', 'space', spaceId] as const,
  PROJECT: (id: string) => ['projects', id] as const,
  PROJECT_BY_KEY: (spaceSlug: string, projectKey: string) =>
    ['projects', 'key', spaceSlug, projectKey] as const,

  // Board
  BOARD: (projectId: string) => ['board', projectId] as const,

  // Issues
  ISSUES: ['issues'] as const,
  PROJECT_ISSUES: (projectId: string) => ['issues', 'project', projectId] as const,
  ISSUE: (id: string) => ['issues', id] as const,
  ISSUE_BY_KEY: (issueKey: string) => ['issues', 'key', issueKey] as const,
  MY_ISSUES: ['issues', 'my'] as const,

  // Epics
  EPICS: (projectId: string) => ['epics', projectId] as const,
  EPIC: (id: string) => ['epics', 'detail', id] as const,

  // Members
  PROJECT_MEMBERS: (projectId: string) => ['members', 'project', projectId] as const,
  SPACE_MEMBERS: (spaceId: string) => ['members', 'space', spaceId] as const,
  INVITES: (projectId: string) => ['invites', projectId] as const,

  // Comments
  ISSUE_COMMENTS: (issueId: string) => ['comments', issueId] as const,

  // Activities
  ISSUE_ACTIVITIES: (issueId: string) => ['activities', issueId] as const,
  PROJECT_ACTIVITIES: (projectId: string) => ['activities', 'project', projectId] as const,

  // Notifications
  NOTIFICATIONS: ['notifications'] as const,
  NOTIFICATION_PREFERENCES: ['notifications', 'preferences'] as const,

  // Attachments
  ISSUE_ATTACHMENTS: (issueId: string) => ['attachments', issueId] as const,

  // Labels
  PROJECT_LABELS: (projectId: string) => ['labels', projectId] as const,
} as const;
