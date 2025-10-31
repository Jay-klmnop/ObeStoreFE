import type { LucideProps } from 'lucide-react';
import type { HTMLAttributes } from 'react';

export interface IconProps extends LucideProps {
  width?: number | string;
  height?: number | string;
  strokeWidth?: number; // 옵션으로 변경
  color?: string;
  className?: string;
}

// export interface SocialIconProps extends Omit<ReactSocialIconProps, 'network'> {
//   width?: number;
//   height?: number;
// }
export interface LogoProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  className?: string;
}
