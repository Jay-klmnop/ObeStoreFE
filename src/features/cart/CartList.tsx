import { CartCard, useCartQuery, useCartStore, useCartSummary } from '@/features/cart';
import type { CartItem } from '@/types';
import { CheckBox, ButtonBase } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useOrderStore } from '@/features/order';
import { useRewardStore } from '@/features/reward/store';

export function CartList() {
  const { setOrderInfo } = useOrderStore();
  const { data: cartItems = [], isLoading, isError } = useCartQuery();
  const navigate = useNavigate();

  const {
    checkedItemSum,
    discountSum,
    shippingFeeText,
    totalPayment,
    rewardPoints,
    totalQuantity,
  } = useCartSummary();

  const {
    cartItems: storeItems,
    selectAll,
    setCartItems,
    handleSelectAll,
    handleItemCheck,
    removeCheckedItems,
  } = useCartStore();

  const { setEarnedPoints } = useRewardStore();

  useEffect(() => {
    setEarnedPoints(rewardPoints);
  }, [rewardPoints, setEarnedPoints]);

  useEffect(() => {
    if (!cartItems.length) return;
    const newItems: CartItem[] = cartItems.map((product) => ({
      id: String(product.id),
      product_name: product.product_name ?? 'none',
      price: Math.floor(product.price),
      amount: product.amount ?? 0,
      cart: product.cart,
      checked: false,
      product_card_image: product.product_card_image,
    }));
    const isSame = JSON.stringify(storeItems) === JSON.stringify(newItems);
    if (!isSame) setCartItems(newItems);
  }, [cartItems, setCartItems]);

  const handlePurchase = () => {
    const selectedItems = storeItems.filter((item: any) => item.checked);
    if (storeItems.length === 0) return alert('상품을 선택해주세요!');
    setOrderInfo(
      selectedItems,
      totalPayment,
      checkedItemSum,
      discountSum,
      shippingFeeText,
      totalQuantity
    );
    navigate('/order/order');
  };

  if (isLoading) return <div>장바구니 정보를 불러오는 중입니다...</div>;
  if (isError) return <div>장바구니를 불러오지 못했습니다.</div>;

  return (
    <div className='m-auto flex w-full flex-col lg:flex-row lg:justify-between'>
      <div className='w-full bg-white px-7.5 py-5 lg:w-[calc(100%-470px)]'>
        <div className='flex justify-between py-5'>
          <CheckBox
            id='cart-select-all'
            checked={selectAll}
            label='전체 선택'
            inputMargin='mr-4'
            onChange={(e) => handleSelectAll(e.target.checked)}
            className='pdr-3 text-base'
          />
          <ButtonBase onClick={removeCheckedItems} variant='gnb'>
            선택 삭제
          </ButtonBase>
        </div>

        {storeItems.map((product) => (
          <CartCard
            key={product.id}
            id={String(product.id)}
            product_name={product.product_name}
            price={product.price}
            product_card_image={
              typeof product.product_card_image === 'string'
                ? product.product_card_image
                : Array.isArray(product.product_card_image)
                  ? product.product_card_image[0]
                  : 'http://placehold.co/200x200'
            }
            amount={product.amount}
            checked={product.checked}
            cart={product.cart}
            onChange={(e) => handleItemCheck(String(product.id), e.target.checked)}
          />
        ))}
      </div>
      <div className='mt-5 w-full bg-white px-7.5 py-5 lg:mt-0 lg:w-[450px]'>
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
          <ButtonBase className='mt-7' fullWidth onClick={handlePurchase}>
            {`${totalPayment.toLocaleString()}원 구매하기 (${totalQuantity}개)`}
          </ButtonBase>
        </div>
      </div>
    </div>
  );
}
