import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProductDetail } from "@/features/product";
import { getProductDetail, getProductReviews } from "@/api/product";

export function ProductDetailPage() {
  const { id } = useParams();

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['productDetail', id],
    queryFn: () => getProductDetail(Number(id)),
    enabled: !!id,
  });

  const {
    data: reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useQuery({
    queryKey: ['reviews', id],
    queryFn: () => getProductReviews(Number(id)),
    enabled: !!id,
  });

  if (isLoading) { //로딩중(원형 스피너style)
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-500-40 border-t-primary-700">
        </div>
      </div>
    );
  }

  if (error || !product) { //에러 처리 or 상품이 없을 때
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p className="text-primary-500-80">상품을 찾을 수 없습니다.</p>
      </div>
    );
  }

  return (
    <ProductDetail
      product={product}
      reviews={reviews}
      reviewsLoading={reviewsLoading}
      reviewsError={reviewsError}
    />
  );
}