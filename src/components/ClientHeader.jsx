import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Header.css';

export default function ClientHeader() {
  const { signOut } = useAuth();
  const nav = useNavigate();
  const logout = async () => { await signOut(); nav('/'); };

  return (
    <header className="header">
      <div className="header-container page-container">
        <div className="logo">Peace of Mind Insurance</div>
        <nav>
          <ul className="nav-list">
            <li><NavLink to="/" className="nav-link">Home</NavLink></li>
            <li><NavLink to="/start-policy" className="nav-link">Start Policy</NavLink></li>
            <li><NavLink to="/client-dashboard" className="nav-link">My Policies</NavLink></li>
          </ul>
        </nav>
        <button onClick={logout} className="btn auth-btn">Logout</button>
      </div>
    </header>
  );
}
