import { useEffect, useState } from 'react';
import { ButtonBase } from '@/components/ui';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export function OrderComplete() {
  const navigate = useNavigate();
  const { orderId } = useParams(); // URL에서 orderId를 받음
  const [orderDetails, setOrderDetails] = useState<any>(null); // 주문 정보를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  // 주문 정보를 API에서 가져오는 함수
  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`/payments/${orderId}`);
      setOrderDetails(response.data); // 응답 데이터를 상태에 저장
      setLoading(false); // 데이터 로딩 완료
    } catch (error) {
      console.error('주문 정보 로딩 오류:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails(); // 주문 ID가 있으면 API 호출
    } else {
      navigate('/'); // 주문 ID가 없으면 메인 페이지로 이동
    }
  }, [orderId, navigate]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시할 메시지
  }

  // 주문 정보가 없을 때의 처리
  if (!orderDetails) {
    return <div>주문 정보를 찾을 수 없습니다.</div>;
  }

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center py-[90px] text-lg lg:w-[500px]'>
      <h2 className='text-3xl font-normal'>
        <b className='font-semibold'>주문</b>이 <b className='font-semibold'>완료</b> 되었습니다!
      </h2>
      <p className='mt-12 flex w-full justify-self-start font-extrabold'>
        {new Date(orderDetails.createdAt).toLocaleDateString()} (
        {new Date(orderDetails.createdAt).toLocaleDateString('ko')})
      </p>
      <div className='mt-3 flex w-full justify-between'>
        <span className='lg:w-[90px]'>주문 번호</span>
        <span>{orderDetails.orderId}</span>
      </div>
      <div className='border-custom-gray-50 mt-7 flex w-full justify-between border-t pt-7'>
        <span className='lg:w-[90px]'>주문 상품</span>
        <div className='flex flex-col text-right'>
          <span>{orderDetails.orderName}</span>
          <span>1개</span>
          <span>{orderDetails.amount.toLocaleString()}원</span>
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
