import { BsCart } from 'react-icons/bs';
import type { IconProps } from '@/components/types';

export function CartIcon({ color, className }: IconProps) {
  return <BsCart size={23} strokeWidth={0.3} color={color} className={className} />;
}
