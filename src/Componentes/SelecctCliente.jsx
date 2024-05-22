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

    //SeleccCliente

    const [NombreCli, setCliNom] = useState('');
    const [TelefonoCli, setCliTel] = useState('');
    const [RutCli, setCliRut] = useState('');
    const [DireccCli, setCliDirecc] = useState('');



    const UrlClientes = "http://localhost:8085/Cliente"
    const UrlCLientesLike = "http://localhost:8085/Cliente/strL/"

    const [SearchText, setSearchText] = useState('');

    //const {data,isLoading,error} = useFecth(UrlClientes)

    useEffect(() => {
        FetchClientesLike();
    }, [SearchText]);

    const [Clientes, setClientes] = useState([]);



    const FetchClientesLike = async () => {
        try {
            if (SearchText.trim() !== '') {
                const res = await fetch(UrlCLientesLike + SearchText)
                const data = await res.json()
                setClientes(data);
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




    function SeleccionarCliente() {
        ClienteData(Cliente)
        setClienteCrearSelecc(false)
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
        setSearchText("")
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
                    <Row>
                        <Form.Group as={Col} md="8">
                            <h3 style={{ marginLeft: "7em" }}>Selecciona Cliente</h3>
                        </Form.Group>
                        <Form.Group as={Col} md="4">
                            <h3>Crear Cliente</h3>
                        </Form.Group>
                    </Row>
                    <Form.Group as={Col} md="2" noValidate>
                        <Form.Control
                            type="text"
                            value={SearchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            placeholder="Buscar..."
                        />
                    </Form.Group>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="2" noValidate>
                            <ListGroup>
                                {(Clientes.map(Cli =>
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
                        </Form.Group>
                        <Form.Group as={Col} md="1" noValidate>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                readOnly={true}
                                value={NombreCli}
                                placeholder="Nombre"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="1" noValidate>
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                required
                                value={TelefonoCli}
                                readOnly={true}
                                placeholder="telefono"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="2">
                        </Form.Group>

                        <Form.Group style={{ borderLeft: "4px solid black" }} as={Col} md="3" noValidate>
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                value={NombreCliN}
                                onChange={(e) => (setCliNomN(e.target.value))}
                                placeholder="Nombre"
                            />
                        </Form.Group>
                        <Form.Group as={Col} md="3" noValidate>
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control
                                required
                                type="number"
                                value={TelefonoCliN}
                                onChange={(e) => (setCliTelN(e.target.value))}
                                placeholder="telefono"
                            />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col} md="2">
                        </Form.Group>
                        <Form.Group as={Col} md="1" noValidate>
                            <Form.Label>RUT</Form.Label>
                            <Form.Control type="number" readOnly={true} value={RutCli} placeholder="Rut" />
                        </Form.Group>
                        <Form.Group as={Col} md="2" noValidate>
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control type="text" readOnly={true} value={DireccCli} placeholder="Direccion" />
                        </Form.Group>
                        <Form.Group as={Col} md="1" controlId="NA" noValidate>
                        </Form.Group>
                        <Form.Group style={{ borderLeft: "4px solid black" }} as={Col} md="3" noValidate>
                            <Form.Label>RUT</Form.Label>
                            <Form.Control value={RutCliN} onChange={(e) => (setCliRutN(e.target.value))} type="number" placeholder="Rut" />
                        </Form.Group>
                        <Form.Group as={Col} md="3" noValidate>
                            <Form.Label>Direccion</Form.Label>
                            <Form.Control value={DireccCliN} onChange={(e) => (setCliDireccN(e.target.value))} type="text" placeholder="Direccion" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="4" controlId="NA">
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group style={{marginBottom:"40px",marginLeft:" 1200px"}} as={Col} md="3" noValidate>
                            <Form.Label>Nro Cuenta</Form.Label>
                            <Form.Control value={NroCuentaCli} onChange={(e) => (setNroCuentaCli(e.target.value))} type="text" placeholder="Nro Cuenta" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group as={Col} md="2" controlId="NA">
                        </Form.Group>
                        <Button type="submit" as={Col} md="1" onClick={SeleccionarCliente}>Seleccionar Cliente</Button>
                        <Form.Group as={Col} md="5" controlId="NA">
                        </Form.Group>
                        <Button type="submit" as={Col} md="1" onClick={CrearCliente}>Crear Cliente</Button>
                    </Row>
                </>}
        </>
    );







}

)
