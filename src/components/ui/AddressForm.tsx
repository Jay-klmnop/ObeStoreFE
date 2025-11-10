import { useAddressMutation } from '@/features/mypage';
import { useAddressModalStore } from '@/store/useAddressModalStore';
import { useState } from 'react';
import { ButtonBase } from './button';

export function AddressForm() {
  const { addAddress } = useAddressMutation();
  const { closeModal } = useAddressModalStore();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    detail: '',
    isDefault: false,
  });
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addAddress.mutate(
      { ...form, phone: Number(form.phone) },
      {
        onSuccess: () => {
          closeModal();
        },
      }
    );
  };
  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        type='text'
        name='name'
        placeholder='배송지명'
        value={form.name}
        onChange={handleChangeInput}
        className='border-primary-500-70 rounded-lg border p-2'
      />
      <input
        type='text'
        name='phone'
        placeholder='전화번호'
        value={form.phone}
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
        name='detail'
        placeholder='상세주소'
        value={form.detail}
        onChange={handleChangeInput}
        className='border-primary-500-70 rounded-lg border p-2'
      />
      <label className='item-centers flex gap-2'>
        <input
          type='checkbox'
          name='isDefault'
          checked={form.isDefault}
          onChange={handleChangeInput}
          className='border-primary-700'
        />
        기본 배송지로 설정
      </label>
      <ButtonBase type='submit' className='rouned text-white' variant='filled'>
        저장하기
      </ButtonBase>
    </form>
  );
}
