export interface OrderItem {
  id: string | number;
  brand: string;
  title: string;
  images: string;
  stock: number; // quantity
  checked: boolean;
  price: number;
}
