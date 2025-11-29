import { IssueStatus } from './issue.types';

export interface BoardColumn {
  id: string;
  name: string;
  status: IssueStatus;
  position: number;
  wipLimit: number | null;
  color: string | null;
  issueCount: number;
}

export interface Board {
  id: string;
  projectId: string;
  columns: BoardColumn[];
  defaultColumnId: string;
}

export interface UpdateBoardDTO {
  columns?: Omit<BoardColumn, 'issueCount'>[];
  defaultColumnId?: string;
}
