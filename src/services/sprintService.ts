import { api } from './api';
import {
  Sprint,
  SprintWithIssues,
  CreateSprintDTO,
  UpdateSprintDTO,
  StartSprintDTO,
} from '@/types';

export const sprintService = {
  // Get all sprints for a project
  async getByProject(projectId: string): Promise<Sprint[]> {
    const response = await api.get<{ data: Sprint[] }>(`/projects/${projectId}/sprints`);
    return response.data.data;
  },

  // Get sprint by ID with issues
  async getById(sprintId: string): Promise<SprintWithIssues> {
    const response = await api.get<{ data: SprintWithIssues }>(`/sprints/${sprintId}`);
    return response.data.data;
  },

  // Get active sprint for a project
  async getActive(projectId: string): Promise<Sprint | null> {
    const response = await api.get<{ data: Sprint | null }>(
      `/projects/${projectId}/sprints/active`
    );
    return response.data.data;
  },

  // Create a new sprint
  async create(data: CreateSprintDTO): Promise<Sprint> {
    const response = await api.post<{ data: Sprint }>('/sprints', data);
    return response.data.data;
  },

  // Update sprint
  async update(sprintId: string, data: UpdateSprintDTO): Promise<Sprint> {
    const response = await api.patch<{ data: Sprint }>(`/sprints/${sprintId}`, data);
    return response.data.data;
  },

  // Start sprint
  async start(sprintId: string, data: StartSprintDTO): Promise<Sprint> {
    const response = await api.post<{ data: Sprint }>(`/sprints/${sprintId}/start`, data);
    return response.data.data;
  },

  // Complete sprint
  async complete(sprintId: string): Promise<Sprint> {
    const response = await api.post<{ data: Sprint }>(`/sprints/${sprintId}/complete`);
    return response.data.data;
  },

  // Delete sprint
  async delete(sprintId: string): Promise<void> {
    await api.delete(`/sprints/${sprintId}`);
  },

  // Add issues to sprint
  async addIssues(sprintId: string, issueIds: string[]): Promise<void> {
    await api.post(`/sprints/${sprintId}/issues`, { issueIds });
  },

  // Remove issue from sprint
  async removeIssue(sprintId: string, issueId: string): Promise<void> {
    await api.delete(`/sprints/${sprintId}/issues/${issueId}`);
  },
};
