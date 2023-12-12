import React from 'react';
import './Information.css';
import CardComponent from './CardComponent'; // Asume que CardComponent está en el mismo directorio
import IconoPostular from './IconoPostular';
import IconoEstado from './IconoEstado';
import IconoProfesores from './IconoProfesores'

const cardData = [
    {
        to: "/requisitos",
        icon: <IconoPostular/>,
        title: "Postulación Ayudantias",
        content: "¿Eres seco programando? ¡Postula a la ayudantia que mejor domines!"
    },
    {
        to: "/estado",
        icon: <IconoEstado/>,
        title: "Estado de tu postulación",
        content: "¿Quieres conocer el estado de tu proceso? ¡Ingresa Aquí!"
    },
    {
        to: "/login",
        icon: <IconoProfesores/>,
        title: "Profesores",
        content: "¡Ingresa al sistema aqui!"
    },
    
];

export default function Information() {
    return (
        <div className="container-information">
            <div className="information">
                <div className="title">
                    <h1>Sección de Información</h1>
                </div>

                <div className="container-cards">
                    {cardData.map((card, index) => (
                        <CardComponent key={index} {...card} />
                    ))}
                </div>
            </div>
        </div>
    );
}
