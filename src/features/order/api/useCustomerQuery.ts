import { backendAPI } from '@/api';
import { useAuthStore } from '@/features/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

export interface CustomerOrderInfo {
  id?: string;
  email: string;
  username: string;
  nickname: string;
  phone_number: string;
  provider?: string;
}

const fetchCustomer = async (): Promise<CustomerOrderInfo> => {
  const { data } = await backendAPI.get<CustomerOrderInfo>('/users/me');
  return data;
};

export const useCustomerQuery = () => {
  return useQuery<CustomerOrderInfo>({
    queryKey: ['customer'],
    queryFn: () => fetchCustomer(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useCustomerMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  // 회원 정보 수정
  const updateCustomer = useMutation({
    mutationFn: async (updatedData: Partial<CustomerOrderInfo>) => {
      const res = await backendAPI.patch('/users/me', updatedData);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['customer'] });
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
  const deleteCustomer = useMutation({
    mutationFn: async () => {
      await backendAPI.delete('/users/me');
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['customer'] });
      alert('회원 탈퇴가 완료되었습니다. 그동안 OBE-STORE를 이용해 주셔서 감사합니다.');
      logout();
      navigate('/');
    },
    onError: (error) => {
      console.error('회원 탈퇴 실패:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    },
  });
  return { updateCustomer, changePassword, deleteCustomer };
};
