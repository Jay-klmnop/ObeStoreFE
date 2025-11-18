import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type OrderStatus = 'success' | 'fail';

interface OrderResultData {
  status: OrderStatus;
  orderNumber: string | null;
  orderId: string | null;
  receiptUrl: string | null;
  code: string | null; // 실패 시 에러 코드
  message: string | null; // 실패 시 에러 메시지
}

export function OrderResult() {
  const [searchParams] = useSearchParams();
  const [result, setResult] = useState<OrderResultData | null>(null);

  useEffect(() => {
    const status = searchParams.get('status') as OrderStatus | null;
    const orderNumber = searchParams.get('order_number');
    const orderId = searchParams.get('orderId');
    const receiptUrl = searchParams.get('receipt_url');
    const code = searchParams.get('code'); // 실패 시 코드
    const message = searchParams.get('message'); // 실패 시 메시지

    // 유효한 파라미터가 없으면 실패 처리
    if (!status || !orderNumber || !orderId || !receiptUrl) {
      setResult({
        status: 'fail',
        orderNumber: null,
        orderId: null,
        receiptUrl: null,
        code: 'INVALID',
        message: '결제 결과를 처리할 수 없습니다. 유효한 주문 번호와 결제 상태를 확인하세요.',
      });
      return;
    }

    // 정상적으로 파라미터가 있으면 결과 설정
    setResult({
      status,
      orderNumber,
      orderId,
      receiptUrl,
      code,
      message,
    });
  }, [searchParams]);

  return (
    <div className='order-result'>
      {result ? (
        result.status === 'success' ? (
          <div>
            <h2>주문 완료</h2>
            <p>주문 번호: {result.orderNumber}</p>
            <p>주문 ID: {result.orderId}</p>
            <p>결제가 성공적으로 완료되었습니다.</p>
            <p>
              영수증: {/* receiptUrl이 null인 경우 빈 문자열("")을 href에 넣도록 처리 */}
              <a href={result.receiptUrl ?? ''} target='_blank' rel='noopener noreferrer'>
                영수증 보기
              </a>
            </p>
          </div>
        ) : (
          <div>
            <h2>주문 실패</h2>
            <p>에러 코드: {result.code}</p>
            <p>에러 메시지: {result.message}</p>
          </div>
        )
      ) : (
        <div>결제 결과를 확인하는 중입니다...</div>
      )}
    </div>
  );
}
