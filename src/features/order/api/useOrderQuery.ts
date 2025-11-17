// src/features/order/api/useOrders.ts
import { backendAPI } from '@/api';
import type { Order } from '@/types/order';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// ===============================
// 📌 1) GET /orders/ 모든 주문 조회
// ===============================
export const fetchOrders = async (): Promise<Order[]> => {
  const response = await backendAPI.get('/orders/');
  const data = response.data;

  console.log('📦 [GET] /orders 응답:', data);

  return Array.isArray(data) ? data : [];
};

export const useOrdersQuery = () =>
  useQuery<Order[]>({
    queryKey: ['orders'],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5,
  });

// ===============================
// 📌 2) POST /orders/ 주문 생성
// ===============================
export interface CreateOrderPayload {
  delivery_post?: number;
  used_point?: number;
  discount_amount?: number;
  delivery_amount?: number;
  delivery_request: string;

  // ⭐ [테스트용 임시 필드] 추가 ⭐
  subtotal?: number;
  total_payment?: number;
  order_items?: {
    product: number;
    amount: number;
    price: number;
  }[];
}
export const useCreateOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: CreateOrderPayload) => {
      console.log('📤 [POST] /orders/', payload);
      const res = await backendAPI.post('/orders/', payload);
      return res.data;
    },
    onSuccess: () => {
      console.log('🎉 주문 생성 성공!');
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const fetchOrderDetail = async (orderId: number) => {
  const response = await backendAPI.get(`/orders/${orderId}/`);
  console.log('📦 [GET] /orders/{id} 응답:', response.data);
  return response.data;
};

export const useOrderDetailQuery = (orderId: number) =>
  useQuery({
    queryKey: ['orderDetail', orderId],
    queryFn: () => fetchOrderDetail(orderId),
    enabled: !!orderId, // ⚠️ orderId가 있을 때만 실행
  });
