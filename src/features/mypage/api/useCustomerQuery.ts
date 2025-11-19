import { backendAPI } from '@/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export interface CustomerOrderInfo {
  id?: string;
  email: string;
  username: string;
  nickname: string;
  phone_number: string;
  provider?: string;
}

// 사용자 정보 가져오기 함수
const fetchCustomer = async (): Promise<CustomerOrderInfo> => {
  const { data } = await backendAPI.get<CustomerOrderInfo>('/users/me');
  console.log('fetchCustomer [GET] /users/me/응답:', data);
  return data;
};

// 회원 탈퇴 함수
const deleteCustomer = async (): Promise<string> => {
  const { data } = await backendAPI.delete('/users/me');
  console.log('회원 탈퇴 응답:', data);
  return data; // 응답으로 "string"을 받는다고 가정
};

// useCustomerQuery 훅 정의
export const useCustomerQuery = () => {
  return useQuery<CustomerOrderInfo>({
    queryKey: ['customer'],
    queryFn: () => fetchCustomer(),
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시된 데이터 유효
  });
};

// useCustomerMutation 훅 정의
export const useCustomerMutation = () => {
  const queryClient = useQueryClient();

  const deleteCustomerMutation = useMutation({
    mutationFn: deleteCustomer, // `DELETE` 요청을 보내는 함수
    onSuccess: (response) => {
      // 탈퇴가 성공적으로 처리되었을 때
      console.log('탈퇴 성공:', response);
      alert('회원 탈퇴가 완료되었습니다.');

      // 올바른 방법으로 캐시된 사용자 정보를 무효화하여 최신 정보를 가져옵니다.
      queryClient.invalidateQueries({ queryKey: ['customer'] });
    },
    onError: (error) => {
      console.error('회원 탈퇴 실패:', error);
      alert('회원 탈퇴 중 오류가 발생했습니다.');
    },
  });

  return { deleteCustomerMutation };
};
