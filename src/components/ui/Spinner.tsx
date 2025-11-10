import { FaSpinner } from 'react-icons/fa';

export function Spinner({ size = 32 }: { size?: number }) {
  return (
    <div className='flex items-center justify-center py-8'>
      <FaSpinner size={size} className='text-primary-500-80 animate-spin' aria-label='로딩 중...' />
    </div>
  );
}
