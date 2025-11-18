import type { ProductDetailType } from '@/types';
import { ReviewButton, ReviewGrid } from '@/features/review';

interface ProductReviewsProps {
  product: ProductDetailType;
}

export function ProductReviews({ product }: ProductReviewsProps) {
  return (
    <section className='w-full'>
      <div className='flex w-full items-center justify-between pb-4'>
        <h1 className='text-xl font-bold md:text-2xl'>상품 리뷰</h1>
        <ReviewButton product={product} />
      </div>
      <ReviewGrid reviews={product.reviews} />
    </section>
  );
}
