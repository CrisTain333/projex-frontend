import { User } from './user.types';

export interface Attachment {
  id: string;
  issueId: string | null;
  commentId: string | null;
  filename: string;
  mimeType: string;
  size: number;
  url: string;
  isImage: boolean;
  thumbnail: {
    url: string;
    width: number;
    height: number;
  } | null;
  uploadedBy: User;
  createdAt: string;
}

export interface UploadAttachmentDTO {
  issueId?: string;
  commentId?: string;
  file: File;
}
