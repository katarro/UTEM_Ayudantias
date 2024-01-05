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
    { value: "21030 - Ingeniería en Informática", label: "21030 - Ingeniería en Informática" },
    { value: "21041 - Ingeniería Civil en Computación mención Informática", label: "21041 - Ingeniería Civil en Computación mención Informática" },
    { value: "21049 - Ingeniería Civil en Ciencias de Datos", label: "21049 - Ingeniería Civil en Ciencias de Datos" },
  ];

  const asignaturaOptions = [
    { value: "Introducción a la Ingeniería", label: "INFB8010 - Introducción a la Ingeniería" },
    { value: "lgoritmos y Programación", label: "INFB8021 - Algoritmos y Programación" },
    { value: "Estructura de Datos", label: "INFB8030 - Estructura de Datos" },
    { value: "Lenguajes de Programación", label: "INFB8040 - Lenguajes de Programación" },
    { value: "INFB8050 - Bases de Datos", label: "INFB8050 - Bases de Datos" },
    { value: "Sistemas de Información", label: "INFB8062 - Sistemas de Información" },
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