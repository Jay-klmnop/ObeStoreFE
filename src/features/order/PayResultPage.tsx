import { useLocation } from 'react-router-dom'; // Next.js면 useSearchParams 사용

function useQuery() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

const PayResultPage: React.FC = () => {
  const query = useQuery();
  const status = query.get('status'); // success | fail

  if (status === 'success') {
    const orderNumber = query.get('orderNumber');
    const receiptUrl = query.get('receiptUrl');

    return (
      <div>
        <h1>결제가 완료되었습니다 🎉</h1>
        <p>주문번호: {orderNumber}</p>
        {receiptUrl && (
          <p>
            영수증:{' '}
            <a href={receiptUrl} target='_blank' rel='noreferrer'>
              확인하기
            </a>
          </p>
        )}
      </div>
    );
  }

  // 실패/취소 케이스
  const code = query.get('code');
  const message = query.get('message');
  const orderId = query.get('orderId');

  return (
    <div>
      <h1>결제가 실패하거나 취소되었습니다 😥</h1>
      {orderId && <p>주문 ID: {orderId}</p>}
      {code && <p>에러 코드: {code}</p>}
      {message && <p>사유: {message}</p>}
      <button onClick={() => (window.location.href = '/cart')}>장바구니로 돌아가기</button>
    </div>
  );
};

export default PayResultPage;
