import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

type OrderStatus = 'success' | 'fail';

interface OrderResultData {
  status: OrderStatus;
  orderNumber: string | null;
  code: string | null;
  message: string | null;
  receiptUrl: string | null; // receiptUrl을 추가
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
    const receiptUrl = searchParams.get('receiptUrl'); // receiptUrl 받기

    // 쿼리 파라미터 값 확인 (로그 추가)
    console.log('쿼리 파라미터 값:', { status, orderNumber, code, message, receiptUrl });

    // 잘못된 접근 처리
    if (!status) {
      setResult({
        status: 'fail',
        orderNumber: null,
        code: 'INVALID',
        message: '유효하지 않은 접근입니다.',
        receiptUrl: null,
      });
      return;
    }

    setResult({
      status,
      orderNumber,
      code,
      message,
      receiptUrl,
    });
  }, [searchParams]);

  // 상태가 세팅되면 다음 라우팅 처리
  useEffect(() => {
    if (!result) return;

    // result 상태 확인 (로그 추가)
    console.log('결과 상태:', result);

    if (result.status === 'success' && result.orderNumber) {
      // 결제 성공 → 영수증 URL로 리다이렉트
      if (result.receiptUrl) {
        console.log('리디렉션 URL:', decodeURIComponent(result.receiptUrl)); // 디코딩된 receiptUrl 확인
        window.location.href = decodeURIComponent(result.receiptUrl); // receiptUrl로 리다이렉트
      } else {
        navigate(`/order/complete?orderNumber=${result.orderNumber}`);
      }
    } else {
      // 실패 → 실패 안내 페이지 or 메인 이동
      console.log('결제 실패 코드와 메시지:', result.code, result.message); // 실패 코드와 메시지 확인
      navigate(`/order/fail?code=${result.code}&message=${result.message}`);
    }
  }, [result, navigate]);

  return <div>잠시만요... 결제 결과 확인 중입니다.</div>;
}
