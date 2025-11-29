import { Issue } from './issue.types';

export type SprintStatus = 'planning' | 'active' | 'completed';

export interface Sprint {
  id: string;
  projectId: string;
  name: string;
  goal: string | null;
  startDate: string | null;
  endDate: string | null;
  status: SprintStatus;
  issueCount: number;
  completedCount: number;
  storyPoints: number;
  completedPoints: number;
  createdAt: string;
  updatedAt: string;
}

export interface SprintWithIssues extends Sprint {
  issues: Issue[];
}

export interface CreateSprintDTO {
  projectId: string;
  name: string;
  goal?: string;
  startDate?: string;
  endDate?: string;
}

export interface UpdateSprintDTO {
  name?: string;
  goal?: string;
  startDate?: string;
  endDate?: string;
}

export interface StartSprintDTO {
  startDate: string;
  endDate: string;
}
