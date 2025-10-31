export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  variant?: 'filled' | 'hollow';
  fullWidth?: boolean;
  px?: number | string; // x축 padding
  py?: number | string; // y축 padding
}
