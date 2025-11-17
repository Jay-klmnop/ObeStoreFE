import { ButtonBase } from '@/components/ui';
import { useCreateOrderMutation } from './api/useOrderQuery';
import { backendAPI } from '@/api';
// import PaymentButton from './PaymentButton';
export function OrderSideBar({ deliveryRequest }: { deliveryRequest: string }) {
  // const { checkedItemSum, discountSum, shippingFeeText } = useOrderStore();
  // const { usedPoints, earnedPoints } = useRewardStore();
  // const { totalPayment } = useCartSummary();
  const { mutate: createOrder } = useCreateOrderMutation();
  const onClickPayment = () => {
    // 임시 주문 생성 (dummy 데이터)
    createOrder(
      {
        delivery_post: 1, // 임시 배송지 ID
        used_point: 0,
        discount_amount: 0,
        delivery_amount: 0,
        subtotal: 10000,
        total_payment: 10000,
        order_items: [
          {
            product: 1, // 임시 상품 ID
            amount: 1,
            price: 10000,
          },
        ],
        delivery_request: deliveryRequest, // 실제 입력한 요청사항
      },
      {
        onSuccess: (res) => {
          console.log('🎉 주문 생성 성공:', res);

          const orderId = res.order_id;
          alert(`임시 주문 생성 완료! 주문번호: ${orderId}`);

          // 단건 조회 테스트
          backendAPI.get(`/orders/${orderId}/`).then((r) => {
            console.log('🔍 단건 조회 데이터:', r.data);
            alert('콘솔에서 delivery_request 저장 여부 확인!');
          });
        },
        onError: (err) => {
          console.error('❌ 주문 생성 실패:', err);
        },
      }
    );
    alert('결제하기');
  };
  return (
    <div className='mt-5 w-full bg-white px-7.5 py-5 lg:mt-0 lg:w-[450px]'>
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
              <span>-</span>원
            </span>
          </li>
          <li className='flex justify-between'>
            <span>사용 적립 금액</span>
            <span>
              <span>-</span>원
            </span>
          </li>
          <li className='flex justify-between'>
            <span>배송비</span>
            <span></span>
          </li>
          <li className='mt-4 flex justify-between'>
            <span className='font-semibold'>최종 결제 금액</span>
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
        <ButtonBase
          className='mt-7 text-lg font-bold'
          variant='filled'
          fullWidth
          onClick={onClickPayment}
        >
          결제하기
        </ButtonBase>
      </div>
    </div>
  );
}
