import { create } from 'zustand';

interface SearchStoreState {
  searchTerm: string;
  isOpenSearchModal: boolean;
  setSearchTerm: (term: string) => void;
  openSearchModal: () => void;
  closeSearchModal: () => void;
  resetSearch: () => void;
}

export const useSearchStore = create<SearchStoreState>((set) => ({
  searchTerm: '',
  isOpenSearchModal: false,

  setSearchTerm: (term: string) => set({ searchTerm: term }),

  openSearchModal: () =>
    set({
      isOpenSearchModal: true,
    }),

  closeSearchModal: () =>
    set({
      isOpenSearchModal: false,
    }),

  resetSearch: () =>
    set({
      searchTerm: '',
      isOpenSearchModal: false,
    }),
}));
