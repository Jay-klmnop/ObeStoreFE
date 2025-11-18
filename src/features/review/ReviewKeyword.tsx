import { cn } from '@/utils';

interface ReviewKeywordsProps {
  keywords: string[];
  selectedKeywords?: string[];
  onKeywordSelect?: (keyword: string) => void;
}

export function ReviewKeywords({
  keywords,
  selectedKeywords,
  onKeywordSelect,
}: ReviewKeywordsProps) {
  if (!keywords?.length) return null;

  const isInteractive = !!onKeywordSelect;

  return (
    <div className='flex flex-wrap gap-2 py-2'>
      {keywords.map((keyword) => {
        const isSelected = selectedKeywords?.includes(keyword) ?? false;

        return (
          <button
            key={keyword}
            type='button'
            className={cn(
              'rounded-full border-2 px-3 py-1 text-sm font-semibold transition-colors',
              {
                'cursor-pointer hover:opacity-80': isInteractive,
                'bg-primary-700 border-primary-700 text-white': isSelected,
                'text-primary-700 border-primary-500-50 bg-white': !isSelected,
              }
            )}
            onClick={() => isInteractive && onKeywordSelect(keyword)}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? 0 : -1}
            onKeyDown={(e) => isInteractive && e.key === 'Enter' && onKeywordSelect(keyword)}
          >
            #{keyword}
          </button>
        );
      })}
    </div>
  );
}
