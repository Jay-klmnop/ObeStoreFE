import type { DummyType } from '@/types';
import { create } from 'zustand';

type FavoriteState = {
  favoriteProducts: DummyType[];
  toggleFavorite: (product: DummyType) => void;
  //나중에 ProductCardType으로 변경
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
