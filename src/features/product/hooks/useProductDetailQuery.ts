import { useQuery } from '@tanstack/react-query';
import type { ProductDetailType } from '@/types';
import { backendAPI } from '@/api';

export function useProductDetailQuery(productId: string | number) {
  const { data, isLoading, error } = useQuery<ProductDetailType>({
    queryKey: ['productDetail', productId],
    queryFn: async () => {
      const res = await backendAPI.get(`/products/${productId}`, {
        params: {
          id: productId,
        },
      });
      return res.data;
    },
    enabled: !!productId,
  });

  return {
    product: data,
    productLoading: isLoading,
    productError: error,
  };
}
