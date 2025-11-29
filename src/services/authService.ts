import { api } from './api';
import {
  LoginDTO,
  SignupDTO,
  AuthResponse,
  ForgotPasswordDTO,
  ResetPasswordDTO,
  VerifyEmailDTO,
  ChangePasswordDTO,
} from '@/types';
import { ApiResponse, User } from '@/types';

export const authService = {
  async login(data: LoginDTO): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data.data;
  },

  async signup(data: SignupDTO): Promise<AuthResponse> {
    const response = await api.post<ApiResponse<AuthResponse>>('/auth/signup', data);
    return response.data.data;
  },

  async logout(): Promise<void> {
    await api.post('/auth/logout');
  },

  async getMe(): Promise<User> {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  async forgotPassword(data: ForgotPasswordDTO): Promise<void> {
    await api.post('/auth/forgot-password', data);
  },

  async resetPassword(data: ResetPasswordDTO): Promise<void> {
    await api.post('/auth/reset-password', data);
  },

  async verifyEmail(data: VerifyEmailDTO): Promise<void> {
    await api.post('/auth/verify-email', data);
  },

  async changePassword(data: ChangePasswordDTO): Promise<void> {
    await api.post('/auth/change-password', data);
  },

  async refreshToken(): Promise<{ token: string }> {
    const response = await api.post<ApiResponse<{ token: string }>>('/auth/refresh');
    return response.data.data;
  },

  // OAuth methods
  getGoogleAuthUrl(): string {
    return `${api.defaults.baseURL}/auth/google`;
  },

  getGitHubAuthUrl(): string {
    return `${api.defaults.baseURL}/auth/github`;
  },
};
