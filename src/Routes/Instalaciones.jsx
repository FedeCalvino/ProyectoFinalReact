
import { React, useState, useEffect, useCallback } from 'react';
import { Calendar, dayjsLocalizer } from 'react-big-calendar'
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop'
import "react-big-calendar/lib/css/react-big-calendar.css"
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { forEach } from 'lodash';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { Loading } from '../Componentes/Loading';
import jsPDF from "jspdf";
import html2canvas from "html2canvas";


import "dayjs/locale/es"
dayjs.locale("es");
const DragAndDropCalendar = withDragAndDrop(Calendar)


export const Instalaciones = () => {

    const urlIP = import.meta.env.REACT_APP__IPSQL;

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 1300,
        height: 800,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 50,
        p: 4,
    };
/*
    const UrlVentas = "/Ventas/Dto"
    const InstalacionUrl = "/Instalacion"
*/
const UrlVentas = "http://localhost:8085/Ventas/Dto";
const InstalacionUrl = "http://localhost:8085/Instalacion"

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [Ventas, setVentas] = useState([]);
    const [Venta, setVenta] = useState([]);
    const [VentaSelecc, setVentaSelecc] = useState(false);
    const [Horas, setHoras] = useState([]);
    const [Detalles, setDetalles] = useState('');

    const [VentaModal, setVentaModal] = useState([]);

    const [loading, setloading] = useState(true);

    const AM1 = [dayjs('0000-00-T08:00'), dayjs('0000-00-00T10:00')]
    const AM2 = [dayjs('0000-00-00T10:00'), dayjs('0000-00-00T12:00')]
    const AM3 = [dayjs('0000-00-00T08:00'), dayjs('0000-00-00T12:00')]

    const PM1 = [dayjs('0000-00-T13:00'), dayjs('0000-00-00T15:00')]
    const PM2 = [dayjs('0000-00-T15:00'), dayjs('0000-00-00T18:00')]
    const PM3 = [dayjs('0000-00-T13:00'), dayjs('0000-00-00T18:00')]

    const AMPM = [dayjs('0000-00-T08:00'), dayjs('0000-00-00T18:00')]

    const [fechaInstalacion, setFechaInstalacion] = useState('');
    const [HoraSelecc, setHoraSelecc] = useState(false);

    const [HoraSeleccInicio, setHoraSeleccInicio] = useState('');
    const [HoraSeleccFin, setHoraSeleccFin] = useState('');

    const [Instalaciones, setInstalaciones] = useState([]);
    const [Events, setEvents] = useState([]);

    const [EventSeleccted, setEventSeleccted] = useState([]);

    useEffect(() => {
        // SetHoras();
    }, [Horas]);


    const FetchVentas = async () => {
        try {
            const res = await fetch(UrlVentas);
            const data = await res.json();
            setVentas(data);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    const FetchInstalaciones = async () => {
        const Events = [];
        try {
            const response = await fetch(InstalacionUrl);
            const result = await response.json();
            result.forEach(res => {
                const startDayjs = dayjs(res.start);
                const endDayjs = dayjs(res.end);
                const startDate = startDayjs.toDate();
                const endDate = endDayjs.toDate();
                const NewEvent = {
                    Telefono: res.telefono,
                    Direccion: res.direccion,
                    IdInstalacion: res.idinstalacion,
                    Aclaraciones: res.aclaraciones,
                    obra: res.obra,
                    IdVenta: res.idVenta,
                    start: startDate,
                    end: endDate,
                    title: res.titulo,
                    cortinas: res.cortinas
                };
                Events.push(NewEvent);
            });
            setEvents(Events);
            console.log(Events);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await Promise.all([FetchVentas(), FetchInstalaciones()]);
            } catch (error) {
                console.log(error);
            } finally {
                setloading(false);
            }
        };
        fetchData();
    }, []);

    const handleSelect = (event) => {
        console.log(event);
        setEventSeleccted(event);
        setOpen(true);
    };

    const GeneratePdfIns = () =>{
        const input = document.getElementById('pdf-content');

        html2canvas(input).then((canvas) => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    
            //pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save("download.pdf");
        });
    }


    const Calendario = () => {
        return (
            <DragAndDropCalendar
                style={{ height: '80vh' }}
                localizer={localizar}
                defaultView='month'
                selectable={true}
                onSelectEvent={handleSelect}
                draggableAccessor="isDraggable"
                eventPropGetter={eventPropGetter}
                onEventResize={onEventResize}
                onEventDrop={onEventDrop}
                resizable
                min={new Date(0, 0, 0, 8, 0, 0)}
                max={new Date(0, 0, 0, 18, 0, 0)}
                events={Events}
            />
        );
    };
    const handleDragStart = useCallback((event) => setDraggedEvent(event), [])

    const eventPropGetter = useCallback(
        (event) => ({
            ...(event.isDraggable
                ? { className: 'isDraggable' }
                : { className: 'nonDraggable' }),
        }),
        []
    )

    const onEventResize = (data) => {
        const { start, end } = data;

        this.setState((state) => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: [...state.events] };
        });
    };


    const onEventDrop = (data) => {
        console.log(data);
    };

    const SeleccVenta = (Venta) => {
        setVenta(Venta)
        setVentaSelecc(true)
    }

    const DeSeleccVenta = () => {
        setVentaSelecc(false)
        console.log(Horas)
    }


    const handleFechaChange = (e) => {
        const selectedDate = new Date(e);
        const DateOk = selectedDate.toISOString().split('T')[0];
        const dateObjOk = new Date(DateOk);
        const formattedDateOk = dateObjOk.toISOString().split('T')[0];
        setFechaInstalacion(formattedDateOk);
    }


    function CrearInstalacion() {

        const dateStringInicio = { Horas }.Horas[0].$d

        const dateObjInicio = new Date(dateStringInicio)

        const timeStringInicio = dateObjInicio.toLocaleTimeString('en-US', { hour12: false });

        setHoraSeleccInicio({ fechaInstalacion }.fechaInstalacion + "T" + timeStringInicio)


        //final
        const dateStringFinal = { Horas }.Horas[1].$d
        const dateObjFinal = new Date(dateStringFinal)
        const timeStringFinal = dateObjFinal.toLocaleTimeString('en-US', { hour12: false });
        setHoraSeleccFin({ fechaInstalacion }.fechaInstalacion + "T" + timeStringFinal)


        const Titulo = { Venta }.Venta.NombreCliente.toString()

        const IdVenta = { Venta }.Venta.IdVenata

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "idVenta": IdVenta,
                    "start": { fechaInstalacion }.fechaInstalacion + "T" + timeStringInicio,
                    "end": { fechaInstalacion }.fechaInstalacion + "T" + timeStringFinal,
                    "aclaraciones": Detalles,
                    "titulo": Titulo,
                    "dia":{fechaInstalacion}.fechaInstalacion
                }
            )
        };
        fetch(InstalacionUrl, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                window.location.reload();
            });
    }

    const DeleteInstalacion = () => {
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        };
        const idInstalacion = parseInt(EventSeleccted?.IdInstalacion); // Convertir a entero

        if (!isNaN(idInstalacion)) { // Verificar si es un número válido
            fetch(InstalacionUrl + "/" + idInstalacion, requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                });
        } else {
            console.log("El ID de la instalación no es válido.");
        }
        setOpen(false)
        window.location.reload();
    }


    if(loading){
        return (
          <Loading tipo="all"/>
        )  
    }
    const localizar = dayjsLocalizer(dayjs)
    return (
        <>
            <div>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div>
                            <h3>{EventSeleccted.title}  </h3>
                        </div>
                        <div>
                            <h3>Direccion: {EventSeleccted.Direccion}</h3>
                        </div>
                        <div>
                            <h3>Telefono: {EventSeleccted.Telefono}</h3>
                        </div>
                        <div>
                            {EventSeleccted.obra ? <h3>Obra: {EventSeleccted.obra}</h3> : null}
                        </div>
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
                                {EventSeleccted && EventSeleccted.cortinas && EventSeleccted.cortinas.map(Cor =>
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
                        <div>
                            <h3>Aclaraciones</h3>
                        </div>
                        <div>
                            <p>{EventSeleccted.Aclaraciones}</p>
                        </div>
                        <div>
                            <Button onClick={() => DeleteInstalacion()} variant="danger">Eliminiar Instalacion</Button>
                        </div>
                        <div>
                            <Button onClick={() => GeneratePdfIns()} variant="Success">Gen PDF</Button>
                        </div>
                    </Box>
                </Modal>
            </div>
            <Row>
                <Tabs
                    defaultActiveKey="Calendario"
                    id="fill-tab-example"
                    as={Col}
                    className="mb-2"
                    style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
                >
                    <Tab eventKey="Calendario" title="Calendario">
                        {Calendario()}
                    </Tab>
                    <Tab eventKey="Tra" title="Agregar Instalacion">
                        {VentaSelecc ?
                            <>
                                <div style={{ textAlign: 'center', margin: '20px' }}>
                                    <div>
                                        <strong>{Venta.NombreCliente}</strong>
                                        <p>Fecha: {Venta.FechaVenta}</p>
                                        {Venta.Obra && <p>Obra: {Venta.Obra}</p>}
                                    </div>
                                    <Button onClick={DeSeleccVenta} variant="danger">Cambiar Venta</Button>
                                    <Row className="mt-3">
                                        <Col>
                                            <hr style={{ borderTop: '2px solid black' }} />
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center mt-3">
                                        <Col md={4}>
                                            <Form.Group controlId="formGroupDate">
                                                <Form.Label style={{ fontSize: "30px" }}>Fecha</Form.Label>
                                                <Form.Control
                                                    value={fechaInstalacion}
                                                    onChange={(e) => handleFechaChange(e.target.value)}
                                                    type="date"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <hr style={{ borderTop: '2px solid black' }} />
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <Form.Label style={{ fontSize: "30px" }}>Hora</Form.Label>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <ButtonToolbar className="justify-content-between mb-3">
                                            <Col>
                                            </Col>
                                            <Col>
                                                <ButtonGroup aria-label="First group">
                                                    <Button variant="secondary" onClick={() => setHoras({ AM1 }.AM1)}>8-10</Button>
                                                    <Button variant="secondary" onClick={() => setHoras({ AM2 }.AM2)}>10-12</Button>
                                                    <Button variant="secondary" onClick={() => setHoras({ AM3 }.AM3)}>8-12</Button>
                                                </ButtonGroup>
                                            </Col>
                                            <Col>
                                                <ButtonGroup aria-label="Second group">
                                                    <Button variant="secondary" onClick={() => setHoras({ PM1 }.PM1)}>13-15</Button>
                                                    <Button variant="secondary" onClick={() => setHoras({ PM2 }.PM2)}>15-18</Button>
                                                    <Button variant="secondary" onClick={() => setHoras({ PM3 }.PM3)}>13-18</Button>
                                                </ButtonGroup>
                                            </Col>
                                            <Col>
                                            </Col>
                                        </ButtonToolbar>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <ButtonGroup aria-label="First group">
                                                <Button variant="secondary" onClick={() => setHoras({ AMPM }.AMPM)}>8-17</Button>
                                            </ButtonGroup>
                                        </Col>
                                    </Row>



                                    <Row className="justify-content-center mt-3">
                                        <Col className="text-center" md={3}>
                                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                                <DemoContainer components={['SingleInputTimeRangeField', 'SingleInputTimeRangeField']}>
                                                    <SingleInputTimeRangeField
                                                        label="Hora Instalación"
                                                        value={Horas}
                                                        onChange={(newHoras) => setHoras(newHoras)}
                                                    />
                                                </DemoContainer>
                                            </LocalizationProvider>
                                        </Col>
                                    </Row>
                                    <Row className="mt-3">
                                        <Col>
                                            <hr style={{ borderTop: '2px solid black' }} />
                                        </Col>
                                    </Row>
                                    <Row >
                                        <Col md={4}></Col>
                                        <Col md={4}>
                                            <Form.Group controlId="validationCustom01">
                                                <h3>Detalles</h3>
                                                <Form.Control
                                                    style={{ height: "90px", border: "1px solid black" }}
                                                    type="text"
                                                    value={Detalles}
                                                    onChange={(e) => setDetalles(e.target.value)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}></Col>
                                    </Row>
                                    <Row>
                                        <Col md={12} style={{ marginTop: "50px" }}>
                                            <Button onClick={() => CrearInstalacion()} variant="success">Crear instalacion</Button>
                                        </Col>
                                    </Row>

                                </div>
                            </>
                            :
                            <>
                                <Form.Group noValidate>
                                    <ListGroup>
                                        {Ventas.map((Ven, index) => (
                                            <ListGroup.Item
                                                key={Ven.IdVenata}
                                                action
                                                value={Ven.IdVenata}
                                                onClick={() => SeleccVenta(Ven)}
                                                style={{
                                                    marginBottom: '10px',
                                                    border: '1px solid #ccc',
                                                    borderRadius: '5px',
                                                    padding: '10px',
                                                    cursor: 'pointer',
                                                    backgroundColor: index % 2 === 0 ? '#f7f7f7' : 'white', // Alternar colores de fondo
                                                }}
                                            >
                                                <div>
                                                    <strong>{Ven.NombreCliente}</strong>
                                                    <p>Fecha: {Ven.FechaVenta}</p>
                                                    {Ven.Obra && <p>Obra: {Ven.Obra}</p>}
                                                </div>
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Form.Group>
                            </>
                        }
                    </Tab>
                </Tabs>
                <ListGroup as={Col} md="8">

                </ListGroup>
            </Row>
        </>
    )

}
