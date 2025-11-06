import { create } from 'zustand';

export type CartItem = {
  id: string;
  brandName: string;
  productName: string;
  img: string;
  quantity: number;
  checked: boolean;
  price: number;
};

type CartState = {
  cartItems: CartItem[];
  selectAll: boolean;

  // actions
  setCartItems: (items: CartItem[]) => void; // 초기 세팅
  handleSelectAll: (checked: boolean) => void; // 전체 선택
  handleItemCheck: (id: string, checked: boolean) => void; // 개별 선택
  removeCheckedItems: () => void; // 선택 삭제
};

const FREE_SHIPPING_THRESHOLD = 50000;
const SHIPPING_FEE = 3500;
const REWARD_RATE = 0.01; // 1%

export const useCartStore = create<CartState>((set) => ({
  cartItems: [],
  selectAll: false,

  setCartItems: (items) => set({ cartItems: items }),

  handleSelectAll: (checked) =>
    set((state) => ({
      selectAll: checked,
      cartItems: state.cartItems.map((item) => ({ ...item, checked })),
    })),

  handleItemCheck: (id, checked) =>
    set((state) => {
      const updated = state.cartItems.map((item) => (item.id === id ? { ...item, checked } : item));
      const allChecked = updated.every((item) => item.checked);
      return { cartItems: updated, selectAll: allChecked };
    }),

  removeCheckedItems: () =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => !item.checked),
      selectAll: false,
    })),
}));

///////// calculate /////

export const useCheckedItemSum = () =>
  useCartStore((state) =>
    state.cartItems
      .filter((i) => i.checked)
      .reduce((acc, item) => acc + item.price * item.quantity, 0)
  );

export const useSelectedQuantity = () =>
  useCartStore((state) =>
    state.cartItems.filter((i) => i.checked).reduce((acc, item) => acc + item.quantity, 0)
  );

export const useDiscountSum = () => {
  const sum = useCheckedItemSum();
  const totalQuantity = useSelectedQuantity();
  if (totalQuantity === 0) return 0;
  return sum > FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
};

export const useShippingFee = () => {
  const sum = useCheckedItemSum();
  const totalQuantity = useSelectedQuantity();

  // 선택된 상품이 0개면 배송비 없음
  if (totalQuantity === 0) return 0;

  // 금액이 50,000원 이상이면 무료배송
  if (sum >= FREE_SHIPPING_THRESHOLD) return 0;

  // 나머지는 3,500원
  return SHIPPING_FEE;
};

export const useTotalPayment = () => {
  const sum = useCheckedItemSum();
  const discount = useDiscountSum();
  const shipping = useShippingFee();
  return sum - discount + shipping;
};

export const useRewardPoints = () => {
  const sum = useCheckedItemSum();
  return Math.floor(sum * REWARD_RATE);
};
