import { LuSearch } from 'react-icons/lu';
import type { IconProps } from '@/components/types';

export function SearchIcon({ size, color, className }: IconProps) {
  return <LuSearch size={size} color={color} className={className} />;
}
