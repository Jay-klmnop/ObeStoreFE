import { MypageNav } from '@/features/mypage/components/MypageNav';
import MypageOutside from '@/features/mypage/components/MypageOutside';
import { MypageContentsWrap } from '@/features/mypage/components/MypageContentsWrap';
import { MyPageProfile } from '../../features/mypage/components';
import { FilledButton } from '@/components/ui/button';
import { useAddressQuery } from '@/features/mypage/api/useAddressQuery';
// import { useAddressMutation, useAddressQuery } from '@/features/mypage/api/useAddressQuery';

export function MyPageAddressInfo() {
  const { data: addresses = [] } = useAddressQuery();
  //const { addAddress, updateAddress, deleteAddress } = useAddressMutation();
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
          {addresses.map((addrinfo) => (
            <div
              key={addrinfo.id}
              className='border-primary-500-20 bg-primary-500-0 rounded-lg border p-2.5'
            >
              <div>{addrinfo.name}</div>
              <div>
                {addrinfo.address} {addrinfo.detail}
              </div>
              <div>{addrinfo.phone}</div>
            </div>
          ))}
        </div>
      </MypageContentsWrap>
    </MypageOutside>
  );
}
