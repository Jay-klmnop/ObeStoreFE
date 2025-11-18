import { ErrorMessage, Spinner } from '@/components/ui';
import { ProductDetail, useProductDetailQuery } from '@/features/product';
import { useParams } from 'react-router-dom';

export function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { product, productLoading, productError } = useProductDetailQuery(id!);

  console.log('🔥 productId from URL:', id);

  if (productLoading) return <Spinner />;
  if (productError) return <ErrorMessage message='상품 정보를 불러오지 못했습니다.' />;
  if (!product) return <ErrorMessage message='상품이 존재하지 않습니다.' />;

  return <ProductDetail product={product} />;
}
