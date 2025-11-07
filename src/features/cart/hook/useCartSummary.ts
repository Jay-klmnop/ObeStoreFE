import { useMemo } from 'react';
import {
  useCheckedItemSum,
  useDiscountSum,
  useRewardPoints,
  useSelectedQuantity,
  useShippingFee,
  useTotalPayment,
} from '@/features/cart/store/useCartStore';

export function useCartSummary() {
  const checkedItemSum = useCheckedItemSum();
  const discountSum = useDiscountSum();
  const shippingFee = useShippingFee();
  const totalPayment = useTotalPayment();
  const rewardPoints = useRewardPoints();
  const totalQuantity: number = useSelectedQuantity();

  const shippingFeeText = useMemo(() => {
    if (totalQuantity === 0) return '0원';
    if (shippingFee === 0) return '무료 배송';
    return `${shippingFee.toLocaleString()}원`;
  }, [totalQuantity, shippingFee]);

  return {
    checkedItemSum,
    discountSum,
    shippingFee,
    shippingFeeText,
    totalPayment,
    rewardPoints,
    totalQuantity,
  };
}
