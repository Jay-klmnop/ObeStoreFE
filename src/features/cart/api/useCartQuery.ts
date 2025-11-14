import { useQuery } from '@tanstack/react-query';
import { type AxiosResponse } from 'axios';
import type { CartItem } from '@/types';
import { backendAPI } from '@/api';

interface CartResponse {
  id: number;
  items: CartItem[];
  price: number;
  total_price: number;
  user: number;
}

const fetchCart = async (): Promise<CartItem[]> => {
  const response: AxiosResponse<CartResponse> = await backendAPI.get('/carts');
  const carts = response.data;

  if (!Array.isArray(carts) || carts.length === 0) return [];

  return carts[0].items ?? [];
};

export const useCartQuery = () => {
  return useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: fetchCart,
    staleTime: 1000 * 60 * 5,
  });
};
