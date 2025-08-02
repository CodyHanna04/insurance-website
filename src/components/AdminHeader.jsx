import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function AdminHeader() {
  const { signOut } = useAuth();
  const nav = useNavigate();
  const logout = async () => { await nav('/'); signOut();  };

  return (
    <header className="header">
      <div className="header-container page-container">
        <div className="logo">Peace of Mind Insurance</div>
        <nav>
          <ul className="nav-list">
            <li><NavLink to="/admin-dashboard" end className="nav-link">Dashboard</NavLink></li>
            <li><NavLink to="/admin-dashboard/manage-policies" className="nav-link">Manage Policies</NavLink></li>
            <li><NavLink to="/admin-dashboard/clients" className="nav-link">Clients</NavLink></li>
            <li><NavLink to="/admin-dashboard/user-policies" className="nav-link">User Policies</NavLink></li>
          </ul>
        </nav>
        <button onClick={logout} className="btn auth-btn">Logout</button>
      </div>
    </header>
  );
}
