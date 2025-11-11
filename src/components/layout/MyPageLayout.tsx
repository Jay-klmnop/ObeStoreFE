import { MypageNav, MyPageProfile } from '@/features/mypage';
import { Outlet } from 'react-router-dom';

export function MyPageLayout() {
  return (
    <div className='flex h-full w-full flex-col lg:flex-row'>
      <MypageNav />
      <div className='flex h-full w-full flex-col'>
        <MyPageProfile />
        <Outlet />
      </div>
    </div>
  );
}
