import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useProductsQuery() {
  return useQuery({
    queryKey: ['products'],
    queryFn: async () => {
      const res = await axios.get('https://dummyjson.com/products');
      return res.data.products;
    },
  });
}
