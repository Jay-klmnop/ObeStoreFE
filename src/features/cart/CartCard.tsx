import { CheckBox } from '@/components/ui';

type CartCardProps = {
  id: string;
  brandName: string;
  productName: string;
  img: string;
  quantity?: number;
  className?: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function CartCard({
  id,
  brandName,
  productName,
  quantity,
  img,
  checked,
  onChange,
}: CartCardProps) {
  return (
    <>
      <div className='my-2.5 flex flex-row items-start justify-start py-2.5 leading-none'>
        <div>
          <CheckBox id={id} label='' onChange={onChange} checked={checked} className='mr-3' />
        </div>
        <div className='mr-9 min-w-[200px]'>
          <img src={img} alt='' />
        </div>
        <div>
          <div className='text-base leading-none font-bold text-(--color-primary-700)'>
            {brandName}
          </div>
          <div className='mt-1 line-clamp-2 text-base font-normal text-ellipsis text-(--color-primary-700)'>
            {productName}
          </div>
          <div className='mt-1 text-base font-normal'>{quantity}개</div>
          <div className='mt-1 text-base font-normal'>24,500원</div>
        </div>
      </div>
    </>
  );
}
