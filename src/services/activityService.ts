import { api } from './api';
import { Activity, PaginatedResponse } from '@/types';

export const activityService = {
  async getByIssue(issueId: string, page = 1, limit = 20): Promise<Activity[]> {
    const response = await api.get<PaginatedResponse<Activity>>(`/issues/${issueId}/activities`, {
      params: { page, limit },
    });
    return response.data.data;
  },

  async getByProject(projectId: string, page = 1, limit = 20): Promise<Activity[]> {
    const response = await api.get<PaginatedResponse<Activity>>(
      `/projects/${projectId}/activities`,
      {
        params: { page, limit },
      }
    );
    return response.data.data;
  },

  async getRecent(limit = 10): Promise<Activity[]> {
    const response = await api.get<PaginatedResponse<Activity>>('/activities/recent', {
      params: { limit },
    });
    return response.data.data;
  },
};
