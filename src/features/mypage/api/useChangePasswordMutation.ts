// 예: src/features/mypage/api/useChangePasswordMutation.ts
import { backendAPI } from '@/api';
import { useAuthStore } from '@/features/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export const useChangePasswordMutation = () => {
  const { logout, accessToken, openAuthModal } = useAuthStore();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async ({ password }: { password: string }) => {
      if (!accessToken) throw new Error('No access token');
      const res = await backendAPI.patch('/users/me', { password });
      return res.data;
    },
    onSuccess: () => {
      logout();
      navigate('/');
      openAuthModal('login');
    },
  });
};
