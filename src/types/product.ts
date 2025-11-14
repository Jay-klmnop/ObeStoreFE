export interface ProductType {
  id: number;
  product_name: string;
  product_value: number;
  product_stock: number;
  discount_rate: number;
  product_rating: number;
  dc_value: number;
  created_at: string;
  updated_at: string;
  category_id: number;
  category_name: string;
  brand_id: number;
  brand_name: string;
  product_image: [{ product_card_image: string; product_explain_image: string }];
  brand_image: [{ brand_image: string }];
}

export interface ProductCardType {
  id: number;
  product_name: string;
  brand_name: string;
  product_value: string;
  dc_value: number;
  product_rating: string;
  product_image: [
    {
      product_card_image: string;
    },
  ];
}

export interface ProductDetailType {
  id: number;
  product_name: string;
  product_value: number;
  product_stock: number;
  discount_rate: number;
  product_rating: number;
  dc_value: number;
  category_name: string;
  brand_name: string;
  product_image: [{ product_card_image: string; product_explain_image: string }];
  brand_image: [{ brand_image: string }];
}

export interface ProductCartType {
  id: number;
  product_name: string;
  product_value: number;
  discount_rate: number;
  product_rating: number;
  dc_value: number;
  category_name: string;
  brand_name: string;
  product_image: [{ product_card_image: string; product_explain_image: string }];
  brand_image: [{ brand_image: string }];
}

export interface ProductReviewType {
  id: number;
  review_title: string;
  product_id: number;
  user: number;
  nickname: string;
  review_image: [
    {
      review_image: string;
    },
  ];
  review_keyword: [
    {
      keyword_name: string;
    },
  ];
  content: string;
  rating: number;
  created_at: string;
  updated_at: string;
}

export interface ProductDetailType {
  id: number;
  product_name: string;
  product_value: number;
  product_stock: number;
  discount_rate: number;
  product_rating: number;
  dc_value: number;
  category_name: string;
  brand_name: string;
  product_image: [{ product_card_image: string; product_explain_image: string }];
  brand_image: [{ brand_image: string }];
  favorite_count?: number;
}