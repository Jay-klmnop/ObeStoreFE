import { HEADER_NAV_LINKS } from '@/constants';
import { Link } from 'react-router-dom';

export function HeaderNav() {
  return (
    <div className='hidden flex-row items-center gap-8 text-lg font-black md:flex'>
      {HEADER_NAV_LINKS.map(({ label, href }) => (
        <Link key={label} to={href}>
          {label}
        </Link>
      ))}
    </div>
  );
}
