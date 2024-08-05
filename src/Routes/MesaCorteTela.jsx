import React from 'react'
import './MesaCorte.css';
import { Table, Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Loading } from '../Componentes/Loading';
import Form from 'react-bootstrap/Form';
import { TicketCortina } from '../Componentes/TicketCortina';
import { PDFDownloadLink } from '@react-pdf/renderer';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import { PDFTela } from '../Componentes/PDFTela';

export const MesaCorteTela = () => {
    const urlIP = import.meta.env.REACT_APP__IPSQL;
    const [loading, setloading] = useState(true)
    const [IdVenta, setIdVenta] = useState(null)
    const [open, setOpen] = useState(false);
    const [SearchText, setSearchText] = useState("")
    const [selectedRows, setSelectedRows] = useState({});
    const [Ventas, setVentas] = useState([])
    const [Cortinas, setCortinas] = useState([])
    const [loadingTable, setloadingTable] = useState(true)
    const handleClose = () => setOpen(false);
    const [CortinaCor, setCortinaCor] = useState([])
    const [VentaImp, setVentaImp] = useState([])

    const [selectedVentaId, setSelectedVentaId] = useState(null);
    const [EstaCortada, setEstaCortada] = useState(false)

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
        textAlign: 'center',
    };

    const buttonStyle = {
        display: 'flex',
        justifyContent: 'space-around',
        marginTop: '20px',
    };

    const textStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
    };


        const UrlVentas = "/Ventas/DtoVentaCor/MesaTela"
        const UrlVenta = "/Ventas/DtoVentaCor/"
        const telaCortada = "/EstadoCortina/"
/*
    const UrlVentas = "http://localhost:8085/Ventas/DtoVentaCor/MesaTela"
    const UrlVenta = "http://localhost:8085/Ventas/DtoVentaCor/"
    const telaCortada = "http://localhost:8085/EstadoCortina/"
*/
    function MostrarVenta(venta) {
        console.log("click");
        setIdVenta(venta.IdVenata)
    }





    const FetchVentas = async () => {
        try {
            const res = await fetch(UrlVentas);
            const data = await res.json();

            // Obtener la fecha actual
            const today = new Date();

            // Ordenar por la fecha de instalación, más cerca a la fecha actual primero
            const sorted = data.sort((a, b) => {
                const dateA = a.DiaInstalacion ? new Date(a.DiaInstalacion) : null;
                const dateB = b.DiaInstalacion ? new Date(b.DiaInstalacion) : null;

                if (dateA && dateB) {
                    // Calcular la diferencia en milisegundos
                    const diffA = Math.abs(today - dateA);
                    const diffB = Math.abs(today - dateB);
                    return diffA - diffB;
                } else if (!dateA && !dateB) {
                    // Ambos no tienen fecha, son iguales en términos de ordenamiento
                    return 0;
                } else if (!dateA) {
                    // `a` no tiene fecha, `a` debe ir después de `b`
                    return 1;
                } else {
                    // `b` no tiene fecha, `b` debe ir después de `a`
                    return -1;
                }
            });

            // Actualizar el estado con los datos ordenados
            setVentas(sorted);
            console.log(sorted);
        } catch (error) {
            console.log(error);
        }
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
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
        FetchVentas();

    }, [SearchText]);

    const SetCortadas = (Data) => {
        Data.forEach(Cor => {
            if (Cor.estado.telaCortada == true) {
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
        setOpen(true)
        setCortinaCor(Cor)
        console.log(Cor)
        setEstaCortada(Cor.estado.telaCortada)
    };

    useEffect(() => {
        FetchVentaCortinas();
    }, [IdVenta]);

    if (loading) {
        return (
            <Loading tipo="all" />
        )
    }
    const FormatearFecha = ({ fecha }) => {
        console.log(fecha)
        if (!fecha) return ''; // Maneja el caso donde la fecha es nula o indefinida
        const partesFecha = fecha.split('-');
        if (partesFecha.length !== 3) return ''; // Maneja el caso donde la fecha no tiene el formato correcto
        const [anio, mes, dia] = partesFecha;
        return `${dia}/${mes}`;
    };

    const SetCortada = async () => {
        try {
            const res = await fetch(telaCortada + CortinaCor.idCortina, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
            });

            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            } else {
                setSelectedRows((prevSelectedRows) => ({
                    ...prevSelectedRows,
                    [CortinaCor.idCortina]: true,
                }));
                CortinaCor.estado.telaCortada = true
            }

        } catch (error) {
            console.log(error);
        } finally {
            setOpen(false)
        }
    };

    const handleSelectVenta = (Ven) => {
        setSelectedVentaId(Ven.IdVenata);
        setVentaImp(Ven);
        MostrarVenta(Ven);

    };

    return (
        <>
            <Row className="text-center mt-4 mb-4">
                <h1 style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', color: '#333' }}>
                    Mesa De Corte Tela
                </h1>
            </Row>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div>
                            <h2>Cortina Cortada</h2>
                        </div>
                        <div style={textStyle}>
                            <h3>{CortinaCor.anchoCortina}</h3>
                            <h3>X</h3>
                            <h3>{CortinaCor.altoTela}</h3>
                        </div>
                        {{ EstaCortada }.EstaCortada ? null :
                            <div style={buttonStyle}>
                                <Button onClick={handleClose} variant="danger">
                                    CANCELAR
                                </Button>
                                <Button onClick={SetCortada} variant="success" style={{ backgroundColor: 'blue' }}>
                                    ACEPTAR
                                </Button>


                            </div>
                        }
                        <div style={buttonStyle}>
                            {{ EstaCortada }.EstaCortada ? <Button onClick={handleClose} variant="danger">
                                CANCELAR
                            </Button> : null
                            }
                            <PDFDownloadLink document={<TicketCortina Venta={VentaImp} Cortina={CortinaCor} NumeroCor={false} />} fileName='Pdf'>
                                <Button variant="primary">Ticket</Button>
                            </PDFDownloadLink>
                        </div>
                    </Box>
                </Modal>
            </div>
            <Row className="text-center mt-4 mb-4" style={{ height: "70vh" }}>
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
                                        {Ven.NombreCliente} {'\n'} <FormatearFecha fecha={Ven.DiaInstalacion} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <h1>nada....</h1>
                    )}
                </Col>
                <Col xs={9}>
                    <div className="table-container">
                        {loadingTable ? (
                            <Loading tipo="tab" />
                        ) : (
                            <div style={{display:"flex",alignItems:"end",justifyContent:"end"}}>
                            <Table responsive className='fixed-top' style={{width:"72%",marginTop:"90px",marginLeft:"500px"}}>
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
                                        <React.Fragment key={Cor.idCortina}>
                                            <tr onClick={() => handleRowClick(Cor)} className={Cor.estadoCortina !== "Sin Cortar tela" ? 'fila-verde' : ''}>
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
                                        </React.Fragment>
                                    ))}
                                </tbody>
                            </Table>
                            </div>
                        )}
                    </div>
                </Col>
            </Row>
        </>
    );
};