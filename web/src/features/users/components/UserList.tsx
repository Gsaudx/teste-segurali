import { useState } from 'react';
import { Search } from 'lucide-react';
import { useUsers } from '../hooks/useUsers';
import { UserCard } from './UserCard';
import { Button } from '../../../components/ui/Button';
import { Input } from '../../../components/ui/Input';
import { UserDetailsModal } from './UserDetailsModal';
import type { User } from '../schemas/user';

export function UserList() {
  const [page, setPage] = useState(1);
  const [nameInput, setNameInput] = useState('');
  const [searchName, setSearchName] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  
  const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } = useUsers(page, 5, searchName);

  const users = usersData?.data;
  const meta = usersData?.meta;
  const totalPages = meta?.totalPages || 1;
  const hasMore = page < totalPages;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchName(nameInput);
    setPage(1);
  };

  return (
    <>
      <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex flex-col gap-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            Usuários Cadastrados
            <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
              {meta?.total || 0}
            </span>
          </h2>
          
          <form onSubmit={handleSearch} className="flex items-center gap-2 w-full">
            <div className="flex-1">
              <Input 
                placeholder="Buscar por nome..." 
                value={nameInput}
                onChange={(e) => setNameInput(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" variant="secondary" title="Buscar" className="h-10 w-10 p-0 shrink-0">
              <Search className="w-4 h-4" />
            </Button>
          </form>
        </div>

        <div className="p-6">
          {isLoadingUsers ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-gray-700 last:border-0 animate-pulse">
                  <div className="flex flex-col gap-2 w-full">
                    <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4" />
                  </div>
                  <div className="h-8 w-8 bg-gray-200 dark:bg-gray-700 rounded" />
                </div>
              ))}
            </div>
          ) : isErrorUsers ? (
             <div className="p-4 rounded-md bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/50 dark:border-red-700 dark:text-red-200">
                Erro ao carregar usuários. Verifique se o backend e o banco de dados estão rodando.
             </div>
          ) : users?.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhum usuário cadastrado ainda.
            </p>
          ) : (
            <>
              <div className="flex flex-col">
                {users?.map((user) => (
                  <UserCard 
                    key={user.id} 
                    user={user} 
                    onViewDetails={setSelectedUser}
                    variant="simple"
                  />
                ))}
              </div>

              <div className="flex items-center justify-between pt-6 mt-2 border-t border-gray-100 dark:border-gray-700">
                <Button
                  variant="secondary"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                >
                  Anterior
                </Button>
                <span className="text-sm text-gray-500">
                  Página {page} de {totalPages}
                </span>
                <Button
                  variant="secondary"
                  disabled={!hasMore}
                  onClick={() => setPage((p) => p + 1)}
                >
                  Próxima
                </Button>
              </div>
            </>
          )}
        </div>
      </section>

      <UserDetailsModal 
        user={selectedUser} 
        onClose={() => setSelectedUser(null)} 
      />
    </>
  );
}
