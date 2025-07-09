// src/components/Header.jsx
import { NavLink } from 'react-router-dom';
import './Header.css';

export default function Header() {
  return (
    <header className="header">
      <div className="header-container page-container">
        <div className="logo">Peace of Mind Insurance</div>
        <nav>
          <ul className="nav-list">
            <li><NavLink to="/" end className="nav-link">Home</NavLink></li>
            <li><NavLink to="/start-policy" className="nav-link">Start Policy</NavLink></li>
            <li><NavLink to="/faq" className="nav-link">FAQ</NavLink></li>
            <li><NavLink to="/about" className="nav-link">About Us</NavLink></li>
          </ul>
        </nav>
        <div className="auth-links">
          <NavLink to="/login" className="btn auth-btn">Login</NavLink>
        </div>
      </div>
    </header>
);
}
