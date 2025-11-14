import type { ProductCardType } from '@/types';
import { ProductCard } from '@/features/product';

interface ProductSectionProps {
  title: string;
  products: ProductCardType[];
  isLoading: boolean;
}

export const ProductSection = ({ title, products, isLoading }: ProductSectionProps) => {
  if (isLoading) {
    return (
      <section className='mb-12 md:mb-16'>
        <h2 className='mb-4 text-2xl font-bold md:mb-6 md:text-3xl'>{title}</h2>
        <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 md:gap-6 lg:grid-cols-5'>
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className='animate-pulse'>
              <div className='mb-3 aspect-square rounded-lg bg-gray-200'></div>
              <div className='mb-2 h-4 rounded bg-gray-200'></div>
              <div className='h-4 w-2/3 rounded bg-gray-200'></div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <section className='mb-12 text-center md:mb-16'>
        <h2 className='mb-4 text-2xl font-bold md:mb-6 md:text-3xl'>{title}</h2>
        <p className='text-stone-400'>현재 표시할 상품이 없습니다.</p>
      </section>
    );
  }

  return (
    <section className='mb-12 md:mb-16'>
      <h2 className='mb-4 text-2xl font-bold md:mb-6 md:text-3xl'>{title}</h2>
      <div className='m-4 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-8 self-stretch'>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};
