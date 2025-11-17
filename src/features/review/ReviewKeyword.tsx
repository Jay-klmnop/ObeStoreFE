export function ReviewKeywords({ keywords }: { keywords: string[] }) {
  if (!keywords?.length) return null;

  return (
    <div className='flex flex-wrap gap-2 py-2'>
      {keywords.map((keyword, index) => (
        <button
          key={index}
          className='text-primary-700 border-primary-500-50 rounded-full border-2 bg-white px-3 py-1 text-sm font-semibold'
        >
          #{keyword}
        </button>
      ))}
    </div>
  );
}
