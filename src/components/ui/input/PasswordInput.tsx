import type { PasswordProps } from '@/components/types/props';
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
        className={`border-primary-500-50 flex rounded-lg border px-[.6rem] py-[.8rem] ${fullWidth ? 'w-full' : ''}`}
      />
    </>
  );
}
