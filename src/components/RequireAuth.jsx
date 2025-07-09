import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function RequireAuth({ allowedRoles, children }) {
  const { currentUser, role } = useAuth();
  if (!currentUser) {
    // no one’s logged in → send to login
    return <Navigate to="/login" replace />;
  }
  if (!allowedRoles.includes(role)) {
    // logged in but wrong role → redirect home
    return <Navigate to="/" replace />;
  }
  return children;
}
