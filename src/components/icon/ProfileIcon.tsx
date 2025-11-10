import { LuCircleUserRound } from 'react-icons/lu';
import type { IconProps } from '@/components/types';

export function ProfileIcon({ size, color, className }: IconProps) {
  return <LuCircleUserRound size={size} color={color} className={className}></LuCircleUserRound>;
}
