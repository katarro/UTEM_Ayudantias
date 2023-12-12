import 'react-confirm-alert/src/react-confirm-alert.css';
import { useForm } from './useForm';
import SelectField from './SelectField';
import InputField from './InputField';
import Cleave from 'cleave.js/react';
import React from 'react';
import "./Register.css";
import Header from '../header/Header';

export default function Register() {
  const initialState = {
    nombre: '',
    rut: '',
    correo: '',
    codigo_carrera: '',
    asignatura: '',
    nota: ''
  };

  const [handleSubmit, formData, handleChange, handleChangeRut] = useForm(initialState);


  const carreraOptions = [
    { value: "21049", label: "21049 - Ciencia de Datos" },
    { value: "21030", label: "21030 - Ingeniería en Informática" },
    { value: "21041", label: "21041 - Ingeniería Civil en Computación mención Informática" },

  ];

  const asignaturaOptions = [
    { value: "Introducción a Computación", label: "Introducción a Computación" },
    { value: "Algoritmos y Programación", label: "Algoritmos y Programación" },
    { value: "Estructura de Datos", label: "Estructura de Datos" }
  ];

  return (
    <>
      <Header />

      <div className="register-container mt-5">
        <h1>Postulación</h1>
        <form onSubmit={handleSubmit}>
          <InputField label="Nombre Completo" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
          <div className="mb-3">
            <label htmlFor="rut" className="form-label">RUT</label>
            <br />
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
          <InputField label="Correo UTEM" id="correo" name="correo" type="email" value={formData.correo} onChange={handleChange} />
          <SelectField label="Código Carrera" id="codigoCarrera" type="number" name="codigoCarrera" value={formData.codigoCarrera} onChange={handleChange} options={carreraOptions} />
          <SelectField label="Asignatura" id="asignatura" name="asignatura" value={formData.asignatura} onChange={handleChange} options={asignaturaOptions} />
          <InputField label="Nota en la asignatura" id="nota" name="nota" type="number" value={formData.nota} onChange={handleChange} />
          <button type="submit" className="btn btn-primary">Enviar</button>
        </form>
      </div>
    </>
  );
}