import type { Order, OrderProductDetail } from '@/types/order';

export function OrderCard({ order, products }: { order: Order; products: OrderProductDetail[] }) {
  return (
    <>
      <div className='relative my-2.5 flex flex-col py-2.5'>
        <small className='border-secondary-300 bg-secondary-300 absolute top-0 right-0 rounded-sm border px-1 py-1 text-white'>
          {order.order_status}
        </small>
        {products.map((product) => (
          <div key={product.id} className='mb-4'>
            <div className='text-primary-700 mt-3 text-base font-normal'>
              {product.product_name}
            </div>
            <div className='text-primary-700 mt-1 text-base font-normal'>{product.amount}개</div>
            <div className='text-primary-700 mt-1 text-base font-normal'>
              {product.total_price.toLocaleString()}원
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
