import type { CheckboxAloneProps, CheckboxProps } from '@/components/types';

export function CheckBox({ id, label, checked, onChange, className, inputId }: CheckboxProps) {
  return (
    <>
      <label
        htmlFor={id}
        className={`flex gap-2 items-center text-lg cursor-pointer text-primary-700 ${className}`}
      >
        <input
          id={id}
          type='checkbox'
          checked={checked}
          onChange={onChange}
          className={`mr-2 w-4 h-4 rounded-lg border border-primary-500-50 accent-primary-500-50 ${inputId} ${className}`}
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
        className={`mr-2 w-4 h-4 rounded-lg border border-primary-500-50 accent-primary-500-50 ${className}`}
      />
    </>
  );
}
