import { useAuth } from '../context/AuthContext';
import Header from './Header';           // default
import ClientHeader from './ClientHeader';
import AdminHeader from './AdminHeader';

export default function RoleBasedHeader() {
  const { currentUser, role } = useAuth();
  if (currentUser) {
    if (role === 'admin') return <AdminHeader />;
    if (role === 'client') return <ClientHeader />;
  }
  return <Header />;
}
