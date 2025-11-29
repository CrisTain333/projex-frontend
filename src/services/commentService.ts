import { api } from './api';
import { Comment, CreateCommentDTO, UpdateCommentDTO, ApiResponse, ListResponse } from '@/types';

export const commentService = {
  async getByIssue(issueId: string): Promise<Comment[]> {
    const response = await api.get<ListResponse<Comment>>(`/issues/${issueId}/comments`);
    return response.data.data;
  },

  async create(data: CreateCommentDTO): Promise<Comment> {
    const response = await api.post<ApiResponse<Comment>>('/comments', data);
    return response.data.data;
  },

  async update(id: string, data: UpdateCommentDTO): Promise<Comment> {
    const response = await api.patch<ApiResponse<Comment>>(`/comments/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/comments/${id}`);
  },
};
