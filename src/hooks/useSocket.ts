import { useEffect, useCallback } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { socketService, SOCKET_EVENTS } from '@/services/socket';
import { useAuthStore } from '@/stores';
import { QUERY_KEYS } from '@/config/queryKeys';
import { Issue } from '@/types';
import { toast } from 'sonner';

// Hook to manage socket connection based on auth state
export function useSocketConnection() {
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    if (isAuthenticated) {
      socketService.connect();
    } else {
      socketService.disconnect();
    }

    return () => {
      socketService.disconnect();
    };
  }, [isAuthenticated]);
}

// Hook to subscribe to project events
export function useProjectSocket(projectId: string | undefined) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!projectId) return;

    // Join the project room
    socketService.joinProject(projectId);

    // Subscribe to issue events
    const unsubscribeCreated = socketService.on(
      SOCKET_EVENTS.ISSUE_CREATED,
      (data) => {
        const typedData = data as { issue: Issue };
        if (typedData.issue?.projectId === projectId) {
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECT_ISSUES(projectId) });
          toast.info(`New issue created: ${typedData.issue.key}`);
        }
      }
    );

    const unsubscribeUpdated = socketService.on(
      SOCKET_EVENTS.ISSUE_UPDATED,
      (data) => {
        const typedData = data as { issue: Issue };
        if (typedData.issue?.projectId === projectId) {
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECT_ISSUES(projectId) });
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ISSUE(typedData.issue.id) });
        }
      }
    );

    const unsubscribeMoved = socketService.on(
      SOCKET_EVENTS.ISSUE_MOVED,
      (data) => {
        const typedData = data as { issue: Issue; fromStatus: string; toStatus: string };
        if (typedData.issue?.projectId === projectId) {
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECT_ISSUES(projectId) });
        }
      }
    );

    const unsubscribeDeleted = socketService.on(
      SOCKET_EVENTS.ISSUE_DELETED,
      (data) => {
        const typedData = data as { issueId: string; projectId: string };
        if (typedData.projectId === projectId) {
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECT_ISSUES(projectId) });
        }
      }
    );

    return () => {
      socketService.leaveProject(projectId);
      unsubscribeCreated();
      unsubscribeUpdated();
      unsubscribeMoved();
      unsubscribeDeleted();
    };
  }, [projectId, queryClient]);
}

// Hook to subscribe to issue-specific events (comments, etc.)
export function useIssueSocket(issueId: string | undefined) {
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!issueId) return;

    // Join the issue room
    socketService.joinIssue(issueId);

    // Subscribe to comment events
    const unsubscribeCommentCreated = socketService.on(
      SOCKET_EVENTS.COMMENT_CREATED,
      (data) => {
        const typedData = data as { issueId: string };
        if (typedData.issueId === issueId) {
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ISSUE_COMMENTS(issueId) });
        }
      }
    );

    const unsubscribeCommentUpdated = socketService.on(
      SOCKET_EVENTS.COMMENT_UPDATED,
      (data) => {
        const typedData = data as { issueId: string };
        if (typedData.issueId === issueId) {
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ISSUE_COMMENTS(issueId) });
        }
      }
    );

    const unsubscribeCommentDeleted = socketService.on(
      SOCKET_EVENTS.COMMENT_DELETED,
      (data) => {
        const typedData = data as { issueId: string };
        if (typedData.issueId === issueId) {
          queryClient.invalidateQueries({ queryKey: QUERY_KEYS.ISSUE_COMMENTS(issueId) });
        }
      }
    );

    return () => {
      socketService.leaveIssue(issueId);
      unsubscribeCommentCreated();
      unsubscribeCommentUpdated();
      unsubscribeCommentDeleted();
    };
  }, [issueId, queryClient]);
}

// Hook to handle new notifications
export function useNotificationSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const unsubscribe = socketService.on(
      SOCKET_EVENTS.NOTIFICATION_NEW,
      (data) => {
        const typedData = data as { notification: { title: string } };
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.NOTIFICATIONS });
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.UNREAD_NOTIFICATION_COUNT });
        if (typedData.notification?.title) {
          toast.info(typedData.notification.title);
        }
      }
    );

    return () => {
      unsubscribe();
    };
  }, [queryClient]);
}

// Hook to emit socket events
export function useSocketEmit() {
  const emit = useCallback((event: string, data?: unknown) => {
    socketService.emit(event, data);
  }, []);

  return { emit };
}
