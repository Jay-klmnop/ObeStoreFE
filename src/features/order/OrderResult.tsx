import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

type OrderStatus = 'success' | 'fail';

interface OrderResultData {
  status: OrderStatus;
  orderNumber: string | null; // order_number
  orderId: string | null; // orderId
  receiptUrl: string | null; // receiptUrl
  code: string | null; // 실패 시 에러 코드
  message: string | null; // 실패 시 에러 메시지
}

export function OrderResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<OrderResultData | null>(null);

  useEffect(() => {
    // 새로운 쿼리 파라미터들 가져오기
    const status = searchParams.get('status') as OrderStatus | null;
    const orderNumber = searchParams.get('orderNumber');
    const orderId = searchParams.get('orderId');
    const receiptUrl = searchParams.get('receiptUrl');
    const code = searchParams.get('code');
    const message = searchParams.get('message');

    // 쿼리 파라미터 로그 출력
    console.log('쿼리 파라미터:', {
      status,
      orderNumber,
      orderId,
      receiptUrl,
      code,
      message,
    });

    // 파라미터가 하나라도 없으면 오류 처리
    if (!status || !orderNumber || !orderId || !receiptUrl) {
      setResult({
        status: 'fail',
        orderNumber: null,
        orderId: null,
        receiptUrl: null,
        code: 'INVALID', // 기본 오류 코드 설정
        message: '유효하지 않은 접근입니다. 결제 정보가 올바르지 않습니다.뉴뉴', // 기본 오류 메시지 설정
      });
      return;
    }

    // receiptUrl을 URL 디코딩
    const decodedReceiptUrl = receiptUrl ? decodeURIComponent(receiptUrl) : null;

    // 정상적으로 파라미터가 있으면 결과 설정
    setResult({
      status,
      orderNumber,
      orderId,
      receiptUrl: decodedReceiptUrl,
      code: code || 'UNKNOWN', // code가 없으면 기본값 'UNKNOWN' 설정
      message: message || '알 수 없는 오류', // message가 없으면 기본값 설정
    });
  }, [searchParams]);

  // 상태가 세팅되면 다음 라우팅 처리
  useEffect(() => {
    if (!result) return;

    if (result.status === 'success' && result.orderNumber) {
      // 주문 완료 페이지로 이동
      navigate(
        `/order/complete?orderNumber=${result.orderNumber || ''}&orderId=${result.orderId || ''}&receiptUrl=${encodeURIComponent(result.receiptUrl || '')}`
      );
    } else {
      // 실패 → 실패 안내 페이지
      navigate(`/order/fail?code=${result.code}&message=${result.message}`);
    }
  }, [result, navigate]);

  return <div>잠시만요... 결제 결과 확인 중입니다.</div>;
}
