import React from 'react';
import { useNavigate } from 'react-router-dom';
//import './Adminin.css'; // Asegúrate de importar tu archivo CSS

export default function ProfesorIn() {

  const data = [
    {
      nombre: "Juan Perez",
      rut: "12.345.678-9",
      correo: "juan.perez@utem.cl",
      codigoCarrera: "ING01",
      asignatura: "Intoduccion a la Programacion",
      nota: 6.5,
      estado: "Pendiente"
    },
    {
      nombre: "María González",
      rut: "15.678.910-K",
      correo: "maria.gonzalez@utem.cl",
      codigoCarrera: "ING02",
      asignatura: "Algoritmos y Programacion",
      nota: 5.8,
      estado: "Pendiente"
    },
    {
      nombre: "Carlos Rodríguez",
      rut: "17.890.123-5",
      correo: "carlos.rodriguez@utem.cl",
      codigoCarrera: "ING03",
      asignatura: "Estrcutura de Datos",
      nota: 4.7,
      estado: "Pendiente"
    },
    {
      nombre: "Ana López",
      rut: "18.234.567-8",
      correo: "ana.lopez@utem.cl",
      codigoCarrera: "ING04",
      asignatura: "Estrcutura de Datos",
      nota: 6.2,
      estado: "Pendiente"
    },
    {
      nombre: "Eduardo Morales",
      rut: "19.345.678-4",
      correo: "eduardo.morales@utem.cl",
      codigoCarrera: "ING05",
      asignatura: "Algoritmos y Programacion",
      nota: 6.9,
      estado: "Pendiente"
    },
    {
      nombre: "Sofía Castro",
      rut: "20.456.789-0",
      correo: "sofia.castro@utem.cl",
      codigoCarrera: "ING06",
      asignatura: "Intoduccion a la Programacion",
      nota: 5.4,
      estado: "Pendiente"
    }
  ];
  const navigate = useNavigate();

  const handleItemClick = (item) => {
    navigate(`/profesorin/${item.rut}`, { state: { postulante: item } });
  };

  return (
    <div className="grid-container">
      {data.map((item, index) => (
        <div key={index} className="grid-item" onClick={() => handleItemClick(item)}>
          <div className="item-nombre">{item.nombre}</div>
          <div className="item-asignatura">{item.asignatura}</div>
          <div className="item-nota">{item.nota}</div>
        </div>
      ))}
    </div>
  );
}
