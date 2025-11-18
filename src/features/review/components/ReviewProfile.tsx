import { UserProfileIcon } from '@/components/icon';
import { ReviewRating } from '@/components/ui';

interface ReviewProfileProps {
  nickname: string;
  date: string;
  rating: number;
}

export function ReviewProfile({ nickname, date, rating }: ReviewProfileProps) {
  return (
    <div className='flex items-center gap-4 pb-2'>
      <UserProfileIcon size={40} />
      <div>
        <div className='text-primary-500-80 flex items-center gap-2 text-sm'>
          <h1 className='font-bold'>{nickname}</h1>
          <span>{date.slice(0, 10)}</span>
        </div>
        <ReviewRating size={16} initialValue={Number(rating)} readOnly />
      </div>
    </div>
  );
}
