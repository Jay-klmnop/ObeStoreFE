import { ButtonBase } from '@/components/ui';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios'; // axios import

export function OrderComplete() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<any>(null); // 주문 데이터를 저장할 상태 추가
  const [error, setError] = useState<string | null>(null); // 에러 상태 추가

  // 쿼리 파라미터에서 orderId, orderNumber, receiptUrl 받아오기
  const orderId = searchParams.get('orderId');
  const orderNumber = searchParams.get('orderNumber');
  const receiptUrl = searchParams.get('receiptUrl');

  useEffect(() => {
    if (!orderId || !orderNumber || !receiptUrl) {
      console.error('필수 정보(orderId, orderNumber, receiptUrl)가 존재하지 않습니다.');
      setLoading(false); // 로딩 종료
      return;
    }

    console.log('받아온 orderId:', orderId); // orderId를 콘솔에 출력
    console.log('받아온 orderNumber:', orderNumber); // orderNumber를 콘솔에 출력
    console.log('받아온 receiptUrl:', receiptUrl); // receiptUrl을 콘솔에 출력

    // 정상적으로 navigate 처리
    setLoading(false); // 로딩 종료

    // navigate 호출하여 쿼리 파라미터를 URL로 전달
    navigate(
      `/order/complete?orderNumber=${orderNumber || ''}&orderId=${orderId || ''}&receiptUrl=${encodeURIComponent(receiptUrl || '')}`,
      { replace: true } // 현재 페이지 URL을 변경
    );

    // 주문 정보 API 호출
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`/orders/${orderId}`);
        console.log('주문 정보 응답:', response.data);
        setOrderData(response.data); // 주문 데이터 저장
        setLoading(false); // 로딩 종료
      } catch (error) {
        console.error('주문 정보 로딩 오류:', error);
        setError('주문 정보를 불러오는 중 오류가 발생했습니다.');
        setLoading(false); // 로딩 종료
      }
    };

    fetchOrderDetails();
  }, [orderId, orderNumber, receiptUrl, navigate]); // orderId, orderNumber, receiptUrl, navigate 변경 시 호출

  // 로딩 중일 때 표시할 화면
  if (loading) {
    return <div>주문 정보를 불러오는 중...</div>;
  }

  // 에러 발생 시 화면
  if (error) {
    return <div>{error}</div>;
  }
  console.log('주문 데이터:', orderData);

  return (
    <div className='m-auto flex w-full flex-col items-center justify-center py-[90px] text-lg lg:w-[500px]'>
      <h2 className='text-3xl font-normal'>
        <b className='font-semibold'>주문</b>이 <b className='font-semibold'>완료</b> 되었습니다!
      </h2>
      <p className='mt-12 flex w-full justify-self-start font-extrabold'>25.10.21(화)</p>
      <div className='mt-3 flex w-full justify-between'>
        <span className='lg:w-[90px]'>주문 번호</span>
        <span>{orderNumber}</span> {/* 쿼리 파라미터에서 받아온 orderNumber */}
      </div>
      <div className='border-custom-gray-50 mt-7 flex w-full justify-between border-t pt-7'>
        <span className='lg:w-[90px]'>주문 상품</span>
        <div className='flex flex-col text-right'>
          {/* 주문 상품 데이터가 있을 경우 표시 */}
          {orderData?.items?.map((item: any, index: number) => (
            <div key={index}>
              <span>{item.name}</span>
              <span>{item.quantity}개</span>
              <span>{item.price}원</span>
            </div>
          ))}
        </div>
      </div>
      <div className='mt-15 flex gap-3'>
        <ButtonBase variant='hollow'>
          <Link to={`/users/orderinfo/${orderId}`}>주문 상세 보기</Link>
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
