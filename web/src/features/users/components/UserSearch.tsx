import { useState } from 'react';
import { Search, X } from 'lucide-react';
import { isAxiosError } from 'axios';
import { useUser } from '../hooks/useUsers';
import { Input } from '../../../components/ui/Input';
import { Button } from '../../../components/ui/Button';
import { UserCard } from './UserCard';
import { UserCardSkeleton } from './skeletons/UserCardSkeleton';
import { UserDetailsModal } from './UserDetailsModal';
import type { User } from '../schemas/user';

export function UserSearch() {
  const [searchId, setSearchId] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data: user, isLoading, isError, error } = useUser(searchId);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setSearchId(inputValue.trim());
    }
  };

  const handleClear = () => {
    setInputValue('');
    setSearchId('');
  };

  return (
    <section className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
        <Search className="w-5 h-5" />
        Buscar Usuário por ID
      </h2>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="flex-1">
          <Input
            placeholder="Digite o ID do usuário..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="w-full"
          />
        </div>
        <Button type="submit" disabled={isLoading || !inputValue.trim()}>
          {isLoading ? 'Buscando...' : 'Buscar'}
        </Button>
        {searchId && (
          <Button type="button" variant="secondary" onClick={handleClear} title="Limpar busca">
            <X className="w-4 h-4" />
          </Button>
        )}
      </form>

      {isError && (
        <div className="p-4 rounded-md bg-red-100 border border-red-400 text-red-700 dark:bg-red-900/50 dark:border-red-700 dark:text-red-200 text-sm">
          {isAxiosError(error) && error.response?.status === 404 
            ? 'Usuário não encontrado.' 
            : 'Erro ao buscar usuário. Verifique o ID e tente novamente.'}
        </div>
      )}

      {isLoading && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Buscando...</h3>
          <UserCardSkeleton />
        </div>
      )}

      {user && !isLoading && !isError && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Resultado da busca:</h3>
          <UserCard 
            user={user} 
            onViewDetails={setSelectedUser} 
          />
        </div>
      )}

      <UserDetailsModal 
        user={selectedUser} 
        onClose={() => setSelectedUser(null)} 
      />
    </section>
  );
}
