import { Link } from 'react-router-dom';
import { HeartIcon } from '@/components/icon';
import type { ProductCardType } from '@/types';

interface ProductCardProps {
  product: ProductCardType;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`}>
      <div className='flex max-h-96 min-h-80 min-w-60 flex-col items-center justify-center gap-4 rounded-lg p-4 text-center opacity-90 transition-opacity duration-300 ease-in-out'>
        <div className='relative flex h-full w-full flex-col'>
          <img
            src={product.product_image.thumbnail}
            alt={product.product_name}
            className='h-auto w-full min-w-32 rounded-lg object-cover object-top'
            width={300}
            height={400}
          />
          <HeartIcon
            width={20}
            height={20}
            color='var(--color-secondary-300)'
            className='absolute right-2 bottom-2'
          />
        </div>

        <div className='flex h-14 grow flex-col justify-between text-xs'>
          <h2>{product.product_brand}</h2>
          <h3 className='mb-2 font-bold'>{product.product_name}</h3>
          <div>
            <p className='font-bold'>₩{Number(product.product_price).toLocaleString('ko-KR')}</p>
            <p className='font-bold'>{product.product_rating}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
