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
      const data = res.data;

      if (
        data &&
        typeof data === 'object' &&
        !Array.isArray(data) &&
        Object.keys(data).length === 0
      ) {
        return null;
      }

      if (Array.isArray(data)) {
        return data[0] ?? null;
      }

      return data;
    },
    enabled: !!productId,
  });

  return {
    product: data,
    productLoading: isLoading,
    productError: error,
  };
}
