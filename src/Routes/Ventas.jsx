import React from 'react'
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import styled from 'styled-components'
import Accordion from 'react-bootstrap/Accordion';
import './VentasCss.css';

const StyledTableRow = styled.tr`
&:hover {
    background-color: beige;
}
`;

export const Ventas = () => {

    const urlIP = import.meta.env.REACT_APP__IPSQL;

    const [IdVenta, setIdVenta] = useState(null)
    const [ClienteVenta, setClienteVenta] = useState(null)
    const [FechaVenta, setFechaVenta] = useState(null)
    const [SearchText, setSearchText] = useState("")

    const [Ventas, setVentas] = useState([])
    const [Venta, setVenta] = useState([])
    const [Cortinas, setCortinas] = useState([])

    const UrlVentas = "http://"+{urlIP}.urlIP+":8085/Ventas/Dto"
    const UrlVenta = "http://"+{urlIP}.urlIP+":8085/Ventas/DtoVentaCor/"
    const UrlVentasLike = "http://"+{urlIP}.urlIP+":8085/Ventas/Dto/"
    const Factura = "http://"+{urlIP}.urlIP+":8085/Factura/";

    useEffect(() => {
        FetchVentas();
    }, []);

    useEffect(() => {
        FetchVentaCortinas();
    }, [IdVenta]);

    useEffect(() => {
        FetchVentas();
    }, [SearchText]);

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
        }else{
            try {
                const res = await fetch(UrlVentasLike+SearchText)
                const data = await res.json()
                setVentas(data);
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
    };

    const FetchVentaCortinas = async () => {
        if (IdVenta != null) {
            try {
                const res = await fetch(UrlVenta + { IdVenta }.IdVenta)
                const data = await res.json()
                setCortinas(data);
                console.log(data);
            } catch (error) {
                console.log(error)
            }
        }
    };

    const FetchFactura = async (VentaId) => {
        try {
            const res = await fetch(Factura + VentaId)
            const data = await res.json()
            setVentas(data);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    };
    return (
        <>
            <Row className="text-center mt-4 mb-4">
                <h1 style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
                    VENTAS
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
            {Ventas.length !== 0 ? 
            <Accordion>
                {Ventas.map(Ven =>
                    <>
                        <Accordion.Item key={Ven.IdVenata} eventKey={Ven.IdVenata} onClick={() => MostrarVenta(Ven)}>
                            <Accordion.Header key={`header_${Ven.IdVenata}`}>
                                <div style={{ fontSize: "20px", fontWeight: "bold", whiteSpace: "pre-line" }}>
                                    {Ven.NombreCliente}{'\n'} Fecha: {Ven.FechaVenta} {'\n'}{Ven.Obra ? Ven.Obra : null}
                                </div>
                            </Accordion.Header>
                            <Accordion.Body >
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
                                        {Cortinas.map(Cor =>
                                            <tr key={Cor.idCortina}>
                                                <td>{Cor.anchoAfuerAfuera}</td>
                                                <td>{Cor.anchoCortina}</td>
                                                <td>{Cor.anchoCaño}</td>
                                                <td>{Cor.cano}</td>
                                                <td>{Cor.altoCortina}</td>
                                                <td>{Cor.altoTela}</td>
                                                <td>1</td>
                                                <td>{Cor.cadena}</td>
                                                <td>{Cor.posicion}</td>
                                                <td>Detalles</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </Table>
                            </Accordion.Body>
                        </Accordion.Item>
                    </>
                )}
            </Accordion>:
            <h1>Seguramente lo escribiste mal bolu</h1>
            }
        </>
    );
}
