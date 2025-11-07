// import { FilledButton } from '@/components/ui';
// import { useOrderStore } from './store/useOrderStore';
import { useCartQuery } from '@/features/cart/api/useCartQuery';
import { useOrderStore } from './store/useOrderStore';
// import type { CartItem } from '@/types/order';
import { FilledButton, GnbButton } from '@/components/ui';
import { CartCardNone } from '../cart';
import { OrderCheckoutPage } from './OrderCheckoutPage';
import { useRewardStore } from '@/features/reward/store/useRewardStore';
import { useEffect } from 'react';
import { useCustomerQuery } from './api/useCustomerQuery';
import { useCartSummary } from '../cart/hook/useCartSummary';

export default function OrderList() {
  const { data: cartItems = [], isLoading: isLoadingCart, isError: isErrorCart } = useCartQuery();
  const { availablePoints, usedPoints, earnedPoints, setUsedPoints, setEarnedPoints } =
    useRewardStore();
  const { orderItems, checkedItemSum, discountSum, shippingFeeText, totalQuantity } =
    useOrderStore();
  const { totalPayment } = useCartSummary();
  useEffect(() => {
    const earned = Math.floor(checkedItemSum * 0.01);
    setEarnedPoints(earned);
  }, [checkedItemSum, setEarnedPoints]);

  // const finalPayment = Math.max(baseTotalPayment - usedPoints, 0);

  const {
    data: customer,
    isLoading: isLoadingCustomer,
    isError: isErrorCustomer,
  } = useCustomerQuery();

  const handleClickEditAddress = () => {
    console.log('배송지 변경입니다');
  };
  const handleUsedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value > availablePoints) return alert('보유 적립금을 초과했습니다!');
    setUsedPoints(value);
  };

  const isLoading = isLoadingCart || isLoadingCustomer;
  const isError = isErrorCart || isErrorCustomer;

  if (isLoading) return <div>결제 정보를 준비 중입니다...</div>;
  if (isError || !cartItems) return <div>결제에 필요한 장바구니 정보를 찾을 수 없습니다.</div>;
  console.log(`----데이터 확인----Start---`);
  console.log(`${customer?.orderId}`);
  console.log(`${customer?.orderName}`);
  console.log(`${customer?.customerMobilePhone}`);
  console.log(`${customer?.customerEmail}`);
  console.log(`${customer?.customerAddress}`);
  console.log(`총 결제금액 ${totalPayment}`);
  console.log(`----데이터 확인----End---`);
  return (
    <div className='sub-info-half-content-with-wrap m-auto flex w-full'>
      <div className='sub-info-half-content w-[600px] bg-white px-7.5 py-5'>
        <div className='relative px-2.5'>
          <GnbButton className='absolute top-0 right-0' onClick={handleClickEditAddress}>
            배송지 변경
          </GnbButton>
          <div className='flex h-full items-center justify-start py-2'>
            <span className='text-primary-500-90 mr-2.5 flex text-lg font-bold'>
              {customer?.customerName ?? '주문자'}
            </span>
            <small className='border-primary-500-70 text-primary-500-70 rounded-sm border px-1 py-1'>
              기본 배송지
            </small>
          </div>
          <div className='text-primary-500-90 flex flex-col py-2.5'>
            <span>코딩시 개발동 윈도우로 345</span>
            <span>{customer?.customerMobilePhone ?? 'none'}</span>
          </div>
          <div>
            <textarea
              name=''
              id=''
              placeholder='배송시 요청사항:'
              className='border-primary-500-70 text-primary-500-70 h-26 w-full resize-none rounded-lg border p-2.5'
            ></textarea>
          </div>
          <div className='flex items-center justify-between p-2.5'>
            <div className='text-primary-500-90 text-lg font-bold'>주문 상품 {totalQuantity}개</div>
            <small className='border-primary-500-70 text-primary-500-70 rounded-sm border px-1 py-1'>
              3일 내로 배송
            </small>
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
                    type='number'
                    value={usedPoints || ''}
                    onChange={handleUsedChange}
                    className='border-custom-gray-20 bg-custom-gray-50 mt-5 w-full rounded-lg border p-2.5'
                    placeholder='최소 5000원 이상 보유 시 사용 가능'
                    disabled
                  />
                ) : (
                  <input
                    type='number'
                    value={usedPoints || ''}
                    onChange={handleUsedChange}
                    className='border-primary-500-60 mt-5 w-full rounded-lg border p-2.5'
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
      <div className='sub-info-half-content-with bg-white px-7.5 py-2.5'>
        <div className='py-5'>
          <h3 className='text-lg font-bold'>결제 금액</h3>
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
                <span>-{discountSum.toLocaleString()}</span>원
              </span>
            </li>
            <li className='flex justify-between'>
              <span>적립 사용 금액</span>
              <span>
                <span>-{usedPoints.toLocaleString()}</span>원
              </span>
            </li>
            <li className='flex justify-between'>
              <span>배송비</span>
              <span>{shippingFeeText || '무료배송'}</span>
            </li>
            <li className='mt-4 flex justify-between'>
              <span className='font-semibold'>총 결제 금액</span>
              <span className='font-semibold'>
                <span className='font-semibold'>{totalPayment.toLocaleString()}</span>원
              </span>
            </li>
          </ul>
          <h3 className='mt-10 text-lg font-bold'>적립 혜택</h3>
          <ul className='mt-3 text-base leading-7'>
            <li className='flex justify-between'>
              <span>1% 적립(구매 금액 기준)</span>
              <span>
                <span>{earnedPoints.toLocaleString()}</span>원
              </span>
            </li>
            <li className='bg-primary-500-80 mt-3 flex flex-col justify-between rounded-md px-6 py-3'>
              <span className='flex font-bold text-white'>
                🛍 당신의 한마디가 우리에게 영감이 됩니다.
              </span>
              <span className='flex font-bold text-white'>
                리뷰 작성 시 10% 적립으로 감사의 마음을 전해요.
              </span>
            </li>
          </ul>
          <ul className='mt-3 text-base leading-7'>
            <li className='flex justify-between'>
              <span className='text-primary-500-70 flex text-xs'>
                구매조건 확인 및 결제대행 서비스 약관 동의
              </span>
              <span className='text-primary-500-70 flex text-xs underline underline-offset-1'>
                보기
              </span>
            </li>
            <li className='mt-2.5 flex justify-between'>
              <span className='text-primary-500-70 flex text-xs'>
                OBE STORE의 개인정보 제3자 제공 동의
              </span>
              <span className='text-primary-500-70 flex text-xs underline underline-offset-1'>
                보기
              </span>
            </li>
            <li className='mt-2'>
              <span className='text-primary-500-80 text-sm'>
                위 주문 내용을 확인했으며 개인정보 이용/제공 및 결제에 동의합니다.
              </span>
            </li>
          </ul>
          <FilledButton className='mt-7 text-lg font-bold' variant='filled' fullWidth>
            결제하기
          </FilledButton>
        </div>
      </div>
    </div>
  );
}
