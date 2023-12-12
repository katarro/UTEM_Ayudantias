import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../header/Header';
import './Admin.css'

export default function Administrador() {
  const API_URL = "http://localhost:4000"
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Estado para el indicador de carga
  const [errorMessage, setErrorMessage] = useState(''); // Estado para el mensaje de error

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Iniciar la carga
    setErrorMessage(''); // Limpiar mensajes de error anteriores


    try {
      const API = `${API_URL}/api/login`
      console.log(API)

      const response = await fetch(API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (response.ok) {
        // Verificar el tipo de usuario y guardar el token correspondiente
        if (data.userType === 'administrador') {
          localStorage.setItem('tokenAdmin', data.token);

          navigate('/requisitos-admin'); // Redirige al usuario administrador
        } else if (data.userType === 'profesor') {

          localStorage.setItem('tokenProfesor', data.token);
          navigate('/profesor'); // Redirige al usuario profesor
        }
      } else {
        setErrorMessage(data.message || 'Credenciales incorrectas'); // Establecer mensaje de error
      }
    } catch (error) {
      console.error('Error durante el inicio de sesión:', error);
      setErrorMessage('No hay credenciales validas');
    } finally {
      setIsLoading(false); // Finalizar la carga
    }
  };


const handlePasswordReset = async (e) => {
  e.preventDefault();
  setIsLoading(true);

  let correo = email;

  try {
    const response = await fetch(`${API_URL}/api/restablecer`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo })
    });

    if (!response.ok) {
      setErrorMessage('Error al enviar el correo');
      return;
    }
    alert("Correo de restablecimiento enviado")
    console.log('Correo de restablecimiento enviado');

  } catch (error) {
    console.error('Error al enviar el correo:', error);
    setErrorMessage('Error al procesar la solicitud');
  } finally {
    setIsLoading(false);
  }
};



  return (

    <>
      <Header />
      <div className="container-admin">
        <div className="admin-container">
          <h1>Ingresar</h1>

          {isLoading && <div>Cargando...</div>}
          {errorMessage && <div className="error-message">{errorMessage}</div>}

          <form onSubmit={isResettingPassword ? handlePasswordReset : handleLogin}>
            <div className="input-group">
              <label htmlFor="email">Correo Electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              /* required */
              />
            </div>
            {!isResettingPassword && (
              <div className="input-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /* required */
                />
              </div>
            )}
            <button type="submit" className="btn">
              {isResettingPassword ? 'Restablecer Contraseña' : 'Iniciar Sesión'}
            </button>

          </form>
          {!isResettingPassword ? (
            <p className="reset-password" onClick={() => setIsResettingPassword(true)}>
              ¿Olvidaste tu contraseña?
            </p>
          ) : (
            <p className="reset-password" onClick={() => setIsResettingPassword(false)}>
              Volver al inicio de sesión
            </p>
          )}
        </div>
      </div>
    </>

  );
}

