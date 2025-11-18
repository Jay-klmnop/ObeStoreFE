import type { ProductReviewType } from '@/types';
import { ReviewKeywords, ReviewProfile } from '@/features/review';
import { REVIEW_KEYWORDS, type ReviewKeyword } from '@/constants';

interface ReviewCardProps {
  review: ProductReviewType;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const mappedKeywords: ReviewKeyword[] =
    review.review_keyword
      ?.map((k) => REVIEW_KEYWORDS.find((rk) => rk.keyword_name === k.keyword_name))
      .filter((k): k is ReviewKeyword => !!k) ?? [];

  return (
    <article className='border-primary-500-40 rounded-lg border-2 bg-white'>
      <div className='bg-primary-100 rounded-t-lg px-4 pt-4 pb-2'>
        <ReviewProfile nickname={review.nickname} date={review.created_at} rating={review.rating} />
      </div>
      <div className='p-4'>
        <ReviewKeywords keywords={mappedKeywords} />
        <div className='mt-3 flex items-start gap-4'>
          <img
            src={review.review_image[0]?.review_image}
            alt='리뷰 이미지'
            className='max-w-24 sm:max-w-32'
          />
          <div>
            <h1>{review.review_title}</h1>
            <p className='text-primary-500-90 text-sm leading-relaxed'>{review.content}</p>
          </div>
        </div>
      </div>
    </article>
  );
}
