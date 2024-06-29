import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Table, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import './VentasCss.css';
import { Loading } from '../Componentes/Loading';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { PDF } from '../Componentes/PDF';
import { forEach } from 'lodash';

export const Ventas = ({ IdVentaView }) => {
    const tableRef = useRef(null);
    const input = tableRef.current;
    const [loading, setloading] = useState(true)
    const [IdVenta, setIdVenta] = useState(null)
    const [SearchText, setSearchText] = useState("")
    const [Ventas, setVentas] = useState([])
    const [VentasTotales, setVentasTotales] = useState([])
    const [Cortinas, setCortinas] = useState([])
    const [loadingTable, setloadingTable] = useState(true)
    const [FilteredVentas, setFilteredVentas] = useState([])
    
            const UrlVentas = "/Ventas/Dto"
            const UrlVenta = "/Ventas/DtoVentaCor/"
 /*
    const UrlVentas = "http://20.84.111.102:8085/Ventas/Dto"
    const UrlVenta = "http://20.84.111.102:8085/Ventas/DtoVentaCor/"
*/

    function MostrarVenta(venta) {

        setIdVenta(venta.IdVenata)
    }





    const FetchVentas = async () => {
            try {
                const res = await fetch(UrlVentas)
                const data = await res.json()
                setVentas(data);
                setVentasTotales(data)
                console.log(data);
            } catch (error) {
                console.log(error)
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
    const cambiarLargoCano = (data) => {
        data.forEach(cortina => {
            // Convertir el string a un número
                const decimalPartLength = (cortina.anchoAfuerAfuera.split('.')[1] || '').length;
                if(decimalPartLength==1){
                    console.log(cortina.anchoAfuerAfuera+0)
                }
                const anchoAfuerAfuera = parseFloat(cortina.anchoAfuerAfuera);
                // Realizar la operación matemática
                let nuevoAnchoCaño = anchoAfuerAfuera - 0.03;
                // Asegurar que el resultado tenga dos decimales y asignar el valor actualizado
                cortina.anchoCaño = nuevoAnchoCaño.toFixed(2);
            
        });
    };
    const FiltrarVentas = () => {
        if (SearchText && SearchText.trim() !== "") {
            const filtered = VentasTotales.filter(venta => 
                venta.NombreCliente.toLowerCase().includes(SearchText.toLowerCase())
            );
            setVentas(filtered);
        } else {
            setVentas(VentasTotales);
        }
    };

    useEffect(() => {
        FiltrarVentas();
        lastDay = ""
    }, [SearchText]);

    const FetchVentaCortinas = async () => {
        setloadingTable(true)
        if (IdVenta != null) {
            try {
                const res = await fetch(UrlVenta + { IdVenta }.IdVenta)
                const data = await res.json()
                cambiarLargoCano(data)
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


    useEffect(() => {
        FetchVentaCortinas();
    }, [IdVenta]);

    if (loading) {
        return (
            <Loading tipo="all" />
        )
    }

    return (
        <div>
            <Row className="text-center mt-4 mb-4">
                <h1 style={{ fontFamily: 'Arial', fontSize: '32px', fontWeight: 'bold', color: '#333' }}>VENTAS</h1>
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
            {Ventas.length !== 0 ? (
                <Accordion>
                    {Ventas.map((Ven, index) => {
                        return (
                            <React.Fragment key={Ven.IdVenata}>
                                <MostrarDia Day={Ven.FechaVenta} />
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
                                            <>
                                                <Table responsive>
                                                    <thead style={{ justifyContent: "center", fontFamily: 'Arial, sans-serif' }}>
                                                        <tr>
                                                            <th>Ambiente</th>
                                                            <th>Ancho AF-AF</th>
                                                            <th>Ancho tela</th>
                                                            <th>Ancho Caño</th>
                                                            <th>caño</th>
                                                            <th>Alto Cortina</th>
                                                            <th>Alto Tela</th>
                                                            <th>cant</th>
                                                            <th>Cadena</th>
                                                            <th>Lado</th>
                                                            <th>posicion</th>
                                                            <th>Detalles</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Cortinas.map(Cor => (
                                                            <tr key={Cor.idCortina}>
                                                                <td>{Cor.ambiente}</td>
                                                                <td>{Cor.anchoAfuerAfuera}</td>
                                                                <td>{Cor.anchoCortina}</td>
                                                                <td>{Cor.anchoCaño}</td>
                                                                <td>{Cor.cano}</td>
                                                                <td>{Cor.altoCortina}</td>
                                                                <td>{Cor.altoTela}</td>
                                                                <td>1</td>
                                                                <td>{Cor.cadena}</td>
                                                                <td>{Cor.ladoCadena}</td>
                                                                <td>{Cor.posicion}</td>
                                                                <td>Detalles</td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </Table>
                                                <PDFDownloadLink document={<PDF Venta={Ven} Cortinas={Cortinas} />} fileName='Pdf'>
                                                    <Button >PDF</Button>
                                                </PDFDownloadLink>
                                            </>
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            </React.Fragment>
                        );
                    })}
                </Accordion>
            ) : (
                <h1>nada....</h1>
            )}
        </div>
    );
};