import type { ProductCardType } from '@/types';
import { ProductCard } from '@/features/product';

interface ProductGridProps {
  products: ProductCardType[];
}

export function ProductGrid({ products }: ProductGridProps) {
  return (
    <div className='m-4 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 self-stretch'>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
