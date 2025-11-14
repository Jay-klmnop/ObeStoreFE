import type { ProductType } from '@/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface UseProductsParams {
  category?: string;
  hasReview?: boolean;
  hasDiscount?: boolean;
  sortOption?: string;
}

export function useProductsQuery({
  category,
  hasReview,
  hasDiscount,
  sortOption,
}: UseProductsParams = {}) {
  return useQuery<ProductType[]>({
    queryKey: ['products', category ?? 'all', hasReview, hasDiscount, sortOption],
    queryFn: async () => {
      const params: Record<string, any> = {};

      if (category) params.category = category;
      if (hasReview !== undefined) params.has_review = hasReview;
      if (hasDiscount !== undefined) params.has_dc_rate = hasDiscount;
      if (sortOption) params.ordering = sortOption;

      const res = await axios.get(`${import.meta.env.VITE_API_URL}/products`, { params });
      return res.data ?? [];
    },
  });
}
