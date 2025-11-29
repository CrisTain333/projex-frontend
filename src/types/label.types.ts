export interface Label {
  id: string;
  projectId: string;
  name: string;
  color: string;
  description: string | null;
}

export interface CreateLabelDTO {
  projectId: string;
  name: string;
  color: string;
  description?: string;
}

export interface UpdateLabelDTO {
  name?: string;
  color?: string;
  description?: string | null;
}
