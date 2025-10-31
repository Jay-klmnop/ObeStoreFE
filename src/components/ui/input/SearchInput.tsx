import type { SearchProps } from '@/components/types/input';
import { useState } from 'react';

export default function SearchInput({ value, id, placeholder, fullWidth, onChange }: SearchProps) {
  const [searchValue, setSearchValue] = useState<string>(value || '');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    onChange?.(e);
  };
  return (
    <>
      <input
        type='password'
        value={searchValue}
        id={id}
        placeholder={placeholder}
        onChange={handleChange}
        className={`flex rounded-lg border border-(--color-primary-500-50) px-[.6rem] py-[.8rem] ${fullWidth ? 'w-full' : ''}`}
      />
    </>
  );
}
