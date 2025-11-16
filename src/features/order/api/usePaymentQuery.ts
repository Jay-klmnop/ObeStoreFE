import { useQuery } from '@tanstack/react-query';
import { backendAPI } from '@/api';

export interface Payment {
  id: number;
  order: number;
  payment_status: string;
  payment_method: string;
  payment_amount: number;
  toss_order_id: string;
  toss_payment_key: string;
  receipt_url: string;
  approved_at: string | null;
  fail_code: string | null;
  fail_message: string | null;
  created_at: string;
  updated_at: string;
}

const fetchPayments = async (): Promise<Payment[]> => {
  const res = await backendAPI.get('/payments');
  return Array.isArray(res.data) ? res.data : [];
};

export const usePaymentQuery = () => {
  return useQuery<Payment[]>({
    queryKey: ['payments'],
    queryFn: fetchPayments,
    staleTime: 1000 * 60 * 5, // 5분 캐싱
  });
};
