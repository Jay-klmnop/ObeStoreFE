import { useCartItemsQuery } from '@/features/cart/api/useCartItemsQuery';
import { CheckBox, FilledButton, GnbButton } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { usdToKrw } from '@/features/cart/api/currency';
import {
  useCartStore,
  useCheckedItemSum,
  useDiscountSum,
  useRewardPoints,
  useSelectedQuantity,
  useShippingFee,
  useTotalPayment,
} from '@/features/cart/store/useCartStore';
import CartCard from '@/features/cart/CartCard';
import { useEffect } from 'react';

export interface Product {
  id: number;
  title: string;
  price: number;
  brand?: string;
  stock?: number;
  images?: string;
  checked: boolean;
}

export type CartItem = {
  id: string | number;
  brand: string;
  title: string;
  images: string;
  stock: number; // quantity
  checked: boolean;
  price: number;
};

export default function CartList() {
  const { data, isLoading, error } = useCartItemsQuery();
  const navigate = useNavigate();
  const {
    cartItems,
    selectAll,
    setCartItems,
    handleSelectAll,
    handleItemCheck,
    removeCheckedItems,
  } = useCartStore();

  const checkedItemSum = useCheckedItemSum();
  const discountSum = useDiscountSum();
  const shippingFee = useShippingFee();
  const totalPayment = useTotalPayment();
  const rewardPoints = useRewardPoints();
  const totalQuantity: number = useSelectedQuantity();

  useEffect(() => {
    if (data?.products) {
      // Zustand store에 초기 cart 데이터 설정
      setCartItems(
        data.products.map(
          (product): CartItem => ({
            id: String(product.id),
            brand: product.brand ?? 'none',
            title: product.title ?? 'none',
            images:
              typeof product.images === 'string'
                ? product.images
                : Array.isArray(product.images)
                  ? product.images[0]
                  : 'http://placehold.co/200x200',
            price: Math.floor(usdToKrw(product.price)) ?? 0,
            stock: product.stock ?? 1,
            checked: product.checked,
          })
        )
      );
    }
  }, [data, setCartItems]);

  let shippingFeeText = '';
  if (totalQuantity === 0) {
    shippingFeeText = '0원'; // 또는 '배송비 없음' 등
  } else if (shippingFee === 0) {
    shippingFeeText = '무료 배송';
  } else {
    shippingFeeText = `${shippingFee.toLocaleString()}원`;
  }
  const selectedItems = cartItems.filter((item: any) => item.checked);
  const handlePurchase = () => {
    if (selectedItems.length === 0) return alert('상품을 선택해주세요!');
    navigate('/order/order', {
      state: {
        selectedItems,
        totalPayment,
      },
    });
  };

  if (isLoading)
    return <div className='p-10 text-center'>장바구니 상품 정보를 불러오는 중입니다...</div>;
  if (error)
    return (
      <div className='p-10 text-center text-red-500'>
        장바구니 정보를 가져오는 데 실패했습니다: {error.message}
      </div>
    );
  console.log(data); // 👈 API 구조 확인용
  console.log('상품합계:', checkedItemSum);
  console.log('배송비:', shippingFee);
  console.log('총결제금액:', totalPayment);
  return (
    <div className='sub-info-half-content-with-wrap flex w-full'>
      <div className='sub-info-half-content w-[600px] bg-white px-7.5 py-2.5'>
        <div className='flex justify-between py-5'>
          <CheckBox
            id='cart-select-all'
            checked={selectAll}
            label='전체 선택'
            inputMargin='mr-4'
            onChange={(e) => handleSelectAll(e.target.checked)}
            className='pdr-3 text-base'
          />
          <GnbButton label='선택 삭제' onClick={removeCheckedItems} />
        </div>

        {cartItems.map((product) => (
          <CartCard
            key={product.id}
            id={String(product.id)}
            brand={product.brand ?? 'none'}
            title={product.title ?? 'none'}
            images={
              typeof product.images === 'string'
                ? product.images
                : Array.isArray(product.images)
                  ? product.images[0]
                  : 'http://placehold.co/200x200'
            }
            stock={product.stock}
            checked={product.checked}
            price={product.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleItemCheck(String(product.id), e.target.checked)
            }
          />
        ))}
      </div>
      <div className='sub-info-half-content-with bg-white px-7.5 py-2.5'>
        <div className='py-5'>
          <h3 className='text-lg font-bold'>구매 금액</h3>
          <ul className='mt-3 text-base leading-7'>
            <li className='flex justify-between'>
              <span>상품 금액</span>
              <span>
                <span>{checkedItemSum.toLocaleString()}</span>원
              </span>
            </li>
            <li className='flex justify-between'>
              <span>할인 금액</span>
              <span>
                <span>{discountSum.toLocaleString()}</span>원
              </span>
            </li>
            <li className='flex justify-between'>
              <span>배송비</span>
              <span>{shippingFeeText}</span>
            </li>
            <li className='mt-4 flex justify-between'>
              <span className='font-semibold'>총 결제 금액</span>
              <span className='font-semibold'>
                <span className='font-semibold'>{totalPayment.toLocaleString()}</span>원
              </span>
            </li>
            <li className='flex justify-between'>
              <span className=''>적립 혜택 예상</span>
              <span className=''>
                <span>{rewardPoints.toLocaleString()}</span>원
              </span>
            </li>
          </ul>
          <FilledButton
            label={`${totalPayment.toLocaleString()}원 구매하기 (${totalQuantity}개)`}
            className='mt-7 text-lg font-bold'
            variant='filled'
            fullWidth
            onClick={handlePurchase}
          />
        </div>
      </div>
    </div>
  );
}
