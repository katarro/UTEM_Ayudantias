import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Adminin.css'; // Asegúrate de importar tu archivo CSS

export default function AdminIn() {
  const [postulantes, setPostulantes] = useState([]);
  const [filteredPostulantes, setFilteredPostulantes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true); // Estado para controlar el indicador de carga
  const navigate = useNavigate();

  useEffect(() => {
    const cargarPostulantes = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/adminin');
        if (!response.ok) {
          throw new Error('Hubo un problema al obtener los datos');
        }
        const data = await response.json();
        setPostulantes(data.postulantes); // Asumiendo que la API devuelve un objeto con una propiedad postulantes
        setFilteredPostulantes(data.postulantes); // Inicializar los postulantes filtrados
      } catch (error) {
        console.error('Error al cargar los postulantes:', error);
      } finally {
        setIsLoading(false);
      }
    };
    cargarPostulantes();
  }, []);

  useEffect(() => {
    // Filtrar postulantes cuando el searchTerm cambie
    const results = postulantes.filter(postulante =>
      postulante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      postulante.rut.includes(searchTerm)
    );
    setFilteredPostulantes(results);
  }, [searchTerm, postulantes]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleItemClick = (item) => {
    navigate(`/adminin/${item.rut}`, { state: { postulante: item } });
  };

  if (isLoading) {
    return <div className="loader">Cargando...</div>;
  }

  return (
    <div className="container mt-5 mb-5">
      <div className="row mb-4">
        <div className="col-12">
          <input
            type="text"
            className="form-control"
            placeholder="Buscar por nombre o RUT..."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="row">
        {filteredPostulantes.map((item, index) => (
          <div key={index} className="col-sm-6 col-lg-4 mb-4" onClick={() => handleItemClick(item)}>
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{item.nombre}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{item.asignatura}</h6>
                <p className="card-text">{item.nota}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
