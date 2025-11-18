import { backendAPI } from '@/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

export function useReviewMutations() {
  const qc = useQueryClient();

  const create = useMutation<AxiosResponse, Error, FormData>({
    mutationFn: (body: FormData) => backendAPI.post('/reviews', body),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reviews'] });
    },
  });

  const update = useMutation({
    mutationFn: ({ id, ...body }: { id: number | string; [key: string]: any }) =>
      backendAPI.put(`/reviews/${id}`, body),
    onSuccess: (_data, variables) => {
      qc.invalidateQueries({ queryKey: ['review', variables.id] });
      qc.invalidateQueries({ queryKey: ['reviews'] });
    },
  });

  const remove = useMutation({
    mutationFn: (id) => backendAPI.delete(`/reviews/${id}`),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['reviews'] });
    },
  });

  return { create, update, remove };
}
