import React, { useEffect, useCallback } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { NavBar } from '../Componentes/NavBar';
import { SelecctCliente } from '../Componentes/SelecctCliente';
import InputGroup from 'react-bootstrap/InputGroup';
import Table from 'react-bootstrap/Table';
import Alert from 'react-bootstrap/Alert';
import { Navigate } from 'react-router-dom';


export const CrearVenta = () => {
    const urlIP = import.meta.env.REACT_APP__IPSQL;
    const [isValid, setisValid] = useState(null)

    //Cliente selecc
    const [DataCli, setDataCli] = useState(null);
    const [Obra, setObra] = useState('')

    //Factura
    const [FechaFinalPago, setFechaFinalPago] = useState('')
    const [NroFactura, setNroFactura] = useState('')

    //alertas y validaciones
    const [validated, setValidated] = useState(false);
    const [AlertaClienteNotSelecc, setAlertaClienteNotSelecc] = useState(false);
    const [VentaCreada, setVentaCreada] = useState(false);
    const [AmbienteIgual, setAmbienteIgual] = useState(false);

    //Listas
    const [Telas, setTelas] = useState([])
    const [NombreNuevoAmbiente, setNuevoNombreAmbiente] = useState("")
    const [Ambientes, setAmbientes] = useState([])
    const [Cortinas, setCortinas] = useState([])




    //Datos Cortina
    const [motorizada, setMotorizada] = useState(false)
    const [selectedTelaRoler, setselectedTelaRoler] = useState("");
    const [selectedTelaRolerNombre, setselectedTelaRolerNombre] = useState("");
    const [selectedAreaRoler, setselectedAreaRoler] = useState("");
    const [AnchoRoller, setAnchoRoller] = useState('')
    const [LargoRoller, setLargoRoller] = useState('')
    const [CanoRoller, setCanoRoller] = useState('')
    const [IzqDer, setIzqDer] = useState('')
    const [AdlAtr, setAdlAtr] = useState('')
    const [Cadena, setCadena] = useState('')








    const [idCor, setidCor] = useState(0)

    const [Precio, setPrecio] = useState(0)


    useEffect(() => {
        FetchTelas();
    }, []);
    const UrlTelas = "/TipoTela"

    function AgregarRoller() {
        const nuevaCortinaRoler = {
            Id: idCor,
            Ambiente: { selectedAreaRoler }.selectedAreaRoler,
            tela: { id: { selectedTelaRoler }.selectedTelaRoler, Nombre: selectedTelaRolerNombre },
            ancho: { AnchoRoller }.AnchoRoller,
            largoRoller: { LargoRoller }.LargoRoller,
            posicion: { AdlAtr }.AdlAtr,
            ladoC: { IzqDer }.IzqDer,
            cadena: { Cadena }.Cadena,
            Cano: { CanoRoller }.CanoRoller,
            motorizada: { motorizada }.motorizada
        }
        console.log(nuevaCortinaRoler)
        setidCor(idCor + 1)

        setCortinas([...Cortinas, nuevaCortinaRoler]);
    }

    const FetchTelas = async () => {
        try {
            console.log(UrlTelas)
            const res = await fetch(UrlTelas)
            const data = await res.json()
            setTelas(data);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    };

    const FormCortinaTradicional = () => {
        return (
            <>
                <Row>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                        <Form.Select as={Col} md="2" aria-label="Default select example">
                            <option>Tipo de Tela</option>
                            {(Telas.map(Tel =>
                                <option value={Tel.id} key={Tel.id}>
                                    {Tel.Nombre}
                                </option>
                            ))}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                        <Form.Control

                            type="number"
                            placeholder="Ancho"
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                        <Form.Control

                            type="number"
                            placeholder="Largo"
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                        <Form.Select>
                            <option>Paños</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </Form.Select>
                    </Form.Group>
                </Row>
            </>
        )
    };

    const handleSelectChange = (e) => {
        //console.log(e.target.value)
        setselectedTelaRoler(e.target.value);
        console.log(e.target.value);
        console.log(e);
        const selectedValue = parseInt(e.target.value, 10);
        const selectedTela = Telas.find(tela => tela.Id === selectedValue);
        console.log(selectedTelaRoler)
        // Obtener el Nombre del objeto seleccionado
        selectedTela ? setselectedTelaRolerNombre(selectedTela.Nombre) : "";
    };

    const handleSelectAmbienteChange = (e) => {
        setselectedAreaRoler(e.target.value)
    }


    const FormCortinaRoller = () => {
        return (
            <>
                <Row>
                    <Form.Group as={Col} md="1" style={{ width: "11%" }} noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Ambiente</Form.Label>
                        <Form.Select as={Col} md="1" aria-label="Default select example" onChange={handleSelectAmbienteChange} value={selectedAreaRoler}>
                            <option style={{ textAlign: "center" }}>Ambiente</option>
                            {Ambientes.map(amb =>
                                <option style={{ textAlign: "center" }} value={amb.Nombre} key={amb.Nombre}>
                                    {amb.Nombre}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="1" style={{ width: "11%" }} noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Tela</Form.Label>
                        <Form.Select as={Col} md="1" aria-label="Default select example" onChange={handleSelectChange} value={selectedTelaRoler}>
                            <option style={{ textAlign: "center" }}>Tipo de Tela</option>
                            {Telas.map(Tel =>
                                <option style={{ textAlign: "center" }} value={Tel.id} key={Tel.id}>
                                    {Tel.Nombre}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Group>

                    <Form.Group as={Col} md="1" style={{ width: "10%" }} noValidate>
                        <Form.Label style={{ alignItems: "center", justifyContent: "center", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Ancho</Form.Label>
                        <Form.Control
                            type="number"
                            style={{ textAlign: "center" }}
                            value={AnchoRoller}
                            onChange={(e) => { setAnchoRoller(e.target.value) }}
                            placeholder="Ancho"
                            isValid={isValid}
                        />

                    </Form.Group>
                    <Form.Group style={{ width: "2%" }} as={Col} md="1" controlId="validationCustom01">
                        <p style={{ marginTop: "38px", marginRight: "10px" }}>X</p>
                    </Form.Group>
                    <Form.Group as={Col} md="1" controlId="validationCustom01" style={{ width: "10%" }} noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Largo</Form.Label>
                        <Form.Control
                            type="number"
                            value={LargoRoller}
                            style={{ textAlign: "center" }}
                            onChange={(e) => { setLargoRoller(e.target.value) }}
                            placeholder="Largo"
                            isValid={isValid}
                        />
                    </Form.Group>
                    <Form.Group as={Col} md="1" style={{ width: "11%" }} controlId="validationCustom01" noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Posicion</Form.Label>
                        <Form.Select as={Col} md="2" aria-label="Default select example" onChange={(e) => { setAdlAtr(e.target.value) }} value={AdlAtr}>
                            <option style={{ textAlign: "center" }} value=""></option>
                            <option style={{ textAlign: "center" }} value="Adl">Adelante</option>
                            <option style={{ textAlign: "center" }} value="Atr">Atras</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationCustom01" noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Lado Cadena</Form.Label>
                        <Form.Select as={Col} md="2" aria-label="Default select example" onChange={(e) => { setIzqDer(e.target.value) }} value={IzqDer}>
                            <option style={{ textAlign: "center" }} value=""></option>
                            <option style={{ textAlign: "center" }} value="Izq">Izquierda</option>
                            <option style={{ textAlign: "center" }} value="Der">Derecha</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="1" controlId="validationCustom01" noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >Caño</Form.Label>
                        <Form.Select as={Col} md="1" aria-label="Default select example" onChange={(e) => { setCanoRoller(e.target.value) }} value={CanoRoller}>
                            <option value=""></option>
                            <option style={{ textAlign: "center" }} value="30">30</option>
                            <option style={{ textAlign: "center" }} value="38">38</option>
                            <option style={{ textAlign: "center" }} value="43">43</option>
                            <option style={{ textAlign: "center" }} value="45">45</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="2" controlId="validationCustom01">
                        <Form.Check
                            style={{ marginLeft: "5em", marginTop: "2em", transform: 'scale(1.2)' }}// prettier-ignore
                            type="switch"
                            checked={motorizada}
                            onChange={(e) => { setMotorizada(e.target.checked); console.log(motorizada) }}
                            id="custom-switch"
                            label="Motorizada"
                        />
                    </Form.Group>
                </Row>
            </>
        )
    };






    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        setValidated(true);
    };


    function BorrarCor(id) {
        console.log(id);
        const nuevasCortinas = Cortinas.filter(cortina => cortina.Id !== id);
        setCortinas(nuevasCortinas);
    }

    function CrearNuevaVenta() {

        const precioFinalInt = parseInt({ Precio }.Precio, 10);
        if (DataCli && Object.keys(DataCli).length === 0) {
            setAlertaClienteNotSelecc(true)
            setTimeout(() => {
                setAlertaClienteNotSelecc(false);
            }, 8000);
        } else {
            console.log(DataCli)

            if (DataCli.id) {
                const requestOptionsVenta = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            "IdCliente": DataCli.id,
                            "PrecioFinal": precioFinalInt,
                            "Obra": {Obra}.Obra
                        }
                    )
                };
                fetch("/Ventas", requestOptionsVenta)
                    .then(response => response.json())
                    .then(result => {
                        console.log(result)
                        setVentaCreada(true)
                        AgregarCortinasRollers(result.id)
                        setTimeout(() => {
                            setVentaCreada(false);
                        }, 8000);
                    });

            } else {
                console.log(DataCli)
                //Creo el Cliente antes de la venta
                const IdRutParse = parseInt(DataCli.Rut.RutCliN, 10);
                const IdTelParse = parseInt(DataCli.Tel, 10);

                /*console.log(DataCli.Rut.RutCliN)
                console.log(DataCli.Name.NombreCliN)
                console.log(DataCli.Tel.TelefonoCliN)
                console.log(DataCli.Direcc.DireccCliN)*/

                const requestOptionsCliente = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            "rut": IdRutParse,
                            "Nombre": DataCli.Name.NombreCliN,
                            "NumeroTelefono": DataCli.Tel.TelefonoCliN,
                            "direccion": DataCli.Direcc.DireccCliN
                        }
                    )
                };

                fetch('/Cliente', requestOptionsCliente)
                    .then(response => response.json())
                    .then(result => {
                        const requestOptionsVenta = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(
                                {
                                    "IdCliente": result.id,
                                    "PrecioFinal": precioFinalInt,
                                    "Obra": {Obra}.Obra
                                }
                            )
                        };
                        fetch("/Ventas", requestOptionsVenta)
                            .then(response => response.json())
                            .then(result => {
                                console.log(result)
                                setVentaCreada(true)
                                AgregarCortinasRollers(result.id)
                                setTimeout(() => {
                                    setVentaCreada(false);
                                }, 8000);
                            });
                    });
            }

        }
    }

    async function AgregarCortinasRollers(idVenta) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        // Usar Promise.all para enviar todas las Cortinas en paralelo y esperar su finalización
        await Promise.all(Cortinas.map(async (Cor) => {
            const bodyData = {
                "Alto": Cor.largoRoller,
                "Ancho": Cor.ancho,
                "Ambiente": Cor.Ambiente,
                "motorizada": Cor.motorizada,
                "IdTipoTela": Cor.tela.id,
                "cadenaMetalica": false,
                "Tubo": Cor.Cano,
                "Posicion": Cor.posicion,
                "LadoCadena": Cor.ladoC
            };
            requestOptions.body = JSON.stringify(bodyData);
            fetch("http://"+{urlIP}.urlIP+":8085/Cortinas/Roller", requestOptions)
                .then(response => response.json())
                .then(result => {
                    console.log(result)
                    AgregarCortinaRollerAVenta(result.id, idVenta);
                });
        }));
    }

    function AgregarCortinaRollerAVenta(cortinaid, idVenta) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
        const IdcorParse = parseInt(cortinaid, 10);
        const IdVentParse = parseInt(idVenta, 10);
        const url = "http://"+{urlIP}.urlIP+":8085/Ventas/" + IdcorParse + "/" + IdVentParse
        console.log(url)
        fetch("http://"+{urlIP}.urlIP+":8085/Ventas/" + IdcorParse + "/" + IdVentParse, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
            });
    }


    const CrearAmbiente = () => {
        const nuevoAmbiente = {
            Nombre: NombreNuevoAmbiente
        };
        const nombreRepetido = Ambientes.some(ambiente => ambiente.Nombre === NombreNuevoAmbiente);
        if (!nombreRepetido) {
            setAmbientes([...Ambientes, nuevoAmbiente]);
            setNuevoNombreAmbiente("");
        } else {
            setAmbienteIgual(true);
            setTimeout(() => {
                setAmbienteIgual(false);
            }, 5000);
        }
    };

    const setCliCall = (NewData) => {
        const newDataWithObra = { ...NewData, obra: { Obra } };
        setDataCli(newDataWithObra)
        console.log(newDataWithObra)
        console.log(newDataWithObra.obra.Obra)
    }


    const AlertaCliente = () => {
        return (
            <>
                <Alert variant="danger">
                    Selecciona un cliente primero
                </Alert>
            </>
        )
    }
    const AlertaVentaCreada = () => {
        return (
            <>
                <Alert variant='success'>
                    VentaCreada
                </Alert>
            </>
        )
    }
    const AlertaAmbienteIgual = () => {
        return (
            <>
                <Alert variant='danger'>
                    Ambiente ya creado
                </Alert>
            </>
        )
    }


    return (
        <>
            <Form noValidate validated={validated} onSubmit={handleSubmit}>
                {AlertaClienteNotSelecc ? <AlertaCliente /> : null}
                {VentaCreada ? <AlertaVentaCreada /> : null}
                <SelecctCliente ClienteData={setCliCall} />
                <InputGroup>
                    <Form.Group as={Col} md="3" controlId="validationCustom01">
                        <h3>Obra</h3>
                        <Form.Control
                            type="text"
                            value={Obra}
                            onChange={(e) => setObra(e.target.value)}
                        />
                    </Form.Group>
                </InputGroup>
                <Row style={{ marginBottom: "2em" }}>
                    <h2>Crear Ambientes</h2>
                    <Form.Group as={Col} md="4" controlId="validationCustom01">
                        {AmbienteIgual ? <AlertaAmbienteIgual /> : null}
                        <InputGroup>
                            <InputGroup.Text>Nuevo Ambiente</InputGroup.Text>
                            <Form.Control
                                type="text"
                                value={NombreNuevoAmbiente}
                                onChange={(e) => setNuevoNombreAmbiente(e.target.value)}
                            />
                            <Button style={{ marginLeft: "1em" }} onClick={CrearAmbiente}>Crear</Button>
                        </InputGroup>

                    </Form.Group>
                </Row>
                <Row>
                    <Tabs
                        defaultActiveKey="profile"
                        id="fill-tab-example"
                        as={Col}
                        className="mb-2"
                    >
                        <Tab eventKey="Roll" title="Roller">
                            {FormCortinaRoller()}
                            <Row style={{ marginTop: "1em" }}>
                                <Form.Group controlId="validationCustom01">
                                    <Button style={{ marginTop: "1em" }} type="submit" as={Col} md="1" onClick={AgregarRoller}>Agregar Roller</Button>
                                </Form.Group>
                            </Row>
                        </Tab>
                        <Tab eventKey="Tra" title="Tradicional">
                            {FormCortinaTradicional()}
                        </Tab>
                        <Tab eventKey="Pan" title="Panel">
                            Tab content for Panel
                        </Tab>
                    </Tabs>
                    <ListGroup as={Col} md="8">

                    </ListGroup>
                </Row>

            </Form>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Area</th>
                        <th>Tela</th>
                        <th>Ancho</th>
                        <th>Largo</th>
                        <th>Caño</th>
                        <th>Lado Cadena</th>
                        <th>Posicion</th>
                        <th>Motorizada</th>
                    </tr>
                </thead>
                <tbody>
                    {Cortinas.map((Cor, index) => (
                        <tr key={index} style={{ marginBottom: "1em" }}>
                            <td>{Cor.Ambiente}</td>
                            <td>{Cor.tela.Nombre}</td>
                            <td>{Cor.ancho}</td>
                            <td>{Cor.largoRoller}</td>
                            <td>{Cor.Cano}</td>
                            <td>{Cor.ladoC}</td>
                            <td>{Cor.posicion}</td>
                            {Cor.motorizada ? <td> Si</td> : <td>No</td>}
                            <td>
                                <Button type="submit" onClick={() => BorrarCor(Cor.Id)}>Borrar</Button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </Table>
            <Row>
                <Button type="submit" as={Col} md="1" onClick={() => CrearNuevaVenta()}>Crear Venta</Button>
            </Row>
        </>
    )
}
