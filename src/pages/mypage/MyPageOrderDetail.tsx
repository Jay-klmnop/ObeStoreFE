import { useNavigate } from 'react-router-dom';
import { ProfileIcon } from '@/components/icon/ProfileIcon';

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
    <div className="min-h-screen bg-[#f6efed] font-pretendard">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-48 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-8">Mypage</h2>
              <nav className="space-y-4">
                <button
                  onClick={() => navigate('/mypage/orders')}
                  className="block w-full text-left py-2 text-sm font-bold text-black">
                  주문 내역
                </button>
                <button className="block w-full text-left py-2 text-sm text-gray-600 hover:text-black transition-colors">
                  최근 본 상품
                </button>
                <button className="block w-full text-left py-2 text-sm text-gray-600 hover:text-black transition-colors">
                  로그아웃
                </button>
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <ProfileIcon size={20} />
                  </div>
                  <span className="font-medium text-gray-800">서준이의 마켓</span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-bold mb-6">주문 상세 내역</h2>

                <div className="mb-6">
                  <h3 className="text-base font-bold mb-3">{order.orderDate}</h3>
                  <div className="text-sm text-gray-600">
                    <span>주문번호</span>
                    <span className="ml-4">{order.orderNumber}</span>
                  </div>
                </div>

                <div className="mb-6 p-4 bg-stone-50 rounded">
                  <h4 className="font-bold mb-2">{order.recipient.name}</h4>
                  <div className="text-sm text-gray-600 space-y-1">
                    <p>{order.recipient.address}</p>
                    <p>{order.recipient.phone}</p>
                    {order.recipient.memo && (
                      <p className="text-xs text-gray-500 mt-2">{order.recipient.memo}</p>
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3">
                    주문 상품 {order.products.length}개
                  </h3>
                  {order.products.map((product) => (
                    <div
                      key={product.productId}
                      className="flex items-start space-x-4 p-4 border rounded"
                    >
                      <div className="w-20 h-20 bg-gray-200 rounded shrink-0 flex items-center justify-center overflow-hidden">
                        <img
                          src={product.productImage}
                          alt={product.productName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm mb-1">{product.productName}</p>
                        <p className="text-xs text-gray-500">{product.options}</p>
                        <p className="text-sm font-bold mt-2">
                          {product.price.toLocaleString()}원
                        </p>
                      </div>
                      <button className="px-4 py-2 border rounded text-sm hover:bg-gray-50">
                        취소 신청
                      </button>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold mb-3">결제정보</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">상품 금액</span>
                      <span>{order.payment.productAmount.toLocaleString()}원</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">할인 금액</span>
                      <span className="text-red-600">
                        -{order.payment.discount.toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">배송비</span>
                      <span>
                        {order.payment.shippingFee === 0
                          ? '무료배송'
                          : `${order.payment.shippingFee.toLocaleString()}원`}
                      </span>
                    </div>
                    <div className="flex justify-between pt-3 border-t font-bold">
                      <span>결제 금액</span>
                      <span className="text-lg">
                        {order.payment.totalAmount.toLocaleString()}원
                      </span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>결제 수단</span>
                      <span>{order.payment.method}</span>
                    </div>
                    {order.payment.date && (
                      <p className="text-xs text-gray-500 mt-2">
                        할인내역 | {order.payment.date}
                      </p>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => navigate('/mypage/orders')}
                  className="w-full py-3 bg-[#2B0E08] text-white rounded hover:bg-[#4A1A13] transition-colors">
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