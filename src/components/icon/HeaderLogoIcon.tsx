import { logo } from '@/assets';
import type { LogoProps } from '@/components/types';
import { Link } from 'react-router-dom';

export function HeaderLogoIcon({ width, height, className }: LogoProps) {
  return (
    <Link to='/' className='flex items-center'>
      <img
        src={logo}
        alt='OBE STORE Logo'
        width={width}
        height={height}
        className={`mt-0.5 object-contain ${className}`}
      />
    </Link>
  );
}
