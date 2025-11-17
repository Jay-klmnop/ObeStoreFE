import { ErrorMessage, Spinner } from '@/components/ui';
import { ProductDetail, useProductDetailQuery } from '@/features/product';
import { useParams } from 'react-router-dom';

export function ProductDetailPage() {
  const { productId } = useParams<{ productId: string }>();
  const { product, productLoading, productError } = useProductDetailQuery(productId!);

  if (productLoading) return <Spinner />;
  if (productError || !product) return <ErrorMessage />;

  return <ProductDetail product={product} />;
}
