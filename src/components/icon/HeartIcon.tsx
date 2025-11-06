import type { IconProps } from '@/components/types';
import { GoHeart } from 'react-icons/go';

export function HeartIcon({ size, color, className }: IconProps) {
  return <GoHeart size={size} strokeWidth={0.6} color={color} className={className} />;
}
