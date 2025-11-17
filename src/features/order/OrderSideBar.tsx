import { useOrderPreviewQuery } from './api/useOrderPreviewQuery';
import PaymentButton from './PaymentButton';
export function OrderSideBar({
  deliveryRequest,
  usedPoints,
  selectedAddressId,
  checkedCartItemIds,
}: {
  deliveryRequest: string;
  usedPoints: number;
  selectedAddressId?: number; // optional
  checkedCartItemIds?: number[]; // optional
}) {
  const { data: preview, isLoading, isError } = useOrderPreviewQuery(usedPoints);

  if (isLoading) return <div>금액 계산 중...</div>;
  if (isError || !preview) return <div>계산 정보를 가져올 수 없습니다.</div>;
  return (
    <div className='mt-5 w-full bg-white px-7.5 py-5 lg:mt-0 lg:w-[450px]'>
      <div className='py-5'>
        <h3 className='text-lg font-bold'>결제 금액</h3>
        <ul className='mt-3 text-base leading-7'>
          <li className='flex justify-between'>
            <span>상품 금액</span>
            <span>
              <span>{preview?.subtotal.toLocaleString() ?? 0}</span>원
            </span>
          </li>
          <li className='flex justify-between'>
            <span>할인 금액</span>
            <span>
              <span>{preview?.discount_amount.toLocaleString() ?? 0}</span>원
            </span>
          </li>
          <li className='flex justify-between'>
            <span>사용 적립 금액</span>
            <span>
              <span>{preview?.used_point.toLocaleString() ?? 0}</span>원
            </span>
          </li>
          <li className='flex justify-between'>
            <span>배송비</span>
            <span>{preview?.delivery_amount.toLocaleString() ?? 0}</span>
          </li>
          <li className='mt-4 flex justify-between'>
            <span className='font-semibold'>최종 결제 금액</span>
            <span className='font-semibold'>
              <span className='font-semibold'>{preview?.total_payment.toLocaleString() ?? 0}</span>
              원
            </span>
          </li>
        </ul>
        <h3 className='mt-10 text-lg font-bold'>적립 혜택</h3>
        <ul className='mt-3 text-base leading-7'>
          <li className='flex justify-between'>
            <span>1% 적립(구매 금액 기준)</span>
            <span>
              <span>{preview?.expected_point ?? 0}</span>원
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
        {/* <ButtonBase
          className='mt-7 text-lg font-bold'
          variant='filled'
          fullWidth
          onClick={onClickPayment}
        >
          결제하기
        </ButtonBase> */}
        <PaymentButton
          addressId={selectedAddressId ?? 1}
          selectedCartItemIds={checkedCartItemIds ?? []}
          preview={preview}
          deliveryRequest={deliveryRequest}
          usedPoint={usedPoints}
        />
      </div>
    </div>
  );
}
