import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { notificationService } from '@/services';
import { QUERY_KEYS } from '@/config/queryKeys';
import { toast } from 'sonner';

// Get notifications
export function useNotifications() {
  return useQuery({
    queryKey: QUERY_KEYS.NOTIFICATIONS,
    queryFn: () => notificationService.getAll(),
  });
}

// Get unread count
export function useUnreadNotificationCount() {
  return useQuery({
    queryKey: QUERY_KEYS.UNREAD_NOTIFICATION_COUNT,
    queryFn: () => notificationService.getUnreadCount(),
  });
}

// Mark notification as read
export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => notificationService.markAsRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.UNREAD_NOTIFICATION_COUNT });
    },
  });
}

// Mark all notifications as read
export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.UNREAD_NOTIFICATION_COUNT });
      toast.success('All notifications marked as read');
    },
  });
}

// Get notification preferences
export function useNotificationPreferences() {
  return useQuery({
    queryKey: QUERY_KEYS.NOTIFICATION_PREFERENCES,
    queryFn: () => notificationService.getPreferences(),
  });
}

// Update notification preferences
export function useUpdateNotificationPreferences() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.updatePreferences,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATION_PREFERENCES });
      toast.success('Notification preferences updated');
    },
    onError: () => {
      toast.error('Failed to update preferences');
    },
  });
}
