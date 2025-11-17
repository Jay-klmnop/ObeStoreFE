import { backendAPI } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useReviewsQuery() {
  return useQuery({
    queryKey: ['reviews'],
    queryFn: async () => {
      const res = await backendAPI.get('/reviews');
      return res.data ?? [];
    },
  });
}
