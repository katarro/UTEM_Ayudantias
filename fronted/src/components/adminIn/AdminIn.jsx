import { useNavigate } from 'react-router-dom';
import useAdminin from './useAdminin';
import React from 'react';
import './Adminin.css';
import Header from '../header/Header';
import { Link } from 'react-router-dom';


export default function AdminIn() {
  const {
    postulantes,
    filteredPostulantes,
    searchTerm,
    isLoading,
    setSearchTerm,
    setSortOrder,
    setFilterAsignatura,
    setNotaRange,
    setFilteredPostulantes
  } = useAdminin();
  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = (item) => {
    navigate(`/adminin/${item.rut}`, { state: { postulante: item } });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSortOrder('asc');
    setFilterAsignatura('');
    setNotaRange({ min: 1.0, max: 7.0 });
  };

  const sortNotes = (ascending = true) => {
    setFilteredPostulantes(prevPostulantes => {
      const postulantesSorted = [...prevPostulantes];
      postulantesSorted.sort((a, b) => {
        return ascending ? a.nota - b.nota : b.nota - a.nota;
      });
      return postulantesSorted;
    });
  };

  const filterByApproval = (approved) => {
    const results = postulantes.filter(postulante => postulante.estado === (approved ? 'Aprobado' : 'Rechazado'));
    setFilteredPostulantes(results);
  };

  if (isLoading) {
    return <div className="loader">Cargando...</div>;
  }

  function formatRut(rut) {
    // Elimina cualquier carácter que no sea dígito o 'k'
    const cleanRut = rut.replace(/[^0-9kK]/g, '');

    // Separa el dígito verificador del resto del RUT
    const body = cleanRut.slice(0, -1);
    const dv = cleanRut.slice(-1).toUpperCase();

    // Formatea el cuerpo del RUT con puntos
    const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    // Retorna el RUT formateado
    return `${formattedBody}-${dv}`;
  }

  function codigoToCarrera(codigo) {
    const carreras = {
      21030: "Ingeniería en Informática",
      21041: "Ingeniería Civil en Computación mención Informática",
      21049: "Ciencia de Datos"
    };

    return carreras[codigo];
  }



  return (

    <>
      <Header />
      <div className="container-adminin">
        <div className='container'>

          <div className="container-h1">
            <h1>Administrador</h1>

          </div>
          <div className="filters">
            <div className="container-search">
              <input
                type="text"
                className="search-input"
                placeholder="Buscar por nombre o RUT..."
                value={searchTerm}
                onChange={handleSearchChange}
              />
            </div>

            <div className="filter-buttons mt-5">
              <Link to='/admin/registrar-profesor'>
                <button className='filter-btn' >Registar Profesor</button>
              </Link>
              <button className="filter-btn" onClick={() => filterByApproval(true)}>Aprobados</button>
              <button className="filter-btn" onClick={() => filterByApproval(false)}>Rechazados</button>
              <button className="filter-btn" onClick={() => sortNotes(true)}>Ordenar Nota ↗</button>
              <button className="filter-btn" onClick={() => sortNotes(false)}>Ordenar Nota ↘</button>
            </div>
            <div className='clean-filter'>
              <button className='btn btn-secondary' onClick={handleClearFilters}>Limpiar Filtros</button>
            </div>
          </div>



          <div className="admin-container">
            {filteredPostulantes.map((item, index) => (
              <div key={index} className="row-container" onClick={() => handleItemClick(item)}>
                <div className="row-content">
                  <div className='nombre'>
                    <h5 className="row-title">{item.nombre}</h5>
                    <p className='row-subtitle'>{formatRut(item.rut)}</p>
                  </div>

                  <div className='asignatura'>
                    <h6 className="row-tittle">{item.asignatura}</h6>
                    <p className='row-subtittle'>{codigoToCarrera(item.codigo_carrera)}</p>
                  </div>
                  <div className='nota'>

                    <p className="row-text">{item.nota}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>

  );
}
