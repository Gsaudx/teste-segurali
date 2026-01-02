import type { User } from '../schemas/user';

interface UserCardProps {
  user: User;
}

export function UserCard({ user }: UserCardProps) {
  return (
    <div className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 hover:shadow-md transition-shadow">
      <div className="flex flex-col gap-1">
        <h3 className="font-semibold text-lg text-gray-900 dark:text-white">
          {user.name}
        </h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
        <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-700/10 dark:bg-blue-900/30 dark:text-blue-400">
          {user.age} anos
        </span>
      </div>
    </div>
  );
}
