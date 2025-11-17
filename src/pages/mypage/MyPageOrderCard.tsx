import type { Order, OrderProductDetail } from '@/types/order';
import { ORDER_STATUS_CONFIG } from '@/constants/orderStatus';

interface MyPageOrderCardProps {
  order: Order;
  products: OrderProductDetail[];
  onClick?: (orderId: string) => void;
}

export function MyPageOrderCard({ order, products, onClick }: MyPageOrderCardProps) {
  const statusInfo = ORDER_STATUS_CONFIG[order.order_status] || { 
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
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gray-100 rounded shrink-0 overflow-hidden">
            {products[0].product_image ? (
              <img 
                src={products[0].product_image} 
                alt={products[0].product_name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                No Image
              </div>
            )}
          </div>
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