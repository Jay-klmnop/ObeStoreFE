import { backendAPI } from '@/api';
import type { Order } from '@/types/order';
import { useQuery } from '@tanstack/react-query';

// 📌 GET /orders/ 요청 함수
export const fetchOrders = async (): Promise<Order[]> => {
  const response = await backendAPI.get('/orders/');
  const data = response.data;

  console.log('📦 [GET] /orders 응답:', data);

  if (Array.isArray(data)) return data;
  return [];
};

// 📌 TanStack Query 훅
export const useOrdersQuery = () => {
  return useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
