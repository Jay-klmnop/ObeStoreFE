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

export interface ProductCardType { 
  id: number; 
  product_name: string; 
  product_brand: string; 
  product_price: string; 
  product_rating: string; 
  product_image: { 
    thumbnail: string; 
  }; 
}