import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';
///
import { Navbar, Nav, Offcanvas } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

///

function Header() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (

    <Navbar bg="dark" variant="dark" fixed="top" expand="lg">

      <Navbar.Brand href="/"></Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="d-lg-none" onClick={handleShow} />
      <Navbar.Collapse id="basic-navbar-nav" className="d-none d-lg-flex">
        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/" onClick={handleClose} className="menu-link">Inicio</Nav.Link>
          <Nav.Link as={Link} to="/postular" onClick={handleClose} className="menu-link">Postular</Nav.Link>
          <Nav.Link as={Link} to="/estado" onClick={handleClose} className="menu-link">Ver Estado</Nav.Link>
          <Nav.Link as={Link} to="/admin" onClick={handleClose} className="menu-link">Administrador</Nav.Link>

        </Nav>
      </Navbar.Collapse>
      <Offcanvas show={show} onHide={handleClose} placement="end" className="d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Menú</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link as={Link} to="/" onClick={handleClose}>Inicio</Nav.Link>
            <Nav.Link as={Link} to="/postular" onClick={handleClose}>Postular</Nav.Link>
            <Nav.Link as={Link} to="/estado" onClick={handleClose}>Ver Estado</Nav.Link>
            <Nav.Link as={Link} to="/admin" onClick={handleClose}>Administrador</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>
    </Navbar>
  );
}

export default Header;

