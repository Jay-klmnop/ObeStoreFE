import MypageOutside from '@/features/mypage/components/MypageOutside';
import { MypageContentsWrap } from '@/features/mypage/components/MypageContentsWrap';
import { MyPageProfile } from '../../features/mypage/components';
import { ButtonBase } from '@/components/ui/button';
import { useAddressQuery } from '@/features/mypage/api/useAddressQuery';
import { useAddressModalStore } from '@/store/useAddressModalStore';
import { AddressModal } from '@/components/ui/AddressModal';
// import { useAddressMutation, useAddressQuery } from '@/features/mypage/api/useAddressQuery';

export function MyPageAddressInfo() {
  const { data: addresses = [] } = useAddressQuery();
  const { openModal } = useAddressModalStore();
  //const { addAddress, updateAddress, deleteAddress } = useAddressMutation();
  return (
    <MypageOutside>
      <MypageContentsWrap>
        <MyPageProfile />
        <div className='mt-10 pb-5'>
          <p className='flex border-b border-black pb-3 text-lg font-bold'>배송지 정보 조회/수정</p>
          <div className='border-primary-500-70 mt-6 flex justify-end border-b pb-6'>
            <ButtonBase onClick={() => openModal()} variant='filled'>
              배송지 추가하기
            </ButtonBase>
          </div>
          {addresses.map((addrinfo) => (
            <div
              key={addrinfo.id}
              className='border-primary-500-20 bg-primary-500-0 text-custom-gray-70 mt-5 rounded-lg border p-2.5 pt-2 text-sm leading-6'
            >
              <div className='text-base font-bold'>{addrinfo.name}</div>
              <div className='mt-2'>
                {addrinfo.address} {addrinfo.detail}
              </div>
              <div>{addrinfo.phone}</div>
              <div className='flex-end flex'>
                <ButtonBase
                  variant='hollow'
                  className='self-end'
                  onClick={() => openModal(addrinfo)}
                >
                  수정
                </ButtonBase>
              </div>
            </div>
          ))}
        </div>
        <AddressModal />
      </MypageContentsWrap>
    </MypageOutside>
  );
}
