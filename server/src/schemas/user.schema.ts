import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  email: z.email('E-mail inválido'),
  age: z.number().min(18, 'Idade deve ser maior ou igual a 18'),
});

export const paginationSchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
});

export type CreateUserDTO = z.infer<typeof createUserSchema>;
export type PaginationDTO = z.infer<typeof paginationSchema>;
