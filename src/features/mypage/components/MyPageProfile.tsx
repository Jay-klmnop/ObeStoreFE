import { UserProfileIcon } from '@/components/icon';
import { ErrorMessage, Spinner } from '@/components/ui';
import { useUserQuery } from '@/features/mypage';
import { Link } from 'react-router-dom';

export function MyPageProfile() {
  const { data: user, isLoading, error } = useUserQuery();

  if (isLoading) return <Spinner />;
  if (error) return <ErrorMessage />;

  return (
    <div className='p-4 lg:p-8'>
      <Link to='/users' className='flex items-center gap-4'>
        <UserProfileIcon />
        <p className='text-lg font-bold'>{user?.nickname}</p>
      </Link>
    </div>
  );
}
