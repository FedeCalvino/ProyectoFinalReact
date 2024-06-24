import React, { useCallback } from 'react'
import { useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import InputGroup from 'react-bootstrap/InputGroup';
import ListGroup from 'react-bootstrap/ListGroup';
import Toast from 'react-bootstrap/Toast';
import { useRef } from 'react';
import { BuscadorClientes } from './BuscadorClientes';
import Card from 'react-bootstrap/Card';
import Placeholder from 'react-bootstrap/Placeholder';
import Spinner from 'react-bootstrap/Spinner';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Container from 'react-bootstrap/Container'
export const SelecctCliente = React.memo(({ ClienteData }) => {
    const [IdCli, setIdCli] = useState(null);

    const [Cliente, setCliente] = useState(null);
    //CrearCliente
    const [NombreCliN, setCliNomN] = useState('');
    const [TelefonoCliN, setCliTelN] = useState('');
    const [RutCliN, setCliRutN] = useState('');
    const [DireccCliN, setCliDireccN] = useState(''); const [ClienteSeleccBoolean, SetClienteSeleccBoolean] = useState(false);
    const [ClienteCrearSelecc, setClienteCrearSelecc] = useState(false);
    const [NroCuentaCli, setNroCuentaCli] = useState('');
    const [loadingSearch, setloadingSearch] = useState(false);
    //SeleccCliente

    const [NombreCli, setCliNom] = useState('');
    const [TelefonoCli, setCliTel] = useState('');
    const [RutCli, setCliRut] = useState('');
    const [DireccCli, setCliDirecc] = useState('');



    const UrlClientes = "/Cliente"
    const UrlCLientesLike = "/Cliente/strL/"

    const [SearchText, setSearchText] = useState('');

    //const {data,isLoading,error} = useFecth(UrlClientes)
    console.log("loading", loadingSearch)
    useEffect(() => {
        FetchClientesLike();
    }, [SearchText]);

    const [Clientes, setClientes] = useState([]);



    const FetchClientesLike = async () => {
        try {
            if (SearchText.trim() !== '') {
                setloadingSearch(true)
                const res = await fetch(UrlCLientesLike + SearchText)
                const data = await res.json()
                setClientes(data);
                setloadingSearch(false)
                console.log(data);
            } else {
                setClientes([]);
            }
        } catch (error) {
            console.log(error)
        }
    };

    function CrearCliente() {
        const NewClienteData = {
            Name: { NombreCliN },
            Direcc: { DireccCliN },
            Tel: { TelefonoCliN },
            Rut: { RutCliN }
        }
        ClienteData(NewClienteData)
        setClienteCrearSelecc(true)
        SetClienteSeleccBoolean(true)
    }






    const handleSearchTextChange = (e) => {
        setSearchText(e.target.value)
        console.log(SearchText)
    }

    const onSearchTextChange = () => {
        setSearchText(e.target.value);
        console.log("entro")
    };

    function DesSeleccionarCliente() {
        const NewClienteData = {}
        ClienteData(NewClienteData)
        SetClienteSeleccBoolean(false)
    }

    const ClientSeleccted = () => {
        return (
            <>
                {ClienteCrearSelecc ? (
                    <Row>
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '300px',
                            padding: '10px',
                            backgroundColor: 'white',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Agrega una sombra suave
                            borderRadius: '8px', // Añade bordes redondeados
                            zIndex: 999, // Asegura que esté en la parte superior
                        }}>
                            <h2 style={{ marginBottom: '10px' }}>{NombreCliN}</h2>
                            <p style={{ marginBottom: '5px' }}><span style={{ fontWeight: 'bold' }}>Telefono:</span> {TelefonoCliN} </p>
                            <p style={{ marginBottom: '5px' }}><span style={{ fontWeight: 'bold' }}>Rut:</span> {RutCliN} </p>
                            <p style={{ marginBottom: '5px' }}><span style={{ fontWeight: 'bold' }}>Direccion:</span> {DireccCliN} </p>
                            <Button variant="primary" onClick={DesSeleccionarCliente}>Cambiar Cliente</Button>
                        </div>
                    </Row>
                ) : (
                    <Row>
                        <div style={{
                            position: 'fixed',
                            top: 0,
                            right: 0,
                            width: '300px',
                            padding: '10px',
                            backgroundColor: 'white',
                            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Agrega una sombra suave
                            borderRadius: '8px', // Añade bordes redondeados
                            zIndex: 999, // Asegura que esté en la parte superior
                        }}>
                            <h2 style={{ marginBottom: '10px' }}>{NombreCli}</h2>
                            <p style={{ marginBottom: '5px' }}><span style={{ fontWeight: 'bold' }}>Telefono:</span> {TelefonoCli} </p>
                            <p style={{ marginBottom: '5px' }}><span style={{ fontWeight: 'bold' }}>Rut:</span> {RutCli} </p>
                            <p style={{ marginBottom: '5px' }}><span style={{ fontWeight: 'bold' }}>Direccion:</span> {DireccCli} </p>
                            <Button variant="primary" onClick={DesSeleccionarCliente}>Cambiar Cliente</Button>
                        </div>
                    </Row>
                )}
            </>
        );
    }

    const SelecctCliFromList = (Cli) => {
        if (Cli != null)
            ClienteData(Cli)
        setCliente(Cli)
        setIdCli(Cli.id)
        setCliNom(Cli.nombre)
        setCliRut(Cli.rut)
        setCliDirecc(Cli.direccion)
        setCliTel(Cli.numeroTelefono)
        ClienteData(Cli)
        setClienteCrearSelecc(false)
        SetClienteSeleccBoolean(true)
    };

    return (
        <>
            {ClienteSeleccBoolean ?
                <>
                    <Row>
                        <ClientSeleccted />
                    </Row>
                </>
                :
                <>
                    <Tabs
                        defaultActiveKey="Selecc"
                        id="fill-tab-example"
                        as={Col}
                        className="mb-2"
                        style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
                        <Tab eventKey="Selecc" title="Seleccionar Cliente">
                            <Row className="justify-content-center mb-3">
                                <Col md="3" noValidate>
                                    <Form.Control
                                        type="text"
                                        value={SearchText}
                                        onChange={(e) => setSearchText(e.target.value)}
                                        placeholder="Buscar..."
                                    />
                                </Col>
                                {loadingSearch ? (
                                    <Col md="1" className="text-center">
                                        <Spinner animation="border" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </Spinner>
                                    </Col>
                                ) : null}
                            </Row>
                            <Row className="justify-content-center mb-3">
                                <Col md="4" noValidate>
                                    <ListGroup>
                                        {Clientes.map(Cli => (
                                            <ListGroup.Item
                                                key={Cli.id}
                                                action
                                                value={Cli.id}
                                                onClick={() => SelecctCliFromList(Cli)}
                                            >
                                                {Cli.nombre}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </Col>
                            </Row>
                        </Tab>
                        <Tab eventKey="Crear" title="Crear Cliente">
                            <Container>
                                <Row className="justify-content-center mb-3">
                                    <Col md="4">
                                        <h3 className="text-center">Crear Cliente</h3>
                                    </Col>
                                </Row>
                                <Form>
                                    <Row className="justify-content-center mb-3">
                                        <Col md="5" className="border-start">
                                            <Form.Group controlId="Nombre">
                                                <Form.Label>Nombre</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={NombreCliN}
                                                    onChange={(e) => setCliNomN(e.target.value)}
                                                    placeholder="Nombre"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="5">
                                            <Form.Group controlId="Telefono">
                                                <Form.Label>Telefono</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="number"
                                                    value={TelefonoCliN}
                                                    onChange={(e) => setCliTelN(e.target.value)}
                                                    placeholder="Telefono"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center mb-3">
                                        <Col md="5" className="border-start">
                                            <Form.Group controlId="Rut">
                                                <Form.Label>RUT</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    value={RutCliN}
                                                    onChange={(e) => setCliRutN(e.target.value)}
                                                    placeholder="RUT"
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col md="5">
                                            <Form.Group controlId="Direccion">
                                                <Form.Label>Direccion</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={DireccCliN}
                                                    onChange={(e) => setCliDireccN(e.target.value)}
                                                    placeholder="Direccion"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center mb-3">
                                        <Col md="5" className="border-start border-2">
                                            <Form.Group controlId="NroCuenta">
                                                <Form.Label>Nro Cuenta</Form.Label>
                                                <Form.Control
                                                    type="text"
                                                    value={NroCuentaCli}
                                                    onChange={(e) => setNroCuentaCli(e.target.value)}
                                                    placeholder="Nro Cuenta"
                                                />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                    <Row className="justify-content-center">
                                        <Col md="2">
                                            <Button type="submit" onClick={CrearCliente} className="w-100">Crear Cliente</Button>
                                        </Col>
                                    </Row>
                                </Form>
                            </Container>
                        </Tab>
                    </Tabs></>}
        </>
    );







}

)
