import { MYPAGE_NAV_LINKS } from '@/constants';

export function HeaderNav() {
  return (
    <div className='flex flex-col items-center gap-4'>
      {MYPAGE_NAV_LINKS.map(({ label }) => (
        <button key={label}>{label}</button>
      ))}
    </div>
  );
}
