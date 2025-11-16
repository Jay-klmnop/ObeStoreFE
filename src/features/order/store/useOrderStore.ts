import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/types';

interface OrderState {
  orderItems: CartItem[];
  totalPayment: number;
  checkedItemSum: number;
  discountSum: number;
  shippingFeeText: string;
  totalQuantity: number;

  shippingFee: number;
  selectedAddressId: number | null;
  //deliveryRequest: string;

  setSelectedAddressId: (id: number) => void;
  //setDeliveryRequest: (req: string) => void;
  setShippingFee: (fee: number) => void;

  updateDiscount: (discount: number) => void;
  updateShippingFee: (text: string) => void;
  clearOrder: () => void;
  setOrderInfo: (
    items: CartItem[],
    total: number,
    checkedSum: number,
    discount: number,
    shippingText: string,
    totalQuan: number
  ) => void;
}

export const useOrderStore = create<OrderState>()(
  persist(
    (set) => ({
      orderItems: [],
      totalPayment: 0,
      checkedItemSum: 0,
      discountSum: 0,
      shippingFeeText: '',
      totalQuantity: 0,

      shippingFee: 3500,
      selectedAddressId: null,
      //deliveryRequest: '',

      setSelectedAddressId: (id) => set({ selectedAddressId: id }),
      //setDeliveryRequest: (req) => set({ deliveryRequest: req }),
      setShippingFee: (fee) => set({ shippingFee: fee }),

      setOrderInfo: (items, total, checkedSum, discount, shippingText, totalQuan) =>
        set({
          orderItems: items,
          totalPayment: total,
          checkedItemSum: checkedSum,
          discountSum: discount,
          shippingFeeText: shippingText,
          totalQuantity: totalQuan,
        }),
      updateDiscount: (discount: number) => set({ discountSum: discount }),
      updateShippingFee: (text: string) => set({ shippingFeeText: text }),
      clearOrder: () =>
        set({
          orderItems: [],
          totalPayment: 0,
          checkedItemSum: 0,
          discountSum: 0,
          shippingFeeText: '',
          totalQuantity: 0,
        }),
    }),
    {
      name: 'order-storage',
    }
  )
);
