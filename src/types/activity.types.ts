import { User } from './user.types';
import { IssueSummary } from './issue.types';

export type ActivityAction =
  | 'created'
  | 'updated'
  | 'status_changed'
  | 'assigned'
  | 'unassigned'
  | 'priority_changed'
  | 'epic_changed'
  | 'label_added'
  | 'label_removed'
  | 'comment_added'
  | 'comment_edited'
  | 'comment_deleted'
  | 'attachment_added'
  | 'attachment_removed'
  | 'subtask_added'
  | 'subtask_completed'
  | 'due_date_changed'
  | 'archived'
  | 'restored';

export interface Activity {
  id: string;
  issueId: string;
  issueKey: string;
  actorId: string;
  actor: User;
  action: ActivityAction;
  changes: {
    field: string;
    from: unknown;
    to: unknown;
  } | null;
  relatedUser: User | null;
  relatedIssue: IssueSummary | null;
  createdAt: string;
}
