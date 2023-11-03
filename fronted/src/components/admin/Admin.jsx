import React, { useState } from 'react';
import {Link} from "react-router-dom";
import './Admin.css';


function Administrador() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    if (email === 'profesor@utem.cl') {
      // Aquí deberías añadir la lógica para verificar la contraseña
      console.log('Inicio de sesión exitoso');
    } else {
      console.log('Correo electrónico no válido');
    }
  };

  const handlePasswordReset = (e) => {
    e.preventDefault();
    // Aquí deberías añadir la lógica para enviar el correo de restablecimiento de contraseña
    console.log('Correo de restablecimiento enviado');
  };

  return (
    <div className="admin-container">
      <h1>Administrador</h1>
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
        {/* <button type="submit" className="btn">
          {isResettingPassword ? 'Restablecer Contraseña' : 'Iniciar Sesión'}
        </button> */}
        <Link to="/adminin" className="btn btn-primary">Entrar</Link>

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
  );
}

export default Administrador;
