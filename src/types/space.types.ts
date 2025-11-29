export interface Space {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logo: string | null;
  color: string | null;
  icon: string | null;
  ownerId: string;
  role: 'admin' | 'member';
  projectCount: number;
  memberCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSpaceDTO {
  name: string;
  slug?: string;
  description?: string;
}

export interface UpdateSpaceDTO {
  name?: string;
  slug?: string;
  description?: string;
  logo?: string;
}
