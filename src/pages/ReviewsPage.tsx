import { ErrorMessage, Spinner } from '@/components/ui';
import { ReviewGrid, useReviewsQuery } from '@/features/review';

export function ReviewsPage() {
  const { data: reviews, isLoading, error } = useReviewsQuery();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;

  return (
    <section className='gap-4 p-4'>
      <h1 className='text-xl font-bold'>Reviews</h1>
      <ReviewGrid reviews={reviews ?? []} />
    </section>
  );
}
