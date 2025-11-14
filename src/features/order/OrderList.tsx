import { useCartQuery } from '@/features/cart/api/useCartQuery';
import { OrderCheckoutPage, useOrderStore } from '@/features/order';
import { CartCardNone } from '../cart';
import { useRewardStore } from '@/features/reward/store';
import { useEffect } from 'react';

import { OrderSideBar } from './OrderSideBar';
import OrderShippingCard from './OrderShippingCard';

export function OrderList() {
  const { data: cartItems = [], isLoading: isLoadingCart, isError: isErrorCart } = useCartQuery();
  const { availablePoints, usedPoints, setUsedPoints, setEarnedPoints } = useRewardStore();
  const { orderItems, checkedItemSum, totalQuantity } = useOrderStore();

  const handleUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > availablePoints) return alert('보유 적립금을 초과했습니다!');
    setUsedPoints(value);
  };

  const isLoading = isLoadingCart;
  const isError = isErrorCart;

  useEffect(() => {
    const earned = Math.floor(checkedItemSum * 0.01);
    setEarnedPoints(earned);
  }, [checkedItemSum, setEarnedPoints]);

  if (isLoading) return <div>결제 정보를 준비 중입니다...</div>;
  if (isError || !cartItems) return <div>결제에 필요한 장바구니 정보를 찾을 수 없습니다.</div>;

  return (
    <div className='m-auto flex w-full flex-col lg:flex-row lg:justify-between'>
      <div className='w-full bg-white px-7.5 py-5 lg:w-[calc(100%-470px)]'>
        <div className='relative px-2.5'>
          <OrderShippingCard />
          <div className='flex items-center justify-between p-2.5'>
            <div className='text-primary-500-90 text-lg font-bold'>주문 상품 {totalQuantity}개</div>
          </div>
          <div>
            {orderItems.map((product) => (
              <CartCardNone
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
              />
            ))}
          </div>
          <div className='pb-10'>
            <ul>
              <li className='text-primary-500-90 text-lg font-bold'>
                보유 적립금: {availablePoints.toLocaleString()}원
              </li>
              <li>
                {availablePoints < 5000 ? (
                  <input
                    type='text'
                    value={usedPoints || ''}
                    onChange={handleUsedChange}
                    className='border-custom-gray-20 bg-custom-gray-50 mt-5 w-full rounded-lg border p-2.5'
                    placeholder='최소 5000원 이상 보유 시 사용 가능'
                    disabled
                  />
                ) : (
                  <input
                    type='text'
                    value={usedPoints || ''}
                    onChange={handleUsedChange}
                    className='input mt-5 w-full rounded-lg border p-2.5'
                    placeholder='최소 5000원 이상 보유 시 사용 가능'
                  />
                )}
              </li>
            </ul>
          </div>
          <div className='pb-10'>
            <div className='text-primary-500-90 text-lg font-bold'>결제 수단</div>
            <div>
              <OrderCheckoutPage />
            </div>
          </div>
        </div>
      </div>
      <OrderSideBar />
    </div>
  );
}
