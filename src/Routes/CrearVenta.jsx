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
import { Loading } from '../Componentes/Loading';
import { Ventas } from './Ventas';


export const CrearVenta = () => {
    const [IdVentaView, setIdVentaView] = useState(null);

    const [isValid, setisValid] = useState(null)
    const [loading, setloading] = useState(false)
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

    const [TelasDelTipo,SetTelasDelTipo] = useState([])
    const [TiposTelas,SetTiposTelas] = useState([])
    


    //Datos Cortina
    const [motorizada, setMotorizada] = useState(false)
    const [selectedTelaRoler, SetselectedTelaRoler] = useState([]);
    const [selectedTelaMostrarRoler, SetselectedTelaMostrarRoler] = useState([]);
    const [selectedTelaRolerNombre, SetselectedTelaRolerNombre] = useState("");
    const [selectedAreaRoler, SetselectedAreaRoler] = useState("");
    const [AnchoRoller, setAnchoRoller] = useState('')
    const [LargoRoller, setLargoRoller] = useState('')
    const [CanoRoller, setCanoRoller] = useState('')
    const [IzqDer, setIzqDer] = useState('')
    const [AdlAtr, setAdlAtr] = useState('')
    const [Cadena, setCadena] = useState('')

    const [selectedColorRoler, setselectedColorRoler] = useState('')

    const [idCor, setidCor] = useState(0)



    useEffect(() => {
        FetchTelas();
    }, []);

    const UrlTelas = "/TipoTela"

   //const UrlTelas = "http://localhost:8085/TipoTela"

    function AgregarRoller() {
        const nuevaCortinaRoler = {
            Id: idCor,
            Ambiente: { selectedAreaRoler }.selectedAreaRoler,
            tela: { id: selectedTelaRoler.Id, Nombre: selectedTelaRoler.Nombre,Color:selectedTelaRoler.descripcion },
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
    const handleSelectTela =(e)=>{
        //console.log(e.target.value)
        const selectedValue = parseInt(e.target.value, 10);
        const selectedTela = Telas.find(tela => tela.Id === selectedValue);
        SetselectedTelaRoler(selectedTela)
        console.log(selectedTela)
        setselectedColorRoler(e.target.value)
        // Obtener el Nombre del objeto seleccionado
        selectedTela ? SetselectedTelaRolerNombre(selectedTela.Nombre) : "";
    };

    const FetchTelas = async () => {
        try {
            const res = await fetch(UrlTelas)
            const data = await res.json()
            const tipos = data.filter((tipo, index, self) => 
            index === self.findIndex(t => t.nombre === tipo.nombre)
            );
            SetTiposTelas(tipos)
            setTelas(data);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    };
    if (loading) {
        return <div><Loading tipo="all" /></div>;
    }

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
        const selectedValue = parseInt(e.target.value, 10);
        const selectedTela = Telas.find(tela => tela.Id === selectedValue);
        SetselectedTelaMostrarRoler(e.target.value)
       const SetTelas = Telas.filter(Tela=>Tela.Nombre===selectedTela.Nombre);
       SetTelasDelTipo(SetTelas)
    };

    const handleSelectAmbienteChange = (e) => {
        SetselectedAreaRoler(e.target.value)
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
                        <Form.Select as={Col} md="1" aria-label="Default select example" onChange={handleSelectChange} 
                            value={selectedTelaMostrarRoler}>
                            <option style={{ textAlign: "center" }}>Tipo de Tela</option>
                            {TiposTelas.map(Tel =>
                                <option style={{ textAlign: "center" }} value={Tel.id} key={Tel.id}>
                                    {Tel.Nombre}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="1" style={{ width: "11%" }} noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Color</Form.Label>
                        <Form.Select as={Col} md="1" aria-label="Default select example" onChange={handleSelectTela}             value={selectedColorRoler}>
                            <option style={{ textAlign: "center" }}>Color</option>
                            {TelasDelTipo.map(Tel =>
                                <option style={{ textAlign: "center" }} value={Tel.id} key={Tel.id}>
                                    {Tel.descripcion}
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
                    <Form.Group as={Col} md="1" controlId="validationCustom01" noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Lado Cadena</Form.Label>
                        <Form.Select as={Col} md="1" aria-label="Default select example" onChange={(e) => { setIzqDer(e.target.value) }} value={IzqDer}>
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


    function BorrarCor(id) {
        console.log(id);
        const nuevasCortinas = Cortinas.filter(cortina => cortina.Id !== id);
        setCortinas(nuevasCortinas);
    }

    function CrearNuevaVenta() {
        let ok = true;

        console.log("data cli", DataCli)
        if (!DataCli || Object.keys(DataCli).length === 0) {
            ok = false;
            setAlertaClienteNotSelecc(true)
            setTimeout(() => {
                setAlertaClienteNotSelecc(false);
            }, 8000);
        }

        if (ok) {
            setloading(true)
            if (DataCli.id) {
                console.log("Cliente con id", DataCli)
                const requestOptionsVenta = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(
                        {
                            "IdCliente": DataCli.id,
                            "PrecioFinal": 0,
                            "Obra": { Obra }.Obra
                        }
                    )
                };
                fetch('/Ventas/Save', requestOptionsVenta)
                    .then(response => 
                        response.json()
                    )
                    .then(result => {
                        
                        handleResult(result)
                        console.log("Venta?", result)
                    });
            } else {
                console.log("Cliente sin id", DataCli)
                //Creo el Cliente antes de la venta

                const IdRutParse = parseInt(DataCli.Rut.RutCliN, 10);
                const IdTelParse = parseInt(DataCli.Tel, 10);

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

                fetch('/Cliente/SaveCli', requestOptionsCliente)
                    .then(response => {
                        console.log("response cliente", response)
                        return response.json()
                    })
                    .then(result => {
                                console.log("result", result);
                                const requestOptionsVenta = {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                        "IdCliente": result.id,
                                        "PrecioFinal": 0,
                                        "Obra": { Obra }.Obra
                                    })
                                };
                                fetch('/Ventas/Post', requestOptionsVenta)
                                    .then(response => {
                                        console.log("response venta", response)
                                        return response.json()
                                    })
                                    .then(result => {
                                        handleResult(result);
                                        /* setTimeout(() => {
                                            setVentaCreada(false);
                                        }, 8000);*/
                                    })
                                    .catch(error => {
                                        console.error('Error en la solicitud de ventas:', error);
                                        // Manejar el error de la solicitud de ventas aquí
                                    });
                            })
                            .catch(error => {
                                console.error('Error en la solicitud de cliente:', error);
                                // Manejar el error de la solicitud de cliente aquí
                            }
                            );
            }
        }
    }

    const handleResult = (result) => {
        console.log("handle",result);
        AgregarCortinasRollers(result.id);
        setIdVentaView(result.id);
        /*setTimeout(() => {
            setVentaCreada(false);
        }, 8000);*/
        setloading(false)
    };

    async function AgregarCortinasRollers(idVenta) {
        console.log("add cortina");
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };
    
        // Usar Promise.all para enviar todas las Cortinas en paralelo y esperar su finalización
        await Promise.all(Cortinas.map(async (Cor) => {
            const bodyData = {
                "alto": Cor.largoRoller,
                "ancho": Cor.ancho,
                "Ambiente": Cor.Ambiente,
                "motorizada": Cor.motorizada,
                "IdTipoTela": Cor.tela.id,
                "cadenaMetalica": false,
                "Tubo": Cor.Cano,
                "Posicion": Cor.posicion,
                "LadoCadena": Cor.ladoC
            };
            console.log("body", bodyData);
    
            requestOptions.body = JSON.stringify(bodyData);
    
            try {
                const response = await fetch('/Cortinas/Roller', requestOptions);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                console.log("result de cortina", result);
                AgregarCortinaRollerAVenta(result.id, idVenta);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Manejar el error según sea necesario
            }
        }));
    }

    function AgregarCortinaRollerAVenta(cortinaid, idVenta) {
        const IdcorParse = parseInt(cortinaid, 10);
        const IdVentParse = parseInt(idVenta, 10);
        
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        };
    
        fetch(`/Ventas/${IdcorParse}/${IdVentParse}`, requestOptions)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                console.log(result);
                // Aquí puedes manejar el resultado según sea necesario
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                // Manejar errores de red u otros errores aquí
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
        setDataCli(NewData)
        console.log(NewData)
    }


    const Alerta = ({ Mensaje }) => {
        return (
            <Alert variant="danger">
                {Mensaje}
            </Alert>
        );
    };
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

    if (!IdVentaView) {
        return (
            <>
                <Form noValidate validated={validated}>
                    {AlertaClienteNotSelecc ? <Alerta Mensaje="Selecciona un cliente primero" /> : null}
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
                    </Row>

                </Form>
                <Table responsive>
                    <thead>
                        <tr>
                            <th>Area</th>
                            <th>Tela</th>
                            <th>Color</th>
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
                                <td>{Cor.tela.Color}</td>
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
                <div className="d-flex flex-column align-items-center">
                    <Row className="w-100">
                        <Col className="d-flex justify-content-center">
                            <Button type="submit" onClick={CrearNuevaVenta}>Crear Venta</Button>
                        </Col>
                    </Row>
                </div>
            </>
        )
    }
    if (IdVentaView) {
        return <Ventas/>
    }

}
