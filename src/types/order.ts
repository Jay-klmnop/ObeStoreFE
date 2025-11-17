export interface OrderProductDetail {
  id: number;
  product: number;
  product_name: string;
  product_image?: string;
  amount: number;
  price: number;
  total_price: number;
}

export interface Order {
  id: number;
  order_number: string;
  user: number;
  address: number;
  subtotal: number;
  discount_amount: number;
  delivery_amount: number;
  total_payment: number;
  used_point: number;
  order_status: string;
  delivery_status: string;
  delivery_request: string;
  order_products_detail: OrderProductDetail[];
  created_at: string;
}

export interface BackendCartItem {
  id: number;
  product_name: string;
  price: number;
  total_price: number;
  amount: number;
  product: number;
  cart: number;
  created_at: string;
  updated_at: string;
}

export interface CartItem {
  id: string | number;
  product_name: string;
  price: number;
  amount: number;
  cart: number;

  // FE에서 쓰는 체크박스 상태
  checked: boolean;
  product_card_image: string;
}

export interface UserPoint {
  id: number;
  amount: number;
  balance: number;
  created_at: string;
  updated_at: string;
}

export interface OrderSideItem {
  order: Order;
  product: OrderProductDetail;
}

export interface OrderSideBarProps {
  orderSideData: OrderSideItem[];
}
