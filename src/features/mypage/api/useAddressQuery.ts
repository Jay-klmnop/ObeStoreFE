import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

export type Address = {
  id: string;
  name: string;
  phone: string;
  address: string;
  detail: string;
  isDefault: boolean;
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

  const addAddress = useMutation({
    mutationFn: (newAddr: Omit<Address, 'id'>) => axios.post(API_URL, newAddr),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });

  const updateAddress = useMutation({
    mutationFn: (addr: Address) => axios.patch(`${API_URL}/${addr.id}`, addr),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });

  const deleteAddress = useMutation({
    mutationFn: (id: string) => axios.delete(`${API_URL}/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['addresses'] }),
  });

  return { addAddress, updateAddress, deleteAddress };
};
