import { CheckBox, FilledButton, GnbButton } from '@/components/ui';
import CartCard from '@/features/cart/CartCard';
import {
  useCartStore,
  useCheckedItemSum,
  useDiscountSum,
  useRewardPoints,
  useSelectedQuantity,
  useShippingFee,
  useTotalPayment,
} from '@/features/cart/store/useCartStore';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const initialCartItems = [
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
  const navigate = useNavigate();
  const {
    cartItems,
    selectAll,
    setCartItems,
    handleSelectAll,
    handleItemCheck,
    removeCheckedItems,
  } = useCartStore();

  const checkedItemSum = useCheckedItemSum();
  const discountSum = useDiscountSum();
  const shippingFee = useShippingFee();
  const totalPayment = useTotalPayment();
  const rewardPoints = useRewardPoints();
  const totalQuantity = useSelectedQuantity();

  useEffect(() => {
    setCartItems(initialCartItems);
  }, [setCartItems]);

  let shippingFeeText = '';
  if (totalQuantity === 0) {
    shippingFeeText = '0원'; // 또는 '배송비 없음' 등
  } else if (shippingFee === 0) {
    shippingFeeText = '무료 배송';
  } else {
    shippingFeeText = `${shippingFee.toLocaleString()}원`;
  }
  const selectedItems = cartItems.filter((item: any) => item.checked);
  const handlePurchase = () => {
    if (selectedItems.length === 0) return alert('상품을 선택해주세요!');
    navigate('/order', {
      state: {
        selectedItems,
        totalPayment,
      },
    });
  };

  return (
    <div className='sub-info-half-content-with-wrap flex w-full'>
      <div className='sub-info-half-content w-[600px] bg-white px-7.5 py-2.5'>
        <div className='flex justify-between py-5'>
          <CheckBox
            id='cart-select-all'
            checked={selectAll}
            label='전체 선택'
            inputMargin='mr-4'
            onChange={(e) => handleSelectAll(e.target.checked)}
            className='pdr-3 text-base'
          />
          <GnbButton label='선택 삭제' onClick={removeCheckedItems} />
        </div>
        {cartItems.map((item) => (
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
                <span>{rewardPoints.toLocaleString()}</span>원
              </span>
            </li>
          </ul>
          <FilledButton
            label={`${totalPayment.toLocaleString()}원 구매하기 (${totalQuantity}개)`}
            className='mt-7 text-lg font-bold'
            variant='filled'
            fullWidth
            onClick={handlePurchase}
          />
        </div>
      </div>
    </div>
  );
}
