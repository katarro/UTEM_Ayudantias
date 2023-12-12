import React, { useState, useEffect } from 'react';
import Header from '../header/Header';
import { Link } from 'react-router-dom'
import './Requisitos.css';


const fechaInicio = new Date('2023-01-10');
const fechaFin = new Date('2023-12-31');

export default function Requisitos() {
    const [requisitos, setRequisitos] = useState([]); 
    const [cumpleRequisitos, setCumpleRequisitos] = useState(false);
    const [habilitarPostulacion, setHabilitarPostulacion] = useState(false);
    const opcionesFecha = { year: 'numeric', month: 'long', day: 'numeric' };

    useEffect(() => {

        const cargarRequisitos = async () => {
            fetch('http://127.0.0.1:4000/api/requisitos')
                .then(response => response.json())
                .then(data => {
                    console.log(data.requisitos)
                    // Asegúrate de que estás accediendo al campo 'requisitos' del objeto
                    if (data && data.requisitos) {
                        setRequisitos(data.requisitos);
                    } else {
                        console.error("La estructura de los datos no es la esperada", data);
                    }
                })
                .catch(error => {
                    console.error("Hubo un error al obtener los requisitos", error);
                });
        };
        cargarRequisitos();


        const fechaActual = new Date();
        if (fechaActual >= fechaInicio && fechaActual <= fechaFin) {
            setHabilitarPostulacion(true);
        }
    }, []);


    return (
        <>
            <Header />
            <div className="requisitos-container">

                <div className="requisitos-title">
                    <h1 id='requisitos-h1'>Requisitos de Postulación</h1>
                </div>
                <div className="requisitos-list-container">

                    <ul id='requisitos-ul'>
                        {requisitos.map((item, index) => (
                            <li id="requisitos-li" key={index}>{item.requisito}</li>
                        ))}
                    </ul>
                    <p>Periodo de Postulación: {fechaInicio.toLocaleDateString('es-ES', opcionesFecha)} - {fechaFin.toLocaleDateString('es-ES', opcionesFecha)}</p>

                    <div className="requisitos-checkbox-container">
                        <input type="checkbox" id="cumpleRequisitos" checked={cumpleRequisitos} onChange={()=>setCumpleRequisitos(!cumpleRequisitos)} />
                        <label htmlFor="cumpleRequisitos"><b>Confirmo que cumplo con todos los requisitos</b></label>
                    </div>

                    <div className="requisitos-button">
                        {habilitarPostulacion && cumpleRequisitos && <Link to="/postular" className="link-as-button">Postular Ahora</Link>}

                    </div>
                </div>
            </div>
        </>

    );
}
