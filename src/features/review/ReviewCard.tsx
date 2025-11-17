import type { ProductReviewType } from '@/types';
import { ReviewKeywords, ReviewProfile } from '@/features/review';

interface ReviewCardProps {
  review: ProductReviewType;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className='border-primary-500-40 rounded-lg border-2 bg-white p-4'>
      <ReviewProfile nickname={review.nickname} date={review.created_at} rating={review.rating} />
      <ReviewKeywords keywords={review.review_keyword.map((k) => k.keyword_name)} />
      <p className='text-primary-500-90 mt-3 text-sm leading-relaxed'>{review.content}</p>
    </article>
  );
}
