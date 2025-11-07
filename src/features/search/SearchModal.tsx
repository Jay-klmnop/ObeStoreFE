import { useSearchNavigation, useSearchStore } from '@/features/search';
import type { MouseEvent } from 'react';
import { SearchIcon } from '@/components/icon';

export function SearchModal() {
  const { searchTerm, setSearchTerm, isOpenSearchModal, closeSearchModal, resetSearch } =
    useSearchStore();
  useSearchNavigation();

  if (!isOpenSearchModal) return null;

  const handleBackdropClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeSearchModal();
      resetSearch();
    }
  };

  return (
    <div
      className='bg-primary-700/50 fixed inset-0 z-50 flex items-start justify-center backdrop-blur-xs'
      onClick={handleBackdropClick}
    >
      <div className='rounded-bg w-full bg-white p-4'>
        <div className='relative flex items-center'>
          <div className='centralize w-10'>
            <SearchIcon />
          </div>
          <input
            type='search'
            className='input ml-4 flex h-10 grow'
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            autoFocus
          />
          <button
            onClick={() => {
              closeSearchModal();
              resetSearch();
            }}
            className='text-primary-700 ml-4 text-2xl font-black'
          >
            ✕
          </button>
        </div>
      </div>
    </div>
  );
}
