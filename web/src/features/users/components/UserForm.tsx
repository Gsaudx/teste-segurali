import { AxiosError } from 'axios';
import { useForm, type FieldErrors } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { createUserSchema, type CreateUserFormData } from '../schemas/user';
import { useCreateUser } from '../hooks/useUsers';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';

export function UserForm() {
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
    try {
      await createUser(data);
      toast.success('Usuário cadastrado com sucesso!');
      reset();
    } catch (error) {
      if (error instanceof AxiosError) {
        const message = error.response?.data?.message || 'Erro ao criar usuário';
        toast.error(message);
      } else {
        toast.error('Erro inesperado ao criar usuário');
      }
    }
  };

  const onError = (errors: FieldErrors<CreateUserFormData>) => {
    Object.values(errors).forEach((error) => {
      if (error?.message) {
        toast.error(error.message);
      }
    });
  };

  return (
    <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
      <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Novo Usuário
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
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

        <Button type="submit" className="w-full" isLoading={isCreating}>
          Cadastrar Usuário
        </Button>
      </form>
    </section>
  );
}
