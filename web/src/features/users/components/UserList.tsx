import { useState } from 'react';
import { useUsers } from '../hooks/useUsers';
import { UserCard } from './UserCard';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import type { User } from '../schemas/user';

export function UserList() {
  const [page, setPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } = useUsers(page);

  const users = usersData?.data;
  const meta = usersData?.meta;
  const totalPages = meta?.totalPages || 1;
  const hasMore = page < totalPages;

  return (
    <>
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center justify-between">
          Usuários Cadastrados
          <span className="text-sm font-normal text-gray-500 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
            {meta?.total || 0}
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
              Erro ao carregar usuários. Verifique se o backend e o banco de dados estão rodando.
           </div>
        ) : users?.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nenhum usuário cadastrado ainda.
          </p>
        ) : (
          <>
            <div className="space-y-3">
              {users?.map((user) => (
                <UserCard 
                  key={user.id} 
                  user={user} 
                  onViewDetails={setSelectedUser}
                />
              ))}
            </div>

            <div className="flex items-center justify-between pt-4">
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
      </section>

      <Modal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        title="Detalhes do Usuário"
      >
        {selectedUser && (
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</label>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{selectedUser.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</label>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{selectedUser.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">E-mail</label>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{selectedUser.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Idade</label>
              <p className="text-lg font-medium text-gray-900 dark:text-white">{selectedUser.age} anos</p>
            </div>
          </div>
        )}
      </Modal>
    </>
  );
}
