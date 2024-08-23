import React, { useEffect, useCallback } from 'react'
import { useState,useRef } from 'react';
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
import { ClienteSeleccted } from '../Componentes/ClienteSeleccted';
import Accordion from 'react-bootstrap/Accordion';
import { LuArrowUpCircle } from "react-icons/lu";
import { FiArrowDownCircle } from "react-icons/fi";
import { GoCheckCircle } from "react-icons/go";
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import { Toaster ,toast} from 'react-hot-toast';
import "./Css/CrearVenta.css"


export const CrearVenta = () => {
    const [RollerTradicional,setRollerTradicional] = useState("Roller")

    const [IdVentaView, setIdVentaView] = useState(null);
    const [MensajeAlert,setMensajeAlert] = useState("")

    const [NumAntes, setNumAntes] = useState(null)
    const [isValid, setisValid] = useState(null)
    const [loading, setloading] = useState(false)
    //Cliente selecc
    const [DataCli, setDataCli] = useState(null);
    const [Obra, setObra] = useState('')
    const [FechaInstalacion, setFechaInstalacion] = useState('')

    //alertas y validaciones
    const [validated, setValidated] = useState(false);
    const [AlertaClienteNotSelecc, setAlertaClienteNotSelecc] = useState(false);
    const [AlertaCorAdd, setAlertaCorAdd] = useState(false);
    const [ErrorCrear, setErrorCrear] = useState(false);
    const [AmbienteIgual, setAmbienteIgual] = useState(false);
    const [BoolInfoVenta, setBoolInfoVenta] = useState(false);
    //Listas
    const [Telas, setTelas] = useState([])
    const [NombreNuevoAmbiente, setNuevoNombreAmbiente] = useState("")
    const [Ambientes, setAmbientes] = useState([])
    const [Cortinas, setCortinas] = useState([])

    const [TelasDelTipo, SetTelasDelTipo] = useState([])
    const [TiposTelas, SetTiposTelas] = useState([])

    const [CambioNumAntBool, setCambioNumAntBool] = useState(false)

    //Datos Cortina
    const [motorizada, setMotorizada] = useState(false)
    const [selectedTelaRoler, SetselectedTelaRoler] = useState([]);
    const [selectedTelaMostrarRoler, SetselectedTelaMostrarRoler] = useState([]);
    const [selectedTelaRolerNombre, SetselectedTelaRolerNombre] = useState("");
    const [selectedAreaRoler, SetselectedAreaRoler] = useState("");
    const [ComentarioCor, SetComentarioCor] = useState("");
    const [AnchoRoller, setAnchoRoller] = useState('')
    const [LargoRoller, setLargoRoller] = useState('')
    const [CanoRoller, setCanoRoller] = useState('')
    const [IzqDer, setIzqDer] = useState('')
    const [AdlAtr, setAdlAtr] = useState('')
    const [Cadena, setCadena] = useState('')
    const [NumeroCor, setNumeroCor] = useState(1)
    const [selectedColorRoler, setselectedColorRoler] = useState('')

    const [idCor, setidCor] = useState(0)

    //Tradicional
    const [AnchoTradicionalDer, setAnchoTradicionalDer] = useState('')

    const [AnchoTradicional, setAnchoTradicional] = useState('')
    const [LargoTradicional, setLargoTradicional] = useState('')
    const [Paños, setPaños] = useState('1')
    const [IzqDerTradicional, setIzqDerTradicional] = useState('')

    const [BastonesTradicional, setBastonesTradicional] = useState(false)
    const [TechoPared, setTechoPared] = useState('')
    const [motorizadaTradicional, setMotorizadaTradicional] = useState(false)

    useEffect(() => {
        FetchTelas();
    }, []);

    const UrlCliente = "/Cliente";
    const UrlVentas = "/SaveVentas";
    const URLCortinaVenta="/Cortinas/Rollers/";
    const UrlTelas = "/TipoTela"

    function AgregarTradicional(){
        
        const nuevaCortinaTradicional = {
            RollerTradicional:"Tradicional",
            Id: idCor,
            Ambiente: selectedAreaRoler,
            IdTipoTela: selectedTelaRoler.Id,
            ancho: AnchoTradicional,
            anchoDerecho: AnchoTradicionalDer,
            alto: LargoTradicional,
            Paños: Paños,
            IzqDer: Paños==="1" ? IzqDerTradicional:null,
            Bastones: BastonesTradicional,
            TechoPared: TechoPared,
            motorizada: motorizadaTradicional,
            TelaNombre: selectedTelaRoler.Nombre + selectedTelaRoler.descripcion,
            detalle: ComentarioCor,
            numeroCortina: NumeroCor
        };
    
    
        console.log(nuevaCortinaTradicional);
        
        setidCor(idCor + 1);
    
        // Crear una nueva lista de cortinas incluyendo la nueva cortina
        const nuevasCortinas = [...Cortinas, nuevaCortinaTradicional];
    
        // Ordenar las cortinas por numeroCortina
        let cortinasActualizadas = nuevasCortinas.sort((a, b) => a.numeroCortina - b.numeroCortina);
    
        // Ajustar los valores de numeroCortina
        cortinasActualizadas = cortinasActualizadas.map(cortina => {
            if (cortina.Id !== nuevaCortinaTradicional.Id && cortina.numeroCortina >= nuevaCortinaTradicional.numeroCortina) {
                return {
                    ...cortina,
                    numeroCortina: Number(cortina.numeroCortina) + 1
                };
            }
            return cortina;
        });
    
        setCortinas(cortinasActualizadas);


        if (NumAntes !== null) {
            setNumeroCor(Number(NumAntes));
            setNumAntes(null);
        }

        setNumeroCor(prevNumeroCor => prevNumeroCor + 1);
        setCambioNumAntBool(false);
        setAlertaCorAdd(true);
        setTimeout(() => {
            setAlertaCorAdd(false);
        }, 2000);
    }
    function AgregarRoller() {
        const nuevaCortinaRoler = {
            RollerTradicional:"Roller",
            Id: idCor,
            Ambiente: selectedAreaRoler,
            IdTipoTela: selectedTelaRoler.Id,
            ancho: AnchoRoller,
            alto: LargoRoller,
            Posicion: AdlAtr,
            LadoCadena: IzqDer,
            cadena: Cadena,
            Tubo: CanoRoller,
            motorizada: motorizada,
            TelaNombre: selectedTelaRoler.Nombre + selectedTelaRoler.descripcion,
            detalle: ComentarioCor,
            numeroCortina: NumeroCor
        };
    
    
        console.log(nuevaCortinaRoler);
        
        setidCor(idCor + 1);
    
        // Crear una nueva lista de cortinas incluyendo la nueva cortina
        const nuevasCortinas = [...Cortinas, nuevaCortinaRoler];
    
        // Ordenar las cortinas por numeroCortina
        let cortinasActualizadas = nuevasCortinas.sort((a, b) => a.numeroCortina - b.numeroCortina);
    
        // Ajustar los valores de numeroCortina
        cortinasActualizadas = cortinasActualizadas.map(cortina => {
            if (cortina.Id !== nuevaCortinaRoler.Id && cortina.numeroCortina >= nuevaCortinaRoler.numeroCortina) {
                return {
                    ...cortina,
                    numeroCortina: Number(cortina.numeroCortina) + 1
                };
            }
            return cortina;
        });
    
        setCortinas(cortinasActualizadas);


        if (NumAntes !== null) {
            setNumeroCor(Number(NumAntes));
            setNumAntes(null);
        }

        setNumeroCor(prevNumeroCor => prevNumeroCor + 1);
        setCambioNumAntBool(false);
        setAlertaCorAdd(true);
        setTimeout(() => {
            setAlertaCorAdd(false);
        }, 2000);
    }
    const handleSelectTela = (e) => {
        //console.log(e.target.value)
        const selectedValue = parseInt(e.target.value, 10);
        const selectedTela = Telas.find(tela => tela.Id === selectedValue);
        SetselectedTelaRoler(selectedTela)
        console.log(selectedTela)
        setselectedColorRoler(e.target.value)
        // Obtener el Nombre del objeto seleccionado
        selectedTela ? SetselectedTelaRolerNombre(selectedTela.Nombre) : "";
    };
    const setNuevoNumeroCor = (numero) =>{
        if(!CambioNumAntBool){
        const numero = NumeroCor
        setNumAntes(numero)
        console.log('se seteo el numero antes ',numero)
        console.log('numero',Number(numero))
        setNumeroCor(Number(numero))
        setCambioNumAntBool(true);
        }else{
            console.log('numero',Number(numero))
            setNumeroCor(Number(numero))
        }
    }

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
                <Row >
                <Form.Group as={Col} md="1" style={{ width: "11%" }} noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Ambiente</Form.Label>
                        <Form.Select as={Col} md="1" aria-label="Default select example" onChange={handleSelectAmbienteChange} value={selectedAreaRoler}>
                            <option style={{ textAlign: "center" }}></option>
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
                            <option style={{ textAlign: "center" }}></option>
                            {TiposTelas.map(Tel =>
                                <option style={{ textAlign: "center" }} value={Tel.id} key={Tel.id}>
                                    {Tel.Nombre}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="1" style={{ width: "11%" }} noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Color</Form.Label>
                        <Form.Select as={Col} md="1" aria-label="Default select example" onChange={handleSelectTela} value={selectedColorRoler}>
                            <option style={{ textAlign: "center" }}></option>
                            {TelasDelTipo.map(Tel =>
                                <option style={{ textAlign: "center" }} value={Tel.id} key={Tel.id}>
                                    {Tel.descripcion}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="1" controlId="validationCustom01">
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Paños</Form.Label>
                        <Form.Select
                         style={{ textAlign: "center" }}
                         value={Paños}
                         onChange={(e) => { setPaños(e.target.value) }}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                        </Form.Select>
                    </Form.Group>
                    { Paños==="1" ?
                    <Form.Group as={Col} md="1" style={{ width: "10%" }} noValidate>
                        <Form.Label style={{ alignItems: "center", justifyContent: "center", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Ancho</Form.Label>
                        <Form.Control
                            type="number"
                            style={{ textAlign: "center" }}
                            value={AnchoTradicional}
                            onChange={(e) => { setAnchoTradicional(e.target.value) }}
                            placeholder="Ancho"
                            isValid={isValid}
                        />
                    </Form.Group>
                    :   
                    <>
                    <Form.Group as={Col} md="1" style={{ width: "10%" }} noValidate>
                    <Form.Label style={{ alignItems: "center", justifyContent: "center", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Ancho Izquierda</Form.Label>
                    <Form.Control
                        type="number"
                        style={{ textAlign: "center" }}
                        value={AnchoTradicional}
                        onChange={(e) => { setAnchoTradicional(e.target.value) }}
                        placeholder="Ancho"
                        isValid={isValid}
                    />
                        </Form.Group>
                    <Form.Group as={Col} md="1" style={{ width: "10%" }} noValidate>
                        <Form.Label style={{ alignItems: "center", justifyContent: "center", display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Ancho Derecha</Form.Label>
                        <Form.Control
                            type="number"
                            style={{ textAlign: "center" }}
                            value={AnchoTradicionalDer}
                            onChange={(e) => { setAnchoTradicionalDer(e.target.value) }}
                            placeholder="Ancho"
                            isValid={isValid}
                        />
                    </Form.Group>
                    </>
                    }
                    <Form.Group style={{ width: "2%" }} as={Col} md="1" controlId="validationCustom01">
                        <p style={{ marginTop: "38px", marginRight: "10px" }}>X</p>
                    </Form.Group>
                    <Form.Group as={Col} md="1" controlId="validationCustom01" style={{ width: "10%" }} noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Largo</Form.Label>
                        <Form.Control
                            type="number"
                            value={LargoTradicional}
                            style={{ textAlign: "center" }}
                            onChange={(e) => { setLargoTradicional(e.target.value) }}
                            placeholder="Largo"
                            isValid={isValid}
                        />
                    </Form.Group>
                    {
                        Paños==="1" &&
                    <Form.Group as={Col} md="1" controlId="validationCustom01" noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Acumula</Form.Label>
                        <Form.Select style={{ width: 'auto'}} as={Col} md="1" aria-label="Default select example" onChange={(e) => { setIzqDerTradicional(e.target.value) }} value={IzqDerTradicional}>
                            <option style={{ textAlign: "center" }} value=""></option>
                            <option style={{ textAlign: "center" }} value="Izq">Izquierda</option>
                            <option style={{ textAlign: "center" }} value="Der">Derecha</option>
                        </Form.Select>
                    </Form.Group>
                    }
                    <Form.Group style={{marginLeft: "2em"}} as={Col} md="1" controlId="validationCustom01" noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Techo/Pared</Form.Label>
                        <Form.Select as={Col} md="1" aria-label="Default select example" onChange={(e) => { setTechoPared(e.target.value) }} value={TechoPared}>
                            <option style={{ textAlign: "center" }} value=""></option>
                            <option style={{ textAlign: "center" }} value="Techo">Techo</option>
                            <option style={{ textAlign: "center" }} value="Pared">Pared</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="1" controlId="validationCustom01">
                        <Form.Check
                            style={{ marginLeft: "2em", marginTop: "2em", transform: 'scale(1.2)' }}// prettier-ignore
                            type="switch"
                            checked={motorizadaTradicional}
                            onChange={(e) => { setMotorizadaTradicional(e.target.checked)}}
                            id="custom-switch"
                            label="Motorizada"
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                    <Form.Group controlId="validationCustom01" style={{marginLeft:"20px", width: "20%" }} noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Numero</Form.Label>
                        <Form.Control
                            type="number"
                            value={NumeroCor}
                            style={{ textAlign: "center" }}
                            placeholder="Numero"
                            onChange={(e) => { setNuevoNumeroCor(e.target.value) }}
                        />
                    </Form.Group> 
                    </Col>
                    <Col>
                        <Form.Group controlId="validationCustom01">
                            <FloatingLabel controlId="floatingTextarea2" label="Comentario">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px', border: '1px solid black', borderRadius: '5px' }}
                                    value={ComentarioCor}
                                    onChange={(e) => SetComentarioCor(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>

                    </Col>
                    <Col>
                    <Form.Group as={Col} md="1" controlId="validationCustom01">
                        <Form.Check
                            style={{ marginLeft: "5em", marginTop: "2em", transform: 'scale(1.2)' }}// prettier-ignore
                            type="switch"
                            checked={BastonesTradicional}
                            onChange={(e) => { setBastonesTradicional(e.target.checked)}}
                            id="custom-switch"
                            label="Bastones"
                        />
                    </Form.Group>
                    </Col>
                </Row>
            </>
        )
    };
    const DeleteAmbiente = (name) => {
        console.log(name);
        const NewAmb = Ambientes.filter(amb => amb.Nombre !== name);
        setAmbientes(NewAmb);
    }

    const handleSelectChange = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        const selectedTela = Telas.find(tela => tela.Id === selectedValue);

        SetselectedTelaMostrarRoler(e.target.value)
        const SetTelas = Telas.filter(Tela => Tela.Nombre === selectedTela.Nombre);
        SetTelas.sort((a, b) => a.Color.localeCompare(b.Color));
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
                            <option style={{ textAlign: "center" }}></option>
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
                            <option style={{ textAlign: "center" }}></option>
                            {TiposTelas.map(Tel =>
                                <option style={{ textAlign: "center" }} value={Tel.id} key={Tel.id}>
                                    {Tel.Nombre}
                                </option>
                            )}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group as={Col} md="1" style={{ width: "11%" }} noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Color</Form.Label>
                        <Form.Select as={Col} md="1" aria-label="Default select example" onChange={handleSelectTela} value={selectedColorRoler}>
                            <option style={{ textAlign: "center" }}></option>
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
                            style={{ marginLeft: "2em", marginTop: "2em", transform: 'scale(1.2)' }}// prettier-ignore
                            type="switch"
                            checked={motorizada}
                            onChange={(e) => { setMotorizada(e.target.checked); console.log(motorizada) }}
                            id="custom-switch"
                            label="Motorizada"
                        />
                    </Form.Group>
                </Row>
                <Row>
                    <Col>
                    <Form.Group controlId="validationCustom01" style={{marginLeft:"20px", width: "20%" }} noValidate>
                        <Form.Label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Numero</Form.Label>
                        <Form.Control
                            type="number"
                            value={NumeroCor}
                            style={{ textAlign: "center" }}
                            placeholder="Numero"
                            onChange={(e) => { setNuevoNumeroCor(e.target.value) }}
                        />
                    </Form.Group> 
                    </Col>
                    <Col>
                        <Form.Group controlId="validationCustom01">
                            <FloatingLabel controlId="floatingTextarea2" label="Comentario">
                                <Form.Control
                                    as="textarea"
                                    placeholder="Leave a comment here"
                                    style={{ height: '100px', border: '1px solid black', borderRadius: '5px' }}
                                    value={ComentarioCor}
                                    onChange={(e) => SetComentarioCor(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>

                    </Col>
                    <Col>
                    </Col>
                </Row>
            </>
        )
    };


    function BorrarCor(id) {
        console.log(id);
    
        // Encuentra la cortina que será eliminada
        const cortinaEliminada = Cortinas.find(cortina => cortina.Id === id);
    
        if (cortinaEliminada) {
            // Filtra las cortinas para eliminar la cortina con el id especificado
            const nuevasCortinas = Cortinas.filter(cortina => cortina.Id !== id);
    
            // Actualiza el NumeroCor de las cortinas restantes
            const cortinasActualizadas = nuevasCortinas.map(cortina => {
                if (cortina.numeroCortina > cortinaEliminada.numeroCortina) {
                    return {
                        ...cortina,
                        numeroCortina: cortina.numeroCortina - 1
                    };
                }
                return cortina;
            });
            setNumeroCor(prevNumeroCor => prevNumeroCor - 1);
            // Actualiza el estado
            setCortinas(cortinasActualizadas);
        }
    }

    function getErrorMessage(status) {
        switch (status) {
            case 400:
                return "Solicitud incorrecta. Verifique los datos enviados.";
            case 401:
                return "No autorizado. Inicie sesión nuevamente.";
            case 403:
                return "Prohibido. No tiene permiso para acceder a este recurso.";
            case 404:
                return "No encontrado. El recurso solicitado no existe.";
            case 500:
                return "Error del servidor. Inténtelo de nuevo más tarde.";
            default:
                return "Ocurrió un error desconocido. Inténtelo de nuevo.";
        }
    }
    async function CrearNuevaVenta() {
        let ok = true;
    
        console.log("data cli", DataCli);
    
        if (ok) {
        
    
            if (DataCli.id) {
                console.log("Cliente con id", DataCli);
                await crearVenta(DataCli.id, "eafae", Obra, FechaInstalacion);
            } else {
                console.log("Cliente sin id", DataCli);
                const clienteId = await crearCliente(DataCli);
                if (clienteId) {
                    await crearVenta(clienteId, 0, Obra, FechaInstalacion);
                }
            }
        }
    }

    async function crearVenta(idCliente, precioFinal, obra, fechaInstalacion) {
        const requestOptionsVenta = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "IdCliente": idCliente,
                "PrecioFinal": precioFinal,
                "Obra": obra,
                "FechaInstalacion": fechaInstalacion
            })
        };
    
        try {
            const response = await fetch(UrlVentas, requestOptionsVenta);
            
            if (!response.ok) {
                // Verifica el código de estado HTTP y lanza un error con un mensaje apropiado
                const errorMessage = getErrorMessage(response.status);
                throw new Error(errorMessage);
            }
    
            const result = await response.json();
            handleResult(result);
            console.log("Venta creada", result);
        } catch (error) {
            console.error("Error al crear la venta:", error);
            toast.error(`Error al crear la venta: ${error.message}`, {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
        } finally {
            setloading(false);
        }
    }

    async function crearCliente(dataCli) {
        const RutParse = parseInt(dataCli.Rut, 10);
        const TelParse = parseInt(dataCli.Tel, 10);
    
        const requestOptionsCliente = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "rut": RutParse,
                "Nombre": dataCli.Name,
                "NumeroTelefono": TelParse,
                "direccion": dataCli.Direcc,
                "Tipo": dataCli.Tipo
            })
        };
    
        try {
            const response = await fetch(UrlCliente, requestOptionsCliente);
            
            if (!response.ok) {
                // Verifica el código de estado HTTP y lanza un error con un mensaje apropiado
                const errorMessage = getErrorMessage(response.status);
                throw new Error(errorMessage);
            }
    
            const result = await response.json();
            console.log("Cliente creado", result);
            return result.id;
        } catch (error) {
            console.error("Error al crear el cliente:", error);
            toast.error(`Error al crear el cliente: ${error.message}`, {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
            return null;
        }
    }

   
/*
    function CrearNuevaVenta() {
        let ok = true;
    
        console.log("data cli", DataCli);
    
        if (ok) {
            //setloading(true);
    
            if (DataCli.id) {
                console.log("Cliente con id", DataCli);
                const requestOptionsVenta = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "IdCliente": DataCli.id,
                        "PrecioFinal": "eafae",
                        "Obra": Obra,
                        "FechaInstalacion": FechaInstalacion
                    })
                };
    
                fetch(UrlVentas, requestOptionsVenta)
                    .then(response => response.json())
                    .then(result => {
                        handleResult(result);
                        console.log("Venta?", result);
                    })
                    .catch(error => {
                        console.error("Error al crear la venta:", error);
                        toast.error("Error al crear la venta con el cliente existente", {
                            style: {
                                background: '#333',
                                color: '#fff',
                            },
                        });
                        toast.error("Error: "+ error, {
                            style: {
                                background: '#333',
                                color: '#fff',
                            },
                        });
                    })
                    .finally(() => setloading(false));
    
            } else {
                console.log("Cliente sin id", DataCli);
    
                const RutParse = parseInt(DataCli.Rut, 10);
                const TelParse = parseInt(DataCli.Tel, 10);
    
                const requestOptionsCliente = {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        "rut": RutParse,
                        "Nombre": DataCli.Name,
                        "NumeroTelefono": TelParse,
                        "direccion": DataCli.Direcc,
                        "Tipo": DataCli.Tipo
                    })
                };
    
                fetch(UrlCliente, requestOptionsCliente)
                    .then(response => response.json())
                    .then(result => {
                        console.log("Cliente creado", result);
                        const requestOptionsVenta = {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                "IdCliente": result.id,
                                "PrecioFinal": 0,
                                "Obra": Obra,
                                "FechaInstalacion": FechaInstalacion
                            })
                        };
                        return fetch(UrlVentas, requestOptionsVenta);
                    })
                    .then(response => response.json())
                    .then(result => {
                        handleResult(result);
                        console.log("Venta creada", result);
                    })
                    .catch(error => {
                        console.error("Error al crear el cliente o la venta:", error);
                        toast.error("Error al crear el cliente o la venta", {
                            style: {
                                background: '#333',
                                color: '#fff',
                            },
                        });
                        toast.error("Error: "+ error, {
                            style: {
                                background: '#333',
                                color: '#fff',
                            },
                        });
                    })
                    .finally(() => setloading(false));
            }
        }
    }
    
*/

    const handleResult = (result) => {
        setloading(true);
        console.log("handle", result);
        AgregarCortinasRollers(result.id);
        setIdVentaView(result.id);
        /*setTimeout(() => {
            setVentaCreada(false);
        }, 8000);*/
        setloading(false)
    };

    async function AgregarCortinasRollers(idVenta) {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(Cortinas)
        };
    
        try {
            const response = await fetch(URLCortinaVenta + idVenta, requestOptions);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            console.log("result de cortina", result);
            // AgregarCortinaRollerAVenta(result.id, idVenta);
        } catch (error) {
            console.error('Error en cortinas roller:', error);
            toast.error('Error al agregar cortinas roller', {
                style: {
                    background: '#333',
                    color: '#fff',
                },
            });
        }
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

    function DesSeleccionarCliente() {
        setDataCli(null)
    }

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
    const AlertaCorA = () => {
        return (
            <GoCheckCircle style={{ color: 'green' }} size={30} />
        );
    };
    const AlertaError = ({ Mensaje }) => {
        setloading(false)
        setErrorCrear(true)
        return (
            <>
                <Alert variant='danger'>
                    {Mensaje}
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
                    <div>
                    <Toaster
                        position="bottom-center"
                        reverseOrder={false}
                        toastOptions={{
                        style: {
                            zIndex: 9999, // Configuración global del z-index
                        },
                        }}
                    />
                    </div>
                {AlertaClienteNotSelecc ? <Alerta Mensaje="Selecciona un cliente primero" /> : null}
                {ErrorCrear ? <AlertaError /> : null}
                {DataCli === null ? <SelecctCliente ClienteData={setCliCall} /> : <>
                    <ClienteSeleccted ClienteData={DataCli} CallBackDesSelecc={DesSeleccionarCliente} />
                    {BoolInfoVenta ?
                        <>
                            <Row>
                                <Col md="12">
                                    <div style={{
                                        position: 'fixed',
                                        top: '140px',
                                        left: 0,
                                        width: '100%',
                                        padding: '10px',
                                        backgroundColor: 'white',
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', // Adds a soft shadow
                                        zIndex: 999, // Ensures it's on top
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        borderBottom: '2px solid #ccc',
                                        fontSize: "20px",
                                    }}>
                                        <p style={{ margin: '0 20px', marginLeft: "20px" }}>
                                            <span style={{ fontWeight: 'bold' }}>Obra:</span> {Obra}
                                        </p>
                                        <p style={{ margin: '0 20px' }}>
                                            <span style={{ fontWeight: 'bold' }}>Fecha Instalacion:</span> {FechaInstalacion}
                                        </p>
                                        <FiArrowDownCircle style={{ cursor: 'pointer', color: '#355CFC' }} onClick={() => (setBoolInfoVenta(false))} size={40} />
                                    </div>
                                </Col>

                            </Row>

                        </>
                        :
                        <>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: "140px"
                            }}>
                                <InputGroup style={{ width: '30%', alignContent: 'center' }}>
                                    <Form.Group style={{ textAlign: 'center', width: '100%' }} as={Col} md="3" controlId="validationCustom01">
                                        <h3>Obra</h3>
                                        <Form.Control
                                            type="text"
                                            value={Obra}
                                            style={{ textAlign: 'center' }}
                                            onChange={(e) => setObra(e.target.value)}
                                        />
                                    </Form.Group>
                                </InputGroup>
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                marginTop: '20px' // Adjust the top margin as needed
                            }}>
                                <InputGroup style={{ width: '30%', alignContent: 'center' }}>
                                    <Form.Group style={{ textAlign: 'center', width: '100%' }} as={Col} md="3" controlId="validationCustom01">
                                        <h3>Fecha Instalacion</h3>
                                        <Form.Control
                                            type="date"
                                            value={FechaInstalacion}
                                            style={{ textAlign: 'center' }}
                                            onChange={(e) => setFechaInstalacion(e.target.value)}
                                        />
                                    </Form.Group>
                                </InputGroup>
                            </div>
                            <Row style={{ marginBottom: "2em", display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Col md="1">

                                </Col>
                                <Col md="3">
                                    <h2 style={{ textAlign: 'center' }}>Crear Ambientes</h2>
                                    <InputGroup>
                                        <Form.Control
                                            type="text"
                                            style={{ textAlign: 'center' }}
                                            value={NombreNuevoAmbiente}
                                            onChange={(e) => setNuevoNombreAmbiente(e.target.value)}
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    CrearAmbiente();
                                                }
                                            }}
                                        />
                                        <Button style={{ marginLeft: "1em" }} onClick={CrearAmbiente}>Crear</Button>
                                    </InputGroup>
                                </Col>
                                <Col md="2">

                                </Col>
                                <Col md="6">
                                    <h2 style={{ textAlign: 'center' }}>Ambientes</h2>
                                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1em' }}>
                                        {Ambientes.map(amb => (
                                            <div key={amb.Nombre} style={{ border: '1px solid black', padding: '0.5em', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                <span style={{ fontSize: '1.2em', textAlign: 'left' }}>
                                                    {amb.Nombre}
                                                </span>
                                                <Button
                                                    size="sm"
                                                    onClick={() => DeleteAmbiente(amb.Nombre)}
                                                    style={{ marginLeft: 'auto' }}
                                                >
                                                    Eliminar
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </Col>
                                <Col md="1">

                                </Col>
                            </Row>
                            <Row style={{ justifyContent: 'center', marginTop: '10px', borderBottom: "3px solid black" }}>
                                <LuArrowUpCircle
                                    style={{ cursor: 'pointer', marginBottom: "10px", color: '#355CFC' }} // Changes cursor to pointer to indicate clickability
                                    onClick={() => setBoolInfoVenta(true)}
                                    size={40}

                                />
                            </Row>
                        </>
                    }
                    <Row>
                        <h2 style={{ textAlign: 'center', marginTop: BoolInfoVenta ? "160px" : "0" }}>Cortinas</h2>
                        <Tabs
                            defaultActiveKey="Roll"
                            id="fill-tab-example"
                            as={Col}
                            className="mb-2"
                        >
                            <Tab eventKey="Roll" title="Roller">
                                {FormCortinaRoller()}
                                <Row style={{ marginTop: "1em" }}>
                                    <Form.Group controlId="validationCustom01">
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center', // Align items vertically in the center
                                        }}>
                                            <Button
                                                style={{ justifyContent: "center", textAlign: "center", marginRight: "1em", height: "45px", marginLeft: "20px", width: "200px" }}
                                                type="submit"
                                                as={Col}
                                                md="auto" // Adjust width based on content or requirement
                                                onClick={AgregarRoller}
                                            >
                                                Agregar Roller
                                            </Button>
                                            {AlertaCorAdd && <AlertaCorA />}
                                        </div>
                                    </Form.Group>
                                </Row>
                            </Tab>
                            <Tab eventKey="Tra" title="Tradicional">
                                {FormCortinaTradicional()}
                                <Row style={{ marginTop: "1em" }}>
                                    <Form.Group controlId="validationCustom01">
                                        <div style={{
                                            display: 'flex',
                                            alignItems: 'center', // Align items vertically in the center
                                        }}>
                                            <Button
                                                style={{ justifyContent: "center", textAlign: "center", marginRight: "1em", height: "45px", marginLeft: "20px", width: "200px" }}
                                                type="submit"
                                                as={Col}
                                                md="auto" // Adjust width based on content or requirement
                                                onClick={AgregarTradicional}
                                            >
                                                Agregar Tradicional
                                            </Button>
                                            {AlertaCorAdd && <AlertaCorA />}
                                        </div>
                                    </Form.Group>
                                </Row>
                            </Tab>
                            <Tab eventKey="Pan" title="Panel">
                                Tab content for Panel
                            </Tab>
                        </Tabs>
                    </Row>
                    <Row className="button-row">
                        <Col>
                            <Button className="custom-button3" onClick={() => { setRollerTradicional("Roller") }}>Rollers</Button>
                        </Col>
                        <Col>
                            <Button className="custom-button3" onClick={() => { setRollerTradicional("Tradicional") }}>Tradicional</Button>
                        </Col>
                    </Row>
                    { RollerTradicional==="Roller" &&
                        <Table responsive>
                            <thead>
                                <tr>
                                    <th>Numero</th>
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
                                     Cor.RollerTradicional==="Roller" && (
                                    <tr key={index} style={{ marginBottom: "1em" }}>
                                        <td>{Cor.numeroCortina}</td>
                                        <td>{Cor.Ambiente}</td>
                                        <td>{Cor.TelaNombre}</td>
                                        <td>{Cor.ancho}</td>
                                        <td>{Cor.alto}</td>
                                        <td>{Cor.Tubo}</td>
                                        <td>{Cor.LadoCadena}</td>
                                        <td>{Cor.Posicion}</td>
                                        {Cor.motorizada ? <td> Si</td> : <td>No</td>}
                                        <td>
                                            <OverlayTrigger
                                                key='top'
                                                placement='top'
                                                overlay={
                                                    <Tooltip id={`tooltip-top`}>
                                                        {Cor.detalle}
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="secondary">Comentario</Button>
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <Button onClick={() => BorrarCor(Cor.Id)}>Borrar</Button>
                                        </td>
                                    </tr>
                                     )
                                ))}

                            </tbody>
                        </Table>
                    }
                    {
                        RollerTradicional==="Tradicional" &&
                        <Table responsive> 
                            <thead>
                                <tr>
                                    <th>Numero</th>
                                    <th>Area</th>
                                    <th>Tela</th>                                 
                                    <th>Ancho</th>
                                    <th>Ancho Derecho</th>
                                    <th>Largo</th>
                                    <th>Paños</th>
                                    <th>Lado Acumula</th>
                                    <th>Bastones</th>
                                    <th>Techo/Pared</th>
                                    <th>Motorizada</th>
                                    <th>Detalle</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Cortinas.map((Cor, index) => (
                                    <tr key={index} style={{ marginBottom: "1em" }}>
                                        <td>{Cor.numeroCortina}</td>
                                        <td>{Cor.Ambiente}</td>
                                        <td>{Cor.TelaNombre}</td>
                                        <td>{Cor.ancho}</td>
                                        <td>{Cor.anchoDerecho}</td>
                                        <td>{Cor.alto}</td>
                                        <td>{Cor.Paños}</td>
                                        <td>{Cor.IzqDer}</td>
                                        {Cor.Bastones ? <td> Si</td> : <td>No</td>}
                                        <td>{Cor.TechoPared}</td>
                                        {Cor.motorizada ? <td> Si</td> : <td>No</td>}
                                        <td>
                                            <OverlayTrigger
                                                key='top'
                                                placement='top'
                                                overlay={
                                                    <Tooltip id={`tooltip-top`}>
                                                        {Cor.detalle}
                                                    </Tooltip>
                                                }
                                            >
                                                <Button variant="secondary">Comentario</Button>
                                            </OverlayTrigger>
                                        </td>
                                        <td>
                                            <Button onClick={() => BorrarCor(Cor.Id)}>Borrar</Button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>
                        </Table>
                    }
                    <div className="d-flex flex-column align-items-center">
                        <Row className="w-100">
                            <Col className="d-flex justify-content-center">
                                <Button onClick={CrearNuevaVenta}>Crear Venta</Button>
                            </Col>
                        </Row>
                    </div>
                </>
                }
            </>
        )

    }
    if (IdVentaView) {
        return <Ventas />
    }

}
