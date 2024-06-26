
import React from 'react'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components'
import Accordion from 'react-bootstrap/Accordion';
import './VentasCss.css';
import { NavBar } from '../Componentes/NavBar';
import { Loading } from '../Componentes/Loading';

export const EstadoVentas = () => {
    const [loading, setloading] = useState(true)
    const [IdVenta, setIdVenta] = useState(null)
    const [ClienteVenta, setClienteVenta] = useState(null)
    const [FechaVenta, setFechaVenta] = useState(null)
    const [SearchText, setSearchText] = useState("")

    
    const [VentasArmadas, setVentasArmadas] = useState([])
    const [VentasSinArmar, setVentasSinArmar] = useState([])
    const [VentasProbadas, setVentasProbadas] = useState([])
    const [Venta, setVenta] = useState([])
    const [Cortinas, setCortinas] = useState([])
    const [loadingTable, setloadingTable] = useState(true)
    
        const UrlVentas = "/Ventas/Dto"
        const UrlVenta = "/Ventas/DtoVentaCor/"
    
    /*
    const UrlVentas = "http://20.84.111.102:8085/Ventas/Dto"
    const UrlVenta = "http://20.84.111.102:8085/Ventas/DtoVentaCor/"
    */

    function MostrarVenta(venta) {
        console.log("click");
        setIdVenta(venta.IdVenata)
        setClienteVenta(venta.NombreCliente)
        setFechaVenta(venta.FechaVenta)
    }





    const FetchVentas = async () => {
        if (SearchText == "") {
            try {
                const res = await fetch(UrlVentas)
                const data = await res.json()
                const ventasSinArmar = data.filter(venta => venta.EstadoActual === "Sin Armar");
                const ventasArmadas = data.filter(venta => venta.EstadoActual === "Listo para instalar");
                setVentasSinArmar(ventasSinArmar);
                setVentasArmadas(ventasArmadas)
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        } else {
            try {
                const res = await fetch(UrlVentas + "/" + SearchText)
                const data = await res.json()
                setVentas(data);
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("entr")
                await FetchVentas();
                if (IdVentaView) {
                    setActiveKey(IdVentaView);
                }
            } catch (error) {
                console.log(error);
            } finally {
                setloading(false);
            }
        };

        fetchData();
    }, []);


    useEffect(() => {
        FetchVentas();

    }, [SearchText]);

    const FetchVentaCortinas = async () => {
        setloadingTable(true)
        if (IdVenta != null) {
            try {
                const res = await fetch(UrlVenta + { IdVenta }.IdVenta)
                const data = await res.json()
                setCortinas(data);
                setloadingTable(false)
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
        else {
            setloadingTable(false)
        }
    };



    useEffect(() => {
        FetchVentaCortinas();
    }, [IdVenta]);

    if (loading) {
        return (
            <Loading tipo="all" />
        )
    }

    return (
        <>
            <Row className="text-center mt-4 mb-4">
                <h1 style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
                    ESTADO VENTAS
                </h1>
            </Row>
            <Form.Group style={{ marginBottom: "30px" }} as={Col} md="2" noValidate>
                <Form.Text>Buscar por cliente</Form.Text>
                <Form.Control
                    type="text"
                    value={SearchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Buscar..."
                />
            </Form.Group>
            <Row>
                <Col>
                    <h3 style={{textAlign:"center"}}>Sin Armar</h3>
                    {VentasSinArmar.length !== 0 ? (
                        <Accordion>
                            {VentasSinArmar.map((Ven, index) => {
                                return (
                                    <React.Fragment key={Ven.IdVenata}>
                                        <Accordion.Item eventKey={Ven.IdVenata} onClick={() => MostrarVenta(Ven)}>
                                            <Accordion.Header key={`header_${Ven.IdVenata}`} className="centered-header">
                                                <div style={{
                                                    fontSize: "23px",
                                                    fontWeight: "bold",
                                                    whiteSpace: "pre-line",
                                                    // Añade más estilos inline según sea necesario
                                                }}>
                                                    {Ven.NombreCliente} {'\n'}{Ven.Obra ? Ven.Obra : null}
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                {loadingTable ? (
                                                    <Loading tipo="tab" />
                                                ) : (
                                                    <Table responsive>
                                                        <thead style={{ justifyContent: "center", fontFamily: 'Arial, sans-serif' }}>
                                                            <tr>
                                                                <th>Ancho AF-AF</th>
                                                                <th>Ancho tela</th>
                                                                <th>Ancho Caño</th>
                                                                <th>caño</th>
                                                                <th>Alto Cortina</th>
                                                                <th>Alto Tela</th>
                                                                <th>cant</th>
                                                                <th>Cadena</th>
                                                                <th>posicion</th>
                                                                <th>Detalles</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Cortinas.map(Cor => (
                                                                <tr key={Cor.idCortina}>
                                                                    <td>{Cor.anchoCaño}</td>
                                                                    <td>{Cor.anchoCortina}</td>
                                                                    <td>{Cor.anchoAfuerAfuera}</td>
                                                                    <td>{Cor.cano}</td>
                                                                    <td>{Cor.altoCortina}</td>
                                                                    <td>{Cor.altoTela}</td>
                                                                    <td>1</td>
                                                                    <td>{Cor.cadena}</td>
                                                                    <td>{Cor.posicion}</td>
                                                                    <td>Detalles</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </React.Fragment>
                                );
                            })}
                        </Accordion>
                    ) : null}
                </Col>
                <Col>
                    <h3 style={{textAlign:"center"}}>Armado</h3>
                    {VentasArmadas.length !== 0 ? (

                        <Accordion>
                            {VentasArmadas.map((Ven, index) => {
                                return (
                                    <React.Fragment key={Ven.IdVenata}>
                                        <Accordion.Item eventKey={Ven.IdVenata} onClick={() => MostrarVenta(Ven)}>
                                            <Accordion.Header key={`header_${Ven.IdVenata}`} className="centered-header">
                                                <div style={{
                                                    fontSize: "23px",
                                                    fontWeight: "bold",
                                                    whiteSpace: "pre-line",
                                                    // Añade más estilos inline según sea necesario
                                                }}>
                                                    {Ven.NombreCliente} {'\n'}{Ven.Obra ? Ven.Obra : null}
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                {loadingTable ? (
                                                    <Loading tipo="tab" />
                                                ) : (
                                                    <Table responsive>
                                                        <thead style={{ justifyContent: "center", fontFamily: 'Arial, sans-serif' }}>
                                                            <tr>
                                                                <th>Ancho AF-AF</th>
                                                                <th>Ancho tela</th>
                                                                <th>Ancho Caño</th>
                                                                <th>caño</th>
                                                                <th>Alto Cortina</th>
                                                                <th>Alto Tela</th>
                                                                <th>cant</th>
                                                                <th>Cadena</th>
                                                                <th>posicion</th>
                                                                <th>Detalles</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Cortinas.map(Cor => (
                                                                <tr key={Cor.idCortina}>
                                                                    <td>{Cor.anchoCaño}</td>
                                                                    <td>{Cor.anchoCortina}</td>
                                                                    <td>{Cor.anchoAfuerAfuera}</td>
                                                                    <td>{Cor.cano}</td>
                                                                    <td>{Cor.altoCortina}</td>
                                                                    <td>{Cor.altoTela}</td>
                                                                    <td>1</td>
                                                                    <td>{Cor.cadena}</td>
                                                                    <td>{Cor.posicion}</td>
                                                                    <td>Detalles</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </React.Fragment>
                                );
                            })}
                        </Accordion>
                    ) : null}
                </Col>
                <Col>
                    <h3 style={{textAlign:"center"}}>Probado</h3>
                    {VentasProbadas.length !== 0 ? (

                        <Accordion>
                            {VentasProbadas.map((Ven, index) => {
                                return (
                                    <React.Fragment key={Ven.IdVenata}>
                                        <Accordion.Item eventKey={Ven.IdVenata} onClick={() => MostrarVenta(Ven)}>
                                            <Accordion.Header key={`header_${Ven.IdVenata}`} className="centered-header">
                                                <div style={{
                                                    fontSize: "23px",
                                                    fontWeight: "bold",
                                                    whiteSpace: "pre-line",
                                                    // Añade más estilos inline según sea necesario
                                                }}>
                                                    {Ven.NombreCliente} {'\n'}{Ven.Obra ? Ven.Obra : null}
                                                </div>
                                            </Accordion.Header>
                                            <Accordion.Body>
                                                {loadingTable ? (
                                                    <Loading tipo="tab" />
                                                ) : (
                                                    <Table responsive>
                                                        <thead style={{ justifyContent: "center", fontFamily: 'Arial, sans-serif' }}>
                                                            <tr>
                                                                <th>Ancho AF-AF</th>
                                                                <th>Ancho tela</th>
                                                                <th>Ancho Caño</th>
                                                                <th>caño</th>
                                                                <th>Alto Cortina</th>
                                                                <th>Alto Tela</th>
                                                                <th>cant</th>
                                                                <th>Cadena</th>
                                                                <th>posicion</th>
                                                                <th>Detalles</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {Cortinas.map(Cor => (
                                                                <tr key={Cor.idCortina}>
                                                                    <td>{Cor.anchoCaño}</td>
                                                                    <td>{Cor.anchoCortina}</td>
                                                                    <td>{Cor.anchoAfuerAfuera}</td>
                                                                    <td>{Cor.cano}</td>
                                                                    <td>{Cor.altoCortina}</td>
                                                                    <td>{Cor.altoTela}</td>
                                                                    <td>1</td>
                                                                    <td>{Cor.cadena}</td>
                                                                    <td>{Cor.posicion}</td>
                                                                    <td>Detalles</td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </Table>
                                                )}
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </React.Fragment>
                                );
                            })}
                        </Accordion>
                    ) : null}
                </Col>
            </Row>
        </>
    );
}
