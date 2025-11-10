import { LuSearch } from 'react-icons/lu';
import type { IconProps } from '@/components/types';

export function SearchIcon({ color, className, onClick }: IconProps) {
  return (
    <LuSearch size={25} strokeWidth={2.1} color={color} className={className} onClick={onClick} />
  );
}
