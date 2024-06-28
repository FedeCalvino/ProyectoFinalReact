import { React } from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar';
//import {StyleSheet} from 'react-native';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { FaCalendarAlt, FaWarehouse, FaMoneyBill } from "react-icons/fa";
import { IoCreateSharp, IoPerson } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { BsFillDiagram2Fill } from "react-icons/bs";
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
            <Nav className="navb">
              <Nav.Link href="Provedores" className="nav-link-custom"><div className="nav-item"><IoPerson className="icon" /><div>Provedores</div></div></Nav.Link>
              <Nav.Link href="Clientes" className="nav-link-custom"><div className="nav-item"><IoPerson className="icon" /><div>Clientes</div></div></Nav.Link>
              <Nav.Link href="Ventas" className="nav-link-custom">
                <div className="nav-item">
                  <FaList className="icon" />
                  <div>Ventas</div>
                </div>
              </Nav.Link>
              <Nav.Link href="CrearVenta" className="nav-link-custom"><div className="nav-item"><IoCreateSharp className="icon" /><div>Crear Venta</div></div></Nav.Link>
              <Nav.Link href="Facturas" className="nav-link-custom"><div className="nav-item"><FaMoneyBill className="icon" /><div>Facturas</div></div></Nav.Link>
              <Nav.Link href="EstadoVentas" className="nav-link-custom"><div className="nav-item"><BsFillDiagram2Fill /><div>Estado</div></div></Nav.Link>
              <Nav.Link href="Deposito" className="nav-link-custom"><div className="nav-item"><FaWarehouse className="icon" /><div>Deposito</div></div></Nav.Link>
              <Nav.Link href="Instalaciones" className="nav-link-custom"><div className="nav-item"><FaCalendarAlt className="icon" /><div>Instalaciones</div></div></Nav.Link>
              <NavDropdown title="Seguimiento Estaciones" id="basic-nav-dropdown" className="nav-link-custom">
                <NavDropdown.Item href="MesaCorteTela">Tela</NavDropdown.Item>
                <NavDropdown.Item href="MesaCorteCano">Caño</NavDropdown.Item>
                <NavDropdown.Item href="MesaArmado">Armado</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            {logged ? (
              <Button variant='danger' onClick={handleLogout}>LogOut</Button>
            ) : null}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};
