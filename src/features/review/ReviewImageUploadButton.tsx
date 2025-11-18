import { ImageIcon } from '@/components/icon';
import { useRef, useState, type ChangeEvent } from 'react';

interface ReviewImageUploadButtonProps {
  onFileSelect: (file: File | null) => void;
}

export function ReviewImageUploadButton({ onFileSelect }: ReviewImageUploadButtonProps) {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      onFileSelect(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      onFileSelect(null);
      setPreviewUrl(null);
    }
  };

  const handlePlaceholderClick = () => {
    inputRef.current?.click();
  };

  return (
    <div>
      <input
        type='file'
        ref={inputRef}
        onChange={handleFileChange}
        accept='image/*'
        className='hidden'
      />

      <div
        className='centralize bg-primary-100 centralize h-20 w-20 cursor-pointer rounded-full transition-colors'
        onClick={handlePlaceholderClick}
        role='button'
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && handlePlaceholderClick()}
      >
        {previewUrl ? (
          <img src={previewUrl} alt='Preview' className='h-full w-full rounded-full object-cover' />
        ) : (
          <div className='flex flex-col items-center'>
            <ImageIcon size={32} color='#6a5145' />
          </div>
        )}
      </div>
    </div>
  );
}
