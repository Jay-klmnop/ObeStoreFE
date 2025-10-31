import { ShoppingCart } from 'lucide-react';
import type { IconProps } from '@/components/types/type';

export function CartIcon({ width, height, color, className, strokeWidth, ...rest }: IconProps) {
  return (
    <>
      <ShoppingCart
        width={width}
        height={height}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...rest}
      />
    </>
  );
}
