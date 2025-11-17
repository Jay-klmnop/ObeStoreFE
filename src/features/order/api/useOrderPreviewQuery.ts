import { backendAPI } from '@/api';
import { useQuery } from '@tanstack/react-query';

export interface Preview {
  subtotal: number;
  discount_amount: number;
  used_point: number;
  delivery_amount: number;
  total_payment: number;
  expected_point: number;
  available_point: number;
}

const fetchPreview = async (used_point: number): Promise<Preview> => {
  const res = await backendAPI.post('/orders/preview/', { used_point });
  return res.data;
};

export const useOrderPreviewQuery = (used_point: number) =>
  useQuery<Preview>({
    queryKey: ['order-preview', used_point],
    queryFn: () => fetchPreview(used_point),
    placeholderData: (prev) => prev,
    staleTime: 0,
  });
