
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
    const [IdVentaSinArmar, setIdVentaSinArmar] = useState(null)
    const [IdVentaArmada, setIdVentaArmada] = useState(null)
    const [IdVentaProbada, setIdVentaProbada] = useState(null)
    const [SearchText, setSearchText] = useState("")

    
    const [VentasArmadas, setVentasArmadas] = useState([])
    const [VentasSinArmar, setVentasSinArmar] = useState([])
    const [VentasProbadas, setVentasProbadas] = useState([])
    const [Venta, setVenta] = useState([])
    const [CortinasSinArmar, setCortinasSinArmar] = useState([])
    const [CortinasArmada, setCortinasArmada] = useState([])
    const [CortinasProbada, setCortinasProbada] = useState([])
    const [loadingTableSinArmada, setloadingTablesinArmada] = useState(true)
    const [loadingTableArmada, setloadingTableArmada] = useState(true)
    const [loadingTableProbada, setloadingTableProbada] = useState(true)
    
    const UrlVentas = "/Ventas/Dto"
    const UrlVenta = "/Ventas/DtoVentaCor/"
    
    /*
    const UrlVentas = "http://20.84.111.102:8085/Ventas/Dto"
    const UrlVenta = "http://20.84.111.102:8085/Ventas/DtoVentaCor/"
    */

    function MostrarVentaSinArmar(venta) {
        setIdVentaSinArmar(venta.IdVenata)
    }
    function MostrarVentaArmada(venta) {
        setIdVentaArmada(venta.IdVenata)
    }
    function MostrarVentaProbada(venta) {
        setIdVentaProbada(venta.IdVenata)
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

    const FetchVentaSinArmarCortinas = async () => {
        setloadingTablesinArmada(true)
        if (IdVentaSinArmar != null) {
            try {
                const res = await fetch(UrlVenta + {IdVentaSinArmar}.IdVentaSinArmar)
                const data = await res.json()
                setCortinasSinArmar(data);
                setloadingTablesinArmada(false)
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
        else {
            setloadingTablesinArmada(false)
        }
    };
    const FetchVentaArmadaCortinas = async () => {
        setloadingTableArmada(true)
        if (IdVentaArmada != null) {
            try {
                const res = await fetch(UrlVenta + {IdVentaArmada}.IdVentaArmada)
                const data = await res.json()
                setCortinasArmada(data);
                setloadingTableArmada(false)
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
        else {
            setloadingTableArmada(false)
        }
    };
    const FetchVentaProbadaCortinas = async () => {
        setloadingTableProbada(true)
        if (IdVentaProbada != null) {
            try {
                const res = await fetch(UrlVenta + {IdVentaProbada}.IdVentaProbada)
                const data = await res.json()
                setCortinasProbada(data);
                setloadingTableProbada(false)
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
        else {
            setloadingTableProbada(false)
        }
    };



    useEffect(() => {
        FetchVentaSinArmarCortinas();
    }, [IdVentaSinArmar]);
    useEffect(() => {
        FetchVentaArmadaCortinas();
    }, [IdVentaArmada]);
    useEffect(() => {
        FetchVentaProbadaCortinas();
    }, [IdVentaProbada]);

    if (loading) {
        return (
            <Loading tipo="all" />
        )
    }

    return (
        <>
            <Row>
                <Col>
                    <h3 style={{textAlign:"center"}}>Sin Armar</h3>
                    {VentasSinArmar.length !== 0 ? (
                        <Accordion>
                            {VentasSinArmar.map((Ven, index) => {
                                return (
                                    <React.Fragment key={Ven.IdVenata}>
                                        <Accordion.Item eventKey={Ven.IdVenata} onClick={() => MostrarVentaSinArmar(Ven)}>
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
                                                {loadingTableSinArmada ? (
                                                    <Loading tipo="tab" />
                                                ) : (
                                                    <Table responsive>
                                                        <thead style={{ justifyContent: "center", fontFamily: 'Arial, sans-serif' }}>
                                                            <tr>
                                                                <th>Ancho AF-AF</th>                                                               
                                                                <th>Alto Cortina</th>
                                                                <th>Estado</th>
                                                                <th>Detalles</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {CortinasSinArmar.map(Cor => (
                                                                <tr key={Cor.idCortina}>
                                                                    <td>{Cor.anchoCaño}</td> 
                                                                    <td>{Cor.altoCortina}</td>
                                                                    <td>{Cor.estadoCortina}</td>
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
                                        <Accordion.Item eventKey={Ven.IdVenata} onClick={() => MostrarVentaArmada(Ven)}>
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
                                                {loadingTableArmada ? (
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
                                                            {CortinasArmada.map(Cor => (
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
                                        <Accordion.Item eventKey={Ven.IdVenata} onClick={() => MostrarVentaProbada(Ven)}>
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
                                                {loadingTableProbada ? (
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
                                                            {CortinasProbada.map(Cor => (
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
