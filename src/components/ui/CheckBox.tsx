import type { CheckboxAloneProps, CheckboxProps } from '@/components/types';

export function CheckBox({ id, label, checked, onChange, className }: CheckboxProps) {
  return (
    <>
      <label
        htmlFor={id}
        className={`flex cursor-pointer items-center gap-2 text-lg text-(--color-primary-700)`}
      >
        <input
          id={id}
          type='checkbox'
          checked={checked}
          onChange={onChange}
          className={`mr-2 h-4 w-4 rounded-lg border border-(--color-primary-500-50) accent-(--color-primary-500-50) ${className}`}
        />
        {label}
      </label>
    </>
  );
}

export function CheckBoxAlone({ id, checked, onChange, className }: CheckboxAloneProps) {
  return (
    <>
      <input
        id={id}
        type='checkbox'
        checked={checked}
        onChange={onChange}
        className={`mr-2 h-4 w-4 rounded-lg border border-(--color-primary-500-50) accent-(--color-primary-500-50) ${className}`}
      />
    </>
  );
}
