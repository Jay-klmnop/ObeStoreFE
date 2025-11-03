import { HEADER_ICONS_LINKS } from '@/constants';

export function HeaderIcons() {
  return (
    <div className='flex flex-row items-center gap-4'>
      {HEADER_ICONS_LINKS.map(({ label, Icon, responsiveClass }) => (
        <button key={label} className={responsiveClass}>
          <Icon size={24} />
        </button>
      ))}
    </div>
  );
}
