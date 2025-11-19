import { useMutation, useQueryClient } from '@tanstack/react-query';
import { backendAPI } from '@/api';
import type { ProductDetailType } from '@/types';

export interface CartToItem {
  id: number;
  items: {
    id: number;
    product_name: string;
    price: number;
    total_price: number;
    created_at: string;
    updated_at: string;
    amount: number;
    cart: number;
    product: number;
    product_card_image: string;
  }[];
  total_price: number;
  created_at: string;
  updated_at: string;
  user: number;
  cartId: number;
}

export interface CartItem {
  amount: number;
  product: number;
}

const addToCart = async ([product, quantity]: [ProductDetailType, number]): Promise<CartToItem> => {
  const cartItem: CartItem = {
    amount: quantity,
    product: product.id,
  };

  try {
    const { data } = await backendAPI.post<CartToItem>('/carts/items/', cartItem);

    const cartToItem: CartToItem = {
      id: data.id,
      items: data.items
        ? data.items.map((item: any) => ({
            id: item.id,
            product_name: item.product_name,
            price: item.price,
            total_price: item.total_price,
            created_at: item.created_at,
            updated_at: item.updated_at,
            amount: item.amount,
            cart: item.cart,
            product: item.product,
            product_card_image: item.product_card_image,
          }))
        : [],
      total_price: data.total_price,
      created_at: data.created_at,
      updated_at: data.updated_at,
      user: data.user,
      cartId: data.cartId,
    };

    return cartToItem;
  } catch (error) {
    alert('장바구니에 추가하는 중 오류가 발생했습니다.');
    throw error;
  }
};

export const useProductToCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<CartToItem, Error, [ProductDetailType, number], unknown>({
    mutationFn: addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      alert('상품이 장바구니에 추가되었습니다.');
    },
    onError: () => {
      alert('장바구니에 추가하는 중 오류가 발생했습니다.');
    },
  });

  return mutation;
};
