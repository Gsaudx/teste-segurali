import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../lib/axios';
import type { CreateUserFormData, User } from '../schemas/user';

interface PaginatedResponse {
  data: User[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export function useUsers(page = 1, limit = 10) {
  return useQuery({
    queryKey: ['users', page, limit],
    queryFn: async () => {
      const { data } = await api.get<PaginatedResponse>('/users', {
        params: { page, limit },
      });
      return data;
    },
  });
}

export function useCreateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (userData: CreateUserFormData) => {
      const { data } = await api.post<User>('/users', userData);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
}
