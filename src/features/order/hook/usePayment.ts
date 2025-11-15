import { backendAPI } from '@/api';

interface PaymentParams {
  selectedAddressId: number | null; // ← 수정!
  usedPoint: number;
  discountAmount: number;
  deliveryAmount: number;
  deliveryRequest: string;
}

export function usePayment() {
  const handlePayClick = async ({
    selectedAddressId,
    usedPoint,
    discountAmount,
    deliveryAmount,
    deliveryRequest,
  }: PaymentParams) => {
    try {
      // 1) 주문 생성
      const orderRes = await backendAPI.post('/orders', {
        address: selectedAddressId,
        used_point: usedPoint,
        discount_amount: discountAmount,
        delivery_amount: deliveryAmount,
        delivery_request: deliveryRequest,
      });

      const { order_id } = orderRes.data;

      // 2) 결제 준비
      const readyRes = await backendAPI.post('/orders', {
        order_id,
      });

      const readyData = readyRes.data;

      if (!readyData.clientKey) {
        alert('결제 설정(clientKey) 오류');
        return;
      }

      // 3) Toss 위젯 호출
      // @ts-ignore
      const tossPayments = new window.TossPayments(readyData.clientKey);

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
    } catch (err: any) {
      console.error(err);
      if (err?.code === 'USER_CANCEL') {
        alert('사용자가 결제를 취소했습니다.');
      } else {
        alert('결제 중 오류가 발생했습니다.');
      }
    }
  };

  return { handlePayClick };
}
