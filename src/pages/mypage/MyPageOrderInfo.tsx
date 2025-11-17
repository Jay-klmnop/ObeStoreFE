import type { Order } from "@/types/order";

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
    created_at: "25.10.21(화)"
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
    created_at: "25.10.22(수)"
  }
];