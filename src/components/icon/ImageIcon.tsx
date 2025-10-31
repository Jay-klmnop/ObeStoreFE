import { ImagePlus } from 'lucide-react';
import type { IconProps } from '@/components/types/type';

export function ImageIcon({ width, height, color, className, strokeWidth, ...rest }: IconProps) {
  return (
    <>
      <ImagePlus
        width={width}
        height={height}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...rest}
      ></ImagePlus>
    </>
  );
}
