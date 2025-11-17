import type { Order, OrderProductDetail } from '@/types/order';

interface OrderCardProps {
  order: Order;
  products: OrderProductDetail[];
  onClick?: (orderId: string) => void;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: '입금 대기', color: 'bg-stone-500'},
  progressing: { label: '배송 준비중', color: 'bg-amber-700'},
  shipped: { label: '배송중', color: 'bg-amber-600'},
  deliverd: { label: '배송 완료', color: 'bg-stone-700'},
  cancelled: { label: '주문 취소', color: 'bg-red-900'},
};

export function OrderCard({ order, products, onClick }: OrderCardProps) {
  const statusInfo = statusLabels[order.order_status] || {
    label: order.order_status,
    color: 'bg-gray-500'
  };
  const totalAmount = products.reduce((sum, p) => sum + p.total_price, 0);

  return (
    <div
      onClick={() => onClick?.(order.id.toString())}
      className={`border rounded-lg p-4 transition-shadow ${onClick ? 'cursor-pointer hover:shadow-md' : ''}`}
    >
      <div className="flex justify-between items-center mb-3 pb-3 border-b">
        <div>
          <span className="text-sm font-semibold">{order.created_at}</span>
          <span className="text-xs text-gray-500 ml-3">주문번호: {order.order_number}</span>
        </div>
        <span className={`px-3 py-1 text-white text-xs rounded-full ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
      </div>

      {products.length > 0 && (
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-sm font-medium mb-1">
              {products[0].product_name}
            </p>
            <p className="text-xs text-gray-500">
              {products[0].amount}개
              {products.length > 1 && ` 외 ${products.length - 1}개`}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold">{totalAmount.toLocaleString()}원</p>
          </div>
        </div>
      )}
    </div>
  );
}