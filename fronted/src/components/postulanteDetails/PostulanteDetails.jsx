import React from 'react';
import { useLocation } from 'react-router-dom';

export default function PostulanteDetails() {
  const location = useLocation();
  const postulante = location.state?.postulante;

  const handleAccept = () => {
    // Lógica para aceptar la postulación
  };

  const handleReject = () => {
    // Lógica para rechazar la postulación
  };

  if (!postulante) {
    // Si no hay un postulante en el estado, podrías redirigir de nuevo a la lista o mostrar un mensaje
    return <div>No se encontró el postulante.</div>;
  }

  return (
    <div>
      <h1>Detalles del Postulante</h1>
      <p><strong>Nombre:</strong> {postulante.nombre}</p>
      <p><strong>RUT:</strong> {postulante.rut}</p>
      <p><strong>Correo UTEM:</strong> {postulante.correo}</p>
      <p><strong>Código Carrera:</strong> {postulante.codigoCarrera}</p>
      <p><strong>Asignatura:</strong> {postulante.asignatura}</p>
      <p><strong>Nota:</strong> {postulante.nota}</p>
      <p><strong>Estado:</strong> {postulante.estado}</p>
      <button className='btn btn-success' onClick={handleAccept}>Aceptar</button>
      <button className='btn btn-danger' onClick={handleReject}>Rechazar</button>
    </div>
  );
}
