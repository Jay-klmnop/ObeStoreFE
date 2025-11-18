import type { ProductCardType } from '@/types';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type FavoriteState = {
  favoriteProducts: ProductCardType[];
  toggleFavorite: (product: ProductCardType) => void;
  reset: () => void;
};

const initialState = {
  favoriteProducts: [],
};

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set) => ({
      ...initialState,
      toggleFavorite: (product) =>
        set((state) => ({
          favoriteProducts: state.favoriteProducts.some((p) => p.id === product.id)
            ? state.favoriteProducts.filter((p) => p.id !== product.id)
            : [...state.favoriteProducts, product],
        })),
      reset: () => set(initialState),
    }),
    {
      name: 'favorite-storage',
      partialize: (state) => ({
        favoriteProducts: state.favoriteProducts,
      }),
    }
  )
);
