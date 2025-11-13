import { logoFooter } from '@/assets';
import type { LogoProps } from '@/components/types';

export function FooterLogoIcon({ width, height, className }: LogoProps) {
  return (
    <img
      src={logoFooter}
      alt='OBE STORE Logo'
      width={width}
      height={height}
      className={`object-contain ${className}`}
    />
  );
}
