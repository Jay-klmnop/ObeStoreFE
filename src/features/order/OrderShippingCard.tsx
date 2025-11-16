import { AddressModal, ButtonBase } from '@/components/ui';
import { useAddressModalStore } from '@/store';
import { type Address, useAddressMutation, useAddressQuery } from '@/features/mypage';
import { useEffect, useState } from 'react';

export default function OrderShippingCard() {
  const { openModal } = useAddressModalStore();
  const { updateAddress } = useAddressMutation();
  const { data } = useAddressQuery();

  const addresses: Address[] = data ?? [];
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // 초기 선택 설정
  useEffect(() => {
    if (addresses.length === 0) return;

    const defaultAddress = addresses.find((a) => a.is_default);

    if (defaultAddress) {
      setSelectedId(defaultAddress.id ?? null);
      return;
    }

    setSelectedId(addresses[0].id ?? null);
  }, [addresses]);

  const selectedAddress = addresses.find((addr) => addr.id === selectedId) ?? addresses[0] ?? null;

  const handleSelectAddress = (addr: Address) => {
    setSelectedId(addr.id ?? null);

    // 서버로 기본 배송지 적용 PATCH
    updateAddress.mutate(
      {
        ...addr,
        is_default: true,
      },
      {
        onSuccess: () => {
          console.log('📌 기본 배송지 변경 완료 (Order Page)');
        },
      }
    );
  };

  console.log('addresses:', addresses);
  console.log('selectedKey:', selectedId);
  return (
    <>
      <div className='absolute top-0 right-0 flex gap-2'>
        <ButtonBase onClick={() => openModal('add')}>추가</ButtonBase>
        <ButtonBase onClick={() => openModal('select')} variant='gnb'>
          배송지 변경
        </ButtonBase>
      </div>
      <AddressModal onSelectAddress={handleSelectAddress} />
      <div className='flex h-full items-center justify-start py-2'>
        <span className='text-primary-500-90 mr-2.5 text-lg font-bold'>
          {selectedAddress ? selectedAddress.address_name : '등록된 배송지가 없습니다.'}
        </span>

        {selectedAddress?.is_default && (
          <small className='border-primary-500-70 text-primary-500-70 rounded-sm border px-1 py-1'>
            기본 배송지
          </small>
        )}
      </div>
      <div className='text-primary-500-90 flex flex-col py-2.5'>
        {selectedAddress ? (
          <>
            <span>
              {selectedAddress.address} {selectedAddress.detail_address}
            </span>
            <span>{selectedAddress.recipient_phone}</span>
          </>
        ) : addresses.length > 0 ? (
          <>
            <span>
              {addresses[0].address} {addresses[0].detail_address}
            </span>
            <span>{addresses[0].recipient_phone}</span>
          </>
        ) : (
          <span>등록된 배송지가 없습니다.</span>
        )}
      </div>
    </>
  );
}
