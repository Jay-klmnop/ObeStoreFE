import { useAddressModalStore } from '@/store';
import { ButtonBase } from '@/components/ui';
import { type Address } from '@/features/mypage';
import { useLocation } from 'react-router-dom';

export interface AddressListProps {
  addresses: Address[];
  onSelect?: (addrinfo: Address) => void;
}

export function AddressList({ addresses, onSelect }: AddressListProps) {
  const location = useLocation();
  const isOrderPage = location.pathname === '/order/order';

  const { openModal } = useAddressModalStore();
  return (
    <>
      {addresses.map((addrinfo) => (
        <div
          key={addrinfo.id ?? addrinfo.address_name}
          className='border-primary-500-20 bg-primary-500-0 text-custom-gray-70 mt-5 rounded-lg border p-3 pt-2 text-lg leading-7'
        >
          <div className='flex items-center font-bold'>
            <span>{addrinfo.address_name}</span>
            {addrinfo.is_default && (
              <span className='text-primary-500-90 border-primary-500-40 ml-2 rounded border bg-white/60 p-1 text-xs'>
                기본 배송지
              </span>
            )}
          </div>
          <div className='text-1xl font-bold text-black'>{addrinfo.address_name}</div>
          <div className='mt-2'>
            {addrinfo.address} {addrinfo.detail_address}
          </div>
          <div>{addrinfo.recipient_phone}</div>
          <div className='border-red flex justify-end gap-2'>
            {isOrderPage && <ButtonBase onClick={() => onSelect?.(addrinfo)}>선택</ButtonBase>}
            <ButtonBase
              variant='gnb'
              className='w-15 self-end'
              onClick={() => openModal('edit', addrinfo)}
            >
              수정
            </ButtonBase>
            <ButtonBase
              onClick={() => openModal('delete', addrinfo)}
              variant='gnb'
              className='w-15 self-end'
            >
              삭제
            </ButtonBase>
          </div>
        </div>
      ))}
    </>
  );
}
