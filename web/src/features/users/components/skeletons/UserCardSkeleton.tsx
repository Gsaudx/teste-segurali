export function UserCardSkeleton() {
  return (
    <div className="p-4 rounded-lg border border-gray-200 bg-white shadow-sm dark:bg-gray-800 dark:border-gray-700 flex items-center justify-between animate-pulse">
      <div className="flex flex-col gap-2 w-full">
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/3" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
      </div>
      <div className="h-9 w-9 bg-gray-200 dark:bg-gray-700 rounded" />
    </div>
  );
}
