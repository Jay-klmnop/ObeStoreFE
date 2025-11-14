import { ProductGrid, ProductSort, useProductsQuery } from '@/features/product';
import { ErrorMessage, Spinner } from '@/components/ui';
import { useSearchStore } from '@/features/search';
import type { ProductCardType } from '@/types';
import { useMemo, useState } from 'react';

export function ProductsPage() {
  const { searchTerm } = useSearchStore();
  const [sortOption, setSortOption] = useState('');
  const { data: products, isLoading, isError } = useProductsQuery({ sortOption });

  const filteredProducts = useMemo(() => {
    if (!products) return [];
    return products.filter((p: ProductCardType) =>
      p.product_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [products, searchTerm]);

  if (isLoading) return <Spinner />;
  if (isError) return <ErrorMessage message='상품을 불러오는 중 오류가 발생했습니다.' />;

  return (
    <main className='p-4'>
      <div className='mb-4 flex items-center justify-between'>
        <h1 className='text-xl font-bold'>상품 목록</h1>
        <ProductSort selectedOption={sortOption} onChange={setSortOption} />
      </div>
      <ProductGrid products={filteredProducts} />
    </main>
  );
}
