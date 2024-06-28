import React from 'react'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components'
import Accordion from 'react-bootstrap/Accordion';
import { Loading } from '../Componentes/Loading';


export const Facturas = () => {

    const [SearchText, setSearchText] = useState("")
    const [loading, setloading] = useState(true)
    const [IdVenta, setIdVenta] = useState(null)
    const [ClienteVenta, setClienteVenta] = useState(null)
    const [FechaVenta, setFechaVenta] = useState(null)

    const [loadingtab, setloadingtab] = useState(true)

    const [Factura, setFactura] = useState([])
    const [FacturaExiste, setFacturaExiste] = useState(false)
    const [Recibos, setRecibos] = useState([])
    const [Ventas, setVentas] = useState([])

    //recibo
    const [DateRecibo, setDateRecibo] = useState('')
    const [MontoRecibo, setMontoRecibo] = useState('')
    const [NumeroRecibo, setNumeroRecibo] = useState('')

    // crear factura

    const [Precio, setPrecio] = useState('')
    const [NroFactura, setNroFactura] = useState('')
    const [FechaFinalPago, setFechaFinalPago] = useState('')
    const urlIP = import.meta.env.REACT_APP__IPSQL;
    const FacturaUrl = "/Factura";
    const UrlVentas = "/Ventas/Dto"
    const UrlRecibos = "/Factura/Recibos/";
    


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
                setVentas(data);
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



    const FetchFacturaVenta = async () => {
        try {
            if (IdVenta != null) {
                setloadingtab(true)
                const res = await fetch(FacturaUrl+"/" + IdVenta)
                const data = await res.json()
                console.log(data)
                if (res.ok && data) {
                    setFacturaExiste(true)
                    setFactura(data);
                    setloadingtab(false)
                    console.log(data)
                } else {
                    setFacturaExiste(false)
                    setloadingtab(false)
                }
            }
        } catch (error) {
            setloadingtab(false)
            setFacturaExiste(false)
            console.log(error)
        }
    };

    const FetchRecibosVenta = async () => {
        try {
            if (IdVenta != null) {
                const res = await fetch(UrlRecibos + IdVenta)
                const data = await res.json()
                setRecibos(data);
                console.log(data);
            }
        } catch (error) {
            console.log(error)
        }
    };
    const CrearNewFactura = () => {
        setloadingtab(true)
        console.log(IdVenta)
        console.log({ FechaFinalPago }.FechaFinalPago)
        console.log({ NroFactura }.NroFactura)
        console.log({ Precio }.Precio)

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "idVenta": IdVenta,
                    "fechaFinaL": { FechaFinalPago }.FechaFinalPago,
                    "numeroFactura": { NroFactura }.NroFactura,
                    "montoTotal": { Precio }.Precio
                }
            )
        };
        fetch(FacturaUrl, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                FetchFacturaVenta()
            });
    }

    useEffect(() => {
        FetchVentas();
    }, [SearchText]);


    useEffect(() => {

        const fetchData = async () => {
            try {
                console.log("entr")
                await FetchVentas();
            } catch (error) {
                console.log(error);
            } finally {
                setloading(false);
            }
        };
        fetchData();
    }, []);

    useEffect(() => {
        FetchFacturaVenta();
        FetchRecibosVenta();
    }, [IdVenta]);

    let lastDay = null;
    const MostrarDia = ({ Day }) => {
        let Ok = false;
        if (lastDay !== Day) {
            Ok = true
            lastDay = { Day }.Day
        }
        return (
            <>
                {Ok ? <div style={{
                    border: '1px solid #ccc',
                    padding: '10px',
                    textAlign: 'center',
                    backgroundColor: '#f9f9f9',
                    borderRadius: '5px'
                }}>
                    <h3 style={{ margin: 0 }}>{Day}</h3>
                </div>
                    :
                    null
                }
            </>
        );
    }

    const CrearRecibo = () => {
        setloadingtab(true)
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "numeroRecibo": { NumeroRecibo }.NumeroRecibo,
                    "monto": { MontoRecibo }.MontoRecibo,
                    "fecha": { DateRecibo }.DateRecibo
                }
            )
        };
        fetch(UrlRecibos + IdVenta, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                FetchRecibosVenta()
                FetchFacturaVenta()
                setNumeroRecibo('')
                setDateRecibo('')
                setMontoRecibo('')
            });
    }
    const DeleteRecibo = (id) => {
        console.log(id)
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };

        if (!isNaN(id)) {
            fetch(UrlRecibos + id,requestOptions)
        } else {
            console.log("El ID de la instalación no es válido.");
        }
        window.location.reload();
        FetchRecibosVenta()
    }
    const CrearFactura = () => {
        return (
            <>
                <Row style={{ alignItems: "center", justifyContent: "center" }}>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                        <Form.Label>Nro Factura</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={NroFactura}
                            onChange={(e) => { setNroFactura(e.target.value) }}
                            placeholder="NumeroFactura"
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                        <Form.Label>Fecha final de pago</Form.Label>
                        <Form.Control
                            required
                            type="date"
                            value={FechaFinalPago}
                            onChange={(e) => { setFechaFinalPago(e.target.value) }}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                        <Form.Label>Monto Total</Form.Label>
                        <Form.Control
                            required
                            type="number"
                            value={Precio}
                            onChange={(e) => { setPrecio(e.target.value) }}
                            placeholder="Precio"
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                        <Button style={{ marginTop: "30px", marginLeft: "1em" }} onClick={CrearNewFactura}>Crear Factura</Button>
                    </Form.Group>

                </Row>
            </>
        )
    }

    if(loading){
        return (
          <Loading tipo="all"/>
        )  
    }


    return (
        <>
            <Row className="text-center mt-4 mb-4">
                <h1 style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
                    FACTURAS
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
                <Form.Group controlId="validationCustom01">
                    {Ventas.length !== 0 ?
                        <Accordion defaultActiveKey="0">
                            {Ventas.map(Ven =>
                                <>
                                    <MostrarDia Day={Ven.FechaVenta} />
                                    <Accordion.Item key={Ven.IdVenata} eventKey={Ven.IdVenata} onClick={() => MostrarVenta(Ven)}>
                                        <Accordion.Header key={`header_${Ven.IdVenata}`}>
                                            <div style={{ fontSize: "20px", fontWeight: "bold", whiteSpace: "pre-line" }}>
                                                {Ven.NombreCliente}{'\n'} {'\n'}{Ven.Obra ? Ven.Obra : null}
                                            </div>
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {loadingtab ? (
                                                <Loading tipo="tab"/>
                                            ) : (
                                                FacturaExiste ? (
                                                    <>
                                                        <Table responsive bordered style={{ borderCollapse: 'collapse', border: '1px solid black' }}>
                                                            <thead style={{ justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
                                                                <tr>
                                                                    <th>Fecha Creada</th>
                                                                    <th>Nro_FACTURA</th>
                                                                    <th>Fecha final</th>
                                                                    <th>Monto Total</th>
                                                                    <th>Pagado</th>
                                                                    <th>Saldo</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                <tr>
                                                                    <td>{Factura.fechaFactura}</td>
                                                                    <td>{Factura.numeroFactura}</td>
                                                                    <td>{Factura.fechaFinaL}</td>
                                                                    <td>{Factura.montoTotal}</td>
                                                                    <td>{Factura.montoPagado}</td>
                                                                    <td>{Factura.saldo}</td>
                                                                </tr>
                                                            </tbody>
                                                        </Table>

                                                        <Row>
                                                            <h3 style={{ alignItems: 'center', textAlign: 'center', fontSize: '20px' }}>RECIBOS</h3>
                                                        </Row>

                                                        <Table responsive bordered style={{ width: '100%', borderCollapse: 'collapse' }}>
                                                            <thead style={{ justifyContent: 'center', fontFamily: 'Arial, sans-serif' }}>
                                                                <tr>
                                                                    <th style={{ width: '33%', textAlign: 'center' }}>Número Recibo</th>
                                                                    <th style={{ width: '33%', textAlign: 'center' }}>Fecha Recibo</th>
                                                                    <th style={{ width: '33%', textAlign: 'center' }}>Monto</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {Recibos.map(rec => (
                                                                    <tr key={rec.idRecibo}>
                                                                        <td>{rec.numeroRecibo}</td>
                                                                        <td>{rec.fecha}</td>
                                                                        <td>{rec.monto}</td>
                                                                        <td><Button onClick={() => DeleteRecibo(rec.idRecibo)}>Eliminar</Button></td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </Table>
                                                        <Row style={{ textAlign: "center", justifyContent: 'center' }}>
                                                            <h3>Agregar Recibo</h3>
                                                        </Row>
                                                        <Row style={{ justifyContent: 'center' }}>
                                                            <Form.Group as={Col} md="2" controlId="validationCustom01">
                                                                <Form.Label>Numero recibo</Form.Label>
                                                                <Form.Control
                                                                    required
                                                                    type="number"
                                                                    value={NumeroRecibo}
                                                                    onChange={(e) => { setNumeroRecibo(e.target.value) }}
                                                                    placeholder="Numero Recibo"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} md="2" controlId="validationCustom01">
                                                                <Form.Label>Fecha recibo</Form.Label>
                                                                <Form.Control
                                                                    required
                                                                    type="date"
                                                                    value={DateRecibo}
                                                                    onChange={(e) => { setDateRecibo(e.target.value) }}
                                                                    placeholder="Fecha Recibo"
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} md="2" controlId="validationCustom01">
                                                                <Form.Label>Monto</Form.Label>
                                                                <Form.Control
                                                                    required
                                                                    type="number"
                                                                    value={MontoRecibo}
                                                                    onChange={(e) => { setMontoRecibo(e.target.value) }}
                                                                />
                                                            </Form.Group>
                                                            <Form.Group as={Col} md="2" controlId="validationCustom01">
                                                                <Button style={{ marginTop: "30px", marginLeft: "1em" }} onClick={CrearRecibo}>Crear Recibo</Button>
                                                            </Form.Group>
                                                        </Row>
                                                    </>
                                                ) : (
                                                    <Row style={{ alignItems: "center", justifyContent: "center" }}>
                                                        <Form.Group as={Col} md="2" controlId="validationCustom01">
                                                            <Form.Label>Nro Factura</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="number"
                                                                value={NroFactura}
                                                                onChange={(e) => { setNroFactura(e.target.value) }}
                                                                placeholder="Numero Factura"
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="2" controlId="validationCustom01">
                                                            <Form.Label>Fecha final de pago</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="date"
                                                                value={FechaFinalPago}
                                                                onChange={(e) => { setFechaFinalPago(e.target.value) }}
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="2" controlId="validationCustom01">
                                                            <Form.Label>Monto Total</Form.Label>
                                                            <Form.Control
                                                                required
                                                                type="number"
                                                                value={Precio}
                                                                onChange={(e) => { setPrecio(e.target.value) }}
                                                                placeholder="Precio"
                                                            />
                                                        </Form.Group>
                                                        <Form.Group as={Col} md="2" controlId="validationCustom01">
                                                            <Button style={{ marginTop: "30px", marginLeft: "1em" }} onClick={CrearNewFactura}>Crear Factura</Button>
                                                        </Form.Group>
                                                    </Row>
                                                )
                                            )}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </>
                            )}
                        </Accordion> : <h1>no hay</h1>}
                </Form.Group>
            </Row>
        </>
    );
}