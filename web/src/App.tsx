import { useState } from 'react';
import { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle } from 'lucide-react';
import { createUserSchema, type CreateUserFormData } from './schemas/user';
import { useUsers, useCreateUser } from './hooks/useUsers';
import { Input } from './components/ui/Input';
import { Button } from './components/ui/Button';
import { UserCard } from './components/UserCard';

export default function App() {
  const [apiError, setApiError] = useState<string | null>(null);
  const { data: users, isLoading: isLoadingUsers, isError: isErrorUsers } = useUsers();
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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gerenciamento de Usuários
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Adicione e visualize usuários do sistema.
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Formulário */}
          <section className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 h-fit">
            <h2 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
              Novo Usuário
            </h2>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input
                label="Nome"
                placeholder="Ex: João Silva"
                error={errors.name?.message}
                {...register('name')}
              />
              
              <Input
                label="E-mail"
                type="email"
                placeholder="Ex: joao@email.com"
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

          {/* Listagem */}
          <section className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center justify-between">
              Usuários Cadastrados
              <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                {users?.length || 0}
              </span>
            </h2>

            {isLoadingUsers ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-24 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
                ))}
              </div>
            ) : isErrorUsers ? (
               <div className="p-4 rounded-md bg-red-50 text-red-700 border border-red-200">
                  Erro ao carregar usuários. Verifique se o backend está rodando.
               </div>
            ) : users?.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                Nenhum usuário cadastrado ainda.
              </p>
            ) : (
              <div className="space-y-3">
                {users?.map((user) => (
                  <UserCard key={user.id} user={user} />
                ))}
              </div>
            )}
          </section>
        </main>
      </div>
    </div>
  );
}
