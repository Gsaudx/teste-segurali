import { Eye } from 'lucide-react';
import type { User } from '../schemas/user';
import { Button } from '../../../components/ui/Button';

interface UserCardProps {
  user: User;
  onViewDetails: (user: User) => void;
}

export function UserCard({ user, onViewDetails }: UserCardProps) {
  return (
    <div className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow flex items-center justify-between">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
          {user.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
      </div>
      
      <Button 
        variant="secondary" 
        onClick={() => onViewDetails(user)}
        className="p-2 h-auto"
        title="Ver detalhes"
      >
        <Eye className="w-4 h-4" />
      </Button>
    </div>
  );
}
