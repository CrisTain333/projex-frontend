import { User } from './user.types';
import { Attachment } from './attachment.types';

export interface Comment {
  id: string;
  issueId: string;
  authorId: string;
  author: User;
  content: string;
  mentionedUsers: User[];
  attachments: Attachment[];
  isEdited: boolean;
  editedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCommentDTO {
  issueId: string;
  content: string;
  attachmentIds?: string[];
}

export interface UpdateCommentDTO {
  content: string;
}
