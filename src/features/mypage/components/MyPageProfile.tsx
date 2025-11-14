import { MypageProfileIcon } from '@/components/icon';
import { Link } from 'react-router-dom';

export function MyPageProfile() {
  return (
    <div className='p-4 lg:p-8'>
      <Link to='/mypage/info' className='flex items-center gap-4'>
        <MypageProfileIcon />
        <p className='text-lg font-bold'>Nickname</p>
      </Link>
    </div>
  );
}
