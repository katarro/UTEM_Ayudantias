import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
import { Navbar, Nav, Offcanvas, Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { useGenerarPdf } from './useGenerarPdf';

function Header() {

  const [generarPDF] = useGenerarPdf()


  const tokenProfesor = localStorage.getItem('tokenProfesor');
  const tokenAdmin = localStorage.getItem('tokenAdmin');
  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const closeSesion = () => {

    tokenAdmin ? (
      localStorage.removeItem('tokenAdmin')
    ) : (
      localStorage.removeItem('tokenProfesor')
    )
    navigate('/');
  }

  return (

    <Navbar bg="" variant="" fixed="" expand="lg" className='navbar'>

      <Navbar.Brand href="/"></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none" onClick={handleShow} />
      <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
        <div className="logo"></div>
        <Nav className="ms-auto">


          <Nav.Link as={Link} to="/" onClick={handleClose} className="menu-link">Inicio</Nav.Link>

          {tokenProfesor || tokenAdmin ? (
            <Dropdown>
              <Dropdown.Toggle as={Nav.Link} variant="" id="dropdown-profesor" className="menu-link">
                Perfil
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item as={Link} to="/cambiar-contrasena">Cambiar contraseña</Dropdown.Item>
                <Dropdown.Item onClick={generarPDF}>Generar PDF</Dropdown.Item>
              </Dropdown.Menu>


            </Dropdown>
          ) : <></>}




          {!tokenAdmin && !tokenProfesor ? (
            <Nav.Link as={Link} to="/requisitos" onClick={handleClose} className="menu-link">Postular</Nav.Link>
          ) : (<></>)}


          {!tokenAdmin && !tokenProfesor ? (
            <Nav.Link as={Link} to="/estado" onClick={handleClose} className="menu-link">Ver Estado</Nav.Link>
          ) : (<></>)}

          {tokenAdmin ? (
            <Nav.Link as={Link} to="/requisitos-admin" onClick={handleClose} className="menu-link">Administrador</Nav.Link>
          ) : <></>}

          {tokenProfesor ? (
            <Nav.Link as={Link} to="/profesor" onClick={handleClose} className="menu-link">Profesor</Nav.Link>
          ) : <></>}




          {!tokenAdmin && !tokenProfesor ? (
            <Nav.Link as={Link} to="/login" onClick={handleClose} className="menu-link">Ingresar</Nav.Link>
          ) : (<Nav.Link onClick={closeSesion} className="menu-link">Salir</Nav.Link>)}



        </Nav>
      </Navbar.Collapse>

      <Offcanvas show={show} onHide={handleClose} placement="end" className="d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose}>Inicio</Nav.Link>

            {!tokenAdmin && !tokenProfesor ? (
              <Nav.Link as={Link} to="/requisitos" onClick={handleClose}>Postular</Nav.Link>
            ) : null}

            <Nav.Link as={Link} to="/estado" onClick={handleClose}>Ver Estado</Nav.Link>

            {tokenAdmin ? (<Nav.Link as={Link} to="/requisitos-admin" onClick={handleClose} >Administrador</Nav.Link>
            ) : null}

            {tokenProfesor ? (<Nav.Link as={Link} to="/profesor" onClick={handleClose} >Profesor</Nav.Link>
            ) : null}


            {tokenAdmin ? (<Nav.Link as={Link} to="/cambiar-contrasena" onClick={handleClose} >Cambiar Contraseña</Nav.Link>) : null}
            {tokenAdmin ? (<Nav.Link onClick={generarPDF} >Generar PDF</Nav.Link>) : null}

            {!tokenAdmin && !tokenProfesor ?
              (<Nav.Link as={Link} to="/login" onClick={handleClose} >Ingresar</Nav.Link>
              ) :
              (<Nav.Link onClick={closeSesion} >Salir</Nav.Link>)}
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}

export default Header;

