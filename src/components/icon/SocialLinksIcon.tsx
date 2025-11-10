import {
  RiTiktokFill,
  RiFacebookFill,
  RiTwitterFill,
  RiInstagramLine,
  RiThreadsLine,
} from 'react-icons/ri';
import type { IconProps } from '@/components/types';

export function TiktokIcon({ size, color, className }: IconProps) {
  return <RiTiktokFill size={size} color={color} className={className} />;
}

export function FacebookIcon({ size, color, className }: IconProps) {
  return <RiFacebookFill size={size} color={color} className={className} />;
}

export function TwitterIcon({ size, color, className }: IconProps) {
  return <RiTwitterFill size={size} color={color} className={className} />;
}

export function InstagramIcon({ size, color, className }: IconProps) {
  return <RiInstagramLine size={size} color={color} className={className} />;
}

export function ThreadsIcon({ size, color, className }: IconProps) {
  return <RiThreadsLine size={size} color={color} className={className} />;
}
