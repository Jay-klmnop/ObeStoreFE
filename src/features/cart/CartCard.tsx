import { CheckBox } from '@/components/ui';
// import { usdToKrw } from '@/features/cart/api/currency';

type CartCardProps = {
  id: string;
  brand: string;
  title: string;
  images: string;
  stock?: number;
  className?: string;
  price: number;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};
// brandName  // productName // img // quantity
export default function CartCard({
  id,
  brand,
  title,
  stock,
  images,
  price,
  checked,
  onChange,
}: CartCardProps) {
  return (
    <>
      <div className='my-2.5 flex flex-row items-start justify-start py-2.5 leading-none'>
        <div>
          <CheckBox id={id} label='' onChange={onChange} checked={checked} className='mr-3' />
        </div>
        <div className='mr-9 w-[200px]'>
          <img src={images} className='w-full' alt='' />
        </div>
        <div>
          <div className='text-color-primary-700 text-base leading-none font-bold'>{brand}</div>
          <div className='text-color-primary-700) mt-1 line-clamp-2 text-base font-normal text-ellipsis'>
            {title}
          </div>
          <div className='mt-1 text-base font-normal'>{stock}개</div>
          <div className='mt-1 text-base font-normal'>{price}원</div>
        </div>
      </div>
    </>
  );
}
