import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ButtonBase } from '@/components/ui';

export function OrderComplete() {
  const navigate = useNavigate();
  const { orderId } = useParams(); // URL에서 orderId를 받음
  const [paymentDetails, setPaymentDetails] = useState<any>(null); // 결제 정보를 저장할 상태
  const [loading, setLoading] = useState(true); // 로딩 상태 관리

  // 결제 정보를 /payments/ API에서 가져오는 함수
  const fetchPaymentDetails = async () => {
    try {
      const response = await axios.post(`/payments/`, {
        orderId: orderId, // URL 파라미터로 받은 orderId를 서버에 전달
      });
      setPaymentDetails(response.data); // 응답 데이터를 상태에 저장
      setLoading(false); // 데이터 로딩 완료
    } catch (error) {
      console.error('결제 정보 로딩 오류:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (orderId) {
      fetchPaymentDetails(); // 결제 정보 API 호출
    } else {
      alert('주문 ID가 없습니다.');
    }
  }, [orderId, navigate]);

  if (loading) {
    return <div>로딩 중...</div>; // 로딩 중일 때 표시할 메시지
  }

  // 결제 정보가 없을 때의 처리
  if (!paymentDetails) {
    return <div>결제 정보를 찾을 수 없습니다.</div>;
  }

  // 메인 페이지로 이동하는 함수
  const goToMainPage = () => {
    navigate('/'); // 메인 페이지로 이동
  };

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center py-[90px] text-lg lg:w-[500px]'>
      <h2 className='text-3xl font-normal'>
        <b className='font-semibold'>주문</b>이 <b className='font-semibold'>완료</b> 되었습니다!
      </h2>
      <p className='mt-12 flex w-full justify-self-start font-extrabold'>
        {new Date(paymentDetails?.createdAt).toLocaleDateString()} (
        {new Date(paymentDetails?.createdAt).toLocaleDateString('ko')})
      </p>
      <div className='mt-3 flex w-full justify-between'>
        <span className='lg:w-[90px]'>주문 번호</span>
        <span>{paymentDetails?.order_number}</span> {/* /payments/ API에서 받은 주문 번호 표시 */}
      </div>
      <div className='border-custom-gray-50 mt-7 flex w-full justify-between border-t pt-7'>
        <span className='lg:w-[90px]'>주문 상품</span>
        <div className='flex flex-col text-right'>
          <span>{paymentDetails?.orderName}</span> {/* /payments/ API에서 받은 orderName 표시 */}
          <span>1개</span>{' '}
          {/* 상품 개수는 현재 하드코딩된 '1개'로 표시, 실제로는 주문 데이터에서 받을 수 있음 */}
          <span>{paymentDetails?.pay_amount.toLocaleString()}원</span> {/* 결제 금액 표시 */}
        </div>
      </div>
      <div className='mt-15 flex gap-3'>
        <ButtonBase variant='hollow'>
          <Link to='/users/orderinfo'>주문 상세 보기</Link>
        </ButtonBase>
        <ButtonBase variant='filled' onClick={goToMainPage}>
          메인으로 이동
        </ButtonBase>
      </div>
      <p className='text-custom-gray-100 mt-5 cursor-default text-base font-light'>
        주문내역 및 배송에 관한 안내는 <b>[주문 상세 보기]</b> 를 통하여 확인 가능합니다.
      </p>
    </div>
  );
}
