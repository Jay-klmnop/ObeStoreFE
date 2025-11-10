import { LuImagePlus } from 'react-icons/lu';
import type { IconProps } from '@/components/types';

export function ImageIcon({ size, color, className }: IconProps) {
  return <LuImagePlus size={size} color={color} className={className}></LuImagePlus>;
}
