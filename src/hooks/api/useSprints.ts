import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sprintService } from '@/services';
import {
  CreateSprintDTO,
  UpdateSprintDTO,
  StartSprintDTO,
} from '@/types';
import { toast } from 'sonner';

const SPRINT_KEYS = {
  all: ['sprints'] as const,
  project: (projectId: string) => ['sprints', 'project', projectId] as const,
  detail: (sprintId: string) => ['sprints', 'detail', sprintId] as const,
  active: (projectId: string) => ['sprints', 'active', projectId] as const,
};

// Get all sprints for a project
export function useProjectSprints(projectId: string) {
  return useQuery({
    queryKey: SPRINT_KEYS.project(projectId),
    queryFn: () => sprintService.getByProject(projectId),
    enabled: !!projectId,
  });
}

// Get sprint by ID
export function useSprint(sprintId: string) {
  return useQuery({
    queryKey: SPRINT_KEYS.detail(sprintId),
    queryFn: () => sprintService.getById(sprintId),
    enabled: !!sprintId,
  });
}

// Get active sprint
export function useActiveSprint(projectId: string) {
  return useQuery({
    queryKey: SPRINT_KEYS.active(projectId),
    queryFn: () => sprintService.getActive(projectId),
    enabled: !!projectId,
  });
}

// Create sprint mutation
export function useCreateSprint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateSprintDTO) => sprintService.create(data),
    onSuccess: (sprint) => {
      queryClient.invalidateQueries({ queryKey: SPRINT_KEYS.project(sprint.projectId) });
      toast.success('Sprint created successfully!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to create sprint.');
    },
  });
}

// Update sprint mutation
export function useUpdateSprint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sprintId, data }: { sprintId: string; data: UpdateSprintDTO }) =>
      sprintService.update(sprintId, data),
    onSuccess: (sprint) => {
      queryClient.invalidateQueries({ queryKey: SPRINT_KEYS.detail(sprint.id) });
      queryClient.invalidateQueries({ queryKey: SPRINT_KEYS.project(sprint.projectId) });
      toast.success('Sprint updated successfully!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to update sprint.');
    },
  });
}

// Start sprint mutation
export function useStartSprint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sprintId, data }: { sprintId: string; data: StartSprintDTO }) =>
      sprintService.start(sprintId, data),
    onSuccess: (sprint) => {
      queryClient.invalidateQueries({ queryKey: SPRINT_KEYS.project(sprint.projectId) });
      queryClient.invalidateQueries({ queryKey: SPRINT_KEYS.active(sprint.projectId) });
      toast.success('Sprint started!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to start sprint.');
    },
  });
}

// Complete sprint mutation
export function useCompleteSprint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sprintId: string) => sprintService.complete(sprintId),
    onSuccess: (sprint) => {
      queryClient.invalidateQueries({ queryKey: SPRINT_KEYS.project(sprint.projectId) });
      queryClient.invalidateQueries({ queryKey: SPRINT_KEYS.active(sprint.projectId) });
      toast.success('Sprint completed!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to complete sprint.');
    },
  });
}

// Delete sprint mutation
export function useDeleteSprint(projectId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (sprintId: string) => sprintService.delete(sprintId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: SPRINT_KEYS.project(projectId) });
      toast.success('Sprint deleted!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to delete sprint.');
    },
  });
}

// Add issues to sprint
export function useAddIssuesToSprint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sprintId, issueIds }: { sprintId: string; issueIds: string[] }) =>
      sprintService.addIssues(sprintId, issueIds),
    onSuccess: (_, { sprintId }) => {
      queryClient.invalidateQueries({ queryKey: SPRINT_KEYS.detail(sprintId) });
      toast.success('Issues added to sprint!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to add issues.');
    },
  });
}

// Remove issue from sprint
export function useRemoveIssueFromSprint() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ sprintId, issueId }: { sprintId: string; issueId: string }) =>
      sprintService.removeIssue(sprintId, issueId),
    onSuccess: (_, { sprintId }) => {
      queryClient.invalidateQueries({ queryKey: SPRINT_KEYS.detail(sprintId) });
      toast.success('Issue removed from sprint!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to remove issue.');
    },
  });
}
