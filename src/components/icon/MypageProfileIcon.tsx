import { FaUserCircle } from 'react-icons/fa';
import type { IconProps } from '@/components/types';

export function MypageProfileIcon({ size = 46, color = '#58616A', className = '' }: IconProps) {
  return <FaUserCircle size={size} color={color} className={className} />;
}
