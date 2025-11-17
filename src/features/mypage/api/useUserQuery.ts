import { backendAPI } from '@/api';
import { useAuthStore } from '@/features/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export interface UserInfo {
  id?: string;
  email: string;
  username: string;
  nickname: string;
  phone_number: string;
  provider?: string;
}

const fetchUser = async (): Promise<UserInfo> => {
  const { data } = await backendAPI.get<UserInfo>('/users/me');
  return data;
};

export const useUserQuery = () => {
  return useQuery<UserInfo>({
    queryKey: ['user'],
    queryFn: () => fetchUser(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useUserMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  // 회원 정보 수정
  const updateUser = useMutation({
    mutationFn: async (updatedData: Partial<UserInfo>) => {
      const res = await backendAPI.patch('/users/me', updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      alert('회원 정보가 수정되었습니다.');
    },
    onError: (error) => {
      console.error('회원 정보 수정 실패:', error);
      alert('회원 수정에 실패했습니다.');
    },
  });

  // 비밀번호 변경 (password only)
  const changePassword = useMutation({
    mutationFn: async (payload: { password: string }) => {
      const res = await backendAPI.patch('/users/me', payload);
      return res.data;
    },
    onSuccess: () => {
      alert('비밀번호가 변경되었습니다. 다시 로그인 해주세요.');
      logout();
      navigate('/login');
    },
    onError: (error) => {
      console.error('비밀번호 변경 실패:', error);
      alert('비밀번호 변경 중 문제가 발생했습니다.');
    },
  });

  // 회원 탈퇴
  const deleteUser = useMutation({
    mutationFn: async () => {
      await backendAPI.delete('/users/me');
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['User'] });
      alert('회원 탈퇴가 완료되었습니다. 그동안 OBE-STORE를 이용해 주셔서 감사합니다.');
      logout();
      navigate('/');
    },
    onError: (error) => {
      console.error('회원 탈퇴 실패:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    },
  });
  return { updateUser, changePassword, deleteUser };
};
