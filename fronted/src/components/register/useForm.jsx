import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';

export const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

  const validarYConvertirDatos = (formData) => {
    const codigoCarreraInt = parseInt(formData.codigoCarrera);
    const notaFloat = parseFloat(formData.nota);

    if (isNaN(codigoCarreraInt) || isNaN(notaFloat)) {
      throw new Error('La conversión de código de carrera o nota ha fallado.');
    }

    return {
      ...formData,
      codigo_carrera: codigoCarreraInt,
      nota: notaFloat
    };
  };

  const enviarDatos = async (datosFormulario) => {
    const response = await fetch('http://13.48.106.173:8080/api/postular', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(datosFormulario),
    });
    return response;
  };

  const manejarRespuesta = async (response) => {
    if (response.ok) {
      const result = await response.json();
      alert("Envío de postulación exitoso!");
      console.log('Respuesta del servidor:', result);
      limpiarFormulario();
    } else {
      mostrarErroresDeRespuesta(response);
    }
  };

  const limpiarFormulario = () => {
    setFormData({
      nombre: '',
      rut: '',
      correo: '',
      codigo_carrera: '',
      asignatura: '',
      nota: ''
    });
  };

  const mostrarErroresDeRespuesta = async (response) => {
    const errorResult = await response.json();
    if (errorResult.errores && errorResult.errores.length > 0) {
      const mensajesDeError = errorResult.errores.map(e => `${e.field}: ${e.message}`).join('\n');
      alert("Errores de validación:\n" + mensajesDeError);
    } else {
      alert("Error en el envío: " + errorResult.mensaje);
    }
  };

  const finalizarEnvio = async () => {
    try {
      const datosFormulario = validarYConvertirDatos(formData);
      console.log(datosFormulario);
      const response = await enviarDatos(datosFormulario);
      await manejarRespuesta(response);
    } catch (error) {
      alert("Error al conectar con el servidor: " + error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleChangeRut = (e) => {
    const rut = e.target.rawValue;
    setFormData({ ...formData, rut });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validarRut(formData.rut)) {
      alert('RUT inválido: Por favor, ingresa un RUT válido con el formato xx.xxx.xxx-x');
      return;
    }
    if (!validarCorreo(formData.correo)) {
      alert('Correo inválido: Por favor, ingresa un correo de la UTEM con el formato xxx@utem.cl');
      return;
    }
    confirmSubmission();
  };

  const confirmSubmission = () => {
    confirmAlert({
      title: 'Confirmar envío',
      message: '¿Estás seguro de que quieres enviar tu postulación?',
      buttons: [
        {
          label: 'Sí, enviar',
          onClick: () => finalizarEnvio()
        },
        {
          label: 'No, cancelar',
          onClick: () => { }
        }
      ]
    });
  };

  const validarRut = (rut) => {
    const rutLimpio = rut.replace(/\./g, '').replace('-', '');
    const cuerpo = rutLimpio.slice(0, -1);
    let dv = rutLimpio.slice(-1).toUpperCase();
    rut = cuerpo + '-' + dv;
    if (cuerpo.length < 7) {
      return false;
    }
    let suma = 0;
    let multiplo = 2;
    for (let i = 1; i <= cuerpo.length; i++) {
      const index = multiplo * rutLimpio.charAt(cuerpo.length - i);
      suma = suma + index;
      if (multiplo < 7) {
        multiplo = multiplo + 1;
      } else {
        multiplo = 2;
      }
    }
    const dvEsperado = 11 - (suma % 11);
    dv = dv === 'K' ? 10 : dv;
    dv = dv === '0' ? 11 : dv;
    if (dvEsperado !== parseInt(dv)) {
      return false;
    }
    return true;
  };

  const validarCorreo = (correo) => {
    const regex = /^[^\s@]+@utem\.cl$/;
    return regex.test(correo);
  };

  return [handleSubmit, formData, handleChange, handleChangeRut];
};
