import { LuShoppingCart } from 'react-icons/lu';
import type { IconProps } from '@/components/types';

export function CartIcon({ size, color, className }: IconProps) {
  return <LuShoppingCart size={size} color={color} className={className} />;
}
