import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import './PostulanteDetails.css'

export default function PostulanteDetails() {
  const location = useLocation();

  // Utiliza useState para manejar el estado del postulante
  const [postulante, setPostulante] = useState(location.state?.postulante);

  const actualizarEstadoPostulante = async (nuevoEstado) => {
    const isConfirmed = window.confirm(`¿Seguro que desea ${nuevoEstado === 'Aprobado' ? 'Aceptar' : 'Rechazar'} al alumno?`);
    if (!isConfirmed) {
      return;
    }

    try {
      const rut = postulante.rut;
      const url = `http://localhost:4000/api/adminin/${rut}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Postulación ${nuevoEstado.toLowerCase()} con éxito.`);
        console.log(result);
        // Actualiza el estado del postulante en el componente
        setPostulante(prevPostulante => ({
          ...prevPostulante,
          estado: nuevoEstado
        }));
      } else {
        throw new Error('No se pudo actualizar el estado de la postulación');
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      alert(`Error al ${nuevoEstado === 'Aprobado' ? 'aceptar' : 'rechazar'} la postulación: ` + error.message);
    }
  };

  const handleAccept = () => {
    actualizarEstadoPostulante('Aprobado');
  };

  const handleReject = () => {
    actualizarEstadoPostulante('Rechazado');
  };

  if (!postulante) {
    return <div>No se encontró el postulante.</div>;
  }

  return (
    <div className='card'>
      <h1>Detalles del Postulante</h1>
      <p><strong>Nombre:</strong> {postulante.nombre}</p>
      <p><strong>RUT:</strong> {postulante.rut}</p>
      <p><strong>Correo UTEM:</strong> {postulante.correo}</p>
      <p><strong>Código Carrera:</strong> {postulante.codigoCarrera}</p>
      <p><strong>Asignatura:</strong> {postulante.asignatura}</p>
      <p><strong>Nota:</strong> {postulante.nota}</p>
      <p><strong>Estado:</strong> {postulante.estado}</p>
      <strong>PreAprobacion:</strong>
      {
        postulante.pre_aprobacion
          ? <p>Sí</p>
          : <p>No</p>
      }


      <button className='btn btn-success' onClick={handleAccept}>Aceptar</button>
      <button className='btn btn-danger' onClick={handleReject}>Rechazar</button>
    </div>
  );
}
