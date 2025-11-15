import React, { useState } from 'react';
import { backendAPI } from '@/api';

interface PaymentButtonProps {}

const PaymentButton: React.FC<PaymentButtonProps> = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);

      // 1) 결제 준비: 백엔드 /payments/ 로 요청
      const readyRes = await backendAPI.post('/payments', {});

      // 백엔드가 ReadyPaymentResponseSerializer로 내려준 데이터
      const readyData = readyRes.data as {
        orderId: string;
        amount: number;
        successUrl: string;
        failUrl: string;
        clientKey: string | null;
        orderName: string;
        customerEmail?: string;
        customerName?: string;
        customerMobilePhone?: string;
      };

      if (!readyData.clientKey) {
        alert('결제 설정 오류: clientKey가 없습니다.');
        return;
      }

      // 2) TossPayments 객체 생성 (토스 JS SDK 사용)
      // <script src="https://js.tosspayments.com/v1"></script> 가 index.html에 포함되어 있어야 함
      const tossClientKey = readyData.clientKey;
      // @ts-ignore
      const tossPayments = new window.TossPayments(tossClientKey);
      // 3) 결제 요청 - 카드 결제 예시
      await tossPayments.requestPayment('CARD', {
        amount: readyData.amount,
        orderId: readyData.orderId,
        orderName: readyData.orderName,
        successUrl: readyData.successUrl,
        failUrl: readyData.failUrl,
        customerEmail: readyData.customerEmail,
        customerName: readyData.customerName,
        customerMobilePhone: readyData.customerMobilePhone,
      });

      // 여기까지 오기 전에 이미 Toss가 successUrl / failUrl로 리다이렉트 시키기 때문에
      // 실제로는 이 아래 코드는 잘 안 타긴 함
    } catch (error: any) {
      console.error(error);

      // Toss 위젯에서 사용자가 창 닫는 경우 등
      if (error?.code === 'USER_CANCEL') {
        alert('사용자가 결제를 취소했습니다.');
      } else {
        alert('결제 중 오류가 발생했습니다.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleClick} disabled={loading}>
      {loading ? '결제 준비 중...' : '결제하기'}
    </button>
  );
};

export default PaymentButton;
