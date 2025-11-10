import { HEADER_ICONS_LINKS } from '@/constants';
import { useSearchStore } from '@/features/search';
import { Link } from 'react-router-dom';

export function HeaderIcons() {
  const { openSearchModal } = useSearchStore();

  const handleActionClick = (action: string) => {
    if (action === 'openSearchModal') {
      openSearchModal();
    }
  };

  return (
    <div className='flex flex-row items-center gap-8'>
      {HEADER_ICONS_LINKS.map((item) => {
        if (item.type === 'link') {
          const { label, href, Icon, responsiveClass } = item;
          return (
            <Link key={label} to={href} className={responsiveClass}>
              <Icon size={24} />
            </Link>
          );
        }

        const { label, Icon, responsiveClass, action } = item;
        return (
          <button
            key={label}
            type='button'
            className={responsiveClass}
            onClick={() => handleActionClick(action)}
          >
            <Icon size={24} />
          </button>
        );
      })}
    </div>
  );
}
