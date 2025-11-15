import { backendAPI } from '@/api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

export type Address = {
  id: number;
  address_name: string;
  recipient: string;
  recipient_phone: string;
  post_code: string;
  address: string;
  detail_address: string;
  //
  isDefault?: boolean;
  deliveryRequest?: string;
};

//  Address[] → Address 로 변경 (백엔드는 단일 주소만 반환)
export const useAddressQuery = () =>
  useQuery<Address[]>({
    queryKey: ['user-address'],
    queryFn: async () => {
      const response = await backendAPI.get('/users/me/address');
      const data = response.data;

      console.log('📦 [GET] /users/me/address 응답:', data);

      if (!Array.isArray(data) || data.length === 0) return [];

      const savedAddress = data[0];

      const isDefault = localStorage.getItem('defaultAddress') === 'true';
      const deliveryRequest = localStorage.getItem('deliveryRequest') || '';

      return [
        {
          ...savedAddress,
          isDefault,
          deliveryRequest,
        },
      ];
    },
  });

export const useAddressMutation = () => {
  const queryClient = useQueryClient();

  const extractBody = (addr: Address) => ({
    id: addr.id,
    address_name: addr.address_name,
    recipient: addr.recipient,
    recipient_phone: addr.recipient_phone,
    post_code: addr.post_code,
    address: addr.address,
    detail_address: addr.detail_address,
  });

  const addAddress = useMutation({
    mutationFn: (addr: Address) => backendAPI.post('/users/me/address', extractBody(addr)),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user-address'] }),
  });

  const updateAddress = useMutation({
    mutationFn: (addr: Address) => {
      console.log('🧐 PATCH 호출 전 addr:', addr);
      console.log('🛑 PATCH addr.id:', addr.id);

      if (!addr.id) {
        console.error('❌ ERROR: addr.id가 없습니다. PATCH 중단!');
      }

      return backendAPI.patch(`/users/me/address?id=${addr.id}`, extractBody(addr));
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user-address'] }),
  });
  const deleteAddress = useMutation({
    mutationFn: () => backendAPI.delete('/users/me/address'),
    onSuccess: () => {
      localStorage.removeItem('defaultAddress');
      localStorage.removeItem('deliveryRequest');
      queryClient.invalidateQueries({ queryKey: ['user-address'] });
    },
  });

  return { addAddress, updateAddress, deleteAddress };
};
