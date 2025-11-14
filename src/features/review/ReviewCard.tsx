import type { ReviewType } from '@/types';
import { ReviewKeywords, ReviewProfile } from '@/features/review';

interface ReviewCardProps {
  review: ReviewType;
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className='border-primary-500-40 rounded-2xl border bg-white p-4'>
      <ReviewProfile reviewerName={review.reviewerName} date={review.date} rating={review.rating} />
      <ReviewKeywords keywords={review.keywords} />
      <p className='text-primary-500-90 mt-3 text-sm leading-relaxed'>{review.comment}</p>
    </article>
  );
}
