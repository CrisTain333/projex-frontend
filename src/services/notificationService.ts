import { api } from './api';
import {
  Notification,
  NotificationPreferences,
  UpdateNotificationPreferencesDTO,
  ApiResponse,
  PaginatedResponse,
} from '@/types';

export const notificationService = {
  async getAll(page = 1, limit = 20): Promise<{ data: Notification[]; hasMore: boolean }> {
    const response = await api.get<PaginatedResponse<Notification>>('/notifications', {
      params: { page, limit },
    });
    return {
      data: response.data.data,
      hasMore: response.data.pagination.hasNext,
    };
  },

  async getUnreadCount(): Promise<number> {
    const response = await api.get<ApiResponse<{ count: number }>>('/notifications/unread-count');
    return response.data.data.count;
  },

  async markAsRead(id: string): Promise<void> {
    await api.patch(`/notifications/${id}/read`);
  },

  async markAllAsRead(): Promise<void> {
    await api.post('/notifications/mark-all-read');
  },

  async delete(id: string): Promise<void> {
    await api.delete(`/notifications/${id}`);
  },

  // Preferences
  async getPreferences(): Promise<NotificationPreferences> {
    const response = await api.get<ApiResponse<NotificationPreferences>>(
      '/notifications/preferences'
    );
    return response.data.data;
  },

  async updatePreferences(
    data: UpdateNotificationPreferencesDTO
  ): Promise<NotificationPreferences> {
    const response = await api.patch<ApiResponse<NotificationPreferences>>(
      '/notifications/preferences',
      data
    );
    return response.data.data;
  },
};
