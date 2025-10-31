import type { IconProps } from '@/components/types/icon';
import { Heart } from 'lucide-react';

export function HeartIcon({ width, height, color, className, strokeWidth, ...rest }: IconProps) {
  return (
    <>
      <Heart
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
