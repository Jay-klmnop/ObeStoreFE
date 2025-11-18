import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

type OrderStatus = 'success' | 'fail';

interface OrderResultData {
  status: OrderStatus;
  orderNumber: string | null;
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
    const code = searchParams.get('code');
    const message = searchParams.get('message');

    // 잘못된 접근 처리
    if (!status || !orderNumber) {
      setResult({
        status: 'fail',
        orderNumber: null,
        code: 'INVALID',
        message: '결제 결과를 처리할 수 없습니다. 유효한 주문 번호와 결제 상태를 확인하세요.',
      });
      return;
    }

    setResult({
      status,
      orderNumber,
      code,
      message,
    });
  }, [searchParams]);

  // 상태가 세팅되면 다음 라우팅 처리
  useEffect(() => {
    if (!result) return;

    if (result.status === 'success' && result.orderNumber) {
      // 주문 완료 페이지로 이동 (orderNumber를 URL 파라미터로 전달)
      navigate(`/order/complete/${result.orderNumber}`);
    } else {
      // 실패 → 실패 안내 페이지 or 메인 이동
      navigate(`/order/fail?code=${result.code}&message=${result.message}`);
    }
  }, [result, navigate]);

  return <div>잠시만요... 결제 결과 확인 중입니다.</div>;
}
