import { MypageNav } from '@/features/mypage';
import { Outlet } from 'react-router-dom';

export function MyPageLayout() {
  return (
    <div className='flex'>
      <MypageNav />
      <Outlet />
    </div>
  );
}
