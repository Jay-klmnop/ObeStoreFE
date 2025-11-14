import { ProfileIcon } from '@/components/icon';
import { ReviewRating } from '@/components/ui';

interface ReviewProfileProps {
  reviewerName: string;
  date: string;
  rating: number;
}

export function ReviewProfile({ reviewerName, date, rating }: ReviewProfileProps) {
  return (
    <div className='flex items-center gap-4'>
      <ProfileIcon />
      <div>
        <div className='text-primary-500-80 flex items-center gap-2 text-sm'>
          <span className='font-medium'>{reviewerName}</span>
          <span>{date}</span>
        </div>
        <ReviewRating initialValue={rating} readOnly />
      </div>
    </div>
  );
}
