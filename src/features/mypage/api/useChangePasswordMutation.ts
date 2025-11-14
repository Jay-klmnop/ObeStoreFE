import { backendAPI } from '@/api';
import { useMutation } from '@tanstack/react-query';

export const useChangePasswordMutation = () => {
  return useMutation({
    mutationFn: async (body: { currentPassword: string; newPassword: string }) => {
      const res = await backendAPI.patch('/user/me/password', body);
      return res.data;
    },
  });
};
