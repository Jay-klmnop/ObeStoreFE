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
  const [deliveryRequest, setDeliveryRequest] = useState('');

  // 선택된 주소 계산
  const selectedAddress = addresses.find((addr) => addr.id === selectedId) ?? addresses[0] ?? null;

  // 초기 선택 설정
  useEffect(() => {
    if (addresses.length > 0 && !selectedId) {
      setSelectedId(addresses[0].id);
      setDeliveryRequest(addresses[0].deliveryRequest || '');
    }
  }, [addresses]);

  const handleSelectAddress = (addr: Address) => {
    setSelectedId(addr.id);
    setDeliveryRequest(addr.deliveryRequest || '');
  };

  const handleDeliveryRequest = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDeliveryRequest(e.target.value);
  };

  const handleSaveDeliveryRequest = () => {
    if (!selectedAddress) return;

    updateAddress.mutate(
      {
        ...selectedAddress,
        deliveryRequest,
      },
      {
        onSuccess: () => {
          alert('배송 요청사항이 저장되었습니다.');
        },
      }
    );
  };
  console.log('addresses:', addresses);
  console.log('selectedKey:', selectedId);
  return (
    <>
      <ButtonBase
        className='absolute top-0 right-0'
        onClick={() => openModal('select')}
        variant='gnb'
      >
        배송지 변경
      </ButtonBase>
      <AddressModal onSelectAddress={handleSelectAddress} />
      <div className='flex h-full items-center justify-start py-2'>
        <span className='text-primary-500-90 mr-2.5 text-lg font-bold'>
          {selectedAddress ? selectedAddress.address_name : '등록된 배송지가 없습니다.'}
        </span>

        {selectedAddress?.isDefault && (
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
      <div>
        <textarea
          placeholder='배송시 요청사항(100자 이내)'
          value={deliveryRequest}
          maxLength={100}
          onChange={handleDeliveryRequest}
          title='배송시 요청사항(100자 이내)'
          className='border-primary-500-70 text-primary-500-70 h-26 w-full resize-none rounded-lg border p-2.5'
        ></textarea>
        <ButtonBase
          variant='hollow'
          className='mt-2 flex justify-self-end px-3 py-1 text-sm'
          onClick={handleSaveDeliveryRequest}
        >
          배송 요청사항 저장
        </ButtonBase>
      </div>
    </>
  );
}
