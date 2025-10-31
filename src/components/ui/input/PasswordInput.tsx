import type { PasswordProps } from '@/components/types/type';
import { useState } from 'react';

export function PasswordInput({ value, id, placeholder, fullWidth, onChange }: PasswordProps) {
  const [passwordValue, setPasswordValue] = useState<string>(value || '');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
    onChange?.(e);
  };
  return (
    <>
      <input
        type='password'
        value={passwordValue}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        className={`flex rounded-lg border border-(--color-primary-500-50) px-[.6rem] py-[.8rem] ${fullWidth ? 'w-full' : ''}`}
      />
    </>
  );
}
