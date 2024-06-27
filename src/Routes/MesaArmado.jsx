import React from 'react'
import './MesaCorte.css';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Loading } from '../Componentes/Loading';

export const MesaArmado = () => {
    const urlIP = import.meta.env.REACT_APP__IPSQL;
    const [loading, setloading] = useState(true)
    const [Day, setDay] = useState("")
    const [IdVenta, setIdVenta] = useState(null)
    const [ClienteVenta, setClienteVenta] = useState(null)
    const [FechaVenta, setFechaVenta] = useState(null)
    const [SearchText, setSearchText] = useState("")

    const [Ventas, setVentas] = useState([])
    const [Venta, setVenta] = useState([])
    const [Cortinas, setCortinas] = useState([])
    const [loadingTable, setloadingTable] = useState(true)


    const [selectedVentaId, setSelectedVentaId] = useState(null);

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

    const handleSelectVenta = (Ven) => {
        setSelectedVentaId(Ven.IdVenata);
        MostrarVenta(Ven);
    };

    return (
        <>
            <Row className="text-center mt-4 mb-4">
                <h1 style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', color: 'blue' }}>
                    Mesa De Armado
                </h1>
            </Row>
            <Row className="text-center mt-4 mb-4" style={{ height: "60vh" }}>
                <Col style={{ borderRight: "2px solid black" }}>
                <h2 style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
                    Ventas
                </h2>
                    {Ventas.length !== 0 ? (
                        <div>
                            {Ventas.map((Ven) => (
                                <div
                                    key={Ven.IdVenata}
                                    className={`rectangulo ${selectedVentaId === Ven.IdVenata ? 'selected' : ''}`}
                                    onClick={() => handleSelectVenta(Ven)}
                                >
                                    <div className="rectangulo-header">
                                        {Ven.NombreCliente} {'\n'}{Ven.Obra ? Ven.Obra : null}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h1>nada....</h1>
                    )}
                </Col>
                <Col xs={9}>
                <h2 style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
                    Tela
                </h2>
                    {loadingTable ? (
                        <Loading tipo="tab" />
                    ) : (
                        <Table responsive>
                            <thead style={{ justifyContent: "center", fontFamily: 'Arial, sans-serif' }}>
                                <tr>
                                    <th>Ambiente</th>
                                    <th>AF-AF</th>
                                    <th>Alto Cortina</th>
                                    <th>Cadena</th>
                                    <th>Lado Cadena</th>
                                    <th>Posicion</th>
                                    <th>Cantidad</th>
                                    <th>Detalles</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Cortinas.map(Cor => (
                                    <tr key={Cor.idCortina}>
                                        <td>{Cor.ambiente}</td>
                                        <td>{Cor.anchoAfuerAfuera}</td>
                                        <td>{Cor.altoCortina}</td>
                                        <td>{Cor.cadena}</td>
                                        <td>{Cor.ladoCadena}</td>
                                        <td>{Cor.posicion}</td>
                                        <td>1</td>
                                        <td>Detalles</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Col>
            </Row>
        </>
    );
};