import { backendAPI } from '@/features/auth/api/backendAPI';
import { useMutation } from '@tanstack/react-query';

export const useChagePasswordMutation = () => {
  return useMutation({
    mutationFn: async (body: { currentPassword: string; newPassword: string }) => {
      const res = await backendAPI.patch('/user/me/password', body);
      return res.data;
    },
  });
};
