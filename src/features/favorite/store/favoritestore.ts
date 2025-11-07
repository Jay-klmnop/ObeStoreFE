import type { ProductCardType } from '@/types';
import { create } from 'zustand';

type FavoriteState = {
  favoriteProducts: ProductCardType[];
  toggleFavorite: (product: ProductCardType) => void;
};

export const useFavoriteStore = create<FavoriteState>((set) => ({
  favoriteProducts: [],
  toggleFavorite: (product) =>
    set((state) => ({
      favoriteProducts: state.favoriteProducts.some((p) => p.id === product.id)
        ? state.favoriteProducts.filter((p) => p.id !== product.id)
        : [...state.favoriteProducts, product],
    })),
}));
