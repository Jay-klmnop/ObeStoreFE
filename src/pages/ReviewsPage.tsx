import { ButtonBase, ErrorMessage, Spinner } from '@/components/ui';
import { ReviewGrid } from '@/features/review';
import { useReviewsQuery } from '@/features/review/hooks';

export function ReviewsPage() {
  const { data: reviews, isLoading, error } = useReviewsQuery();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;

  return (
    <section className='p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-xl font-bold'>Reviews</h1>
        <ButtonBase variant='gnb' className='py-1'>
          리뷰 작성
        </ButtonBase>
      </div>
      <ReviewGrid reviews={reviews ?? []} />
    </section>
  );
}
