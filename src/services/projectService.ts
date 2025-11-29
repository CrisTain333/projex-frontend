import { api } from './api';
import { Project, CreateProjectDTO, UpdateProjectDTO, ApiResponse, ListResponse } from '@/types';

export const projectService = {
  async getAll(): Promise<Project[]> {
    const response = await api.get<ListResponse<Project>>('/projects');
    return response.data.data;
  },

  async getBySpace(spaceId: string): Promise<Project[]> {
    const response = await api.get<ListResponse<Project>>(`/projects/space/${spaceId}`);
    return response.data.data;
  },

  async getById(id: string): Promise<Project> {
    const response = await api.get<ApiResponse<Project>>(`/projects/${id}`);
    return response.data.data;
  },

  async getByKey(spaceSlug: string, projectKey: string): Promise<Project> {
    const response = await api.get<ApiResponse<Project>>(
      `/projects/key/${spaceSlug}/${projectKey}`
    );
    return response.data.data;
  },

  async create(data: CreateProjectDTO): Promise<Project> {
    const response = await api.post<ApiResponse<Project>>('/projects', data);
    return response.data.data;
  },

  async update(id: string, data: UpdateProjectDTO): Promise<Project> {
    const response = await api.patch<ApiResponse<Project>>(`/projects/${id}`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/projects/${id}`);
  },

  async archive(id: string): Promise<Project> {
    const response = await api.post<ApiResponse<Project>>(`/projects/${id}/archive`);
    return response.data.data;
  },

  async restore(id: string): Promise<Project> {
    const response = await api.post<ApiResponse<Project>>(`/projects/${id}/restore`);
    return response.data.data;
  },
};
