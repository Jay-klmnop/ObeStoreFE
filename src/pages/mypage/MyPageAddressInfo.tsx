import { MypageContentsWrap, MypageOutside, useAddressQuery } from '@/features/mypage';
import { useAddressModalStore } from '@/store';
import { AddressList, AddressModal, ButtonBase } from '@/components/ui';

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
