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
      <div className='flex max-h-[600px] min-h-96 min-w-60 flex-col items-center justify-center gap-4 text-center'>
        <div className='relative flex h-full w-full flex-col'>
          <img
            src={product.product_image.product_card_image}
            alt={product.product_name}
            className='h-auto w-full min-w-32 object-cover object-top'
            width={300}
            height={400}
          />
          <FavoriteIcon product={product} className='absolute right-2 bottom-2' />
        </div>

        <div className='flex h-20 w-full grow flex-col justify-evenly gap-2 text-left text-xs'>
          <h2>{product.brand_name}</h2>
          <h3 className='font-bold'>{product.product_name}</h3>
          <div className='flex items-center justify-between pr-0.5'>
            <p className='font-bold'>₩{Number(product.product_value).toLocaleString('ko-KR')}</p>
            <ReviewRating initialValue={Number(product.product_rating)} readOnly size={16} />
          </div>
        </div>
      </div>
    </Link>
  );
}
