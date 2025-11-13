import { useCustomerMutation, useCustomerQuery } from '@/features/order';
import {
  ChangePasswordModal,
  MypageContentsWrap,
  MyPageInfoRow,
  MypageOutside,
} from '@/features/mypage';
import { ButtonBase, ConfirmModal } from '@/components/ui';
import { useState } from 'react';

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

  const provider = customer?.provider ?? 'local';
  const isSocialLogin = provider !== 'local';
  if (isLoadingCustomer) return <div>나의 정보를 준비 중입니다...</div>;
  if (isErrorCustomer) return <div>나의 정보 필요한 정보를 찾을 수 없습니다.</div>;
  return (
    <MypageOutside>
      <MypageContentsWrap>
        <div className='mt-1'>
          <p className='flex border-b border-black pb-3 text-lg font-bold'>
            나의 프로필 / 정보 조회/수정
          </p>
          <ul className='mt-7.5 border-t-2 border-black'>
            <MyPageInfoRow rowTitle={`아이디(이메일)`} rowContent={`${customer?.customerEmail}`} />
            <MyPageInfoRow rowTitle={`성명`} rowContent={`${customer?.customerName}`} />
            <MyPageInfoRow rowTitle={`닉네임`} rowContent={`${customer?.customerNickrname}`} />

            {isSocialLogin ? (
              <div className='border-b border-gray-200 py-6 text-center text-gray-700'>
                <p className='text-lg font-semibold'>🔒 소셜 로그인 계정입니다.</p>
                <p className='mt-2 text-sm text-gray-500'>
                  소셜 로그인 사용자는 비밀번호 변경이 필요하지 않습니다.
                  <br />
                  비밀번호는 해당 소셜 서비스(네이버)에서 관리됩니다.
                </p>
              </div>
            ) : (
              <MyPageInfoRow
                rowTitle={`비밀번호`}
                rowContent={
                  <ButtonBase variant='hollow' onClick={handleClickEditInfoConfirm}>
                    비밀번호 변경
                  </ButtonBase>
                }
              />
            )}
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
