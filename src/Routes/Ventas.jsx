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

const StyledTableRow = styled.tr`
&:hover {
    background-color: beige;
}
`;

export const Ventas = ({IdVentaView}) => {

    const urlIP = import.meta.env.REACT_APP__IPSQL;
    const [loading, setloading] = useState(true)

    const [IdVenta, setIdVenta] = useState(null)
    const [ClienteVenta, setClienteVenta] = useState(null)
    const [FechaVenta, setFechaVenta] = useState(null)
    const [SearchText, setSearchText] = useState("")

    const [Ventas, setVentas] = useState([])
    const [Venta, setVenta] = useState([])
    const [Cortinas, setCortinas] = useState([])
    const [loadingTable, setloadingTable] = useState(true)

    const UrlVentas = "/Ventas/Dto"
    const UrlVenta = "/Ventas/DtoVentaCor/"
    const UrlVentasLike = "/Ventas/Dto/"

    


    function MostrarVenta(venta) {
        console.log("click");
        setloadingTable(true)
        setIdVenta(venta.IdVenata)
        setClienteVenta(venta.NombreCliente)
        setFechaVenta(venta.FechaVenta)
        setloadingTable(false)
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


    useEffect(() => {

        const fetchData = async () => {
            try {
                console.log("entr")
                await FetchVentas();
                if(IdVentaView){
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
    };
    useEffect(() => {
        FetchVentaCortinas();
    }, [IdVenta]);


    if(loading){
        return (
          <Loading tipo="all"/>
        )  
    }

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
                                    {loadingTable ?
                                        <Loading tipo="tab" /> :
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
                                                )}
                                            </tbody>
                                        </Table>
                                    }
                                </Accordion.Body>
                        </Accordion.Item>
                    </>
                )}
            </Accordion>:
            <h1>nada....</h1>
            }
        </>
    );
}
