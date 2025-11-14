import { FooterLogoIcon } from '@/components/icon';
import { ConfirmModal } from '@/components/ui';
import { useState } from 'react';
import { PrivacyContent, ShippingContent, TermsContent } from '@/components/layout';

type BrandInfoTxtsType = {
  ceo: string;
  businessNumber: number | string;
  address: string;
  MailOrderSalesRegistrationNumber: string;
  email: string;
};

export function BrandInfo() {
  const [openModal, setOpenModal] = useState<PolicyName | null>(null);
  const BrandInfoTxts: BrandInfoTxtsType = {
    ceo: '홍길동',
    businessNumber: '123-45-67890',
    address: '서울특별시 강남구 테헤란로 123, 5층',
    MailOrderSalesRegistrationNumber: '2025-서울강남-1234',
    email: 'support@obestore.com',
  };
  type PolicyName = 'terms' | 'privacy' | 'shipping';
  const closeModal = () => setOpenModal(null);
  const handleOpen = (type: PolicyName) => setOpenModal(type);
  return (
    <>
      <h2>
        <FooterLogoIcon />
      </h2>
      <p className='text-primary-100 mt-4 text-sm'>
        Obe Store, a place where you can find The Objet for yourself
      </p>
      <div className='text-primary-100 mt-4 cursor-default text-sm leading-6'>
        <p>
          대표: {BrandInfoTxts.ceo} | 사업자등록번호 : {BrandInfoTxts.businessNumber}
        </p>
        <p>주소 : {BrandInfoTxts.address}</p>
        <p>통신판매업 : {BrandInfoTxts.MailOrderSalesRegistrationNumber}</p>
        <p>이메일 : {BrandInfoTxts.email}</p>
      </div>
      <div className='text-primary-100 mt-4 text-sm'>
        <ul className='flex gap-4 lg:gap-10'>
          <li className='cursor-pointer hover:underline' onClick={() => handleOpen('terms')}>
            이용약관
          </li>
          <li className='cursor-pointer hover:underline' onClick={() => handleOpen('privacy')}>
            개인정보처리방침
          </li>
          <li className='cursor-pointer hover:underline' onClick={() => handleOpen('shipping')}>
            배송 및 반품안내
          </li>
        </ul>
      </div>

      <ConfirmModal isOpen={!!openModal} closeModal={closeModal} buttons={false}>
        <div className='max-h-[70vh] overflow-y-auto p-4 text-sm leading-6'>
          {openModal === 'terms' && <TermsContent />}
          {openModal === 'privacy' && <PrivacyContent />}
          {openModal === 'shipping' && <ShippingContent />}
        </div>
      </ConfirmModal>
    </>
  );
}
