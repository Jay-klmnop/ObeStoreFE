import { useCustomerMutation, useCustomerQuery } from '@/features/order/api/useCustomerQuery';
import { MyPageInfoRow } from '@/features/mypage/components/MyPageInfoRow';
import { ButtonBase, ConfirmModal } from '@/components/ui';
import MypageOutside from '../../features/mypage/components/MypageOutside';
import { MypageContentsWrap } from '../../features/mypage/components/MypageContentsWrap';
import { useState } from 'react';
import { ChangePasswordModal } from '@/features/mypage/components/ChangePasswordModal';

export function MyPageInfo() {
  const [isWithdrawModalOpen, setWithdrawModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const {
    data: customer,
    isLoading: isLoadingCustomer,
    isError: isErrorCustomer,
  } = useCustomerQuery();

  const { deleteCustomer } = useCustomerMutation();

  const handleClickWithdraw = () => setWithdrawModalOpen(true);
  const handleCloseWithdrawModal = () => setWithdrawModalOpen(false);
  const handleClickEditInfoConfirm = () => setEditModalOpen(true);
  const handleCloseEditModal = () => setEditModalOpen(false);

  const handleDeleteConfirm = () => {
    if (!customer?.id) return;
    deleteCustomer.mutate(customer.id);
    setWithdrawModalOpen(false);
  };
  if (isLoadingCustomer) return <div>나의 정보를 준비 중입니다...</div>;
  if (isErrorCustomer) return <div>나의 정보 필요한 정보를 찾을 수 없습니다.</div>;
  return (
    <MypageOutside>
      <MypageContentsWrap>
        <div className='mt-10'>
          <p className='flex border-b border-black pb-3 text-lg font-bold'>
            나의 프로필 / 정보 조회/수정
          </p>
          <ul className='mt-7.5 border-t-2 border-black'>
            <MyPageInfoRow rowTitle={`아이디(이메일)`} rowContent={`${customer?.customerEmail}`} />
            <MyPageInfoRow rowTitle={`성명`} rowContent={`${customer?.customerName}`} />
            <MyPageInfoRow rowTitle={`닉네임`} rowContent={`${customer?.customerNickrname}`} />
            <MyPageInfoRow
              rowTitle={`비밀번호`}
              rowContent={
                <ButtonBase variant='hollow' onClick={handleClickEditInfoConfirm}>
                  비밀번호 변경
                </ButtonBase>
              }
            />
            <MyPageInfoRow rowTitle={`연락처`} rowContent={`${customer?.customerMobilePhone}`} />
          </ul>
          <div className='flex flex-row justify-center pt-15 pb-10'>
            <ButtonBase onClick={handleClickWithdraw} variant='hollow'>
              회원 탈퇴
            </ButtonBase>
          </div>
          <ConfirmModal
            isOpen={isWithdrawModalOpen}
            closeModal={handleCloseWithdrawModal}
            onConfirm={handleDeleteConfirm}
            onCancel={handleCloseWithdrawModal}
            buttons={true}
            size='sm'
          >
            <p>정말 회원을 탈퇴하시겠습니까?</p>
          </ConfirmModal>
          <ChangePasswordModal isOpen={isEditModalOpen} closeModal={handleCloseEditModal} />
        </div>
      </MypageContentsWrap>
    </MypageOutside>
  );
}
