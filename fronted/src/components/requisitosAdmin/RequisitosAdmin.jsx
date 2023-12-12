import React, { useEffect, useState } from "react";
import Header from "../header/Header";
import './RequisitosAdmin.css';
import { Link } from "react-router-dom";
// delete http://127.0.0.1:4000/api/adminin/requisito/:id

export default function RequisitosAdmin() {
    const [requisitos, setRequisitos] = useState([]);
    const [nuevoRequisito, setNuevoRequisito] = useState("");

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
    }, [])



    const confirmarYEliminarRequisito = (id) => {
        const confirmacion = window.confirm("¿Estás seguro de que deseas eliminar este requisito?");
        if (confirmacion) {
            fetch(`http://127.0.0.1:4000/api/adminin/requisito/${id}`, {
                method: 'DELETE',
            })
                .then(response => {
                    if (response.ok) {
                        setRequisitos(requisitos.filter(item => item.id !== id));
                    } else {
                        throw new Error('Error al eliminar el requisito');
                    }
                })
                .catch(error => {
                    console.error("Error al eliminar el requisito", error);
                });
        }
    };


    const agregarRequisito = () => {
        if (nuevoRequisito) {
            const requisitoObjeto = { requisito: nuevoRequisito };

            fetch('http://127.0.0.1:4000/api/adminin/requisitos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requisitoObjeto),
            })
                .then(response => response.json())
                .then(data => {
                    if (data && data.requisito && data.requisito.id) {
                        // Agrega el objeto de requisito (data.requisito) al estado
                        setRequisitos(prevRequisitos => [...prevRequisitos, data.requisito]);
                    } else {
                        console.error("La estructura del requisito agregado no es la esperada", data);
                    }
                    setNuevoRequisito(""); // Limpiar el input después de agregar
                })
                .catch(error => {
                    console.error("Error al agregar el requisito", error);
                });
        }
    };




    return (
        <>
            <Header />
            <div className="requisitos-admin-container">
                <h1 className="requisitos-admin-title">Requisitos</h1>
                <div className="requisitos-input-container">
                    <input
                        type="text"
                        value={nuevoRequisito}
                        onChange={(e) => setNuevoRequisito(e.target.value)}
                        className="requisitos-input"
                    />
                    <button onClick={agregarRequisito} className="requisitos-btn">Agregar Requisito</button>
                </div>
                <ul className="requisitos-list">
                    {requisitos.map((item) => (
                        <li key={item.id} className="requisitos-list-item">
                            {item.requisito}
                            <button onClick={() => confirmarYEliminarRequisito(item.id)} className="requisitos-list-btn">Eliminar</button>
                        </li>
                    ))}
                </ul>

                <div className="boton-lista-postulantes">
                    <Link to="/admin" className="btn btn-postulantes">Ver Lista de Postulantes</Link>
                </div>
            </div>
        </>

    );
}
