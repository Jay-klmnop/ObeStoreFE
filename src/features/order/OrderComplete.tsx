import { ButtonBase } from '@/components/ui';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

export function OrderComplete() {
  const navigate = useNavigate();
  const { orderId } = useParams(); // URL에서 orderId를 받아옵니다.
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!orderId) {
      console.error('orderId가 존재하지 않습니다.');
      setLoading(false); // 로딩 상태 종료
      return;
    }

    console.log('받아온 orderId:', orderId); // orderId를 콘솔에 출력

    // orderId가 있을 경우 정상적으로 navigate 처리
    navigate(`/order/complete/${orderId}`, { replace: true });

    // 로딩 종료
    setLoading(false);
  }, [orderId, navigate]);

  if (loading) {
    return <div>주문 정보를 불러오는 중...</div>; // 로딩 화면
  }

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center py-[90px] text-lg lg:w-[500px]'>
      <h2 className='text-3xl font-normal'>
        <b className='font-semibold'>주문</b>이 <b className='font-semibold'>완료</b> 되었습니다!
      </h2>
      <p className='mt-12 flex w-full justify-self-start font-extrabold'>25.10.21(화)</p>
      <div className='mt-3 flex w-full justify-between'>
        <span className='lg:w-[90px]'>주문 번호</span>
        <span>202510211618040002</span>
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
