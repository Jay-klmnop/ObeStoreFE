import { useAuthStore } from '@/features/auth';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export interface CustomerOrderInfo {
  id: string;
  orderId: string;
  orderName: string;
  customerEmail: string;
  customerName: string;
  customerNickrname: string;
  customerMobilePhone: string;
  customerAddress: string;
}

const API_URL = 'http://localhost:4001/customers';

const fetchCustomer = async (): Promise<CustomerOrderInfo> => {
  const { data } = await axios.get<CustomerOrderInfo[]>(API_URL);
  const customer = data[0];
  return {
    id: customer.id,
    orderId: customer.orderId,
    orderName: customer.orderName,
    customerEmail: customer.customerEmail,
    customerName: customer.customerName,
    customerNickrname: customer.customerNickrname,
    customerMobilePhone: customer.customerMobilePhone,
    customerAddress: customer.customerAddress,
  };
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
    mutationFn: async (updatedData: Partial<CustomerOrderInfo> & { id: string }) => {
      const res = await axios.patch(`${API_URL}/${updatedData.id}`, updatedData);
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

  // 회원 탈퇴
  const deleteCustomer = useMutation({
    mutationFn: async (id: string) => {
      await axios.delete(`${API_URL}/${id}`);
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

  return { updateCustomer, deleteCustomer };
};
