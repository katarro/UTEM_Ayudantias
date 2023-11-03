// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenido</h1>
      <Link to="/postular" className="btn btn-primary">Postular</Link>
      <Link to="/estado" className="btn btn-secondary">Ver Estado</Link>
      <Link to="/admin" className='btn btn-danger'>Administrador</Link>
      <Link to="/login-profesor" className='btn btn-success'>Profesores</Link>

    </div>
  );
}

export default Home;
