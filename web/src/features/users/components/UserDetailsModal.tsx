import { Modal } from '../../../components/ui/Modal';
import type { User } from '../schemas/user';

interface UserDetailsModalProps {
  user: User | null;
  onClose: () => void;
}

export function UserDetailsModal({ user, onClose }: UserDetailsModalProps) {
  return (
    <Modal
      isOpen={!!user}
      onClose={onClose}
      title="Detalhes do Usuário"
    >
      {user && (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">ID</label>
            <p className="text-gray-900 dark:text-white font-mono text-sm">{user.id}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Nome</label>
            <p className="text-lg font-medium text-gray-900 dark:text-white">{user.name}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Email</label>
            <p className="text-lg font-medium text-gray-900 dark:text-white">{user.email}</p>
          </div>
          <div>
            <label className="text-sm font-medium text-gray-500 dark:text-gray-400">Idade</label>
            <p className="text-lg font-medium text-gray-900 dark:text-white">{user.age} anos</p>
          </div>
        </div>
      )}
    </Modal>
  );
}
