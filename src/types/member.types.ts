import { User } from './user.types';

export interface Member {
  id: string;
  userId: string;
  user: User;
  spaceId: string;
  projectId: string;
  role: 'admin' | 'member';
  joinedAt: string;
}

export interface Invite {
  id: string;
  email: string;
  spaceId: string;
  projectId: string;
  projectName: string;
  invitedBy: User;
  status: 'pending' | 'accepted' | 'expired' | 'revoked';
  message: string | null;
  expiresAt: string;
  createdAt: string;
}

export interface CreateInviteDTO {
  email: string;
  projectId: string;
  message?: string;
}

export interface UpdateMemberRoleDTO {
  role: 'admin' | 'member';
}
