import { CheckBox } from '@/components/ui';
import CartCard from '@/features/cart/CartCard';
import { useMemo, useState } from 'react';

type CartItem = {
  id: string;
  brandName: string;
  productName: string;
  img: string;
  quantity: number;
  checked: boolean;
  price: number;
};

const initialCartItems: CartItem[] = [
  {
    id: 'cart-001',
    brandName: 'OBE STORE',
    productName: 'Lknup Colored Mugs (Autumn Edition)',
    img: 'https://placehold.co/200x200',
    quantity: 1,
    price: 45000,
    checked: false,
  },
  {
    id: 'cart-002',
    brandName: 'Pocket Object',
    productName: 'Classic Tote Bag with Leather Handle',
    img: 'https://placehold.co/200x200',
    quantity: 1,
    price: 75000,
    checked: false,
  },
  {
    id: 'cart-003',
    brandName: '오즈코딩스쿨',
    productName:
      '상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명',
    img: 'https://placehold.co/200x200',
    quantity: 5,
    price: 98000,
    checked: false,
  },
];

export default function CartList() {
  const [selectAll, setSelectAll] = useState(false);
  const [cartItem, setCartItem] = useState<CartItem[]>(initialCartItems);

  const { checkedItemSum, discountSum } = useMemo((): {
    checkedItemSum: number;
    discountSum: number;
  } => {
    const checkedItems = cartItem.filter((item) => item.checked);

    const sum = checkedItems.reduce((acc, item) => {
      // (가격 * 수량)을 누적합니다.
      return acc + item.price * item.quantity;
    }, 0);
    const discount = sum > 50000 ? 1000 : 0; // 임시

    return {
      checkedItemSum: sum,
      discountSum: discount,
    };
  }, [cartItem]);

  const totalPayment = checkedItemSum - discountSum;

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setSelectAll(checked);
    const updatedItems = cartItem.map((item) => ({
      ...item,
      checked,
    }));
    setCartItem(updatedItems);
  };

  const handleItemCheck = (id: string, checked: boolean) => {
    const updated = cartItem.map((item) => (item.id === id ? { ...item, checked } : item));
    setCartItem(updated);
    const allChecked = updated.every((item) => item.checked);
    setSelectAll(allChecked);
  };

  return (
    <div className='flex w-full flex-row justify-between'>
      <div className='sub-info-half-content w-[600px] bg-white px-7.5 py-2.5'>
        <div className='py-5'>
          <CheckBox
            id='cart-select-all'
            checked={selectAll}
            label='전체 선택'
            inputpd='mr-4'
            onChange={handleSelectAll}
            className='pdr-3 text-base'
          />
        </div>
        {cartItem.map((item) => (
          <CartCard
            key={item.id}
            id={item.id}
            brandName={item.brandName}
            productName={item.productName}
            img={item.img}
            quantity={item.quantity}
            checked={item.checked}
            price={item.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleItemCheck(item.id, e.target.checked)
            }
          />
        ))}
      </div>
      <div className='bg-white px-7.5 py-2.5'>
        <h3>구매 금액</h3>
        <ul>
          <li>
            <span>상품 금액</span>
            <span>
              <span>{checkedItemSum.toLocaleString()}</span>원
            </span>
          </li>
          <li>
            <span>할인 금액</span>
            <span>
              <span>{discountSum.toLocaleString()}</span>원
            </span>
          </li>
          <li>
            <span>배송비</span>
            <span>무료 배송</span>
          </li>
          <li>
            <span>총 결제 금액</span>
            <span>
              <span>{totalPayment.toLocaleString()}</span>원
            </span>
          </li>
          <li>
            <span className=''>적립 혜택 예상</span>
            <span className=''>
              <span>최대</span>
              <span>6,172</span>원
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
