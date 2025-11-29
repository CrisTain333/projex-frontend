import { api } from './api';
import { Label, CreateLabelDTO, UpdateLabelDTO, ApiResponse, ListResponse } from '@/types';

export const labelService = {
  async getByProject(projectId: string): Promise<Label[]> {
    const response = await api.get<ListResponse<Label>>(`/projects/${projectId}/labels`);
    return response.data.data;
  },

  async create(data: CreateLabelDTO): Promise<Label> {
    const response = await api.post<ApiResponse<Label>>('/labels', data);
    return response.data.data;
  },

  async update(id: string, data: UpdateLabelDTO): Promise<Label> {
    const response = await api.patch<ApiResponse<Label>>(`/labels/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/labels/${id}`);
  },
};
