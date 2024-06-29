
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
import { DropdownDivider } from 'react-bootstrap';

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
                        <div>
                            {VentasSinArmar.map((Ven, index) => {
                                return (
                                    <div>
                                        <div
                                          key={Ven.IdVenata}
                                          style={{
                                            border: '2px solid black',
                                            padding: '10px',
                                            marginBottom: '10px',
                                            borderRadius: '5px',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                          }}
                                        >
                                          <div style={{ display: 'flex', flexDirection: 'column' ,fontSize: '20px',fontWeight: "bold"}}>
                                            <span>{Ven.NombreCliente}</span>
                                            <span>{Ven.Obra ? Ven.Obra : null}</span>
                                          </div>
                                          <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', fontWeight: "bold"}}>
                                            {Ven.EstadoActual}
                                          </div>
                                        </div>
                                      
                                    </div>
                                  );
                            })}
                            </div>
                    ) : null}
                   
                </Col>
                <Col>
                    <h3 style={{textAlign:"center"}}>Armado</h3>
                    {VentasArmadas.length !== 0 ? (

                        <Accordion>
                            {VentasArmadas.map((Ven, index) => {
                                return (
                                    <div>
                                    <div
                                      key={Ven.IdVenata}
                                      style={{
                                        border: '2px solid black',
                                        padding: '10px',
                                        marginBottom: '10px',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                      }}
                                    >
                                      <div style={{ display: 'flex', flexDirection: 'column' ,fontSize: '20px',fontWeight: "bold"}}>
                                        <span>{Ven.NombreCliente}</span>
                                        <span>{Ven.Obra ? Ven.Obra : null}</span>
                                      </div>
                                      <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', fontWeight: "bold"}}>
                                        {Ven.EstadoActual}
                                      </div>
                                    </div>
                                  
                                </div>
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
                                    <div>
                                    <div
                                      key={Ven.IdVenata}
                                      style={{
                                        border: '2px solid black',
                                        padding: '10px',
                                        marginBottom: '10px',
                                        borderRadius: '5px',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center'
                                      }}
                                    >
                                      <div style={{ display: 'flex', flexDirection: 'column' ,fontSize: '20px',fontWeight: "bold"}}>
                                        <span>{Ven.NombreCliente}</span>
                                        <span>{Ven.Obra ? Ven.Obra : null}</span>
                                      </div>
                                      <div style={{ textAlign: 'right', display: 'flex', alignItems: 'center', fontWeight: "bold"}}>
                                        {Ven.EstadoActual}
                                      </div>
                                    </div>
                                  
                                </div>
                                );
                            })}
                        </Accordion>
                    ) : null}
                </Col>
            </Row>
        </>
    );
}
