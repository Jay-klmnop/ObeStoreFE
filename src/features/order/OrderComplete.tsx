import { ButtonBase } from '@/components/ui';
import { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { backendAPI } from '@/api';
import type { OrderEnd, OrderEndProductDetail } from '@/types';

export function OrderComplete() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [orderData, setOrderData] = useState<OrderEnd | null>(null); // 주문 데이터를 저장할 상태 추가
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
        const url = `/orders/${orderId}/`;
        const response = await backendAPI.get<OrderEnd>(url);
        setOrderData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('주문 정보 로딩 오류:', error);
        setError('주문 정보를 불러오는 중 오류가 발생했습니다.');
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, orderNumber, receiptUrl, navigate]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString().slice(-2);

    const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
    const weekday = weekdays[date.getDay()];

    return `${day}.${month}.${year}(${weekday})`;
  };

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
      <p className='mt-12 flex w-full justify-self-start font-extrabold'>
        {' '}
        {orderData ? formatDate(orderData.created_at) : ''}
      </p>
      <div className='mt-3 flex w-full justify-between'>
        <span className='lg:w-[90px]'>주문 번호</span>
        <span>{orderNumber}</span> {/* 쿼리 파라미터에서 받아온 orderNumber */}
      </div>
      <div className='border-custom-gray-50 mt-7 flex w-full justify-between border-t pt-7'>
        <span className='lg:w-[90px]'>주문 상품</span>
        <div className='flex flex-col text-right'>
          {/* 주문 상품 데이터가 있을 경우 표시 */}
          {orderData?.order_products_detail.map((item: OrderEndProductDetail, index: number) => (
            <div key={index} className='flex-col justify-end'>
              <span>{item.product_name}</span>
              <span>{item.amount}개</span>
              <span>{item.price}원</span>
            </div>
          ))}
        </div>
      </div>
      <div className='border-custom-gray-50 mt-7 flex w-full justify-between border-t pt-7'>
        <span className='lg:w-[90px]'>배송시 요청사항</span>
        <span>{orderData?.delivery_request}</span>
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
