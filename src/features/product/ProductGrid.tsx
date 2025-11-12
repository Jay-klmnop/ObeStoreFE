import type { DummyType } from '@/types';
import { ProductCard } from '@/features/product';

interface ProductGridProps {
  products: DummyType[]; //나중에 ProductCardType으로 변경
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className='m-4 grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 self-stretch'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
