import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useProductsQuery(sortOption: string = '') {
  return useQuery({
    queryKey: ['products', sortOption],
    queryFn: async () => {
      const res = await axios.get('https://dummyjson.com/products', {
        params: {
          ordering: sortOption,
        },
      });
      return res.data.products;
    },
  });
}
