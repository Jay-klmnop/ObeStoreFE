import { ButtonBase } from '@/components/ui';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams, useSearchParams } from 'react-router-dom';

export function OrderComplete() {
  const navigate = useNavigate();
  const { orderId } = useParams(); // orderId를 URL 파라미터에서 받음
  const [searchParams] = useSearchParams();
  const [orderNumber, setOrderNumber] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  // orderId, status, message 값을 콘솔로 출력
  useEffect(() => {
    if (orderId) {
      console.log('받아온 orderId:', orderId);
      setOrderNumber(orderId); // orderId 값을 상태에 저장
    }
    const status = searchParams.get('status');
    const message = searchParams.get('message');
    if (status) {
      console.log('받아온 status:', status);
      setStatus(status); // status 값을 상태에 저장
    }
    if (message) {
      console.log('받아온 message:', message);
      setMessage(message); // message 값을 상태에 저장
    }
    navigate('/order/complete', { replace: true });
  }, [orderId, searchParams, navigate]);

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center py-[90px] text-lg lg:w-[500px]'>
      <h2 className='text-3xl font-normal'>
        <b className='font-semibold'>주문</b>이 <b className='font-semibold'>완료</b> 되었습니다!
      </h2>
      <p className='mt-12 flex w-full justify-self-start font-extrabold'>25.10.21(화)</p>
      <div className='mt-3 flex w-full justify-between'>
        <span className='lg:w-[90px]'>주문 번호</span>
        <span>{orderNumber}</span> {/* orderId를 화면에 표시 */}
      </div>
      <div className='mt-7'>
        <span>결제 상태: {status}</span> {/* status 표시 */}
      </div>
      <div className='mt-3'>
        <span>메시지: {message}</span> {/* message 표시 */}
      </div>
      <div className='border-custom-gray-50 mt-7 flex w-full justify-between border-t pt-7'>
        <span className='lg:w-[90px]'>주문 상품</span>
        <div className='flex flex-col text-right'>
          <span>[8팩] 20cm 무지 긴목 장목 양말 외 2건</span>
          <span>1개</span>
          <span>15,900원</span>
        </div>
      </div>
      <div className='mt-15 flex gap-3'>
        <ButtonBase variant='hollow'>
          <Link to='/users/orderinfo'>주문 상세 보기</Link>
        </ButtonBase>
        <ButtonBase variant='filled'>
          <Link to='/'>메인으로 이동</Link>
        </ButtonBase>
      </div>
      <p className='text-custom-gray-100 mt-5 cursor-default text-base font-light'>
        주문내역 및 배송에 관한 안내는 <b>[주문 상세 보기]</b> 를 통하여 확인 가능합니다.
      </p>
    </div>
  );
}
