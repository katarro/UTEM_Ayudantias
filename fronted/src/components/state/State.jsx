import React, { useState } from 'react';
import Cleave from 'cleave.js/react';
import "./State.css";
import Header from '../header/Header'

export default function State() {
  const [estadoPostulacion, setEstadoPostulacion] = useState('');
  const [formData, setFormData] = useState({
    rut: '',
  });

  const handleChangeRut = (e) => {
    const rut = e.target.rawValue;
    setFormData({ ...formData, rut });
  };

  const verificarPostulacion = async () => {
    const rut = formData.rut;
    console.log(rut)
    const url = `http://13.48.106.173:8080/api/estado/${rut}`;

    try {
      const response = await fetch(url);

      if (response.ok) {
        const result = await response.json();
        // Actualizar el estado con la información obtenida de la API
        setEstadoPostulacion(result.postulacion.estado);
      } else {
        throw new Error('El rut ingresado no está registrado');
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      alert('Error al verificar el estado de la postulación: ' + error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verificarPostulacion();
  };

  return (
    < >

      <Header />

      <div className="container-state">
        <div className="state-container mt-5">
          <h1>Estado de la Postulación</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="rut" className="form-label">Ingresa tu RUT</label>
              <Cleave
                options={{
                  blocks: [2, 3, 3, 1],
                  delimiters: ['.', '.', '-'],
                  numericOnly: true
                }}
                onChange={handleChangeRut}
                value={formData.rut}
                className="form-control"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">Verificar Estado</button>
          </form>
          {formData.rut && estadoPostulacion && (
            <div className={`alert ${estadoPostulacion === 'Aprobado' ? 'alert-success' : estadoPostulacion === 'Rechazado' ? 'alert-danger' : 'alert-warning'} mt-4`} role="alert">
              Tu postulación está: {estadoPostulacion}
            </div>
          )}
        </div>
      </div>

    </>
  );
}
