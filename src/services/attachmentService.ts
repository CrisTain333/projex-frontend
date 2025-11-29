import { api } from './api';
import { Attachment, ApiResponse, ListResponse } from '@/types';

export const attachmentService = {
  async getByIssue(issueId: string): Promise<Attachment[]> {
    const response = await api.get<ListResponse<Attachment>>(`/issues/${issueId}/attachments`);
    return response.data.data;
  },

  async upload(issueId: string, file: File): Promise<Attachment> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('issueId', issueId);

    const response = await api.post<ApiResponse<Attachment>>('/attachments', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/attachments/${id}`);
  },

  async getDownloadUrl(id: string): Promise<string> {
    const response = await api.get<ApiResponse<{ url: string }>>(`/attachments/${id}/download`);
    return response.data.data.url;
  },
};
