import { useAddressMutation, type Address } from '@/features/mypage';
import { useAddressModalStore } from '@/store';
import { useEffect, useState } from 'react';
import { ButtonBase } from '@/components/ui';

export interface FormAddress {
  id: number;
  address_name: string;
  recipient: string; // 추가
  recipient_phone: string;
  address: string;
  detail_address: string;
  isDefault: boolean;
}

const toAddressPayload = (form: FormAddress): Address => ({
  id: form.id,
  address_name: form.address_name,
  recipient: form.recipient, // 수정
  recipient_phone: form.recipient_phone,
  post_code: '00000',
  address: form.address,
  detail_address: form.detail_address,
  isDefault: form.isDefault,
});

export function AddressForm() {
  const { addAddress, updateAddress } = useAddressMutation();
  const { closeModal, editingAddress } = useAddressModalStore();
  const [form, setForm] = useState<FormAddress>({
    id: 0,
    address_name: '',
    recipient: '',
    recipient_phone: '',
    address: '',
    detail_address: '',
    isDefault: false,
  });

  useEffect(() => {
    if (editingAddress) {
      setForm({
        id: editingAddress.id,
        address_name: editingAddress.address_name,
        recipient: editingAddress.recipient,
        recipient_phone: editingAddress.recipient_phone,
        address: editingAddress.address,
        detail_address: editingAddress.detail_address,
        isDefault: editingAddress.isDefault ?? false, // 🔥 localStorage default 반영
      });
    }
  }, [editingAddress]);
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = toAddressPayload(form);
    // 🔥 localStorage 기본 배송지 저장
    localStorage.setItem('defaultAddress', String(payload.isDefault));

    if (editingAddress) {
      updateAddress.mutate(payload, {
        onSuccess: () => closeModal(),
      });
    } else {
      addAddress.mutate(payload, {
        onSuccess: () => closeModal(),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col justify-center gap-4'>
      <input
        type='text'
        name='recipient'
        placeholder='수령인 이름'
        value={form.recipient}
        onChange={handleChangeInput}
      />
      <input
        type='text'
        name='address_name'
        placeholder='배송지명'
        value={form.address_name}
        onChange={handleChangeInput}
        className='border-primary-500-70 rounded-lg border p-2'
      />
      <input
        type='text'
        name='recipient_phone'
        placeholder='전화번호'
        value={form.recipient_phone}
        onChange={handleChangeInput}
        className='border-primary-500-70 rounded-lg border p-2'
      />
      <input
        type='text'
        name='address'
        placeholder='주소'
        value={form.address}
        onChange={handleChangeInput}
        className='border-primary-500-70 rounded-lg border p-2'
      />
      <input
        type='text'
        name='detail_address'
        placeholder='상세주소'
        value={form.detail_address}
        onChange={handleChangeInput}
        className='border-primary-500-70 rounded-lg border p-2'
      />
      <label className='item-centers flex items-center gap-2'>
        <input
          type='checkbox'
          name='isDefault'
          checked={form.isDefault} // ⭐ value 연동 필수
          onChange={handleChangeInput}
        />
        기본 배송지로 설정
        <small className='text-custom-gray-30'>(기본 배송지는 1개만 가능합니다.)</small>
      </label>
      <ButtonBase type='submit' className='rouned text-white' variant='filled'>
        {editingAddress ? '수정 완료' : '저장하기'}
      </ButtonBase>
    </form>
  );
}
