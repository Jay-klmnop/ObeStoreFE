import type { SubtitleProps } from '@/components/types/props';

export function Subtitle({ label }: SubtitleProps) {
  return <div className='px-2.5 py-2.5 text-2xl font-bold text-black'>{label}</div>;
}
