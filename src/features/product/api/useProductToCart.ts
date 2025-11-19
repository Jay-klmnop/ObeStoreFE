import { useMutation, useQueryClient } from '@tanstack/react-query';
import { backendAPI } from '@/api'; // 백엔드 API 호출을 위한 import
import type { ProductDetailType } from '@/types'; // ProductDetailType 타입 가져오기

// CartToItem 타입 정의
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

// 장바구니에 추가할 상품 데이터 형식
export interface CartItem {
  amount: number;
  product: number; // 상품 ID만 필요
}

// 장바구니에 상품을 추가하는 함수
const addToCart = async ([product, quantity]: [ProductDetailType, number]): Promise<CartToItem> => {
  // 서버로 보낼 데이터 형식 (cartId 제거)
  const cartItem: CartItem = {
    amount: quantity,
    product: product.id, // 상품 ID만 포함
  };

  try {
    // POST 요청을 통해 장바구니에 상품 추가
    const { data } = await backendAPI.post<CartToItem>('/carts/items/', cartItem);

    // 응답 데이터 구조 확인 후 처리
    const cartToItem: CartToItem = {
      id: data.id, // 응답에서 ID를 가져옴
      items: data.items.map((item: any) => ({
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
      })),
      total_price: data.total_price, // 응답에서 총 가격 가져옴
      created_at: data.created_at, // 응답에서 생성일 가져옴
      updated_at: data.updated_at, // 응답에서 수정일 가져옴
      user: data.user, // 응답에서 사용자 ID 가져옴
      cartId: data.cartId, // 응답에서 카트 ID 가져옴
    };

    console.log('장바구니에 상품 추가 응답:', cartToItem);
    return cartToItem;
  } catch (error) {
    console.error('장바구니 추가 실패:', error);
    alert('장바구니에 추가하는 중 오류가 발생했습니다.');
    throw error; // 에러를 다시 던져서 다른 곳에서 처리할 수 있게 함
  }
};

// useProductToCart 훅 정의
export const useProductToCart = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<CartToItem, Error, [ProductDetailType, number], unknown>({
    mutationFn: addToCart, // POST 요청을 보내는 함수
    onMutate: (variables) => {
      console.log('🔍 onMutate 실행 — addToCart로 전달된 variables:', variables);
    },
    onSuccess: (response) => {
      console.log('장바구니 추가 성공:', response);
      // 성공 시 장바구니 관련 데이터를 새로 고침 (캐시 무효화)
      queryClient.invalidateQueries({ queryKey: ['cart'] });
      alert('상품이 장바구니에 추가되었습니다.');
    },
    onError: (error) => {
      console.error('장바구니 추가 실패:', error);
      alert('장바구니에 추가하는 중 오류가 발생했습니다.');
    },
  });

  return mutation;
};
