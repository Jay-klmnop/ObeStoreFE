import type { ProductReviewType } from '@/types';
import { ReviewCard } from '@/features/review';

interface ReviewGridProps {
  reviews: ProductReviewType[];
}

export function ReviewGrid({ reviews }: ReviewGridProps) {
  return (
    <section className='grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3'>
      {reviews.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </section>
  );
}
