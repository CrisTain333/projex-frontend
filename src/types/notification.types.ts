import { User } from './user.types';

export type NotificationType =
  | 'issue_assigned'
  | 'issue_mentioned'
  | 'issue_commented'
  | 'issue_status_changed'
  | 'issue_due_soon'
  | 'issue_overdue'
  | 'project_invited'
  | 'project_removed';

export interface Notification {
  id: string;
  userId: string;
  type: NotificationType;
  title: string;
  message: string;
  context: {
    spaceId: string | null;
    projectId: string | null;
    issueId: string | null;
    issueKey: string | null;
  };
  actor: User | null;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
}

export interface NotificationPreferences {
  email: {
    enabled: boolean;
    issueAssigned: boolean;
    issueMentioned: boolean;
    issueCommented: boolean;
    issueDueSoon: boolean;
    issueOverdue: boolean;
    weeklyDigest: boolean;
  };
  inApp: {
    enabled: boolean;
    issueAssigned: boolean;
    issueMentioned: boolean;
    issueCommented: boolean;
    issueStatusChanged: boolean;
    issueDueSoon: boolean;
  };
}

export interface UpdateNotificationPreferencesDTO {
  email?: Partial<NotificationPreferences['email']>;
  inApp?: Partial<NotificationPreferences['inApp']>;
}
