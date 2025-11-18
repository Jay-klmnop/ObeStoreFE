interface ErrorMessageProps {
  message?: string;
  detail?: string;
  onRetry?: () => void;
}

export function ErrorMessage({
  message = '문제가 발생했습니다.',
  detail,
  onRetry,
}: ErrorMessageProps) {
  return (
    <div className='flex flex-col items-center justify-center gap-2 py-8 text-center'>
      <p className='text-secondary-300'>{message}</p>
      {detail && <p className='text-secondary-400 text-xs'>{detail}</p>}
      {onRetry && (
        <button
          onClick={onRetry}
          className='bg-primary-500-90 hover:bg-primary-700 rounded-md px-4 py-2 text-white'
        >
          다시 시도
        </button>
      )}
    </div>
  );
}
