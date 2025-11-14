import { useNavigate } from 'react-router-dom';
import { ProfileIcon } from '@/components/icon';

interface OrderProduct {
  productId: string;
  productName: string;
  productImage: string;
  options: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  orderDate: string;
  orderNumber: string;
  recipient: {
    name: string;
    phone: string;
    address: string;
    memo?: string;
  };
  products: OrderProduct[];
  payment: {
    productAmount: number;
    discount: number;
    shippingFee: number;
    totalAmount: number;
    method: string;
    date?: string;
  };
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
}

const sampleOrder: Order = {
  id: 'ORD-2025-001',
  orderDate: '25.11.07(금)',
  orderNumber: '202511079180400251',
  status: 'delivered',
  recipient: {
    name: '박서연',
    phone: '010-9876-0002',
    address: '부산광역시 해운대구 마린시티 45',
    memo: '부재시 문 앞에 놔주세요.',
  },
  products: [
    {
      productId: 'P004',
      productName: '체크패턴 머플러',
      productImage:
        'https://via.placeholder.com/120x160.png?text=%EC%A0%9C%ED%92%88+%EC%9D%B4%EB%AF%B8%EC%A7%80',
      options: '1개',
      quantity: 1,
      price: 39000,
    },
  ],
  payment: {
    productAmount: 39000,
    discount: 3900,
    shippingFee: 35100,
    totalAmount: 38100,
    method: '현대카드(일시불)',
    date: '2025.11.07 20:29',
  },
};

export const MyPageOrderDetail = () => {
  const navigate = useNavigate();
  const order = sampleOrder;

  return (
    <div className='font-pretendard min-h-screen bg-[#f6efed]'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex gap-8'>
          <aside className='w-48 shrink-0'>
            <div className='rounded-lg bg-white p-6 shadow-sm'>
              <h2 className='mb-8 text-xl font-bold'>Mypage</h2>
              <nav className='space-y-4'>
                <button
                  onClick={() => navigate('/mypage/orders')}
                  className='block w-full py-2 text-left text-sm font-bold text-black'
                >
                  주문 내역
                </button>
                <button className='block w-full py-2 text-left text-sm text-gray-600 transition-colors hover:text-black'>
                  최근 본 상품
                </button>
                <button className='block w-full py-2 text-left text-sm text-gray-600 transition-colors hover:text-black'>
                  로그아웃
                </button>
              </nav>
            </div>
          </aside>

          <main className='flex-1'>
            <div className='rounded-lg bg-white shadow-sm'>
              <div className='border-b p-6'>
                <div className='flex items-center space-x-3'>
                  <div className='flex h-10 w-10 items-center justify-center rounded-full bg-gray-200'>
                    <ProfileIcon size={20} />
                  </div>
                  <span className='font-medium text-gray-800'>서준이의 마켓</span>
                </div>
              </div>

              <div className='p-6'>
                <h2 className='mb-6 text-lg font-bold'>주문 상세 내역</h2>

                <div className='mb-6'>
                  <h3 className='mb-3 text-base font-bold'>{order.orderDate}</h3>
                  <div className='text-sm text-gray-600'>
                    <span>주문번호</span>
                    <span className='ml-4'>{order.orderNumber}</span>
                  </div>
                </div>

                <div className='mb-6 rounded bg-stone-50 p-4'>
                  <h4 className='mb-2 font-bold'>{order.recipient.name}</h4>
                  <div className='space-y-1 text-sm text-gray-600'>
                    <p>{order.recipient.address}</p>
                    <p>{order.recipient.phone}</p>
                    {order.recipient.memo && (
                      <p className='mt-2 text-xs text-gray-500'>{order.recipient.memo}</p>
                    )}
                  </div>
                </div>

                <div className='mb-6'>
                  <h3 className='mb-3 text-sm font-semibold'>
                    주문 상품 {order.products.length}개
                  </h3>
                  {order.products.map((product) => (
                    <div
                      key={product.productId}
                      className='flex items-start space-x-4 rounded border p-4'
                    >
                      <div className='flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded bg-gray-200'>
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          className='h-full w-full object-cover'
                        />
                      </div>
                      <div className='flex-1'>
                        <p className='mb-1 text-sm'>{product.productName}</p>
                        <p className='text-xs text-gray-500'>{product.options}</p>
                        <p className='mt-2 text-sm font-bold'>{product.price.toLocaleString()}원</p>
                      </div>
                      <button className='rounded border px-4 py-2 text-sm hover:bg-gray-50'>
                        취소 신청
                      </button>
                    </div>
                  ))}
                </div>

                <div className='mb-6'>
                  <h3 className='mb-3 text-sm font-semibold'>결제정보</h3>
                  <div className='space-y-2 text-sm'>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>상품 금액</span>
                      <span>{order.payment.productAmount.toLocaleString()}원</span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>할인 금액</span>
                      <span className='text-red-600'>
                        -{order.payment.discount.toLocaleString()}원
                      </span>
                    </div>
                    <div className='flex justify-between'>
                      <span className='text-gray-600'>배송비</span>
                      <span>
                        {order.payment.shippingFee === 0
                          ? '무료배송'
                          : `${order.payment.shippingFee.toLocaleString()}원`}
                      </span>
                    </div>
                    <div className='flex justify-between border-t pt-3 font-bold'>
                      <span>결제 금액</span>
                      <span className='text-lg'>
                        {order.payment.totalAmount.toLocaleString()}원
                      </span>
                    </div>
                    <div className='flex justify-between text-gray-600'>
                      <span>결제 수단</span>
                      <span>{order.payment.method}</span>
                    </div>
                    {order.payment.date && (
                      <p className='mt-2 text-xs text-gray-500'>할인내역 | {order.payment.date}</p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/mypage/orders')}
                  className='w-full rounded bg-[#2B0E08] py-3 text-white transition-colors hover:bg-[#4A1A13]'
                >
                  주문 내역으로 이동
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};
