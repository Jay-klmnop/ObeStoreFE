import { useAddressMutation } from '@/features/mypage';
import { useAddressModalStore } from '@/store/useAddressModalStore';
import { useEffect, useState } from 'react';
import { ButtonBase } from './button';

export function AddressForm() {
  const { addAddress, updateAddress } = useAddressMutation();
  const { closeModal, editingAddress } = useAddressModalStore();
  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    detail: '',
    isDefault: false,
  });

  useEffect(() => {
    if (editingAddress) {
      setForm({
        name: editingAddress.name,
        phone: String(editingAddress.phone),
        address: editingAddress.address,
        detail: editingAddress.detail,
        isDefault: editingAddress.isDefault,
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
    if (editingAddress) {
      updateAddress.mutate(
        { ...editingAddress, ...form },
        {
          onSuccess: () => closeModal(),
        }
      );
    } else {
      addAddress.mutate({ ...form }, { onSuccess: () => closeModal() });
    }
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
      <label className='item-centers flex items-center gap-2'>
        <input
          type='checkbox'
          name='isDefault'
          checked={form.isDefault}
          onChange={handleChangeInput}
          className='border-primary-700'
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
