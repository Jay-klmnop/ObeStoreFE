import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface OrderProduct {
  productId: string;
  productName: string;
  productImage: string;
  quantity: number;
  price: number;
}

interface Address {
  recipient: string;
  phone: string;
  zipCode: string;
  address: string;
  detailAddress: string;
}

interface Order {
  id: string;
  userId: string;
  products: OrderProduct[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: string;
  shippingAddress: Address;
}

type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

const sampleOrders: Order[] = [
  {
    id: 'ORD-2025-001',
    userId: 'user1',
    orderDate: '25.11.07(월)',
    status: 'delivered',
    totalAmount: 39000,
    products: [
      {
        productId: 'P004',
        productName: '체크패턴 머플러',
        productImage: '',
        quantity: 1,
        price: 39000,
      },
    ],
    shippingAddress: {
      recipient: '박서연',
      phone: '010-9876-0002',
      zipCode: '34567',
      address: '부산광역시 해운대구 마린시티 45',
      detailAddress: '101동 1001호',
    },
  },
  {
    id: 'ORD-2025-002',
    userId: 'user2',
    orderDate: '25.11.08(화)',
    status: 'shipped',
    totalAmount: 23000,
    products: [
      {
        productId: 'P002',
        productName: '그린티 에코백',
        productImage: '',
        quantity: 1,
        price: 23000,
      },
    ],
    shippingAddress: {
      recipient: '김민지',
      phone: '010-1234-0001',
      zipCode: '12345',
      address: '서울시 강남구 테헤란로 123',
      detailAddress: 'A동 101호',
    },
  },
];

const statusLabels: Record<OrderStatus, { label: string; color: string }> = {
  pending: { label: '입금 대기', color: 'bg-stone-500' },
  processing: { label: '배송 준비중', color: 'bg-amber-700' },
  shipped: { label: '배송중', color: 'bg-amber-600' },
  delivered: { label: '배송 완료', color: 'bg-stone-700' },
  cancelled: { label: '주문 취소', color: 'bg-red-900' },
};

export const MyPageOrderInfo = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [orders] = useState<Order[]>(sampleOrders);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status === filter);

  const handleOrderClick = (orderId: string) => {
    navigate(`/mypage/orders/${orderId}`);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-stone-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          <aside className="w-48 shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold mb-6">Mypage</h2>
              <nav className="space-y-4">
                <button
                  onClick={() => navigate('/mypage')}
                  className={`block w-full text-left py-2 text-sm transition-colors ${
                    isActive('/mypage') 
                      ? 'font-bold text-black' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  마이페이지
                  {isActive('/mypage') && <span className="ml-2">›</span>}
                </button>
                <button
                  onClick={() => navigate('/mypage/orders')}
                  className={`block w-full text-left py-2 text-sm transition-colors ${
                    isActive('/mypage/orders') 
                      ? 'font-bold text-black' 
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  주문 내역
                  {isActive('/mypage/orders') && <span className="ml-2">›</span>}
                </button>
                <button 
                  className="block w-full text-left py-2 text-sm text-gray-600 hover:text-black transition-colors"
                >
                  최근 본 상품
                </button>
                <button 
                  className="block w-full text-left py-2 text-sm text-gray-600 hover:text-black transition-colors"
                >
                  로그아웃
                </button>
              </nav>
            </div>
          </aside>

          <main className="flex-1">
            <div className="bg-white rounded-lg shadow-sm">
              <div className="p-6 border-b">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                    <span className="text-xl">👤</span>
                  </div>
                  <span className="font-medium">veryseweIkey</span>
                </div>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-bold mb-6">주문 내역</h2>

                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                  {(Object.entries(statusLabels) as [OrderStatus, { label: string; color: string }][]).map(([status, info]) => {
                    const count = orders.filter(order => order.status === status).length;
                    return (
                      <div
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all bg-white hover:shadow-md
                          ${filter === status ? 'border-black shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
                      >
                        <p className="text-2xl font-bold mb-1">{count}</p>
                        <p className="text-xs text-gray-600">{info.label}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  <button
                    onClick={() => setFilter('all')}
                    className={`px-4 py-2 rounded text-sm transition-colors
                      ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    전체
                  </button>
                  {(Object.entries(statusLabels) as [OrderStatus, { label: string; color: string }][]).map(([status, info]) => (
                    <button
                      key={status}
                      onClick={() => setFilter(status)}
                      className={`px-4 py-2 rounded text-sm transition-colors
                        ${filter === status ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                      {info.label}
                    </button>
                  ))}
                </div>

                {filteredOrders.length > 0 ? (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => {
                      const statusInfo = statusLabels[order.status];
                      return (
                        <div
                          key={order.id}
                          onClick={() => handleOrderClick(order.id)}
                          className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex justify-between items-center mb-3 pb-3 border-b">
                            <div>
                              <span className="text-sm font-semibold">{order.orderDate}</span>
                              <span className="text-xs text-gray-500 ml-3">주문번호: {order.id}</span>
                            </div>
                            <span className={`px-3 py-1 text-white text-xs rounded-full ${statusInfo.color}`}>
                              {statusInfo.label}
                            </span>
                          </div>

                          <div className="flex items-center space-x-4">
                            <div className="w-16 h-16 bg-gray-200 rounded shrink-0 flex items-center justify-center">
                              <span className="text-2xl">🎨</span>
                            </div>
                            <div className="flex-1">
                              {order.products.length > 0 && (
                                <>
                                  <p className="text-sm font-medium mb-1">
                                    {order.products[0].productName}
                                  </p>
                                  <p className="text-xs text-gray-500">
                                    {order.products[0].quantity}개
                                    {order.products.length > 1 && 
                                      ` 외 ${order.products.length - 1}개`
                                    }
                                  </p>
                                </>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="text-sm font-bold">{order.totalAmount.toLocaleString()}원</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-16 text-gray-500">
                    <p className="text-4xl mb-4">📦</p>
                    <p className="text-sm">주문 내역이 없습니다</p>
                  </div>
                )}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};