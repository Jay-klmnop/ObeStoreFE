import { ReviewGrid, useProductReviewsQuery } from '@/features/review';

export function ProductReviewSection({ productId }: { productId: string | number }) {
  const { reviews } = useProductReviewsQuery(productId);

  return <ReviewGrid reviews={reviews ?? []} />;
}
