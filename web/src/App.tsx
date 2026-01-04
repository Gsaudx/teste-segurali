import { Toaster } from 'sonner';
import { UsersPage } from './pages/UsersPage';

export default function App() {
  return (
    <>
      <UsersPage />
      <Toaster 
        position="top-right"
        toastOptions={{
          classNames: {
            error: '!bg-red-100 !border !border-red-400 !text-red-700 dark:!bg-red-900 dark:!border-red-700 dark:!text-red-200',
            success: '!bg-green-100 !border !border-green-400 !text-green-700 dark:!bg-green-900 dark:!border-green-700 dark:!text-green-200',
          },
        }}
      />
    </>
  );
}
