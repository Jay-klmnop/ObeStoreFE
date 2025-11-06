import { FilledButton } from '@/components/ui';
import { useOrderStore } from './store/useOrderStore';

export default function OrderList() {
  const { orderItems, totalPayment } = useOrderStore();

  return (
    <div className='sub-info-half-content-with-wrap flex w-full'>
      <div className='sub-info-half-content w-[600px] bg-white px-7.5 py-2.5'>
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
                <span></span>원
              </span>
            </li>
            <li className='flex justify-between'>
              <span>할인 금액</span>
              <span>
                <span></span>원
              </span>
            </li>
            <li className='flex justify-between'>
              <span>배송비</span>
              <span></span>
            </li>
            <li className='mt-4 flex justify-between'>
              <span className='font-semibold'>총 결제 금액</span>
              <span className='font-semibold'>
                <span className='font-semibold'></span>원
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
            <li className='flex justify-between'>
              <span>리뷰 적립</span>
              <span>
                <span></span>원
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
          <FilledButton
            label='결제하기'
            className='mt-7 text-lg font-bold'
            variant='filled'
            fullWidth
          />
        </div>
      </div>
    </div>
  );
}
