import LogoImage from '../../../dist/assets/logo.svg';
import type { LogoProps } from '@/components/types/icon';

export function HeaderLogoIcon({ width, height, className }: LogoProps) {
  return (
    <img
      src={LogoImage}
      alt='OBE STORE Logo'
      width={width}
      height={height}
      className={`object-contain ${className}`}
    />
  );
}
