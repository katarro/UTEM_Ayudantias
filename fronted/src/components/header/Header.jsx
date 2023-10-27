import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <nav className="navbar">
        <Link to="/" className="nav-link">Inicio</Link>
        <Link to="/postular" className="nav-link">Postular</Link>
        <Link to="/estado" className="nav-link">Ver Estado</Link>
        <Link to="/admin" className="nav-link">Administrador</Link>
      </nav>
    </header>
  );
}

export default Header;
