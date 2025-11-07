import { LuSearch } from 'react-icons/lu';
import type { IconProps } from '@/components/types';
import { useSearchStore } from '@/features/search';

export function SearchIcon({ color, className }: IconProps) {
  const { openSearchModal } = useSearchStore();

  return (
    <button onClick={openSearchModal}>
      <LuSearch size={25} strokeWidth={2.1} color={color} className={className} />
    </button>
  );
}
