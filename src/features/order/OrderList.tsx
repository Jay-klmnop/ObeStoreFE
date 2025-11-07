// import { FilledButton } from '@/components/ui';
// import { useOrderStore } from './store/useOrderStore';
import { useCartQuery } from '@/features/cart/api/useCartQuery';
import { useOrderStore } from './store/useOrderStore';
// import type { CartItem } from '@/types/order';
import { FilledButton, GnbButton } from '@/components/ui';
import CartCard from '../cart/CartCard';
// import { useCartSummary } from '@/features/cart/hook/useCartSummary';

export default function OrderList() {
  //   const {
  //   checkedItemSum,
  //   discountSum,
  //   shippingFee,
  //   shippingFeeText,
  //   totalPayment,
  //   rewardPoints,
  //   totalQuantity,
  // } = useCartSummary();

  const { data: cartItems = [], isLoading, isError } = useCartQuery();

  console.log(cartItems);
  const { orderItems, totalPayment, checkedItemSum, discountSum, shippingFeeText, totalQuantity } =
    useOrderStore();

  if (isLoading) return <div>결제 정보를 준비 중입니다...</div>;
  if (isError || !cartItems) return <div>결제에 필요한 장바구니 정보를 찾을 수 없습니다.</div>;

  return (
    <div className='sub-info-half-content-with-wrap flex w-full'>
      <div className='sub-info-half-content w-[600px] bg-white px-7.5 py-5'>
        <div className='relative px-2.5'>
          <GnbButton className='absolute top-0 right-0'>배송지 변경</GnbButton>
          <div className='flex h-full items-center justify-start py-2'>
            <span className='text-primary-500-90 mr-2.5 flex text-lg font-bold'>김오브</span>
            <small className='border-primary-500-70 text-primary-500-70 rounded-sm border px-1 py-1'>
              기본 배송지
            </small>
          </div>
          <div className='text-primary-500-90 flex flex-col py-2.5'>
            <span>코딩시 개발동 윈도우로 345</span>
            <span>010-0011-1001</span>
          </div>
          <div>
            <textarea
              name=''
              id=''
              placeholder='배송시 요청사항:'
              className='border-primary-500-70 text-primary-500-70 h-26 w-full rounded-lg border p-2.5'
            ></textarea>
          </div>
        </div>
        <div className='flex items-center justify-between p-2.5'>
          <div>주문 상품 {totalQuantity}개</div>
          <small className='border-primary-500-70 text-primary-500-70 rounded-sm border px-1 py-1'>
            3일 내로 배송
          </small>
        </div>
        <div>
          {orderItems.map((product) => (
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
            />
          ))}
        </div>
        {/*  */}
        <h2>주문서 페이지</h2>
        <p>총 결제 금액: {totalPayment.toLocaleString()}원</p>
        <h3>선택된 상품:</h3>
        <ul>
          {orderItems.length > 0 ? (
            orderItems.map((item, i) => (
              <li key={i}>
                {item.title} ({item.stock}개) - {item.price.toLocaleString()}원
              </li>
            ))
          ) : (
            <li>선택된 상품이 없습니다.</li>
          )}
        </ul>
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
                <span></span>원
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
            <li className='mt-4 flex justify-between'>
              <span className='font-semibold'>총 적립 금액</span>
              <span className='font-semibold'>
                <span className='font-semibold'></span>원
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
