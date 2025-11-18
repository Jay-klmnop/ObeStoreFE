import type { ProductDetailType } from '@/types';
import { ReviewButton, ReviewGrid } from '@/features/review';

interface ProductReviewsProps {
  product: ProductDetailType;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  return (
    <section className='w-full'>
      <div className='w-full items-center justify-end'>
        <ReviewButton product={product} />
      </div>
      <ReviewGrid reviews={product.reviews} />
    </section>
  );
}
