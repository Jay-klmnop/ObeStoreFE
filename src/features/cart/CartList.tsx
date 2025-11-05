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
  const calculateShippingPayment = (): number => {
    const FREE_SHIPPING_THRESHOLD = 50000;
    const SHIPPING_FEE = 3500;

    if (checkedItemSum > FREE_SHIPPING_THRESHOLD) {
      return 0;
    }
    return SHIPPING_FEE;
  };
  const shippingFee = calculateShippingPayment();
  const shippingFeeText = shippingFee === 0 ? '무료 배송' : `${shippingFee.toLocaleString()}원`;
  const totalPayment = checkedItemSum - discountSum + shippingFee;

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
    <div className='sub-info-half-content-with-wrap flex w-full flex-row'>
      <div className='sub-info-half-content w-[600px] bg-white px-7.5 py-2.5'>
        <div className='py-5'>
          <CheckBox
            id='cart-select-all'
            checked={selectAll}
            label='전체 선택'
            inputMargin='mr-4'
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
      <div className='sub-info-half-content-with bg-white px-7.5 py-2.5'>
        <div className='py-5'>
          <h3 className='text-lg font-bold'>구매 금액</h3>
          <ul className='mt-3 text-base leading-7'>
            <li className='flex justify-between'>
              <span>상품 금액</span>
              <span>
                <span>{checkedItemSum.toLocaleString()}</span>원
              </span>
            </li>
            <li className='flex justify-between'>
              <span>할인 금액</span>
              <span>
                <span>{discountSum.toLocaleString()}</span>원
              </span>
            </li>
            <li className='flex justify-between'>
              <span>배송비</span>
              <span>{shippingFeeText}</span>
            </li>
            <li className='mt-4 flex justify-between'>
              <span className='font-semibold'>총 결제 금액</span>
              <span className='font-semibold'>
                <span className='font-semibold'>{totalPayment.toLocaleString()}</span>원
              </span>
            </li>
            <li className='flex justify-between'>
              <span className=''>적립 혜택 예상</span>
              <span className=''>
                <span>최대</span>
                <span>6,172</span>원
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
