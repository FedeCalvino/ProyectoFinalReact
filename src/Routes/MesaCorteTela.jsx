import React from 'react'
import './MesaCorte.css';
import Table from 'react-bootstrap/Table';
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Loading } from '../Componentes/Loading';
import Form from 'react-bootstrap/Form';

export const MesaCorteTela = () => {
    const urlIP = import.meta.env.REACT_APP__IPSQL;
    const [loading, setloading] = useState(true)
    const [IdVenta, setIdVenta] = useState(null)
    const [SearchText, setSearchText] = useState("")
    const [selectedRows, setSelectedRows] = useState({});
    const [Ventas, setVentas] = useState([])
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

    const SetCortadas = (Data) => {
        Data.forEach(Cor => {
            if (Cor.estadoCortina !== "Sin Cortar tela" || !Cor.estadoCortina == "Sin Cortar tela y caño") {
                setSelectedRows((prevSelectedRows) => ({
                    ...prevSelectedRows,
                    [Cor.idCortina]: true,
                }));
            }
        });
    };

const FetchVentaCortinas = async () => {
    setloadingTable(true)
    if (IdVenta != null) {
        try {
            const res = await fetch(UrlVenta + { IdVenta }.IdVenta)
            const data = await res.json()
            setCortinas(data);
            SetCortadas(data)
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

const handleRowClick = (Cor) => {
    setSelectedRows((prevSelectedRows) => ({
        ...prevSelectedRows,
        [Cor.idCortina]: !prevSelectedRows[Cor.idCortina],
    }));
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
            <h1 style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
                Mesa De Corte Tela
            </h1>
        </Row>
        <Row className="text-center mt-4 mb-4" style={{ height: "60vh" }}>
            <Col style={{ borderRight: "2px solid black" }}>
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
                {loadingTable ? (
                    <Loading tipo="tab" />
                ) : (
                    <Table responsive>
                        <thead style={{ justifyContent: "center", fontFamily: 'Arial, sans-serif', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                            <tr>
                                <th>Tela</th>
                                <th>Color</th>
                                <th>Ancho tela</th>
                                <th>Alto Tela</th>
                                <th>cant</th>
                                <th>Cortada</th>

                            </tr>
                        </thead>
                        <tbody>
                            {Cortinas.map(Cor => (
                                <tr key={Cor.idCortina} onClick={() => handleRowClick(Cor)} className={Cor.estadoCortina !== "Sin Cortar tela" ? 'fila-verde' : ''}>
                                    <td>{Cor.nombreTela}</td>
                                    <td>{Cor.colorTela}</td>
                                    <td>{Cor.anchoCortina}</td>
                                    <td>{Cor.altoCortina}</td>
                                    <td>1</td>
                                    <td>
                                        <Form.Check
                                            id={Cor.idCortina}
                                            checked={!!selectedRows[Cor.idCortina]}
                                            onChange={() => { }}
                                        />
                                    </td>
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
