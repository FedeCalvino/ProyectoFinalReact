import { React } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
//import {StyleSheet} from 'react-native';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './NavBar.css'

export const NavBar = ({ logged, onLogout }) => {
  const handleLogout = () => {
    onLogout()
  }

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container className='container_nav'>
          <Navbar.Brand href="#home" className="brand-custom">Anne Decor</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="Clientes">Clientes</Nav.Link>
              <Nav.Link href="Ventas">Ventas</Nav.Link>
              <Nav.Link href="CrearVenta">Crear Venta</Nav.Link>
              <Nav.Link href="Facturas">Facturas</Nav.Link>
              <Nav.Link href="WareHouse">WareHouse</Nav.Link>
              <Nav.Link href="Instalaciones">Instalaciones</Nav.Link>
              <NavDropdown title="Seguimiento Estaciones" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Tela</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Caño</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Armado</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {logged ? (
              <Button variant='danger' onClick={()=>handleLogout()}>LogOut</Button>
            ) :null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
