import { LuMenu } from 'react-icons/lu';
import type { IconProps } from '@/components/types';

export function MenuIcon({ color, className }: IconProps) {
  return <LuMenu size={27} color={color} className={className}></LuMenu>;
}
