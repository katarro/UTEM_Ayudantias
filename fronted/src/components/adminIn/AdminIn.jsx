import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Adminin.css';

export default function AdminIn() {
  const [postulantes, setPostulantes] = useState([]);
  const [filteredPostulantes, setFilteredPostulantes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterAsignatura, setFilterAsignatura] = useState('');
  const [notaRange, setNotaRange] = useState({ min: 1.0, max: 7.0 });
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPostulantes = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/adminin');
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los datos');
        }
        const data = await response.json();
        setPostulantes(data.postulantes);
        setFilteredPostulantes(data.postulantes);
      } catch (error) {
        console.error('Error al cargar los postulantes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    cargarPostulantes();
  }, []);

  useEffect(() => {
    let results = postulantes;

    // Filtro por nombre o RUT
    if (searchTerm) {
      results = results.filter(postulante =>
        postulante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        postulante.rut.includes(searchTerm)
      );
    }

    // Filtro por asignatura
    if (filterAsignatura) {
      results = results.filter(postulante =>
        postulante.asignatura === filterAsignatura
      );
    }

    // Filtro por rango de notas
    results = results.filter(postulante =>
      postulante.nota >= notaRange.min && postulante.nota <= notaRange.max
    );

    // Ordenar por nota
    results.sort((a, b) => {
      const notaA = parseFloat(a.nota);
      const notaB = parseFloat(b.nota);
      if (sortOrder === 'asc') {
        return notaA - notaB;
      } else {
        return notaB - notaA;
      }
    });

    setFilteredPostulantes(results);
  }, [searchTerm, postulantes, sortOrder, filterAsignatura, notaRange]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = (item) => {
    navigate(`/adminin/${item.rut}`, { state: { postulante: item } });
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleAsignaturaChange = (e) => {
    setFilterAsignatura(e.target.value);
  };

  const handleNotaMinChange = (e) => {
    setNotaRange({ ...notaRange, min: e.target.value });
  };

  const handleNotaMaxChange = (e) => {
    setNotaRange({ ...notaRange, max: e.target.value });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSortOrder('asc');
    setFilterAsignatura('');
    setNotaRange({ min: 1.0, max: 7.0 });
  };

  if (isLoading) {
    return <div className="loader">Cargando...</div>;
  }

  const sortNotes = (ascending = true) => {
    setFilteredPostulantes(prevPostulantes => {
      const postulantesSorted = [...prevPostulantes];
      postulantesSorted.sort((a, b) => {
        return ascending ? a.nota - b.nota : b.nota - a.nota;
      });
      return postulantesSorted;
    });
  };

  // Función para filtrar por estado de aprobación
  const filterByApproval = (approved) => {
    const results = postulantes.filter(postulante => postulante.estado === (approved ? 'Aprobado' : 'Rechazado'));
    setFilteredPostulantes(results);
  };

  return (
    <div className='container'>

      
      <div className="filters">
        <input
          type="text"
          className="search-input"
          placeholder="Buscar por nombre o RUT..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="filter-buttons mt-5">
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
              </div>
              <div className='asignatura'>

                <h6 className="row-subtitle">{item.asignatura}</h6>
              </div>
              <div className='nota'>

                <p className="row-text">{item.nota}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
