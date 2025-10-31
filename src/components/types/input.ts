import type { InputHTMLAttributes } from 'react';

export interface EmailProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  id?: string;
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface PasswordProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  id?: string;
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchProps extends InputHTMLAttributes<HTMLInputElement> {
  value: string;
  id?: string;
  placeholder?: string;
  fullWidth?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface CheckboxProps {
  id: string;
  label: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface CheckboxAloneProps {
  id: string;
  checked: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export interface RadioProps {
  id: string;
  checked: boolean;
  name?: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
