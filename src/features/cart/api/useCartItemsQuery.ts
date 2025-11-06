import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import type { Product } from '@/features/cart/CartList';

export interface ProductsResponse {
  products: Product[];
}
export function useCartItemsQuery() {
  return useQuery<ProductsResponse>({
    queryKey: ['products'], // 캐시 키
    queryFn: async () => {
      const res = await axios.get('https://dummyjson.com/products');
      return res.data;
    },
  });
}
