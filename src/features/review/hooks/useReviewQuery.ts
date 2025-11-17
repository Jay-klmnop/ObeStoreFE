import { backendAPI } from '@/api';
import { useQuery } from '@tanstack/react-query';

export function useReviewQuery(reviewId: number | string) {
  return useQuery({
    queryKey: ['review', reviewId],
    queryFn: async () => {
      const res = await backendAPI.get(`/reviews/${reviewId}`);
      return res.data;
    },
    enabled: !!reviewId,
  });
}
