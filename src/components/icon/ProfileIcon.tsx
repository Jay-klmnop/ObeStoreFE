import { CircleUserRound } from 'lucide-react';
import type { IconProps } from '@/components/types/icon';

export function ProfileIcon({ width, height, color, className, strokeWidth, ...rest }: IconProps) {
  return (
    <>
      <CircleUserRound
        width={width}
        height={height}
        color={color}
        strokeWidth={strokeWidth}
        className={className}
        {...rest}
      ></CircleUserRound>
    </>
  );
}
