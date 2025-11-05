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
  activeColor = '#FFD700',
  inactiveColor = '#E0E0E0',
}: ReviewRatingProps) {
  const [rating, setRating] = useState<number>(initialValue);

  const handleChange = (value: number) => {
    setRating(value);
    onChange?.(value);
  };

  return (
    <div className='flex gap-2 items-center'>
      <Rating
        readonly={readOnly}
        initialRating={rating}
        fractions={10} // ✅ 0.1 단위 지원
        onChange={handleChange}
        emptySymbol={<FaStar size={size} color={inactiveColor} />}
        fullSymbol={<FaStar size={size} color={activeColor} />}
      />
      <span className='text-sm text-primary-500-60'>{rating.toFixed(1)} / 5</span>
    </div>
  );
}
