import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import './PostulanteDetails.css'
import Header from '../header/Header';

export default function PostulanteDetails() {

  const API = 'http://13.48.106.173:8080/api/adminin/seleccionar'
  const location = useLocation();

  // Utiliza useState para manejar el estado del postulante
  const [postulante, setPostulante] = useState(location.state?.postulante);
  const [observacion, setObservacion] = useState('');

  // const tokenProfesor = localStorage.getItem('tokenProfesor')
  const tokenAdmin = localStorage.getItem('tokenAdmin')

  function formatRut(rut) {
    const cleanRut = rut.replace(/[^0-9kK]/g, '');
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    return `${formattedBody}-${dv}`;
  }

  const actualizarEstadoPostulante = async (nuevoEstado) => {
    const isConfirmed = window.confirm(`¿Seguro que desea ${nuevoEstado === 'Aprobado' ? 'Aceptar' : 'Rechazar'} al alumno?`);
    if (!isConfirmed) {
      return;
    }
    try {
      const rut = postulante.rut;
      const url = `http://13.48.106.173:8080/api/adminin/${rut}`;

      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ estado: nuevoEstado, observacion: observacion }),
      });

      if (response.ok) {
        const result = await response.json();
        alert(`Postulación ${nuevoEstado.toLowerCase()} con éxito.`);
        console.log(result);
        // Actualiza el estado del postulante en el componente
        setPostulante(prevPostulante => ({
          ...prevPostulante,
          estado: nuevoEstado,
          observacion: observacion
        }));
        setObservacion('')
      } else {
        throw new Error('No se pudo actualizar el estado de la postulación');
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      alert(`Error al ${nuevoEstado === 'Aprobado' ? 'aceptar' : 'rechazar'} la postulación: ` + error.message);
    }
  };

  const handleAccept = () => { actualizarEstadoPostulante('Aprobado'); };

  const handleReject = () => { actualizarEstadoPostulante('Rechazado'); };

  if (!postulante) { return <div>No se encontró el postulante.</div>; }

  /*******************************************************************/










  const actualizarSeleccionadoPostulante = async (nuevaPreAprobacion) => {
    console.log(nuevaPreAprobacion)
    const isConfirmed = window.confirm(`¿Seguro que desea ${nuevaPreAprobacion === 'false' ? 'No pre-aprobar' : 'Pre-aprobar'} al alumno?`);
    if (!isConfirmed) {
      return;
    }
    try {
      const rut = postulante.rut; // Asumiendo que cada postulante tiene un 'id' único
      const url = API;

      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rut: rut, preAprobacion: nuevaPreAprobacion }),
      });

      if (response.ok) {
        const result = await response.json();

        if(nuevaPreAprobacion === 'false'){

          alert("Deseleccion con éxtio")
        }else{
          alert("Pre Seleccion con éxito")
        }
        console.log(result);
        // Actualiza el estado del postulante en el componente
        setPostulante(prevPostulante => ({
          ...prevPostulante,
          pre_aprobacion: nuevaPreAprobacion,
        }));
        setObservacion('');
      } else {
        throw new Error('No se pudo actualizar el estado de la postulación');
      }
    } catch (error) {
      console.error('Error al realizar la petición:', error);
      alert(`Error al ${nuevaPreAprobacion === 'Aprobado' ? 'aceptar' : 'rechazar'} la postulación: ` + error.message);
    }
  };


  const handleSelecionado = (preAprobacion) => {
    actualizarSeleccionadoPostulante(preAprobacion)
  }


  return (
    <>
      <Header />
      <div className="container-card">
        <div className='card'>
          <h1>Detalles del Postulante</h1><br />
          <p><strong>Nombre:</strong> {postulante.nombre}</p>
          <p><strong>RUT:</strong> {formatRut(postulante.rut)}</p>
          <p><strong>Correo UTEM:</strong> {postulante.correo}</p>
          <p><strong>Código Carrera:</strong> {postulante.codigoCarrera}</p>
          <p><strong>Asignatura:</strong> {postulante.asignatura}</p>
          <p><strong>Nota:</strong> {postulante.nota}</p>
          <p><strong>Estado:</strong> {postulante.estado}</p>

          <div style={{ display: 'flex' }}>
            <strong>Seleccionado: </strong>
            {postulante.pre_aprobacion ? <p>Sí</p> : <p>No</p>}
          </div>


          {
            tokenAdmin ?
              (
                <>
                  <div className="observacion">
                    <textarea name="observacion" placeholder='Observaciones...' id="observacion" cols="52" rows="4" value={observacion} onChange={(e) => setObservacion(e.target.value)}></textarea>
                  </div>
                  <button className='btn btn-success' onClick={handleAccept}>Aceptar</button>
                  <button className='btn btn-danger' onClick={handleReject}>Rechazar</button>
                </>


              ) :
              <>
                <button className='btn btn-success' onClick={() => handleSelecionado('true')}>Seleccionar</button>
                <button className='btn btn-danger' onClick={() => handleSelecionado('false')}>Deseleccionar</button>

              </>
          }



        </div>
      </div >
    </>

  );
}
