import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MyPageOrderCard } from './MyPageOrderCard';
import type { Order } from "@/types/order";
import { UserProfileIcon } from '@/components/icon';
import { ORDER_STATUS_CONFIG, type OrderStatus } from '@/constants/orderStatus';

export const sampleOrders: Order[] = [
  {
    id: 1,
    order_number: "ORD-2025-001",
    user: 1,
    address: 1,
    subtotal: 39000,
    discount_amount: 0,
    delivery_amount: 0,
    total_payment: 39000,
    used_point: 0,
    order_status: "delivered",
    delivery_status: "배송 완료",
    delivery_request: "문 앞에 놓아주세요.",
    order_products_detail: [
      {
        id: 1,
        product: 1,
        product_name: "체크패턴 머플러",
        product_image: "https://via.placeholder.com/80x80?text=Muffler",
        amount: 1,
        price: 39000,
        total_price: 39000
      }
    ],
    created_at: "25.11.07(월)"
  },
  {
    id: 2,
    order_number: "ORD-2025-002",
    user: 1,
    address: 1,
    subtotal: 23000,
    discount_amount: 0,
    delivery_amount: 0,
    total_payment: 23000,
    used_point: 0,
    order_status: "shipped",
    delivery_status: "배송중",
    delivery_request: "경비실에 맡겨주세요.",
    order_products_detail: [
      {
        id: 2,
        product: 2,
        product_name: "그린티 에코백",
        product_image: "https://via.placeholder.com/80x80?text=Bag",
        amount: 1,
        price: 23000,
        total_price: 23000
      }
    ],
    created_at: "25.11.08(화)"
  }
];

export function MyPageOrderInfo() {
  const navigate = useNavigate();
  const [orders] = useState<Order[]>(sampleOrders);
  const [filter, setFilter] = useState<OrderStatus | 'all'>('all');

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.order_status === filter);

  const handleOrderClick = (orderId: string) => {
    navigate(`/users/orderdetail?orderId=${orderId}`);
  };

  const statusCounts = Object.keys(ORDER_STATUS_CONFIG).reduce((acc, status) => {
    acc[status as OrderStatus] = orders.filter(o => o.order_status === status).length;
    return acc;
  }, {} as Record<OrderStatus, number>);

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 pb-4 border-b">
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
          <UserProfileIcon size={20} />
        </div>
        <span className="font-medium">Nickname</span>
      </div>

      <h2 className="text-lg font-bold">주문 내역</h2>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {(Object.entries(statusCounts) as [OrderStatus, number][]).map(([status, count]) => (
          <div
            key={status}
            onClick={() => setFilter(status)}
            className={`p-4 border-2 rounded-lg text-center cursor-pointer transition-all bg-white hover:shadow-md
              ${filter === status ? 'border-black shadow-md' : 'border-gray-200 hover:border-gray-400'}`}
          >
            <p className="text-2xl font-bold mb-1">{count}</p>
            <p className="text-xs text-gray-600">{ORDER_STATUS_CONFIG[status].label}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded text-sm transition-colors
            ${filter === 'all' ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
        >
          전체
        </button>
        {(Object.entries(ORDER_STATUS_CONFIG) as [OrderStatus, { label: string; color: string }][]).map(([status, { label }]) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-4 py-2 rounded text-sm transition-colors
              ${filter === status ? 'bg-black text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          >
            {label}
          </button>
        ))}
      </div>

      {filteredOrders.length > 0 ? (
        <div className="space-y-4">
          {filteredOrders.map((order) => (
            <MyPageOrderCard
              key={order.id} 
              order={order}
              products={order.order_products_detail}
              onClick={handleOrderClick}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-gray-500">
          <p className="text-4xl mb-4">📦</p>
          <p className="text-sm">주문 내역이 없습니다</p>
        </div>
      )}
    </div>
  );
}