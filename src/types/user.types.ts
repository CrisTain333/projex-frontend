export interface User {
  id: string;
  email: string;
  name: string;
  avatar: string | null;
  status: 'active' | 'suspended';
  createdAt: string;
}

export interface UserProfile extends User {
  emailVerified: boolean;
  oauth: {
    google: { email: string } | null;
    github: { username: string } | null;
  };
  lastLoginAt: string | null;
}

export interface UpdateUserDTO {
  name?: string;
  avatar?: string;
}
