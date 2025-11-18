import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

type OrderStatus = 'success' | 'fail';

interface OrderResultData {
  status: OrderStatus;
  orderNumber: string | null;
  orderId: string | null;
  receiptUrl: string | null;
  code: string | null;
  message: string | null;
}

export function OrderResult() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [result, setResult] = useState<OrderResultData | null>(null);

  useEffect(() => {
    const status = searchParams.get('status') as OrderStatus | null;
    const orderNumber = searchParams.get('orderNumber');
    const orderId = searchParams.get('orderId');
    const receiptUrl = searchParams.get('receiptUrl');
    const code = searchParams.get('code');
    const message = searchParams.get('message');

    console.log('쿼리 파라미터:', {
      status,
      orderNumber,
      orderId,
      receiptUrl,
      code,
      message,
    });

    if (!status || !orderNumber || !orderId || !receiptUrl) {
      setResult({
        status: 'fail',
        orderNumber: null,
        orderId: null,
        receiptUrl: null,
        code: 'INVALID',
        message: '유효하지 않은 접근입니다. 결제 정보가 올바르지 않습니다.',
      });
      return;
    }

    const decodedReceiptUrl = receiptUrl ? decodeURIComponent(receiptUrl) : null;

    setResult({
      status,
      orderNumber,
      orderId,
      receiptUrl: decodedReceiptUrl,
      code: code || 'UNKNOWN',
      message: message || '알 수 없는 오류',
    });
  }, [searchParams]);

  // 상태가 세팅되면 다음 라우팅 처리
  useEffect(() => {
    if (!result) return;

    if (result.status === 'success' && result.orderNumber) {
      navigate(
        `/order/complete?orderNumber=${result.orderNumber || ''}&orderId=${result.orderId || ''}&receiptUrl=${encodeURIComponent(result.receiptUrl || '')}`
      );
    } else {
      navigate(`/order/fail?code=${result.code}&message=${result.message}`);
    }
  }, [result, navigate]);

  // result가 null일 경우 로딩 화면 표시
  if (!result) {
    return <div>결제 결과를 확인하는 중입니다...</div>;
  }

  return <div>결제 결과: {result.status}</div>;
}
