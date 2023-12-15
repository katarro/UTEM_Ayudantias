//import "./Register.css";
import React, { useState } from 'react';
import Header from '../header/Header';
import { jwtDecode } from "jwt-decode";


export default function CambiarPassword() {
  const API_URL = "http://13.48.106.173:8080/"
  const [contraseñaActual, setContraseñaActual] = useState('');
  const [nuevaContraseña, setNuevaContraseña] = useState('');
  const [repetirNuevaContraseña, setRepetirNuevaContraseña] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (nuevaContraseña !== repetirNuevaContraseña) {
      setError('Las contraseñas nuevas no coinciden.');
      return;
    }

    let correoUsuario;

    const tokenProfesor = localStorage.getItem("tokenProfesor");
    const tokenAdmin = localStorage.getItem("tokenAdmin");

    if (tokenProfesor) {
      const usuarioInfo = jwtDecode(tokenProfesor);
      correoUsuario = usuarioInfo.email; // Asegúrate de que el token contenga el campo 'email'
    } else if (tokenAdmin) {
      const usuarioInfo = jwtDecode(tokenAdmin);
      correoUsuario = usuarioInfo.email; // Asegúrate de que el token contenga el campo 'email'
    }

    try {
      const response = await fetch(`${API_URL}/api/cambiar-contrasena`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          correo: correoUsuario,
          contrasenaActual: contraseñaActual,
          contrasenaNueva: nuevaContraseña
        })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar la contraseña');
      }
      setSuccessMessage('Contraseña cambiada con éxito');
      setContraseñaActual('');
      setNuevaContraseña('');
      setRepetirNuevaContraseña('');
      console.log('Contraseña cambiada con éxito');
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
      setError('Error al cambiar la contraseña');
    }


  };



  return (
    <>
      <Header />
      <div className="register-container mt-5">
        <h1>Cambiar Contraseña</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="contraseñaActual" className="form-label">Contraseña Actual</label>
            <input
              type="password"
              className="form-control"
              id="contraseñaActual"
              value={contraseñaActual}
              onChange={(e) => setContraseñaActual(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="nuevaContraseña" className="form-label">Nueva Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="nuevaContraseña"
              value={nuevaContraseña}
              onChange={(e) => setNuevaContraseña(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="repetirNuevaContraseña" className="form-label">Repetir Nueva Contraseña</label>
            <input
              type="password"
              className="form-control"
              id="repetirNuevaContraseña"
              value={repetirNuevaContraseña}
              onChange={(e) => setRepetirNuevaContraseña(e.target.value)}
              required
            />
          </div>
          {error && <div className="alert alert-danger">{error}</div>}
          {successMessage && <div className="alert alert-success">{successMessage}</div>}
          <button type="submit" className="btn btn-primary">Cambiar Contraseña</button>
        </form>
      </div>
    </>
  );
}