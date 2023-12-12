import React from 'react';
import { Link } from 'react-router-dom';
import './Information.css';

const CardComponent = ({ to, icon, title, content }) => {
    return (
        <Link to={to} className="info-1">
            <i className="icono">{icon}</i><br /><br />
            <h3>{title}</h3><br />
            <p>{content}</p>
        </Link>
    );
};

export default CardComponent;
