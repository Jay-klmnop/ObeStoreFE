import { Link } from 'react-router-dom';
import { ReviewRating } from '@/components/ui';
import type { ProductCardType } from '@/types';
import { FavoriteIcon } from '@/features/favorite';

interface ProductCardProps {
  product: ProductCardType;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Link to={`/products/${product.id}`}>
      <div className='flex max-h-96 min-h-80 min-w-60 flex-col items-center justify-center gap-4 p-4 text-center opacity-90 transition-opacity duration-300 ease-in-out'>
        <div className='relative flex h-full w-full flex-col'>
          <img
            src={product.product_image.product_card_image}
            alt={product.product_name}
            className='h-auto w-full min-w-32 object-cover object-top'
            width={300}
            height={400}
          />
          <FavoriteIcon product={product} />
        </div>

        <div className='flex h-14 grow flex-col justify-evenly text-xs'>
          <h2>{product.brand_name}</h2>
          <h3 className='mb-2 font-bold'>{product.product_name}</h3>
          <div className='flex justify-between'>
            <p className='font-bold'>₩{Number(product.dc_value).toLocaleString('ko-KR')}</p>
            <ReviewRating initialValue={Number(product.product_rating)} readOnly size={12} />
          </div>
        </div>
      </div>
    </Link>
  );
}
