import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from '../../../lib/axios';
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

export function useUsers(page = 1, limit = 5, name = '') {
  return useQuery({
    queryKey: ['users', page, limit, name],
    queryFn: async () => {
      // Fake loading delay - Just to demonstrate the loading skeleton
      await new Promise((resolve) => setTimeout(resolve, 200));
      
      const { data } = await api.get<PaginatedResponse>('/users', {
        params: { page, limit, name },
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

export function useUser(id: string) {
  return useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      if (!id) return null;
      
      // Fake loading delay - Just to demonstrate the loading skeleton
      await new Promise((resolve) => setTimeout(resolve, 200));

      const { data } = await api.get<User>(`/users/${id}`);
      return data;
    },
    enabled: !!id && id.length > 0,
    retry: false,
  });
}
