import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { createUserSchema, type CreateUserFormData } from '../schemas/user';
import { useCreateUser } from '../hooks/useUsers';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export function UserForm() {
  const [apiError, setApiError] = useState<string | null>(null);
  const { mutateAsync: createUser, isPending: isCreating } = useCreateUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateUserFormData>({
    resolver: zodResolver(createUserSchema),
  });

  const onSubmit = async (data: CreateUserFormData) => {
    setApiError(null);
    try {
      await createUser(data);
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'Erro ao criar usuário';
        setApiError(message);
      } else {
        setApiError('Erro inesperado ao criar usuário');
      }
    }
  };

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Novo Usuário
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input
          label="Nome"
          placeholder="Ex: Guilherme Saud"
          error={errors.name?.message}
          {...register('name')}
        />
        
        <Input
          label="E-mail"
          type="email"
          placeholder="Ex: guilhermeSaud@gmail.com"
          error={errors.email?.message}
          {...register('email')}
        />
        
        <Input
          label="Idade"
          type="number"
          placeholder="Ex: 25"
          error={errors.age?.message}
          {...register('age', { valueAsNumber: true })}
        />

        {apiError && (
          <div className="p-3 rounded-md bg-red-50 text-red-700 text-sm flex items-center gap-2 border border-red-200">
            <AlertCircle className="w-4 h-4" />
            {apiError}
          </div>
        )}

        <Button type="submit" className="w-full" isLoading={isCreating}>
          Cadastrar Usuário
        </Button>
      </form>
    </section>
  );
}
