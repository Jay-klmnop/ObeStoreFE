import { loadTossPayments, ANONYMOUS } from '@tosspayments/tosspayments-sdk';
import { useEffect, useState } from 'react';

const clientKey = 'test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm';
const customerKey = 'ZzTw2Yj59J0PTFU9haI3y';

type Amount = {
  currency: 'KRW' | 'USD';
  value: number;
};

interface TossPaymentsWidgets {
  setAmount(amount: Amount): Promise<void>;
  renderPaymentMethods(options: { selector: string; variantKey: string }): Promise<void>;
  renderAgreement(options: { selector: string; variantKey: string }): Promise<void>;
  requestPayment(options: {
    orderId: string;
    orderName: string;
    successUrl: string;
    failUrl: string;
    customerEmail: string;
    customerName: string;
    customerMobilePhone: string;
  }): Promise<void>;
}

export function OrderCheckoutPage() {
  const [amount, setAmount] = useState<Amount>({
    currency: 'KRW',
    value: 1_00,
  });
  const [ready, setReady] = useState(false);
  const [widgets, setWidgets] = useState<TossPaymentsWidgets | null>(null);

  useEffect(() => {
    async function fetchPaymentWidgets() {
      // ------  결제위젯 초기화 ------
      const tossPayments = await loadTossPayments(clientKey);
      //회원 결제
      //   const widgets = tossPayments.widgets({
      //     customerKey,
      //   });
      // 비회원 결제
      const widgets = tossPayments.widgets({ customerKey: ANONYMOUS });

      setWidgets(widgets as unknown as TossPaymentsWidgets);
    }

    fetchPaymentWidgets();
    /* }, [clientKey, customerKey]); */
  }, [customerKey]);

  useEffect(() => {
    async function renderPaymentWidgets() {
      if (!widgets) return;
      // ------ 주문의 결제 금액 설정 ------
      await widgets.setAmount(amount);

      await Promise.all([
        // ------  결제 UI 렌더링 ------
        widgets.renderPaymentMethods({
          selector: '#payment-method',
          variantKey: 'DEFAULT',
        }),
        // ------  이용약관 UI 렌더링 ------
        widgets.renderAgreement({
          selector: '#agreement',
          variantKey: 'AGREEMENT',
        }),
      ]);

      setReady(true);
    }

    renderPaymentWidgets();
  }, [widgets]);

  useEffect(() => {
    if (!widgets) return;
    widgets.setAmount(amount);
  }, [widgets, amount]);

  return (
    <div className='wrapper'>
      <div className='box_section'>
        {/* 결제 UI */}
        <div id='payment-method' />
        {/* 이용약관 UI */}
        <div id='agreement' />
        {/* 쿠폰 체크박스 */}
        <div>
          <div>
            <label htmlFor='coupon-box'>
              <input
                id='coupon-box'
                type='checkbox'
                aria-checked='true'
                disabled={!ready}
                onChange={(event) => {
                  const checked = event.target.checked;
                  setAmount((prev) => ({
                    ...prev,
                    value: checked ? prev.value - 5_000 : prev.value + 5_000, // ✅ 금액 수정 부분
                  }));
                }}
              />
              <span>5,000원 쿠폰 적용</span>
            </label>
          </div>
        </div>

        {/* 결제하기 버튼 */}
        <button
          className='button'
          disabled={!ready}
          onClick={async () => {
            if (!widgets) return;
            try {
              // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
              // 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
              // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
              await widgets.requestPayment({
                orderId: 'U4O7Uo5B7rqZhA3V7Y_0o',
                orderName: '토스 티셔츠 외 2건',
                successUrl: window.location.origin + '/order/success',
                failUrl: window.location.origin + '/order/fail',
                customerEmail: 'customer123@gmail.com',
                customerName: '김토스',
                customerMobilePhone: '01012341234',
              });
            } catch (error) {
              // 에러 처리하기
              console.error(error);
            }
          }}
        >
          결제하기
        </button>
      </div>
    </div>
  );
}
