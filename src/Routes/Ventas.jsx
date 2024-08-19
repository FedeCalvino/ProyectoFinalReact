import React from 'react'
import { useState, useEffect, useRef } from 'react';
import { Table, Button } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Accordion from 'react-bootstrap/Accordion';
import { Loading } from '../Componentes/Loading';
import { PDFDownloadLink,pdf } from '@react-pdf/renderer';
import { PDFTela } from '../Componentes/PDFTela';
import { PDFNumero } from '../Componentes/PDFNumero';
import { forEach } from 'lodash';
import { TicketsCortinas } from '../Componentes/TicketsCortinas';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { TicketCortina } from '../Componentes/TicketCortina';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';



export const Ventas = ({ IdVentaView }) => {


    const tableRef = useRef(null);
    const input = tableRef.current;
    const [loading, setloading] = useState(true)
    const [loadingAct, setloadingAct] = useState(false)
    const [IdVenta, setIdVenta] = useState(null)
    const [SearchText, setSearchText] = useState("")
    const [Ventas, setVentas] = useState([])
    const [VentasTotales, setVentasTotales] = useState([])
    const [Cortinas, setCortinas] = useState([])
    const [loadingTable, setloadingTable] = useState(true)
    const [FilteredVentas, setFilteredVentas] = useState([])
    const [open, setopen] = useState(false)
    const [IdCorEdit, setIdCorEdit] = useState(null)
    const [CortinaEdited, setCortrtinaEdited] = useState([])
    const [OrderBy, setOrderBy] = useState("Num")
    const [loadingTicket, setloadingTicket] = useState(false)
    const [loadingpdf, setloadingpdf] = useState(false)
    const [TiposTelas, SetTiposTelas] = useState([])

    const [Telas, setTelas] = useState([])

    //datos de cortina a agregar
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

    const [AgregarRollerBool, SetAgregarRollerBool] = useState(false)

    const [TelasDelTipo, SetTelasDelTipo] = useState([])


    const [selectedColorRoler, setselectedColorRoler] = useState('')

  
        const UrlVentas = "/Ventas/DtoVentaCor/NoInstalado"
        const UrlVenta = "/Ventas/DtoVentaCor/"
        const UrlInstalada = "/Ventas/Instalado/"
        const UrlTelas = "/TipoTela"
        const UrlAddCor = "/Cortinas/Roller/Add"
        const UrlEditCor = "/Cortinas/Edit"
   
/*
    const UrlTelas = "http://20.84.121.133:8085/TipoTela";
    const UrlVentas = "http://20.84.121.133:8085/Ventas/DtoVentaCor/NoInstalado"
    const UrlVenta = "http://20.84.121.133:8085/Ventas/DtoVentaCor/"
    const UrlInstalada = "http://20.84.121.133:8085/Ventas/Instalado/"
    const UrlEditCor = "http://20.84.121.133:8085/Cortinas"
*/
    function MostrarVenta(venta) {
        setIdVenta(venta.IdVenata)
        if (venta.IdVenata !== IdVenta)
            CancelarAddCor()
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

    const FetchVentas = async () => {
        try {
            const res = await fetch(UrlVentas)
            const data = await res.json()
            console.log("data", data)
            setVentas(data);
            setVentasTotales(data)
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    };

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
    useEffect(() => {
        OrderCor();
    }, [OrderBy]);

    const OrderCor = () => {
        console.log("Sort")
        if (OrderBy === "Num") {
            const dataSort = Cortinas.sort((a, b) => a.numeroCortina - b.numeroCortina)
            setCortinas(dataSort)
        } else {
            const dataSort = Cortinas.sort((a, b) => {
                // Comparar por nombreTela
                const nameComparison = a.nombreTela.localeCompare(b.nombreTela);
                if (nameComparison !== 0) return nameComparison;

                // Comparar por colorTela si nombreTela es igual
                const colorComparison = a.colorTela.localeCompare(b.colorTela);
                if (colorComparison !== 0) return colorComparison;

                // Comparar por altoCortina si nombreTela y colorTela son iguales
                return a.altoCortina - b.altoCortina;
            });
            setCortinas(dataSort)
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log("entr")
                await FetchVentas();
                await FetchTelas()
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
                const dataSort = data.sort((a, b) => a.numeroCortina - b.numeroCortina)
                setCortinas(dataSort);
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

    const SetInstaladaModal = () => {
        setopen(true)
    }

    const SetInstalada = async () => {

        setloadingTable(true)
        try {
            const res = await fetch(UrlInstalada + IdVenta, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Specify the content type
                },
            });

            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }

        } catch (error) {
            console.log(error);
        } finally {
            setloadingTable(false)
            setopen(false)
            FetchVentas()
        }

    }

    const ConfirmEdit = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(CortinaEdited)
        };

        const url = `${UrlEditCor}/${IdCorEdit}`;

        console.log("URL de solicitud:", url);
        console.log("Datos a actualizar:", CortinaEdited);

        try {
            const response = await fetch(url, requestOptions);

            if (response.ok) {
                console.error('Error en la solicitud PUT:', response.statusText);
                await FetchVentaCortinas(); // Asegúrate de que FetchVentaCortinas es una función asíncrona
                setIdCorEdit(null)
                return;
            }

        } catch (error) {
            console.error('Error en cortinas roller:', error);
        }
    };



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
    const CancelarAddCor = () => {
        SetAgregarRollerBool(false)
        SetselectedTelaRoler("")
        SetselectedTelaMostrarRoler("")
        SetselectedTelaRolerNombre("")
        SetselectedAreaRoler("")
        setAnchoRoller("")
        setLargoRoller("")
        setCanoRoller("")
        setIzqDer("")
        setAdlAtr("")
    }

    const Editar = (Cor) => {
        const Telafind = Telas.find(tela => tela.Nombre === Cor.nombreTela && tela.Descripcion === Cor.colorTela)
        console.log("Telafind", Telafind);
        console.log(Cor);
        setIdCorEdit(Cor.idCortina);
        const EditedCortina = {
            Ambiente: Cor.ambiente,
            ancho: Cor.anchoAfuerAfuera,
            alto: Cor.altoCortina,
            Posicion: Cor.posicion,
            LadoCadena: Cor.ladoCadena,
            cadena: Cor.Cadena,
            IdTipoTela: Telafind.id,
            Tubo: Cor.cano,
            motorizada: Cor.motorizada
        };
        console.log(EditedCortina);
        setCortrtinaEdited(EditedCortina);
    };
    const [Cadena, setCadena] = useState('')

    const AddCor = async (IdVenta) => {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }
        };

        const nuevaCortinaRoler = {
            Ambiente: selectedAreaRoler,
            IdTipoTela: selectedTelaRoler.Id,
            ancho: AnchoRoller,
            alto: LargoRoller,
            Posicion: AdlAtr,
            LadoCadena: IzqDer,
            cadena: Cadena,
            Tubo: CanoRoller,
            motorizada: motorizada
        }

        requestOptions.body = JSON.stringify(nuevaCortinaRoler);

        console.log(nuevaCortinaRoler)
        const url = UrlAddCor + "/" + IdVenta
        console.log(url)
        try {
            const response = await fetch(url, requestOptions);
            if (!response.ok) {
                console.error('Error en cortinas roller');
            } else {
                CancelarAddCor()
                FetchVentaCortinas()
            }

            console.log("result de cortina", result);
            //AgregarCortinaRollerAVenta(result.id, idVenta);
        } catch (error) {
            console.error('Error en cortinas roller:', error);
        }


    }

    const handleInputChange = (e, field) => {
        setCortrtinaEdited(prevState => ({
            ...prevState,
            [field]: e.target.value
        }));
    };


    const handleSelectChange = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        const selectedTela = Telas.find(tela => tela.Id === selectedValue);
        SetselectedTelaMostrarRoler(e.target.value)
        const SetTelas = Telas.filter(Tela => Tela.Nombre === selectedTela.Nombre);
        SetTelasDelTipo(SetTelas)
    };

    useEffect(() => {
        FetchVentaCortinas();
    }, [IdVenta]);

    if (loading) {
        return (
            <Loading tipo="all" />
        )
    }
    const downloadTicket = async (Ven, Cortinas, numeroCor) => {
        // Generar el documento PDF utilizando la función `pdf`
        setloadingTicket(true)
        const blob = await pdf(
            <TicketsCortinas Venta={Ven} Cortinas={Cortinas} NumeroCor={numeroCor} />
        ).toBlob();
        
        // Crear un enlace de descarga
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${Ven.NombreCliente} ETQ.pdf`;
        
        // Simular el clic en el enlace de descarga
        link.click();
        
        // Liberar la URL del objeto
        URL.revokeObjectURL(link.href);
        setloadingTicket(false)
    };

    const downloadPDF = async (Ven, Cortinas) => {
        // Generar el documento PDF utilizando la función `pdf`
        setloadingpdf(true)
        const blob = await pdf(
            <PDFTela Venta={Ven} Cortinas={Cortinas} />
        ).toBlob();
        
        // Crear un enlace de descarga
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `${Ven.NombreCliente} O.C.pdf`;
        
        // Simular el clic en el enlace de descarga
        link.click();
        
        // Liberar la URL del objeto
        URL.revokeObjectURL(link.href);
        setloadingpdf(false)
    };

    const renderEditableCell = (value, isEditable, onChange) => {
        return isEditable ? (
            <input style={{ width: "100px", textAlign: "center" }} type="text" value={value} onChange={onChange} />
        ) : (
            value
        );
    };

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
            <div>
                <Modal
                    open={open}
                    onClose={() => { setopen(false) }}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <div>
                            <h2>Venta Instalada</h2>
                        </div>
                        <div>
                            <Row className="justify-content-center mt-3">
                                <Col xs="auto">
                                    <Button onClick={SetInstalada} variant="success" className="w-auto">Aceptar</Button>
                                </Col>
                                <Col xs="auto">
                                    <Button onClick={() => { setopen(false) }} variant="danger" className="w-auto">Cancelar</Button>
                                </Col>
                            </Row>
                        </div>
                    </Box>
                </Modal>
            </div>
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
                                                            <th>Num</th>
                                                            <th>Ambiente</th>
                                                            <th>Tela</th>
                                                            <th>Color</th>
                                                            <th>Ancho AF-AF</th>
                                                            <th>Ancho tela</th>
                                                            <th>Ancho Caño</th>
                                                            <th>caño</th>
                                                            <th>Alto Cortina</th>
                                                            <th>Alto Tela</th>
                                                            <th>cant</th>
                                                            <th>Cadena</th>
                                                            <th>Lado Cadena</th>
                                                            <th>posicion</th>
                                                            <th>Comentarios</th>
                                                            <th>Opciones</th>

                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {Cortinas.map(Cor => (
                                                            <tr key={Cor.idCortina}>
                                                                <td>{Cor.numeroCortina}</td>
                                                                <td>{IdCorEdit === Cor.idCortina ? <input style={{ textAlign: "center" }} type="text" value={CortinaEdited.Ambiente} onChange={(e) => handleInputChange(e, 'Ambiente')} /> : Cor.ambiente}</td>
                                                                <td>{Cor.nombreTela}</td>
                                                                <td>{Cor.colorTela}</td>
                                                                <td>{renderEditableCell(CortinaEdited.ancho, IdCorEdit === Cor.idCortina, (e) => handleInputChange(e, 'ancho'))}</td>
                                                                <td>{Cor.anchoCortina}</td>
                                                                <td>{Cor.anchoCaño}</td>
                                                                <td>{IdCorEdit === Cor.idCortina ? <input style={{ width: "100px", textAlign: "center" }} type="text" value={CortinaEdited.Tubo} onChange={(e) => handleInputChange(e, 'Tubo')} /> : Cor.cano}</td>
                                                                <td>{IdCorEdit === Cor.idCortina ? <input style={{ width: "100px", textAlign: "center" }} type="text" value={CortinaEdited.alto} onChange={(e) => handleInputChange(e, 'alto')} /> : Cor.altoCortina}</td>
                                                                <td>{Cor.altoTela}</td>
                                                                <td>1</td>
                                                                <td>{Cor.cadena}</td>
                                                                <td>{IdCorEdit === Cor.idCortina ? <Form.Select as={Col} md="3" aria-label="Default select example" onChange={(e) => handleInputChange(e, 'LadoCadena')} value={CortinaEdited.LadoCadena}>
                                                                    <option style={{ textAlign: "center" }} value=""></option>
                                                                    <option style={{ textAlign: "center" }} value="Izq">Izq</option>
                                                                    <option style={{ textAlign: "center" }} value="Der">Der</option>
                                                                </Form.Select> : Cor.ladoCadena}</td>
                                                                <td>{IdCorEdit === Cor.idCortina ? <Form.Select as={Col} md="2" aria-label="Default select example" onChange={(e) => { handleInputChange(e, 'Posicion') }} value={CortinaEdited.Posicion}>
                                                                    <option style={{ textAlign: "center" }} value=""></option>
                                                                    <option style={{ textAlign: "center" }} value="Adl">Adelante</option>
                                                                    <option style={{ textAlign: "center" }} value="Atr">Atras</option>
                                                                </Form.Select> : Cor.posicion}</td>
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
                                                                        <Button
                                                                            variant="secondary"
                                                                            style={{ backgroundColor: 'transparent', color: '#6c757d' }} // Cambia el color y elimina el fondo gris
                                                                        >
                                                                            Comentario
                                                                        </Button>
                                                                    </OverlayTrigger>
                                                                </td>
                                                                {IdCorEdit === Cor.idCortina ? <td className="Butooneditable" onClick={() => ConfirmEdit(Cor)}>Confirmar</td>
                                                                    :
                                                                    <NavDropdown title="Opciones" id="basic-nav-dropdown" className="drop-custom">
                                                                        <NavDropdown.Item className="editable" onClick={() => Editar(Cor)}>Editar</NavDropdown.Item>
                                                                        <NavDropdown.Item as="div">
                                                                            <PDFDownloadLink document={<TicketCortina Venta={Ven} Cortina={Cor} />} fileName='Ticket'>
                                                                                <Button>Ticket</Button>
                                                                            </PDFDownloadLink>
                                                                        </NavDropdown.Item>
                                                                    </NavDropdown>}
                                                            </tr>
                                                        ))}

                                                    </tbody>
                                                </Table>
                                                {AgregarRollerBool ?
                                                    <>
                                                        <Row style={{ textAlign: "center" }}>
                                                            <Col>
                                                                <Form.Label style={{ textAlign: "center" }}>Ambiente</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Label style={{ textAlign: "center" }}>Tipo de Tela</Form.Label>
                                                            </Col>
                                                            <Col md="2">
                                                                <Form.Label style={{ textAlign: "center" }}>Color de Tela</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Label style={{ textAlign: "center" }}>Ancho</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Label style={{ textAlign: "center" }}>Largo</Form.Label>
                                                            </Col>
                                                            <Col md="1">
                                                                <Form.Label style={{ textAlign: "center" }}>Adl/Atr</Form.Label>
                                                            </Col>
                                                            <Col>
                                                                <Form.Label style={{ textAlign: "center" }}>Cadena</Form.Label>
                                                            </Col>
                                                            <Col md="1">
                                                                <Form.Label style={{ textAlign: "center" }}>Caño</Form.Label>
                                                            </Col>
                                                        </Row>
                                                        <Row>
                                                            <Col>
                                                                <Form.Control
                                                                    type="text"
                                                                    style={{ textAlign: "center" }}
                                                                    value={selectedAreaRoler}
                                                                    onChange={(e) => { SetselectedAreaRoler(e.target.value) }}
                                                                    placeholder="Ambiente"
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Select aria-label="Default select example" onChange={handleSelectChange} value={selectedTelaMostrarRoler}>
                                                                    <option style={{ textAlign: "center" }}></option>
                                                                    {TiposTelas.map(Tel => (
                                                                        <option style={{ textAlign: "center" }} value={Tel.id} key={Tel.id}>
                                                                            {Tel.Nombre}
                                                                        </option>
                                                                    ))}
                                                                </Form.Select>
                                                            </Col>
                                                            <Col md="2">
                                                                <Form.Select aria-label="Default select example" onChange={handleSelectTela} value={selectedColorRoler}>
                                                                    <option style={{ textAlign: "center" }}></option>
                                                                    {TelasDelTipo.map(Tel => (
                                                                        <option style={{ textAlign: "center" }} value={Tel.id} key={Tel.id}>
                                                                            {Tel.descripcion}
                                                                        </option>
                                                                    ))}
                                                                </Form.Select>
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    style={{ textAlign: "center" }}
                                                                    value={AnchoRoller}
                                                                    onChange={(e) => { setAnchoRoller(e.target.value) }}
                                                                    placeholder="Ancho"
                                                                />
                                                            </Col>
                                                            <Col>
                                                                <Form.Control
                                                                    type="number"
                                                                    style={{ textAlign: "center" }}
                                                                    value={LargoRoller}
                                                                    onChange={(e) => { setLargoRoller(e.target.value) }}
                                                                    placeholder="Largo"
                                                                />
                                                            </Col>
                                                            <Col md="1">
                                                                <Form.Select aria-label="Default select example" onChange={(e) => { setAdlAtr(e.target.value) }} value={AdlAtr}>
                                                                    <option style={{ textAlign: "center" }} value=""></option>
                                                                    <option style={{ textAlign: "center" }} value="Adl">Adl</option>
                                                                    <option style={{ textAlign: "center" }} value="Atr">Atr</option>
                                                                </Form.Select>
                                                            </Col>
                                                            <Col>
                                                                <Form.Select aria-label="Default select example" onChange={(e) => { setIzqDer(e.target.value) }} value={IzqDer}>
                                                                    <option style={{ textAlign: "center" }} value=""></option>
                                                                    <option style={{ textAlign: "center" }} value="Izq">Izquierda</option>
                                                                    <option style={{ textAlign: "center" }} value="Der">Derecha</option>
                                                                </Form.Select>
                                                            </Col>
                                                            <Col md="1">
                                                                <Form.Select aria-label="Default select example" onChange={(e) => { setCanoRoller(e.target.value) }} value={CanoRoller}>
                                                                    <option value=""></option>
                                                                    <option style={{ textAlign: "center" }} value="30">30</option>
                                                                    <option style={{ textAlign: "center" }} value="38">38</option>
                                                                    <option style={{ textAlign: "center" }} value="43">43</option>
                                                                    <option style={{ textAlign: "center" }} value="45">45</option>
                                                                </Form.Select>
                                                            </Col>
                                                        </Row>
                                                        <Row className="justify-content-center mt-4">
                                                            <Col md="3" className="d-flex justify-content-center">
                                                                <Button onClick={() => AddCor(Ven.IdVenata)} variant="success" className="w-auto">Agregar</Button>
                                                            </Col>
                                                            <Col md="3" className="d-flex justify-content-center">
                                                                <Button onClick={() => CancelarAddCor()} variant="danger" className="w-auto">Cancelar</Button>
                                                            </Col>
                                                        </Row>
                                                    </>
                                                    :
                                                    <Row className="justify-content-center">
                                                        <Col className="text-center my-2">
                                                        </Col>
                                                        <Col className="text-center my-2">
                                                            <Button type="submit" onClick={() => { SetAgregarRollerBool(true) }}>Agergar Cortina</Button>
                                                        </Col>
                                                        <Col className="text-center my-2">
                                                       
                                                        </Col>
                                                    </Row>
                                                }
                                                {AgregarRollerBool ? null :
                                                    <Row className="justify-content-center">
                                                        <Col className="text-center my-2">
                                                            {loadingpdf ? <Loading tipo="Ticket" /> : <Button variant="primary" onClick={()=>{downloadPDF(Ven,Cortinas)}} className="w-auto">PDF</Button>}
                                                        </Col>
                                                        <Col className="text-center my-2">
                                                            
                                                        </Col>
                                                        <Col className="text-center my-2">
                                                            {loadingTicket ? <Loading tipo="Ticket" /> : <Button variant="primary" onClick={()=>{downloadTicket(Ven,Cortinas,false)}} className="w-auto">Tickets S/Numero</Button>}
                                                        </Col>
                                                    </Row>}
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