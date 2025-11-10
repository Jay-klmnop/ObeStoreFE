import { ProductGrid, useProductsQuery } from '@/features/product';
import { ErrorMessage, Spinner } from '@/components/ui';
import { useSearchStore } from '@/features/search';
import type { DummyType } from '@/types';

export function ProductsPage() {
  const { data: products, isLoading, isError } = useProductsQuery();
  const { searchTerm } = useSearchStore();
  const filteredProducts = products?.filter((p: DummyType) =>
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message='상품을 불러오는 중 오류가 발생했습니다.' />;

  return (
    <main className='px-4 py-4'>
      <h1 className='mb-4 text-xl font-bold'>상품 목록</h1>
      <ProductGrid products={filteredProducts} />
    </main>
  );
}
