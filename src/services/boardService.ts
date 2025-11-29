import { api } from './api';
import { Board, UpdateBoardDTO, ApiResponse } from '@/types';

export const boardService = {
  async getByProject(projectId: string): Promise<Board> {
    const response = await api.get<ApiResponse<Board>>(`/projects/${projectId}/board`);
    return response.data.data;
  },

  async update(projectId: string, data: UpdateBoardDTO): Promise<Board> {
    const response = await api.patch<ApiResponse<Board>>(`/projects/${projectId}/board`, data);
    return response.data.data;
  },

  async reorderColumns(projectId: string, columnIds: string[]): Promise<Board> {
    const response = await api.patch<ApiResponse<Board>>(`/projects/${projectId}/board/reorder`, {
      columnIds,
    });
    return response.data.data;
  },
};
