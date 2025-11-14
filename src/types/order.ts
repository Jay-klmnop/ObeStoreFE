export interface OrderItem {
  id: string | number;
  brand: string;
  title: string;
  images: string;
  stock: number; // quantity
  checked: boolean;
  price: number;
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
}
