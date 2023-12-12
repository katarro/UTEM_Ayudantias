import { useState, useEffect } from 'react';

const useAdminin = () => {
  const [postulantes, setPostulantes] = useState([]);
  const [filteredPostulantes, setFilteredPostulantes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState('asc');
  const [filterAsignatura, setFilterAsignatura] = useState('');
  const [notaRange, setNotaRange] = useState({ min: 1.0, max: 7.0 });

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

    if (searchTerm) {
      results = results.filter(postulante =>
        postulante.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
        postulante.rut.includes(searchTerm)
      );
    }

    if (filterAsignatura) {
      results = results.filter(postulante =>
        postulante.asignatura === filterAsignatura
      );
    }

    results = results.filter(postulante =>
      postulante.nota >= notaRange.min && postulante.nota <= notaRange.max
    );

    results.sort((a, b) => {
      const notaA = parseFloat(a.nota);
      const notaB = parseFloat(b.nota);
      return sortOrder === 'asc' ? notaA - notaB : notaB - notaA;
    });

    setFilteredPostulantes(results);
  }, [searchTerm, postulantes, sortOrder, filterAsignatura, notaRange]);

  return {
    postulantes,
    filteredPostulantes,
    searchTerm,
    isLoading,
    sortOrder,
    filterAsignatura,
    notaRange,
    setSearchTerm,
    setIsLoading,
    setSortOrder,
    setFilterAsignatura,
    setNotaRange,
    setPostulantes,
    setFilteredPostulantes
  };
};

export default useAdminin;
