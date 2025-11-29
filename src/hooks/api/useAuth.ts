import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { authService } from '@/services';
import { useAuthStore } from '@/stores';
import { QUERY_KEYS } from '@/config/queryKeys';
import { ROUTES } from '@/config/routes';
import { LoginDTO, SignupDTO, ForgotPasswordDTO, ResetPasswordDTO, ChangePasswordDTO } from '@/types';
import { toast } from 'sonner';

// Get current user
export function useCurrentUser() {
  const { setUser, setLoading, logout } = useAuthStore();

  return useQuery({
    queryKey: QUERY_KEYS.USER,
    queryFn: async () => {
      const user = await authService.getMe();
      setUser(user);
      return user;
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Login mutation
export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: LoginDTO) => authService.login(data),
    onSuccess: (response) => {
      setAuth(response.user, response.token);
      queryClient.setQueryData(QUERY_KEYS.USER, response.user);
      toast.success('Welcome back!');
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Login failed. Please try again.');
    },
  });
}

// Signup mutation
export function useSignup() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  return useMutation({
    mutationFn: (data: SignupDTO) => authService.signup(data),
    onSuccess: (response) => {
      setAuth(response.user, response.token);
      queryClient.setQueryData(QUERY_KEYS.USER, response.user);
      toast.success('Account created successfully!');
      navigate(ROUTES.DASHBOARD);
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Signup failed. Please try again.');
    },
  });
}

// Logout mutation
export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      logout();
      queryClient.clear();
      navigate(ROUTES.LOGIN);
    },
    onError: () => {
      // Even if logout fails on server, clear local state
      logout();
      queryClient.clear();
      navigate(ROUTES.LOGIN);
    },
  });
}

// Forgot password mutation
export function useForgotPassword() {
  return useMutation({
    mutationFn: (data: ForgotPasswordDTO) => authService.forgotPassword(data),
    onSuccess: () => {
      toast.success('Password reset email sent! Check your inbox.');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to send reset email.');
    },
  });
}

// Reset password mutation
export function useResetPassword() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: ResetPasswordDTO) => authService.resetPassword(data),
    onSuccess: () => {
      toast.success('Password reset successfully!');
      navigate(ROUTES.LOGIN);
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to reset password.');
    },
  });
}

// Change password mutation
export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordDTO) => authService.changePassword(data),
    onSuccess: () => {
      toast.success('Password changed successfully!');
    },
    onError: (error: { error?: { message?: string } }) => {
      toast.error(error.error?.message || 'Failed to change password.');
    },
  });
}
