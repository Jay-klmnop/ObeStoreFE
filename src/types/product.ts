export type ProductType = {
  id: number;
  product_brand: string;
  product_name: string;
  product_price: number;
  product_stock: number;
  discount_rate: string;
  product_rating: string;
  sales: number;
  created_at: string;
  updated_at: string;
  category_id: number;
  tag_id: number;
  brand_id: number;
  product_image: {
    thumbnail: string;
    detail: string;
  };
};

export type ProductCardType = {
  id: number;
  product_brand: string;
  product_name: string;
  product_price: number;
  product_image: {
    thumbnail: string;
  };
  product_rating: string;
};
