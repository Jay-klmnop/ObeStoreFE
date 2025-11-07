import { ProductCard } from '@/features/product';
import { useFavoriteStore } from '@/features/favorite';

export function FavoriteGrid() {
  const { favoriteProducts } = useFavoriteStore();

  return (
    <div className='mx-4 my-4 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-4 self-stretch'>
      {favoriteProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
