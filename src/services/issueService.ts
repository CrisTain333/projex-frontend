import { api } from './api';
import {
  Issue,
  CreateIssueDTO,
  UpdateIssueDTO,
  MoveIssueDTO,
  ApiResponse,
  PaginatedResponse,
  PaginationParams,
} from '@/types';

interface IssueFilters extends PaginationParams {
  status?: string;
  priority?: string;
  type?: string;
  assigneeId?: string;
  epicId?: string;
  labelIds?: string[];
  q?: string;
}

export const issueService = {
  async getByProject(projectId: string, filters?: IssueFilters): Promise<Issue[]> {
    const response = await api.get<PaginatedResponse<Issue>>(`/projects/${projectId}/issues`, {
      params: filters,
    });
    return response.data.data;
  },

  async getById(id: string): Promise<Issue> {
    const response = await api.get<ApiResponse<Issue>>(`/issues/${id}`);
    return response.data.data;
  },

  async getByKey(issueKey: string): Promise<Issue> {
    const response = await api.get<ApiResponse<Issue>>(`/issues/key/${issueKey}`);
    return response.data.data;
  },

  async getMyIssues(filters?: IssueFilters): Promise<Issue[]> {
    const response = await api.get<PaginatedResponse<Issue>>('/issues/my', {
      params: filters,
    });
    return response.data.data;
  },

  async getSubtasks(parentId: string): Promise<Issue[]> {
    const response = await api.get<PaginatedResponse<Issue>>(`/issues/${parentId}/subtasks`);
    return response.data.data;
  },

  async create(data: CreateIssueDTO): Promise<Issue> {
    const response = await api.post<ApiResponse<Issue>>('/issues', data);
    return response.data.data;
  },

  async update(id: string, data: UpdateIssueDTO): Promise<Issue> {
    const response = await api.patch<ApiResponse<Issue>>(`/issues/${id}`, data);
    return response.data.data;
  },

  async updateStatus(id: string, status: string): Promise<Issue> {
    const response = await api.patch<ApiResponse<Issue>>(`/issues/${id}/status`, { status });
    return response.data.data;
  },

  async move(id: string, data: MoveIssueDTO): Promise<Issue> {
    const response = await api.patch<ApiResponse<Issue>>(`/issues/${id}/move`, data);
    return response.data.data;
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/issues/${id}`);
  },

  async watch(id: string): Promise<void> {
    await api.post(`/issues/${id}/watch`);
  },

  async unwatch(id: string): Promise<void> {
    await api.delete(`/issues/${id}/watch`);
  },

  async archive(id: string): Promise<Issue> {
    const response = await api.post<ApiResponse<Issue>>(`/issues/${id}/archive`);
    return response.data.data;
  },

  async restore(id: string): Promise<Issue> {
    const response = await api.post<ApiResponse<Issue>>(`/issues/${id}/restore`);
    return response.data.data;
  },
};
