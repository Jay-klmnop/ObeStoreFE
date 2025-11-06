import { useLocation } from 'react-router-dom';

type OrderLocationState = {
  selectedItems: any[]; // 또는 CartItem[] 으로 지정 가능
  totalPayment: number;
};

export default function OrderCard() {
  const location = useLocation();
  const state = location.state as OrderLocationState; // 👈 useLocation의 state를 타입 단언
  const { selectedItems, totalPayment } = state || { selectedItems: [], totalPayment: 0 };

  return (
    <div>
      <h2>주문서 페이지</h2>
      <p>총 결제 금액: {totalPayment.toLocaleString()}원</p>
      <h3>선택된 상품:</h3>
      <ul>
        {selectedItems.length > 0 ? (
          selectedItems.map((item, i) => (
            <li key={i}>
              {item.productName} ({item.quantity}개) - {item.price.toLocaleString()}원
            </li>
          ))
        ) : (
          <li>선택된 상품이 없습니다.</li>
        )}
      </ul>
    </div>
  );
}
