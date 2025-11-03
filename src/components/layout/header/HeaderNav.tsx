import { HEADER_NAV_LINKS } from '@/constants';

export function HeaderNav() {
  return (
    <div className='flex flex-row items-center gap-4'>
      {HEADER_NAV_LINKS.map(({ label }) => (
        <button key={label}>{label}</button>
      ))}
    </div>
  );
}
