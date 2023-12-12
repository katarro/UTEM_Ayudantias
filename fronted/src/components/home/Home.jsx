// Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import ImagenHome from './media/home-foto.jpg'
import Information from '../information/Information';
import Footer from '../footer/Footer';
import Header from '../header/Header';

// eslint-disable-next-line no-lone-blocks
{/* <h1>Bienvenido</h1>
<Link to="/estado" className="btn btn-secondary">Ver Estado</Link>
<Link to="/admin" className='btn btn-danger'>Administrador</Link>
<Link to="/login-profesor" className='btn btn-success'>Profesores</Link> */}

export default function Home() {
  return (
    <>
        <Header />

      <div className="home-container">

        <div className="image-container">
          <img src={ImagenHome} alt="Descripción" />
          <div className="centered-text">
            <h1>POSTULACION DE AYUDANTIAS</h1>
            <p>¿Deseas ser ayudante?</p>
            <div className="button-container">
              <Link to="/postular" className="btn btn-primary">Postular</Link>
            </div>

          </div>

        </div>
      </div>
      <Information />
      <Footer/>
    </>
  );
}

