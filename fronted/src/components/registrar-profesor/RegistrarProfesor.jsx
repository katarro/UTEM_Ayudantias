import React, { useState } from 'react';
import Header from '../header/Header';

export default function RegistrarProfesor() {

    const initialState = {
        nombre: '',
        correo: '',
    };
    const [formData, setFormData] = useState(initialState);

    const validarFormulario = () => {
        // Aquí puedes agregar validaciones más complejas según tus necesidades
        if (!formData.nombre || !formData.correo) {
            alert('Por favor, completa todos los campos.');
            return false;
        }
        return true;
    };



    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validarFormulario()) return;
        console.log(formData)

        try {
            const response = await fetch('http://13.48.106.173:8080/api/register-profesor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                // Manejar la respuesta exitosa
                alert('Profesor registrado con éxito');
                setFormData(initialState); // Restablecer el formulario

            } else {
                // Manejar errores del servidor
                alert('Error al registrar el profesor');
            }
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };

    return (
        <>
            <Header />
            <div className="register-container mt-5">
                <h1>Registro de Profesor</h1><br />
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="nombre" className="form-label">Nombre Completo</label>
                        <input type="text" className="form-control" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="correo" className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" id="correo" name="correo" value={formData.correo} onChange={handleChange} />
                    </div>
                    <button type="submit" className="btn btn-primary">Registrar</button>
                </form>
            </div>
        </>
    );
}

