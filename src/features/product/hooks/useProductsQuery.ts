import { backendAPI } from '@/api';
import type { ProductType } from '@/types';
import { useQuery } from '@tanstack/react-query';

interface UseProductsParams {
  category?: string;
  hasDiscount?: boolean;
  hasReview?: boolean;
  searchTerm?: string;
  sortOption?: string;
}

export function useProductsQuery({
  category,
  hasDiscount,
  hasReview,
  searchTerm,
  sortOption,
}: UseProductsParams = {}) {
  return useQuery<ProductType[]>({
    queryKey: ['products', category ?? 'all', hasDiscount, hasReview, searchTerm, sortOption],
    queryFn: async () => {
      const params: Record<string, any> = {};

      if (category) params.category_name = category;
      if (hasDiscount !== undefined) params.has_dc_rate = hasDiscount;
      if (hasReview !== undefined) params.has_review = hasReview;
      if (searchTerm) params.search = searchTerm;
      if (sortOption) params.ordering = sortOption;

      const res = await backendAPI.get(`/products`, { params });
      console.log('🔥 sending params: ', params);
      return res.data ?? [];
    },
  });
}
