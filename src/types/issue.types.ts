import { User } from './user.types';
import { Label } from './label.types';

export type IssueType = 'epic' | 'story' | 'bug' | 'task' | 'subtask';
export type IssueStatus = 'todo' | 'in_progress' | 'review' | 'done';
export type Priority = 'critical' | 'high' | 'medium' | 'low';

export interface IssueSummary {
  id: string;
  key: string;
  title: string;
  type: IssueType;
  status: IssueStatus;
  priority: Priority;
}

export interface Issue {
  id: string;
  key: string;
  number: number;
  type: IssueType;
  title: string;
  description: string | null;
  status: IssueStatus;
  priority: Priority;

  // Hierarchy
  spaceId: string;
  projectId: string;
  projectKey: string;
  epicId: string | null;
  epic: IssueSummary | null;
  parentId: string | null;
  parent: IssueSummary | null;

  // People
  reporterId: string;
  reporter: User;
  assigneeId: string | null;
  assignee: User | null;

  // Labels
  labels: Label[];

  // Dates
  dueDate: string | null;
  startDate: string | null;

  // Tracking
  estimate: number | null;
  timeSpent: number | null;

  // Counts
  subtaskCount: number;
  subtaskDoneCount: number;
  commentCount: number;
  attachmentCount: number;

  // Watchers
  isWatching: boolean;
  watcherCount: number;

  // Timestamps
  createdAt: string;
  updatedAt: string;
  resolvedAt: string | null;
}

export interface CreateIssueDTO {
  projectId: string;
  type: IssueType;
  title: string;
  description?: string;
  status?: IssueStatus;
  priority?: Priority;
  assigneeId?: string;
  epicId?: string;
  parentId?: string;
  labelIds?: string[];
  dueDate?: string;
  startDate?: string;
  estimate?: number;
}

export interface UpdateIssueDTO {
  title?: string;
  description?: string | null;
  type?: IssueType;
  status?: IssueStatus;
  priority?: Priority;
  assigneeId?: string | null;
  epicId?: string | null;
  labelIds?: string[];
  dueDate?: string | null;
  startDate?: string | null;
  estimate?: number | null;
}

export interface MoveIssueDTO {
  status: IssueStatus;
  position: number;
}
