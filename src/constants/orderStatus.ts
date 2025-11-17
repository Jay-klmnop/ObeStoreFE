export const ORDER_STATUS_CONFIG: Record<string, { label: string; color: string }> = {
  pending: { label: '입금 대기', color: 'bg-stone-500' },
  processing: { label: '배송 준비중', color: 'bg-amber-700' },
  shipped: { label: '배송중', color: 'bg-amber-600' },
  delivered: { label: '배송 완료', color: 'bg-stone-700' },
  cancelled: { label: '주문 취소', color: 'bg-stone-500' },
};

export type OrderStatus = keyof typeof ORDER_STATUS_CONFIG;