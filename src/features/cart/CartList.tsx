import { useCartQuery } from '@/features/cart/api/useCartQuery';
import type { CartItem } from '@/types/order';
import { CheckBox, FilledButton, GnbButton } from '@/components/ui';
import { useNavigate } from 'react-router-dom';
import { usdToKrw } from '@/features/cart/api/currency';
// import { flushSync } from 'react-dom';
import CartCard from '@/features/cart/CartCard';
import { useEffect } from 'react';
import { useOrderStore } from '../order/store/useOrderStore';
import { useCartSummary } from '@/features/cart/hook/useCartSummary';
import { useCartStore } from '@/features/cart/store/useCartStore';
export default function CartList() {
  const { setOrderInfo } = useOrderStore();
  const { data: cartItems = [], isLoading, isError } = useCartQuery();
  const navigate = useNavigate();

  const {
    checkedItemSum,
    discountSum,
    shippingFee,
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

  useEffect(() => {
    if (!cartItems.length) return;
    const newItems: CartItem[] = cartItems.map((product) => ({
      id: String(product.id),
      brand: product.brand ?? 'none',
      title: product.title ?? 'none',
      images:
        typeof product.images === 'string'
          ? product.images
          : Array.isArray(product.images)
            ? product.images[0]
            : (product.images ?? 'http://placehold.co/200x200'),
      price: Number.isFinite(usdToKrw(product.price)) ? Math.floor(usdToKrw(product.price)) : 0,
      stock: product.stock ?? 1,
      checked: false,
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

  console.log(cartItems); // 👈 API 구조 확인용
  console.log('상품합계:', checkedItemSum);
  console.log('배송비:', shippingFee);
  console.log('총결제금액:', totalPayment);

  if (isLoading) return <div>장바구니 정보를 불러오는 중입니다...</div>;
  if (isError) return <div>장바구니를 불러오지 못했습니다.</div>;

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
          <GnbButton onClick={removeCheckedItems}>선택 삭제</GnbButton>
        </div>

        {storeItems.map((product) => (
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
            className='mt-7 text-lg font-bold'
            variant='filled'
            fullWidth
            onClick={handlePurchase}
          >
            {`${totalPayment.toLocaleString()}원 구매하기 (${totalQuantity}개)`}
          </FilledButton>
        </div>
      </div>
    </div>
  );
}
