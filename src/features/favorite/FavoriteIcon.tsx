import type { ProductCardType } from '@/types';
import { useFavoriteStore } from './store';
import { EmptyHeartIcon, FilledHeartIcon } from '@/components/icon';

interface FavoriteIconProps {
  product: ProductCardType;
}

export function FavoriteIcon({ product }: FavoriteIconProps) {
  const { favoriteProducts, toggleFavorite } = useFavoriteStore();
  const isFavorited = favoriteProducts.some((p) => p.id === product.id);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.preventDefault();
    toggleFavorite(product);
  };

  return (
    <button className='cursor-pointer' onClick={handleClick}>
      {isFavorited ? (
        <FilledHeartIcon size={20} color='var(--color-secondary-300)' />
      ) : (
        <EmptyHeartIcon size={20} color='var(--color-secondary-300)' />
      )}
    </button>
  );
}
