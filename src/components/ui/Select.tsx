import type { SelectBoxProps } from '@/components/types/type';

export function Select({
  id,
  name,
  options,
  value,
  onChange,
  disabled,
  fullWidth,
  className,
}: SelectBoxProps) {
  return (
    <>
      <select
        id={id}
        value={value}
        name={name}
        onChange={onChange}
        disabled={disabled}
        className={`rounded-md border border-(--color-custom-gray-50) px-2 py-1 text-sm transition outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400 ${fullWidth ? 'w-full' : 'w-auto'} ${className}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </>
  );
}
