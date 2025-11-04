export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  salePrice?: number;
  description?: string;
  category?: string;
  images?: string[];
  detailImages?: string[];
  options?: ProductOption[];
  reviewCount?: number;
  rating?: number;
  salesCount?: number;
  createdAt?: string;
}

export interface ProductOption {
  name: string;
  values: string[];
}