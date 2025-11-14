import { CheckBox } from '@/components/ui';
// import { usdToKrw } from '@/features/cart/api/currency';

type CartCardProps = {
  id: string;
  product_name: string;
  price: number;
  amount: number;
  checked: boolean;
  cart: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
// brandName  // productName // img // quantity
export function CartCard({ id, product_name, price, amount, checked, onChange }: CartCardProps) {
  return (
    <>
      <div className='my-2.5 flex flex-row items-start justify-start py-2.5 leading-none'>
        <div>
          <CheckBox
            id={id}
            label=''
            onChange={onChange}
            checked={checked ?? false}
            className='mr-3'
          />
        </div>
        {/* <div className='mr-9 w-[200px]'>
          <img src={images} className='w-full' alt='' />
        </div> */}
        <div>
          <div className='text-color-primary-700) mt-3 line-clamp-2 text-base font-normal text-ellipsis'>
            {product_name}
          </div>
          <div className='text-color-primary-700 mt-1 text-base font-normal'>{amount}개</div>
          <div className='text-color-primary-700 mt-1 text-base font-normal'>{price}원</div>
        </div>
      </div>
    </>
  );
}

export function CartCardNone({ id, product_name, price, amount }: CartCardProps) {
  return (
    <>
      <div className='my-2.5 flex flex-row items-start justify-start py-2.5 leading-none' id={id}>
        {/* <div className='mr-9 w-[200px]'>
          <img src={images} className='w-full' alt='' />
        </div> */}
        <div>
          <div className='text-color-primary-700) mt-3 line-clamp-2 text-base font-normal text-ellipsis'>
            {product_name}
          </div>
          <div className='text-color-primary-700 mt-1 text-base font-normal'>{amount}개</div>
          <div className='text-color-primary-700 mt-1 text-base font-normal'>{price}원</div>
        </div>
      </div>
    </>
  );
}
