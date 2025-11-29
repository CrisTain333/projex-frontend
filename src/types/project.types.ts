import { User } from './user.types';

export interface Project {
  id: string;
  name: string;
  key: string;
  description: string | null;
  spaceId: string;
  spaceName: string;
  spaceSlug: string;
  ownerId: string;
  leadId: string | null;
  lead: User | null;
  boardType: 'kanban' | 'scrum';
  issueTypes: {
    epic: boolean;
    story: boolean;
    bug: boolean;
    task: boolean;
  };
  role: 'admin' | 'member';
  issueCount: number;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateProjectDTO {
  spaceId: string;
  name: string;
  key: string;
  description?: string;
  boardType?: 'kanban' | 'scrum';
}

export interface UpdateProjectDTO {
  name?: string;
  key?: string;
  description?: string;
  leadId?: string | null;
  boardType?: 'kanban' | 'scrum';
  issueTypes?: {
    epic?: boolean;
    story?: boolean;
    bug?: boolean;
    task?: boolean;
  };
}
