import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { issueService } from '@/services';
import { useBoardStore } from '@/stores';
import { QUERY_KEYS } from '@/config/queryKeys';
import { CreateIssueDTO, UpdateIssueDTO, Issue, IssueStatus } from '@/types';
import { toast } from 'sonner';

// Get issues for a project
export function useProjectIssues(projectId: string) {
  const { setIssues } = useBoardStore();

  return useQuery({
    queryKey: QUERY_KEYS.PROJECT_ISSUES(projectId),
    queryFn: async () => {
      const issues = await issueService.getByProject(projectId);
      setIssues(issues);
      return issues;
    },
    enabled: !!projectId,
  });
}

// Get single issue
export function useIssue(issueId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.ISSUE(issueId),
    queryFn: () => issueService.getById(issueId),
    enabled: !!issueId,
  });
}

// Get issue by key
export function useIssueByKey(issueKey: string) {
  return useQuery({
    queryKey: QUERY_KEYS.ISSUE_BY_KEY(issueKey),
    queryFn: () => issueService.getByKey(issueKey),
    enabled: !!issueKey,
  });
}

// Get my issues
export function useMyIssues() {
  return useQuery({
    queryKey: QUERY_KEYS.MY_ISSUES,
    queryFn: () => issueService.getMyIssues(),
  });
}

// Create issue mutation
export function useCreateIssue() {
  const queryClient = useQueryClient();
  const { addIssue } = useBoardStore();

  return useMutation({
    mutationFn: (data: CreateIssueDTO) => issueService.create(data),
    onSuccess: (issue) => {
      addIssue(issue);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECT_ISSUES(issue.projectId),
      });
      toast.success(`${issue.key} created successfully!`);
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to create issue.');
    },
  });
}

// Update issue mutation
export function useUpdateIssue() {
  const queryClient = useQueryClient();
  const { updateIssue: updateBoardIssue } = useBoardStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateIssueDTO }) =>
      issueService.update(id, data),
    onSuccess: (issue) => {
      updateBoardIssue(issue.id, issue);
      queryClient.setQueryData(QUERY_KEYS.ISSUE(issue.id), issue);
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.PROJECT_ISSUES(issue.projectId),
      });
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to update issue.');
    },
  });
}

// Update issue status (optimistic)
export function useUpdateIssueStatus() {
  const queryClient = useQueryClient();
  const { updateIssue: updateBoardIssue } = useBoardStore();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: IssueStatus }) =>
      issueService.updateStatus(id, status),
    onMutate: async ({ id, status }) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: QUERY_KEYS.ISSUE(id) });

      // Snapshot the previous value
      const previousIssue = queryClient.getQueryData<Issue>(QUERY_KEYS.ISSUE(id));

      // Optimistically update
      if (previousIssue) {
        const updatedIssue = { ...previousIssue, status };
        queryClient.setQueryData(QUERY_KEYS.ISSUE(id), updatedIssue);
        updateBoardIssue(id, { status });
      }

      return { previousIssue };
    },
    onError: (err, { id }, context) => {
      // Rollback on error
      if (context?.previousIssue) {
        queryClient.setQueryData(QUERY_KEYS.ISSUE(id), context.previousIssue);
        updateBoardIssue(id, { status: context.previousIssue.status });
      }
      toast.error('Failed to update status.');
    },
    onSettled: (issue) => {
      if (issue) {
        queryClient.invalidateQueries({
          queryKey: QUERY_KEYS.PROJECT_ISSUES(issue.projectId),
        });
      }
    },
  });
}

// Delete issue mutation
export function useDeleteIssue() {
  const queryClient = useQueryClient();
  const { removeIssue } = useBoardStore();

  return useMutation({
    mutationFn: (id: string) => issueService.delete(id),
    onSuccess: (_, id) => {
      removeIssue(id);
      queryClient.removeQueries({ queryKey: QUERY_KEYS.ISSUE(id) });
      queryClient.invalidateQueries({ queryKey: ['issues'] });
      toast.success('Issue deleted successfully!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to delete issue.');
    },
  });
}

// Watch/unwatch issue
export function useWatchIssue() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, watch }: { id: string; watch: boolean }) =>
      watch ? issueService.watch(id) : issueService.unwatch(id),
    onSuccess: (_, { id, watch }) => {
      queryClient.setQueryData<Issue>(QUERY_KEYS.ISSUE(id), (old) =>
        old ? { ...old, isWatching: watch } : old
      );
      toast.success(watch ? 'Now watching this issue' : 'Stopped watching this issue');
    },
  });
}
