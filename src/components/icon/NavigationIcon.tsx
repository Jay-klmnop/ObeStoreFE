import { Menu } from 'lucide-react';
import type { IconProps } from '@/components/types/type';

export function NavigationIcon({
  width,
  height,
  color,
  className,
  strokeWidth,
  ...rest
}: IconProps) {
  return (
    <>
      <Menu
        width={width}
        height={height}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...rest}
      ></Menu>
    </>
  );
}
