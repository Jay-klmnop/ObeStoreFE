import { useQuery } from '@tanstack/react-query';
import type { ProductReviewType } from '@/types';
import { backendAPI } from '@/api';

export function useProductReviewsQuery(productId: string | number) {
  const { data, isLoading, error } = useQuery<ProductReviewType[]>({
    queryKey: ['productReviews', productId],
    queryFn: async () => {
      const res = await backendAPI.get(`/products/${productId}/reviews`);
      return res.data ?? [];
    },
    enabled: !!productId,
  });

  return {
    reviews: data,
    reviewsLoading: isLoading,
    reviewsError: error,
  };
}
