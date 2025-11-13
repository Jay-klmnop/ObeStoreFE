import { ButtonBase } from '@/components/ui';
import { AddressModal } from '@/components/ui/AddressModal';
import { useAddressModalStore } from '@/store';
import { useAddressMutation, useAddressQuery } from '../mypage';
import { useEffect, useState } from 'react';
import type { Address } from '../mypage';

export default function OrderShippingCard() {
  const { openModal } = useAddressModalStore();
  const { updateAddress } = useAddressMutation();
  const { data: addresses = [] } = useAddressQuery();
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [deliveryRequest, setDeliveryRequest] = useState('');

  useEffect(() => {
    if (!selectedAddress && addresses.length > 0) {
      setSelectedAddress(addresses[0]);
      setDeliveryRequest(addresses[0].deliveryRequest || '');
    } else if (selectedAddress) {
      const updated = addresses.find((addr) => addr.id === selectedAddress.id);
      if (updated) setSelectedAddress(updated);
    }
  }, [addresses]);

  const handleSelectAddress = (addr: any) => {
    setSelectedAddress(addr);
    setDeliveryRequest(addr.deliveryRequest || '');
  };

  const handleDeliveryRequest = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setDeliveryRequest(value);
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
        <span className='text-primary-500-90 mr-2.5 flex text-lg font-bold'>
          {selectedAddress ? (
            <span>{selectedAddress.name}</span>
          ) : addresses.length > 0 ? (
            <span>{addresses[0].name}</span>
          ) : (
            <span>사용자 정보가 없습니다.</span>
          )}
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
              {selectedAddress.address} {selectedAddress.detail}
            </span>
            <span>{selectedAddress.phone}</span>
          </>
        ) : addresses.length > 0 ? (
          <>
            <span>
              {addresses[0].address} {addresses[0].detail}
            </span>
            <span>{addresses[0].phone}</span>
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
