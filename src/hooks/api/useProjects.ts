import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '@/services';
import { useProjectStore } from '@/stores';
import { QUERY_KEYS } from '@/config/queryKeys';
import { CreateProjectDTO, UpdateProjectDTO } from '@/types';
import { toast } from 'sonner';

// Get all projects
export function useProjects() {
  const { setProjects } = useProjectStore();

  return useQuery({
    queryKey: QUERY_KEYS.PROJECTS,
    queryFn: async () => {
      const projects = await projectService.getAll();
      setProjects(projects);
      return projects;
    },
    staleTime: 5 * 60 * 1000,
  });
}

// Get projects by space
export function useSpaceProjects(spaceId: string) {
  return useQuery({
    queryKey: QUERY_KEYS.SPACE_PROJECTS(spaceId),
    queryFn: () => projectService.getBySpace(spaceId),
    enabled: !!spaceId,
  });
}

// Get project by ID
export function useProject(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.PROJECT(id),
    queryFn: () => projectService.getById(id),
    enabled: !!id,
  });
}

// Get project by key
export function useProjectByKey(spaceSlug: string, projectKey: string) {
  const { setCurrentProject } = useProjectStore();

  return useQuery({
    queryKey: QUERY_KEYS.PROJECT_BY_KEY(spaceSlug, projectKey),
    queryFn: async () => {
      const project = await projectService.getByKey(spaceSlug, projectKey);
      setCurrentProject(project);
      return project;
    },
    enabled: !!spaceSlug && !!projectKey,
  });
}

// Create project mutation
export function useCreateProject() {
  const queryClient = useQueryClient();
  const { addProject } = useProjectStore();

  return useMutation({
    mutationFn: (data: CreateProjectDTO) => projectService.create(data),
    onSuccess: (project) => {
      addProject(project);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SPACE_PROJECTS(project.spaceId) });
      toast.success('Project created successfully!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to create project.');
    },
  });
}

// Update project mutation
export function useUpdateProject() {
  const queryClient = useQueryClient();
  const { updateProject } = useProjectStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateProjectDTO }) =>
      projectService.update(id, data),
    onSuccess: (project) => {
      updateProject(project.id, project);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECT(project.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS });
      toast.success('Project updated successfully!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to update project.');
    },
  });
}

// Delete project mutation
export function useDeleteProject() {
  const queryClient = useQueryClient();
  const { removeProject } = useProjectStore();

  return useMutation({
    mutationFn: (id: string) => projectService.delete(id),
    onSuccess: (_, id) => {
      removeProject(id);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS });
      toast.success('Project deleted successfully!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to delete project.');
    },
  });
}

// Archive project mutation
export function useArchiveProject() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => projectService.archive(id),
    onSuccess: (project) => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECT(project.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PROJECTS });
      toast.success('Project archived successfully!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to archive project.');
    },
  });
}
