import { backendAPI } from '@/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export type Address = {
  id?: number;
  address_name: string;
  recipient: string;
  recipient_phone: string;
  post_code: string;
  address: string;
  detail_address: string;
  is_default?: boolean;
};

export interface AddFormAddress {
  address_name: string;
  recipient: string;
  recipient_phone: string;
  post_code: string;
  address: string;
  detail_address: string;
}

//  Address[] → Address 로 변경 (백엔드는 단일 주소만 반환)
export const useAddressQuery = () =>
  useQuery<Address[]>({
    queryKey: ['user-address'],
    queryFn: async () => {
      const response = await backendAPI.get('/users/me/address');
      const data = response.data;
      console.log('📦 [GET] /users/me/address 응답:', data);
      if (!Array.isArray(data) || data.length === 0) return [];

      return data.map((addr) => ({
        ...addr,
      }));
    },
  });

export const useAddressMutation = () => {
  const queryClient = useQueryClient();

  const applyInvalidate = () => queryClient.invalidateQueries({ queryKey: ['user-address'] });

  const addAddress = useMutation({
    mutationFn: (body: AddFormAddress) => {
      console.log('get:: addr:', body);
      return backendAPI.post('/users/me/address', body);
    },
    onSuccess: applyInvalidate,
  });

  const updateAddress = useMutation({
    mutationFn: (body: Address) => {
      console.log('🧐 PATCH 호출 전 addr:', body);
      console.log('🛑 PATCH addr.id:', body.id);
      if (!body.id) throw new Error('잘못된 요청입니다. ID가 존재하지 않습니다.');

      console.log('📨 PATCH Final Payload:', body);

      return backendAPI.patch(`/users/me/address?id=${body.id}`, body);
    },
    onSuccess: applyInvalidate,
  });

  const deleteAddress = useMutation({
    mutationFn: (id: number) => backendAPI.delete(`/users/me/address?id=${id}`),
    onSuccess: () => {
      applyInvalidate();
    },
  });

  return { addAddress, updateAddress, deleteAddress };
};
