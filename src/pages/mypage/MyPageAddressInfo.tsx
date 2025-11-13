import MypageOutside from '@/features/mypage/components/MypageOutside';
import { MypageContentsWrap } from '@/features/mypage/components/MypageContentsWrap';
import { ButtonBase } from '@/components/ui/button';
import { useAddressQuery } from '@/features/mypage/api/useAddressQuery';
import { useAddressModalStore } from '@/store/useAddressModalStore';
import { AddressModal } from '@/components/ui/AddressModal';
import { AddressList } from '@/components/ui/AddressList';

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
          <AddressList addresses={addresses} />
        </div>
        <AddressModal />
      </MypageContentsWrap>
    </MypageOutside>
  );
}
