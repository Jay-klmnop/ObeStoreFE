import { HiUserCircle } from 'react-icons/hi2';
import type { IconProps } from '@/components/types';

export function ReviewUser({ size, color, className }: IconProps) {
  return <HiUserCircle size={size} color={color} className={className} />;
}
