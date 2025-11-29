import { api } from './api';
import { Space, CreateSpaceDTO, UpdateSpaceDTO, ApiResponse, ListResponse } from '@/types';

export const spaceService = {
  async getAll(): Promise<Space[]> {
    const response = await api.get<ListResponse<Space>>('/spaces');
    return response.data.data;
  },

  async getById(id: string): Promise<Space> {
    const response = await api.get<ApiResponse<Space>>(`/spaces/${id}`);
    return response.data.data;
  },

  async getBySlug(slug: string): Promise<Space> {
    const response = await api.get<ApiResponse<Space>>(`/spaces/slug/${slug}`);
    return response.data.data;
  },

  async create(data: CreateSpaceDTO): Promise<Space> {
    const response = await api.post<ApiResponse<Space>>('/spaces', data);
    return response.data.data;
  },

  async update(id: string, data: UpdateSpaceDTO): Promise<Space> {
    const response = await api.patch<ApiResponse<Space>>(`/spaces/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/spaces/${id}`);
  },

  async uploadLogo(id: string, file: File): Promise<{ url: string }> {
    const formData = new FormData();
    formData.append('logo', file);
    const response = await api.post<ApiResponse<{ url: string }>>(`/spaces/${id}/logo`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data.data;
  },
};
