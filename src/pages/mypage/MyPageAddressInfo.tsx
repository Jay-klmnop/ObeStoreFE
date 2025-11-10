import { MypageNav } from '@/features/mypage/components/MypageNav';
import MypageOutside from '@/features/mypage/components/MypageOutside';
import { MypageContentsWrap } from '@/features/mypage/components/MypageContentsWrap';
import { MyPageProfile } from '../../features/mypage/components';
import { FilledButton } from '@/components/ui/button';

export function MyPageAddressInfo() {
  return (
    <MypageOutside>
      <MypageNav />
      <MypageContentsWrap>
        <MyPageProfile />
        <div className='mt-10 pb-5'>
          <p className='flex border-b border-black pb-3 text-lg font-bold'>배송지 정보 조회/수정</p>
          <div className='mt-6 flex justify-end'>
            <FilledButton>배송지 추가하기</FilledButton>
          </div>
        </div>
      </MypageContentsWrap>
    </MypageOutside>
  );
}
