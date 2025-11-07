import type { IconProps } from '@/components/types';
import { GoHeart, GoHeartFill } from 'react-icons/go';

export function EmptyHeartIcon({ size, color, className }: IconProps) {
  return <GoHeart size={size} strokeWidth={0.6} color={color} className={className} />;
}

export function FilledHeartIcon({ size, color, className }: IconProps) {
  return <GoHeartFill size={size} strokeWidth={0.6} color={color} className={className} />;
}
