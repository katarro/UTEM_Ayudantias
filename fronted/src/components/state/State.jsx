import React, { useState } from 'react';
import "./State.css";
import Cleave from 'cleave.js/react';

export default function State() {
  const [estadoPostulacion, setEstadoPostulacion] = useState('Pendiente');

  const [formData, setFormData] = useState({
    rut: '',
  });

  const handleChangeRut = (e) => {
    const rut = e.target.rawValue;
    setFormData({ ...formData, rut });
  };

  const verificarPostulacion = () => {
    // Aquí iría la lógica para hacer una petición a la base de datos
    // Por ahora, vamos a simularlo con una función

    // Simulando que los RUTs terminados en número par están aprobados
    if (parseInt(formData.rut.slice(-2, -1)) % 2 === 0) {
      setEstadoPostulacion('Aprobado');
    } else {
      setEstadoPostulacion('Rechazado');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    verificarPostulacion();
  };

  return (
    <div className="container mt-5">
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
      <div className={`alert ${estadoPostulacion === 'Aprobado' ? 'alert-success' : estadoPostulacion === 'Rechazado' ? 'alert-danger' : 'alert-warning'} mt-4`} role="alert">
        Tu postulación está: {estadoPostulacion}
      </div>
    </div>
  );
}
