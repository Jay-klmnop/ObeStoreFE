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
}

export interface ProductOption {
  name: string;
  values: string[];
}