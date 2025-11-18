import { ErrorMessage, Spinner } from '@/components/ui';
import { ReviewGrid, useReviewsQuery } from '@/features/review';

export function ReviewsSection() {
  const { data: reviews, isLoading, error } = useReviewsQuery();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;

  return (
    <section className='gap-4'>
      <h1 className='text-2xl font-bold md:mb-6 md:text-3xl'>Reviews</h1>
      <div className='p-4'>
        <ReviewGrid reviews={reviews ?? []} />
      </div>
    </section>
  );
}
