import type { RadioProps } from '@/components/types';

export function Radio({ id, value, checked, name, onChange, disabled }: RadioProps) {
  return (
    <>
      <input
        type='radio'
        id={id}
        value={value}
        checked={checked}
        name={name}
        onChange={onChange}
        disabled={disabled}
        className={`mr-2 h-4 w-4 accent-(--color-primary-500-50)`}
      />
    </>
  );
}
