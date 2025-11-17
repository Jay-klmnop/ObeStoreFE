import { useState } from 'react';
import RatingImport from 'react-rating';
import { FaStar } from 'react-icons/fa';

const Rating = RatingImport as unknown as React.FC<any>;

export interface ReviewRatingProps {
  initialValue?: number;
  readOnly?: boolean;
  size?: number;
  onChange?: (value: number) => void;
  activeColor?: string;
  inactiveColor?: string;
}

export function ReviewRating({
  initialValue = 0,
  readOnly = false,
  size = 28,
  onChange,
  activeColor = '#b9917f',
  inactiveColor = '#edddd5',
}: ReviewRatingProps) {
  const [rating, setRating] = useState<number>(initialValue);

  const handleChange = (value: number) => {
    setRating(value);
    onChange?.(value);
  };

  return (
    <div className='flex items-center gap-2'>
      <Rating
        readonly={readOnly}
        initialRating={rating}
        fractions={2} // 0.5 단위로 변경
        onChange={handleChange}
        emptySymbol={<FaStar size={size} color={inactiveColor} />}
        fullSymbol={<FaStar size={size} color={activeColor} />}
        className='flex items-center pt-1'
      />
      <span className='text-primary-500-60 pt-px text-xs font-semibold'>
        ({rating.toFixed(1)} / 5)
      </span>
    </div>
  );
}
