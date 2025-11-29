import { useQuery } from '@tanstack/react-query';
import { activityService } from '@/services';
import { QUERY_KEYS } from '@/config/queryKeys';

// Get activities for an issue
export function useIssueActivities(issueId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.ISSUE_ACTIVITIES(issueId),
    queryFn: () => activityService.getByIssue(issueId),
    enabled: !!issueId,
  });
}

// Get activities for a project
export function useProjectActivities(projectId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECT_ACTIVITIES(projectId),
    queryFn: () => activityService.getByProject(projectId),
    enabled: !!projectId,
  });
}

// Get recent activities across all projects
export function useRecentActivities(limit = 10) {
  return useQuery({
    queryKey: ['activities', 'recent', limit],
    queryFn: () => activityService.getRecent(limit),
  });
}
