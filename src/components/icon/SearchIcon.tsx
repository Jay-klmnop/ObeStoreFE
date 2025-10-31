import { Search } from 'lucide-react';
import type { IconProps } from '@/components/types/type';

export function SearchIcon({ width, height, color, className, strokeWidth, ...rest }: IconProps) {
  return (
    <>
      <Search
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
