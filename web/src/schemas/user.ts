import { z } from 'zod';

export const userSchema = z.object({
  id: z.uuid({ message: 'ID inválido' }),
  name: z.string().min(3, { message: 'Nome deve ter no mínimo 3 caracteres' }),
  email: z.email({ message: 'E-mail inválido' }),
  age: z.number().min(18, { message: 'Idade deve ser maior ou igual a 18' }),
});

export const createUserSchema = userSchema.omit({ id: true });

export type User = z.infer<typeof userSchema>;
export type CreateUserFormData = z.infer<typeof createUserSchema>;
