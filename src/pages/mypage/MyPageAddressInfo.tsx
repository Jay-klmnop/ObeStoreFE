import MypageOutside from '@/features/mypage/components/MypageOutside';
import { MypageContentsWrap } from '@/features/mypage/components/MypageContentsWrap';
import { ButtonBase } from '@/components/ui/button';
import { useAddressQuery } from '@/features/mypage/api/useAddressQuery';
import { useAddressModalStore } from '@/store/useAddressModalStore';
import { AddressModal } from '@/components/ui/AddressModal';

export function MyPageAddressInfo() {
  const { data: addresses = [] } = useAddressQuery();
  const { openModal } = useAddressModalStore();
  return (
    <MypageOutside>
      <MypageContentsWrap>
        <div className='mt-1 pb-5'>
          <p className='flex border-b border-black pb-3 text-lg font-bold'>배송지 정보 조회/수정</p>
          <div className='border-primary-500-70 mt-6 flex justify-end border-b pb-6'>
            <ButtonBase onClick={() => openModal('add')} variant='filled'>
              배송지 추가하기
            </ButtonBase>
          </div>
          {addresses.map((addrinfo) => (
            <div
              key={addrinfo.id}
              className='border-primary-500-20 bg-primary-500-0 text-custom-gray-70 mt-5 rounded-lg border p-3 pt-2 text-lg leading-7'
            >
              <div className='text-1xl font-bold text-black'>{addrinfo.name}</div>
              <div className='mt-2'>
                {addrinfo.address} {addrinfo.detail}
              </div>
              <div>{addrinfo.phone}</div>
              <div className='border-red flex justify-end gap-2'>
                <ButtonBase
                  variant='gnb'
                  className='w-15 self-end'
                  onClick={() => openModal('edit', addrinfo)}
                >
                  수정
                </ButtonBase>
                <ButtonBase onClick={() => openModal('delete', addrinfo)}>삭제</ButtonBase>
              </div>
            </div>
          ))}
        </div>
        <AddressModal />
      </MypageContentsWrap>
    </MypageOutside>
  );
}
