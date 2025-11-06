import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/features/cart/CartList';

interface OrderState {
  orderItems: CartItem[];
  totalPayment: number;
  setOrderInfo: (items: CartItem[], total: number) => void;
  clearOrder: () => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orderItems: [],
      totalPayment: 0,
      setOrderInfo: (items, total) => set({ orderItems: items, totalPayment: total }),
      clearOrder: () => set({ orderItems: [], totalPayment: 0 }),
    }),
    {
      name: 'order-storage',
    }
  )
);
