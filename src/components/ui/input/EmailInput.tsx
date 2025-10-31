import type { EmailProps } from '@/components/types/input';
import { useState } from 'react';

export function EmailInput({ value, id, placeholder, fullWidth, onChange }: EmailProps) {
  const [emailValue, setEmailValue] = useState<string>(value || '');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValue(e.target.value);
    onChange?.(e);
  };
  return (
    <>
      <input
        type='email'
        value={emailValue}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        className={`flex rounded-lg border border-(--color-primary-500-50) px-[.6rem] py-[.8rem] ${fullWidth ? 'w-full' : ''}`}
      />
    </>
  );
}
