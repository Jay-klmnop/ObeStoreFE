import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export type Address = {
  id: string;
  name: string;
  phone: string;
  address: string;
  detail: string;
  isDefault: boolean;
  deliveryRequest?: string;
};

const API_URL = 'http://localhost:4000/addresses';
export const useAddressQuery = () =>
  useQuery<Address[]>({
    queryKey: ['addresses'],
    queryFn: async () => {
      const response = await axios.get(API_URL);
      return response.data;
    },
  });

export const useAddressMutation = () => {
  const queryClient = useQueryClient();

  const clearDefaultAddress = async () => {
    try {
      const { data: addresses } = await axios.get<Address[]>(API_URL);
      const defaultAddress = addresses.find((a) => a.isDefault);
      if (defaultAddress) {
        await axios.patch(`${API_URL}/${defaultAddress.id}`, { isDefault: false });
      }
    } catch (error) {
      console.error('기본 배송지 초기화 중 오류 발생:', error);
    }
  };

  const addAddress = useMutation({
    mutationFn: async (newAddr: Omit<Address, 'id'>) => {
      if (newAddr.isDefault) {
        await clearDefaultAddress();
      }
      return axios.post(API_URL, newAddr);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });

  const updateAddress = useMutation({
    mutationFn: async (addr: Address) => {
      const { id, ...rest } = addr;

      if (rest.isDefault) {
        await clearDefaultAddress();
      }
      return axios.patch(`${API_URL}/${id}`, rest);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });

  const deleteAddress = useMutation({
    mutationFn: (id: string) => axios.delete(`${API_URL}/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });

  return { addAddress, updateAddress, deleteAddress, clearDefaultAddress };
};
