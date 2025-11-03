import { LuMenu } from 'react-icons/lu';
import type { IconProps } from '@/components/types';

export function NavigationIcon({ size, color, className }: IconProps) {
  return <LuMenu size={size} color={color} className={className}></LuMenu>;
}
