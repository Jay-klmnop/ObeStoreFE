import { backendAPI } from '@/api';
import type { UserPoint } from '@/types/order';
import { useQuery } from '@tanstack/react-query';

// 📌 GET /users/me/points
export const fetchUserPoints = async (): Promise<UserPoint> => {
  const response = await backendAPI.get('/users/me/points/balance');
  const data = response.data;

  console.log('📦 [GET] /users/me/points/balance 응답:', data);

  return data;
};

// 📌 TanStack Query
export const useUserPointsQuery = () => {
  return useQuery<UserPoint>({
    queryKey: ['point'],
    queryFn: fetchUserPoints,
    staleTime: 1000 * 60 * 5,
  });
};
