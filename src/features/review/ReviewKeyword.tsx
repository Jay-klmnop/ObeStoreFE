export function ReviewKeywords({ keywords }: { keywords: string[] }) {
  if (!keywords?.length) return null;

  return (
    <div className='flex flex-wrap gap-2'>
      {keywords.map((keyword, index) => (
        <button
          key={index}
          className='px-3 py-1 text-sm font-semibold bg-white rounded-full text-primary-700'
          border-primary-500-50
          border-2
        >
          #{keyword}
        </button>
      ))}
    </div>
  );
}
