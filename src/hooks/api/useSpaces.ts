import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { spaceService } from '@/services';
import { useSpaceStore } from '@/stores';
import { QUERY_KEYS } from '@/config/queryKeys';
import { CreateSpaceDTO, UpdateSpaceDTO } from '@/types';
import { toast } from 'sonner';

// Get all spaces for current user
export function useSpaces() {
  const { setSpaces } = useSpaceStore();

  return useQuery({
    queryKey: QUERY_KEYS.SPACES,
    queryFn: async () => {
      const spaces = await spaceService.getAll();
      setSpaces(spaces);
      return spaces;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Get space by ID
export function useSpace(id: string) {
  return useQuery({
    queryKey: QUERY_KEYS.SPACE(id),
    queryFn: () => spaceService.getById(id),
    enabled: !!id,
  });
}

// Get space by slug
export function useSpaceBySlug(slug: string) {
  const { setCurrentSpace } = useSpaceStore();

  return useQuery({
    queryKey: ['spaces', 'slug', slug],
    queryFn: async () => {
      const space = await spaceService.getBySlug(slug);
      setCurrentSpace(space);
      return space;
    },
    enabled: !!slug,
  });
}

// Create space mutation
export function useCreateSpace() {
  const queryClient = useQueryClient();
  const { addSpace } = useSpaceStore();

  return useMutation({
    mutationFn: (data: CreateSpaceDTO) => spaceService.create(data),
    onSuccess: (space) => {
      addSpace(space);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SPACES });
      toast.success('Space created successfully!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to create space.');
    },
  });
}

// Update space mutation
export function useUpdateSpace() {
  const queryClient = useQueryClient();
  const { updateSpace } = useSpaceStore();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateSpaceDTO }) =>
      spaceService.update(id, data),
    onSuccess: (space) => {
      updateSpace(space.id, space);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SPACE(space.id) });
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SPACES });
      toast.success('Space updated successfully!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to update space.');
    },
  });
}

// Delete space mutation
export function useDeleteSpace() {
  const queryClient = useQueryClient();
  const { removeSpace } = useSpaceStore();

  return useMutation({
    mutationFn: (id: string) => spaceService.delete(id),
    onSuccess: (_, id) => {
      removeSpace(id);
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.SPACES });
      toast.success('Space deleted successfully!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to delete space.');
    },
  });
}
