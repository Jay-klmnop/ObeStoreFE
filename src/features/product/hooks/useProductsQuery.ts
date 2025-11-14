import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export function useProductsQuery(sortOption: string = '') {
  return useQuery({
    queryKey: ['products', sortOption],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        params: {
          ordering: sortOption,
        },
      });
      return res.data ?? [];
    },
  });
}
