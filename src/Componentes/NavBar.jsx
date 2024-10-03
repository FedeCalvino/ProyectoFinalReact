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
import { BsFillDiagram3Fill } from "react-icons/bs";
import './NavBar.css'
import { Link } from 'react-router-dom';

export const NavBar = ({ logged, onLogout }) => {
  const handleLogout = () => {
    onLogout();
  };

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary fixed-top">
        <Container className='container_nav'>
          <Navbar.Brand as={Link} to="Home" className="brand-custom">Anne Decor</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="navb">
              <Nav.Link as={Link} to="Provedores" className="nav-link-custom">
                <div className="nav-item">
                  <IoPerson className="icon" />
                  <div>Provedores</div>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="Clientes" className="nav-link-custom">
                <div className="nav-item">
                  <IoPerson className="icon" />
                  <div>Clientes</div>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="Ventas" className="nav-link-custom">
                <div className="nav-item">
                  <FaList className="icon" />
                  <div>Ventas</div>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="CrearVenta" className="nav-link-custom">
                <div className="nav-item">
                  <IoCreateSharp className="icon" />
                  <div>Crear Venta</div>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="Facturas" className="nav-link-custom">
                <div className="nav-item">
                  <FaMoneyBill className="icon" />
                  <div>Facturas</div>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="EstadoVentas" className="nav-link-custom">
                <div className="nav-item">
                  <BsFillDiagram3Fill className="icon" />
                  <div>Estado</div>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="Deposito" className="nav-link-custom">
                <div className="nav-item">
                  <FaWarehouse className="icon" />
                  <div>Deposito</div>
                </div>
              </Nav.Link>
              <Nav.Link as={Link} to="Instalaciones" className="nav-link-custom">
                <div className="nav-item">
                  <FaCalendarAlt className="icon" />
                  <div>Instalaciones</div>
                </div>
              </Nav.Link>
              <NavDropdown title="Estaciones" id="basic-nav-dropdown" className="nav-link-custom">
                <NavDropdown.Item as={Link} to="MesaCorteTela">Tela</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="MesaCorteCano">Caño</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="MesaArmado">Armado</NavDropdown.Item>
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
