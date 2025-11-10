import { MypageProfileIcon } from '@/components/icon/MypageProfileIcon';
import { Link } from 'react-router-dom';

export function MyPageProfile() {
  return (
    <div className='p-2.5'>
      <Link to='/mypage/info' className='flex items-center'>
        <MypageProfileIcon />
        <p className='ml-2.5 text-lg font-bold'>Nickname</p>
      </Link>
    </div>
  );
}
