import { UserForm } from '../features/users/components/UserForm';
import { UserList } from '../features/users/components/UserList';

export function UsersPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Gerenciamento de Usuários - Teste Segurali
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Adicionar e visualizar usuários. Desenvolvido por Guilherme Saud
          </p>
        </header>

        <main className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <UserForm />
          <UserList />
        </main>
      </div>
    </div>
  );
}
