import { CheckBox } from '@/components/ui';
import CartCard from '@/features/cart/CartCard';
import { useState } from 'react';

type CartItem = {
  id: string;
  brandName: string;
  productName: string;
  img: string;
  quantity: number;
  checked: boolean;
};

const initialCartItems: CartItem[] = [
  {
    id: 'cart-001',
    brandName: 'OBE STORE',
    productName: 'Lknup Colored Mugs (Autumn Edition)',
    img: 'https://placehold.co/200x200',
    quantity: 1,
    checked: false,
  },
  {
    id: 'cart-002',
    brandName: 'Pocket Object',
    productName: 'Classic Tote Bag with Leather Handle',
    img: 'https://placehold.co/200x200',
    quantity: 1,
    checked: false,
  },
  {
    id: 'cart-003',
    brandName: '오즈코딩스쿨',
    productName:
      '상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명상품명',
    img: 'https://placehold.co/200x200',
    quantity: 5,
    checked: false,
  },
];

export default function CartList() {
  const [selectAll, setSelectAll] = useState(false);
  const [cartItem, setCartItem] = useState<CartItem[]>(initialCartItems);

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
    <div className=''>
      <div>
        <CheckBox
          id='cart-select-all'
          checked={selectAll}
          label='전체 선택'
          onChange={handleSelectAll}
          className='text-base'
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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            handleItemCheck(item.id, e.target.checked)
          }
        />
      ))}
    </div>
  );
}
