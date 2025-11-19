import { backendAPI } from '@/api';
import { useAuthStore } from '@/features/auth';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

// 비밀번호 변경 요청을 위한 타입 정의
interface ChangePasswordPayload {
  password: string;
}

interface ChangePasswordResponse {
  // 서버에서의 응답 데이터 구조를 맞춰야 합니다.
  message: string;
}

export const useChangePasswordMutation = () => {
  const { logout, access } = useAuthStore(); // accessToken이 access로 변경된 상태
  const navigate = useNavigate();

  return useMutation<ChangePasswordResponse, Error, ChangePasswordPayload>({
    mutationFn: async ({ password }) => {
      if (!access) throw new Error('No access token');
      const res = await backendAPI.patch<ChangePasswordResponse>('/users/me', { password });
      return res.data;
    },
    onSuccess: () => {
      logout(navigate);
    },
  });
};
