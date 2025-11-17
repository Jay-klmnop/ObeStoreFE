import type { Order, OrderProductDetail } from '@/types/order';

interface OrderCardProps {
  order: Order;
  products: OrderProductDetail[];
  onClick?: (orderId: string) => void;
}

const statusLabels: Record<string, { label: string; color: string }> = {
  pending: { label: '입금 대기', color: 'bg-stone-500' },
  processing: { label: '배송 준비중', color: 'bg-amber-700' },
  shipped: { label: '배송중', color: 'bg-amber-600' },
  delivered: { label: '배송 완료', color: 'bg-stone-700' },
  cancelled: { label: '주문 취소', color: 'bg-red-900' },
};

export function OrderCard({ order, products, onClick }: OrderCardProps) {
  const statusInfo = statusLabels[order.order_status] || { 
    label: order.order_status, 
    color: 'bg-gray-500' 
  };
  const totalAmount = products.reduce((sum, p) => sum + p.total_price, 0);

  return (
    <>
      <div className='relative my-2.5 flex flex-col py-2.5'>
        <small className='border-secondary-300 bg-secondary-300 absolute top-7.5 right-0 rounded-sm border px-1 py-1 text-white'>
          {order.order_status}
        </small>
        {products.map((product) => (
          <div
            key={product.id}
            className='my-2.5 mb-4 flex flex-row items-start justify-start py-2.5 leading-none'
          >
            <div className='mr-9 w-[200px]'>
              <img src={product.product_card_image} className='w-full' alt='' />
            </div>
            <div>
              <div className='text-primary-700 mt-3 text-base font-normal'>
                {product.product_name}
              </div>
              <div className='text-primary-700 mt-1 text-base font-normal'>{product.amount}개</div>
              <div className='text-primary-700 mt-1 text-base font-normal'>
                {product.total_price.toLocaleString()}원
              </div>
            </div>
          </div>
        ))}
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