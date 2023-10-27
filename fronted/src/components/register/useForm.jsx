import { useState } from 'react';
import { confirmAlert } from 'react-confirm-alert';

export const useForm = (initialState = {}) => {
  const [formData, setFormData] = useState(initialState);

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
          onClick: () => {}
        }
      ]
    });
  };

  const finalizarEnvio = () => {
    alert("Envio de postulacion exitosa!");
    console.log('Datos del formulario:', [formData]);
    // Limpiar el formulario
    setFormData({
      nombre: '',
      rut: '',
      correo: '',
      codigoCarrera: '',
      asignatura: '',
      nota: ''
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


  return [handleSubmit,formData, handleChange, handleChangeRut];
};
