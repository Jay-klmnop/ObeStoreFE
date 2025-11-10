import { useQuery } from '@tanstack/react-query';
import axios, { type AxiosResponse } from 'axios';
import type { CartItem } from '@/types/order';

interface CartResponse {
  products: CartItem[];
  total: number;
  skip: number;
  limit: number;
}

const fetchCart = async (): Promise<CartItem[]> => {
  const response: AxiosResponse<CartResponse> = await axios.get('https://dummyjson.com/products');
  return response.data.products;
};

export const useCartQuery = () => {
  return useQuery<CartItem[]>({
    queryKey: ['cart'],
    queryFn: fetchCart,
    staleTime: 1000 * 60 * 5,
  });
};
