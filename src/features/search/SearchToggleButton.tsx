import { SearchIcon } from '@/components/icon';
import { useSearchStore } from '@/features/search';

export function SearchToggleButton() {
  const { openSearchModal } = useSearchStore();

  return <SearchIcon onClick={openSearchModal} className='cursor-pointer' />;
}
