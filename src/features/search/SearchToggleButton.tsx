import { SearchIcon } from '@/components/icon';
import { useSearchStore } from '@/features/search';

export function SearchToggleButton() {
  const { openSearchModal } = useSearchStore();

  return (
    <button type='button' onClick={openSearchModal}>
      <SearchIcon />
    </button>
  );
}
