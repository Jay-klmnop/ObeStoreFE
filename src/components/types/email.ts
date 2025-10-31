import type { InputHTMLAttributes } from 'react';

export interface EmailProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  id?: string;
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
