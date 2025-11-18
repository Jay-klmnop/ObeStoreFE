import { useNavigate } from 'react-router-dom';
import type { Order } from '@/types/order';
import { ORDER_STATUS_CONFIG } from '@/constants/orderStatus';

interface Address {
  recipient: string;
  phone: string;
  address: string;
  zipCode: string;
}

interface Payment {
  method: string;
  date: string;
}

const sampleOrderDetail: Order = {
  id: 1,
  order_number: "ORD-2025-001",
  user: 1,
  address: 1,
  subtotal: 39000,
  discount_amount: 3900,
  delivery_amount: 0,
  total_payment: 35100,
  used_point: 0,
  order_status: "delivered",
  delivery_status: "배송 완료",
  delivery_request: "부재시 문 앞에 놔주세요.",
  order_products_detail: [
    {
      id: 1,
      product: 1,
      product_name: "체크패턴 머플러",
      product_image: "https://via.placeholder.com/120x160?text=Muffler",
      amount: 1,
      price: 39000,
      total_price: 39000
    }
  ],
  created_at: "25.11.07(금)"
};

const sampleAddress: Address = {
  recipient: "박서연",
  phone: "010-9876-0002",
  address: "부산광역시 해운대구 마린시티 45",
  zipCode: "48100"
};

const samplePayment: Payment = {
  method: "현대카드(일시불)",
  date: "2025.11.07 20:29"
};

const CANCELLABLE_STATUSES = ['pending', 'processing'] as const;

export function MyPageOrderDetail() {
  const navigate = useNavigate();
  
  const order = sampleOrderDetail;
  const address = sampleAddress;
  const payment = samplePayment;

  const statusInfo = ORDER_STATUS_CONFIG[order.order_status] || {
    label: order.order_status,
    color: 'bg-gray-500'
  };

  const canCancel = CANCELLABLE_STATUSES.includes(order.order_status as any);

  const handleCancelOrder = () => {
    if (confirm('주문을 취소하시겠습니까?')) {
      console.log('주문 취소:', order.id);
    }
  };

  return (
    <div className="space-y-6 px-4 md:px-6 pb-6">
      <div className="flex items-center justify-between pb-4 border-b">
        <h2 className="text-lg font-bold">주문 상세 내역</h2>
        <span className={`px-3 py-1 text-white text-xs rounded-full ${statusInfo.color}`}>
          {statusInfo.label}
        </span>
      </div>

      <div>
        <h3 className="text-base font-bold mb-2">{order.created_at}</h3>
        <div className="text-sm text-gray-600">
          <span>주문번호</span>
          <span className="ml-4">{order.order_number}</span>
        </div>
      </div>

      <div className="bg-stone-50 rounded-lg p-4">
        <h4 className="font-bold mb-3 flex items-center gap-2">
          <span aria-hidden="true">📦</span>
          <span>배송지 정보</span>
        </h4>
        <div className="space-y-1 text-sm text-gray-700">
          <p className="font-medium">{address.recipient}</p>
          <p>{address.address}</p>
          <p>{address.phone}</p>
          {order.delivery_request && (
            <p className="mt-2 text-xs text-gray-500 bg-white px-2 py-1 rounded">
              {order.delivery_request}
            </p>
          )}
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <span aria-hidden="true">🛍️</span>
          <span>주문 상품 {order.order_products_detail.length}개</span>
        </h3>
        <div className="space-y-3">
          {order.order_products_detail.map((product) => (
            <div
              key={product.id}
              className="flex items-start gap-4 border rounded-lg p-4"
            >
              <div className="w-20 h-20 bg-gray-100 rounded shrink-0 overflow-hidden">
                {product.product_image ? (
                  <img
                    src={product.product_image}
                    alt={product.product_name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 text-xs">
                    No Image
                  </div>
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium mb-1">{product.product_name}</p>
                <p className="text-sm text-gray-500">{product.amount}개</p>
                <p className="mt-2 font-bold">{product.price.toLocaleString()}원</p>
              </div>
              {canCancel && (
                <button className="px-4 py-2 text-sm border rounded hover:bg-gray-50 transition-colors">
                  취소 신청
                </button>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="bg-stone-50 rounded-lg p-4">
        <h3 className="font-bold mb-3 flex items-center gap-2">
          <span aria-hidden="true">💳</span>
          <span>결제 정보</span>
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">상품 금액</span>
            <span>{order.subtotal.toLocaleString()}원</span>
          </div>
          {order.discount_amount > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">할인 금액</span>
              <span className="text-red-600">-{order.discount_amount.toLocaleString()}원</span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-gray-600">배송비</span>
            <span>
              {order.delivery_amount === 0
                ? '무료배송'
                : `${order.delivery_amount.toLocaleString()}원`}
            </span>
          </div>
          {order.used_point > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">포인트 사용</span>
              <span className="text-blue-600">-{order.used_point.toLocaleString()}원</span>
            </div>
          )}
          <div className="flex justify-between pt-3 border-t font-bold">
            <span>총 결제 금액</span>
            <span className="text-lg text-black">{order.total_payment.toLocaleString()}원</span>
          </div>
          <div className="flex justify-between text-gray-600 pt-2">
            <span>결제 수단</span>
            <span>{payment.method}</span>
          </div>
          {payment.date && (
            <p className="text-xs text-gray-500 pt-1">결제 일시: {payment.date}</p>
          )}
        </div>
      </div>

        <div className={canCancel ? "flex gap-3" : "flex justify-center"}>
        <button
          onClick={() => navigate(-1)}
          className={`py-3 bg-[#2B0E08] text-white rounded hover:bg-[#4A1A13] transition-colors ${
            canCancel ? 'flex-1' : 'px-12'
          }`}>
          주문 내역으로 이동
        </button>
        {canCancel && (
          <button 
            onClick={handleCancelOrder}
            className="flex-1 py-3 bg-white text--[#2B0E08] border-2 border-[#2B0E08] rounded hover:bg-gray-50 transition-colors">
            주문 취소
          </button>
        )}
      </div>
    </div>
  );
}