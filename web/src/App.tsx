import { Toaster } from 'sonner';
import { UsersPage } from './pages/UsersPage';

export default function App() {
  return (
    <>
      <UsersPage />
      <Toaster richColors position="top-right" />
    </>
  );
}
