import { ProductGrid, ProductSort, useProductsQuery } from '@/features/product';
import { ErrorMessage, Spinner } from '@/components/ui';
import { useSearchStore } from '@/features/search';
import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export function ProductsPage() {
  const { searchTerm } = useSearchStore();
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category') ?? undefined;
  const [sortOption, setSortOption] = useState('');

  const {
    data: products,
    isLoading,
    isError,
  } = useProductsQuery({
    sortOption,
    category,
    searchTerm,
  });

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message='상품을 불러오는 중 오류가 발생했습니다.' />;

  return (
    <main className='p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-xl font-bold'>상품 목록</h1>
        <ProductSort selectedOption={sortOption} onChange={setSortOption} />
      </div>
      {products && products.length > 0 ? (
        <ProductGrid products={products} />
      ) : (
        <p>표시할 상품이 없습니다.</p>
      )}
    </main>
  );
}
