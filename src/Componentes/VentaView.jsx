import React from "react";
import { useState, useEffect, useRef } from "react";
import { Table, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import { Loading } from "../Componentes/Loading";
import { PDFDownloadLink, pdf } from "@react-pdf/renderer";
import { PDFTela } from "../Componentes/PDFTela";
import { PDFNumero } from "../Componentes/PDFNumero";
import { forEach } from "lodash";
import { TicketsCortinas } from "../Componentes/TicketsCortinas";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import NavDropdown from "react-bootstrap/NavDropdown";
import { TicketCortina } from "../Componentes/TicketCortina";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { useSelector } from "react-redux";
import { selectCortinas, selectVenta } from "../Features/VentaViewReucer";

export const VentaView = () => {
  const tableRef = useRef(null);
  const input = tableRef.current;
  const [loading, setloading] = useState(true);
  const [loadingAct, setloadingAct] = useState(false);
  const [IdVenta, setIdVenta] = useState(null);
  const [SearchText, setSearchText] = useState("");
  const [Ventas, setVentas] = useState([]);

  const [ComentarioVenta, setComentarioVenta] = useState("");

  const Cortinas = useSelector(selectCortinas);

  const CortinasRollers = Cortinas.Rollers;
  const CortinasTradicionales1pano = Cortinas.Tradicionales1P;
  const CortinasTradicionales2pano = Cortinas.Tradicionales2P;
  const CortinasTradi = [...CortinasTradicionales1pano, ...CortinasTradicionales2pano];
  const Rieles = Cortinas.Rieles
  const [loadingTable, setloadingTable] = useState(true);
  const [FilteredVentas, setFilteredVentas] = useState([]);
  const [open, setopen] = useState(false);
  const [IdCorEdit, setIdCorEdit] = useState(null);
  const [CortinaEdited, setCortrtinaEdited] = useState([]);
  const [OrderBy, setOrderBy] = useState("Num");
  const [loadingTicket, setloadingTicket] = useState(false);
  const [loadingpdf, setloadingpdf] = useState(false);
  const [TiposTelas, SetTiposTelas] = useState([]);

  const [Telas, setTelas] = useState([]);

  const Ven = useSelector(selectVenta);
  console.log("Ven", Ven);
  //datos de cortina a agregar
  const [motorizada, setMotorizada] = useState(false);
  const [selectedTelaRoler, SetselectedTelaRoler] = useState([]);
  const [selectedTelaMostrarRoler, SetselectedTelaMostrarRoler] = useState([]);
  const [selectedTelaRolerNombre, SetselectedTelaRolerNombre] = useState("");
  const [selectedAreaRoler, SetselectedAreaRoler] = useState("");
  const [AnchoRoller, setAnchoRoller] = useState("");
  const [LargoRoller, setLargoRoller] = useState("");
  const [CanoRoller, setCanoRoller] = useState("");
  const [IzqDer, setIzqDer] = useState("");
  const [AdlAtr, setAdlAtr] = useState("");

  const [AgregarRollerBool, SetAgregarRollerBool] = useState(false);

  const [TelasDelTipo, SetTelasDelTipo] = useState([]);

  const UrlAddCor = "/Cortinas/Roller/Add";
  const UrlEditCor = "/Cortinas/Edit";

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };

  const SetInstalada = async () => {
    setloadingTable(true);
    try {
      const res = await fetch(UrlInstalada + IdVenta, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Specify the content type
        },
      });

      if (!res.ok) {
        throw new Error("Network response was not ok " + res.statusText);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setloadingTable(false);
      setopen(false);
      FetchVentas();
    }
  };
  const FetchVentaCortinas = () => {};

  const ConfirmEdit = async () => {
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(CortinaEdited),
    };

    const url = `${UrlEditCor}/${IdCorEdit}`;

    console.log("URL de solicitud:", url);
    console.log("Datos a actualizar:", CortinaEdited);

    try {
      const response = await fetch(url, requestOptions);

      if (response.ok) {
        console.error("Error en la solicitud PUT:", response.statusText);
        await FetchVentaCortinas(); // Asegúrate de que FetchVentaCortinas es una función asíncrona
        setIdCorEdit(null);
        return;
      }
    } catch (error) {
      console.error("Error en cortinas roller:", error);
    }
  };

  const CancelarAddCor = () => {
    SetAgregarRollerBool(false);
    SetselectedTelaRoler("");
    SetselectedTelaMostrarRoler("");
    SetselectedTelaRolerNombre("");
    SetselectedAreaRoler("");
    setAnchoRoller("");
    setLargoRoller("");
    setCanoRoller("");
    setIzqDer("");
    setAdlAtr("");
  };

  const Editar = (Cor) => {
    const Telafind = Telas.find(
      (tela) =>
        tela.Nombre === Cor.nombreTela && tela.Descripcion === Cor.colorTela
    );
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
      motorizada: Cor.motorizada,
    };
    console.log(EditedCortina);
    setCortrtinaEdited(EditedCortina);
  };
  const [Cadena, setCadena] = useState("");

  const AddCor = async (IdVenta) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
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
      motorizada: motorizada,
    };

    requestOptions.body = JSON.stringify(nuevaCortinaRoler);

    console.log(nuevaCortinaRoler);
    const url = UrlAddCor + "/" + IdVenta;
    console.log(url);
    try {
      const response = await fetch(url, requestOptions);
      if (!response.ok) {
        console.error("Error en cortinas roller");
      } else {
        CancelarAddCor();
        FetchVentaCortinas();
      }

      console.log("result de cortina", result);
      //AgregarCortinaRollerAVenta(result.id, idVenta);
    } catch (error) {
      console.error("Error en cortinas roller:", error);
    }
  };

  const handleInputChange = (e, field) => {
    setCortrtinaEdited((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleSelectChange = (e) => {
    const selectedValue = parseInt(e.target.value, 10);
    const selectedTela = Telas.find((tela) => tela.Id === selectedValue);
    SetselectedTelaMostrarRoler(e.target.value);
    const SetTelas = Telas.filter(
      (Tela) => Tela.Nombre === selectedTela.Nombre
    );
    SetTelasDelTipo(SetTelas);
  };

  useEffect(() => {
    FetchVentaCortinas();
  }, [IdVenta]);

  const downloadTicket = async (
    Ven,
    CortinasRoller,
    CortinasTradicional,
    numeroCor
  ) => {
    console.log("Ven", Ven);
    console.log("CortinasRoller", CortinasRoller);
    console.log("CortinasTradicional", CortinasTradicional);
    console.log("numeroCor", numeroCor);
    // Generar el documento PDF utilizando la función `pdf`
    setloadingTicket(true);
    const blob = await pdf(
      <TicketsCortinas
        Venta={Ven}
        Cortinasroller={CortinasRoller}
        Cortinastradicional={CortinasTradicional}
        NumeroCor={numeroCor}
      />
    ).toBlob();

    // Crear un enlace de descarga
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${Ven.NombreCliente} ETQ.pdf`;

    // Simular el clic en el enlace de descarga
    link.click();

    // Liberar la URL del objeto
    URL.revokeObjectURL(link.href);
    setloadingTicket(false);
  };

  const downloadPDF = async (Ven, CortinasRoller, CortinasTradicional) => {
    // Generar el documento PDF utilizando la función `pdf`
    setloadingpdf(true);
    console.log(ComentarioVenta);
    const blob = await pdf(
      <PDFTela
        Venta={Ven}
        Cortinasroller={CortinasRoller}
        Cortinastradicional={CortinasTradicional}
        ComentarioVen={ComentarioVenta}
        Rieles={Rieles}
      />
    ).toBlob();

    // Crear un enlace de descarga
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${Ven.NombreCliente} O.C.pdf`;

    // Simular el clic en el enlace de descarga
    link.click();

    // Liberar la URL del objeto
    URL.revokeObjectURL(link.href);
    setloadingpdf(false);
  };

  const renderEditableCell = (value, isEditable, onChange) => {
    return isEditable ? (
      <input
        style={{ width: "100px", textAlign: "center" }}
        type="text"
        value={value}
        onChange={onChange}
      />
    ) : (
      value
    );
  };

  return (
    <>
      <div>
        <Modal
          open={open}
          onClose={() => {
            setopen(false);
          }}
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
                  <Button
                    onClick={SetInstalada}
                    variant="success"
                    className="w-auto"
                  >
                    Aceptar
                  </Button>
                </Col>
                <Col xs="auto">
                  <Button
                    onClick={() => {
                      setopen(false);
                    }}
                    variant="danger"
                    className="w-auto"
                  >
                    Cancelar
                  </Button>
                </Col>
              </Row>
            </div>
          </Box>
        </Modal>
      </div>
        <h1>{Ven.NombreCliente}</h1>
      {CortinasRollers.length !== 0 ? (
        <>
          <Table responsive>
            <thead
              style={{
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <tr>
                <th>Tipo</th>
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
              {CortinasRollers.map((Cor) => (
                <tr key={Cor.idCortina}>
                  <td>Roller</td>
                  <td>{Cor.numeroCortina}</td>
                  <td>
                    {IdCorEdit === Cor.idCortina ? (
                      <input
                        style={{ textAlign: "center" }}
                        type="text"
                        value={CortinaEdited.Ambiente}
                        onChange={(e) => handleInputChange(e, "Ambiente")}
                      />
                    ) : (
                      Cor.ambiente
                    )}
                  </td>
                  <td>{Cor.nombreTela}</td>
                  <td>{Cor.colorTela}</td>
                  <td>
                    {IdCorEdit === Cor.idCortina ? (
                      <input
                        style={{ width: "100px", textAlign: "center" }}
                        type="text"
                        value={CortinaEdited.ancho}
                        onChange={(e) =>
                          handleInputChange(e, "anchoAfuerAfuera")
                        }
                      />
                    ) : (
                      Cor.anchoAfuerAfuera
                    )}
                  </td>
                  <td>{Cor.anchoCortina}</td>
                  <td>{Cor.anchoCaño}</td>
                  <td>
                    {IdCorEdit === Cor.idCortina ? (
                      <input
                        style={{ width: "100px", textAlign: "center" }}
                        type="text"
                        value={CortinaEdited.Tubo}
                        onChange={(e) => handleInputChange(e, "Tubo")}
                      />
                    ) : (
                      Cor.cano
                    )}
                  </td>
                  <td>
                    {IdCorEdit === Cor.idCortina ? (
                      <input
                        style={{ width: "100px", textAlign: "center" }}
                        type="text"
                        value={CortinaEdited.alto}
                        onChange={(e) => handleInputChange(e, "alto")}
                      />
                    ) : (
                      Cor.altoCortina
                    )}
                  </td>
                  <td>{Cor.altoTela}</td>
                  <td>1</td>
                  <td>{Cor.cadena}</td>
                  <td>
                    {IdCorEdit === Cor.idCortina ? (
                      <Form.Select
                        as={Col}
                        md="3"
                        aria-label="Default select example"
                        onChange={(e) => handleInputChange(e, "LadoCadena")}
                        value={CortinaEdited.LadoCadena}
                      >
                        <option
                          style={{ textAlign: "center" }}
                          value=""
                        ></option>
                        <option style={{ textAlign: "center" }} value="Izq">
                          Izq
                        </option>
                        <option style={{ textAlign: "center" }} value="Der">
                          Der
                        </option>
                      </Form.Select>
                    ) : (
                      Cor.ladoCadena
                    )}
                  </td>
                  <td>
                    {IdCorEdit === Cor.idCortina ? (
                      <Form.Select
                        as={Col}
                        md="2"
                        aria-label="Default select example"
                        onChange={(e) => {
                          handleInputChange(e, "Posicion");
                        }}
                        value={CortinaEdited.Posicion}
                      >
                        <option
                          style={{ textAlign: "center" }}
                          value=""
                        ></option>
                        <option style={{ textAlign: "center" }} value="Adl">
                          Adelante
                        </option>
                        <option style={{ textAlign: "center" }} value="Atr">
                          Atras
                        </option>
                      </Form.Select>
                    ) : (
                      Cor.posicion
                    )}
                  </td>
                  <td>
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-top`}>{Cor.detalle}</Tooltip>
                      }
                    >
                      <Button
                        variant="secondary"
                        style={{
                          backgroundColor: "transparent",
                          color: "#6c757d",
                        }} // Cambia el color y elimina el fondo gris
                      >
                        Comentario
                      </Button>
                    </OverlayTrigger>
                  </td>
                  {IdCorEdit === Cor.idCortina ? (
                    <td
                      className="Butooneditable"
                      onClick={() => ConfirmEdit(Cor)}
                    >
                      Confirmar
                    </td>
                  ) : (
                    <NavDropdown
                      title="Opciones"
                      id="basic-nav-dropdown"
                      className="drop-custom"
                    >
                      <NavDropdown.Item
                        className="editable"
                        onClick={() => Editar(Cor)}
                      >
                        Editar
                      </NavDropdown.Item>
                      <NavDropdown.Item as="div">
                        <PDFDownloadLink
                          document={<TicketCortina Venta={Ven} Cortina={Cor} />}
                          fileName="Ticket"
                        >
                          <Button>Ticket</Button>
                        </PDFDownloadLink>
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : null}
      {CortinasTradicionales1pano.length !== 0 ? (
        <>
          <Table responsive>
            <thead
              style={{
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <tr>
                <th>Tipo</th>
                <th>Numero</th>
                <th>Area</th>
                <th>Tela</th>
                <th>Color</th>
                <th>Paños</th>
                <th>Ancho</th>
                <th>Largo</th>
                <th>Lado Acumula</th>
                <th>Pinza</th>
                <th>Motorizada</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {CortinasTradicionales1pano.map((Cor) => (
                <tr key={Cor.idCortina}>
                  <td>Tradicional</td>
                  <td>{Cor.numeroCortina}</td>
                  <td>{Cor.ambiente}</td>
                  <td>{Cor.nombreTela}</td>
                  <td>{Cor.colorTela}</td>
                  <td>{Cor.panos}</td>
                  <td>{Cor.anchoCortina}</td>
                  <td>{Cor.altoCortina}</td>
                  <td>{Cor.acumula}</td>
                  <td>{Cor.pinza}</td>
                  {Cor.motorizada ? <td> Si</td> : <td>No</td>}
                  <td>
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-top`}>{Cor.detalle}</Tooltip>
                      }
                    >
                      <Button
                        variant="secondary"
                        style={{
                          backgroundColor: "transparent",
                          color: "#6c757d",
                        }} // Cambia el color y elimina el fondo gris
                      >
                        Comentario
                      </Button>
                    </OverlayTrigger>
                  </td>
                  {IdCorEdit === Cor.idCortina ? (
                    <td
                      className="Butooneditable"
                      onClick={() => ConfirmEdit(Cor)}
                    >
                      Confirmar
                    </td>
                  ) : (
                    <NavDropdown
                      title="Opciones"
                      id="basic-nav-dropdown"
                      className="drop-custom"
                    >
                      <NavDropdown.Item
                        className="editable"
                        onClick={() => Editar(Cor)}
                      >
                        Editar
                      </NavDropdown.Item>
                      <NavDropdown.Item as="div">
                        <PDFDownloadLink
                          document={<TicketCortina Venta={Ven} Cortina={Cor} />}
                          fileName="Ticket"
                        >
                          <Button>Ticket</Button>
                        </PDFDownloadLink>
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : null}
      {CortinasTradicionales2pano.length !== 0 ? (
        <>
          <Table responsive>
            <thead
              style={{
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <tr>
                <th>Tipo</th>
                <th>Numero</th>
                <th>Area</th>
                <th>Tela</th>
                <th>Color</th>
                <th>Paños</th>
                <th>Ancho Izq</th>
                <th>Ancho Der</th>
                <th>Largo</th>
                <th>Pinza</th>
                <th>Motorizada</th>
                <th>Detalle</th>
              </tr>
            </thead>
            <tbody>
              {CortinasTradicionales2pano.map((Cor) => (
                <tr key={Cor.idCortina}>
                  <td>Tradicional</td>
                  <td>{Cor.numeroCortina}</td>
                  <td>{Cor.ambiente}</td>
                  <td>{Cor.nombreTela}</td>
                  <td>{Cor.colorTela}</td>
                  <td>{Cor.panos}</td>
                  <td>{Cor.anchoCortina}</td>
                  <td>{Cor.anchoDerecho}</td>
                  <td>{Cor.altoCortina}</td>
                  <td>{Cor.pinza}</td>
                  {Cor.motorizada ? <td> Si</td> : <td>No</td>}
                  <td>
                    <OverlayTrigger
                      key="top"
                      placement="top"
                      overlay={
                        <Tooltip id={`tooltip-top`}>{Cor.detalle}</Tooltip>
                      }
                    >
                      <Button
                        variant="secondary"
                        style={{
                          backgroundColor: "transparent",
                          color: "#6c757d",
                        }} // Cambia el color y elimina el fondo gris
                      >
                        Comentario
                      </Button>
                    </OverlayTrigger>
                  </td>
                  {IdCorEdit === Cor.idCortina ? (
                    <td
                      className="Butooneditable"
                      onClick={() => ConfirmEdit(Cor)}
                    >
                      Confirmar
                    </td>
                  ) : (
                    <NavDropdown
                      title="Opciones"
                      id="basic-nav-dropdown"
                      className="drop-custom"
                    >
                      <NavDropdown.Item
                        className="editable"
                        onClick={() => Editar(Cor)}
                      >
                        Editar
                      </NavDropdown.Item>
                      <NavDropdown.Item as="div">
                        <PDFDownloadLink
                          document={<TicketCortina Venta={Ven} Cortina={Cor} />}
                          fileName="Ticket"
                        >
                          <Button>Ticket</Button>
                        </PDFDownloadLink>
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : null}
      {Rieles.length !== 0 ? (
        <>
          <Table responsive>
            <thead
              style={{
                justifyContent: "center",
                fontFamily: "Arial, sans-serif",
              }}
            >
              <tr>
                <th>Tipo</th>
                <th>Ambiente</th>
                <th>Ancho</th>
                <th>Tipo de Riel</th>
                <th>Accionamiento</th>
                <th>Armado</th>
                <th>Soportes</th>
                <th>Bastones</th>
              </tr>
            </thead>
            <tbody>
              {Rieles.map((Cor) => (
                <tr key={Cor.idCortina}>
                  <td>Rieles</td>
                  <td>{Cor.ambiente}</td>
                  <td>{Cor.ancho}</td>
                  <td>{Cor.tipo}</td>
                  <td>{Cor.acc}</td>
                  <td>{Cor.armado}</td>
                  <td>{Cor.soportes}</td>
                  <td>{Cor.bastones}</td>
                  {IdCorEdit === Cor.idCortina ? (
                    <td
                      className="Butooneditable"
                      onClick={() => ConfirmEdit(Cor)}
                    >
                      Confirmar
                    </td>
                  ) : (
                    <NavDropdown
                      title="Opciones"
                      id="basic-nav-dropdown"
                      className="drop-custom"
                    >
                      <NavDropdown.Item
                        className="editable"
                        onClick={() => Editar(Cor)}
                      >
                        Editar
                      </NavDropdown.Item>
                      <NavDropdown.Item as="div">
                        <PDFDownloadLink
                          document={<TicketCortina Venta={Ven} Cortina={Cor} />}
                          fileName="Ticket"
                        >
                          <Button>Ticket</Button>
                        </PDFDownloadLink>
                      </NavDropdown.Item>
                    </NavDropdown>
                  )}
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      ) : null}
      {AgregarRollerBool ? (
        <>
          <Row style={{ textAlign: "center" }}>
            <Col>
              <Form.Label style={{ textAlign: "center" }}>Ambiente</Form.Label>
            </Col>
            <Col>
              <Form.Label style={{ textAlign: "center" }}>
                Tipo de Tela
              </Form.Label>
            </Col>
            <Col md="2">
              <Form.Label style={{ textAlign: "center" }}>
                Color de Tela
              </Form.Label>
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
                onChange={(e) => {
                  SetselectedAreaRoler(e.target.value);
                }}
                placeholder="Ambiente"
              />
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                onChange={handleSelectChange}
                value={selectedTelaMostrarRoler}
              >
                <option style={{ textAlign: "center" }}></option>
                {TiposTelas.map((Tel) => (
                  <option
                    style={{ textAlign: "center" }}
                    value={Tel.id}
                    key={Tel.id}
                  >
                    {Tel.Nombre}
                  </option>
                ))}
              </Form.Select>
            </Col>
            <Col md="2">
              <Form.Select
                aria-label="Default select example"
                onChange={handleSelectTela}
                value={selectedColorRoler}
              >
                <option style={{ textAlign: "center" }}></option>
                {TelasDelTipo.map((Tel) => (
                  <option
                    style={{ textAlign: "center" }}
                    value={Tel.id}
                    key={Tel.id}
                  >
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
                onChange={(e) => {
                  setAnchoRoller(e.target.value);
                }}
                placeholder="Ancho"
              />
            </Col>
            <Col>
              <Form.Control
                type="number"
                style={{ textAlign: "center" }}
                value={LargoRoller}
                onChange={(e) => {
                  setLargoRoller(e.target.value);
                }}
                placeholder="Largo"
              />
            </Col>
            <Col md="1">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setAdlAtr(e.target.value);
                }}
                value={AdlAtr}
              >
                <option style={{ textAlign: "center" }} value=""></option>
                <option style={{ textAlign: "center" }} value="Adl">
                  Adl
                </option>
                <option style={{ textAlign: "center" }} value="Atr">
                  Atr
                </option>
              </Form.Select>
            </Col>
            <Col>
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setIzqDer(e.target.value);
                }}
                value={IzqDer}
              >
                <option style={{ textAlign: "center" }} value=""></option>
                <option style={{ textAlign: "center" }} value="Izq">
                  Izquierda
                </option>
                <option style={{ textAlign: "center" }} value="Der">
                  Derecha
                </option>
              </Form.Select>
            </Col>
            <Col md="1">
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => {
                  setCanoRoller(e.target.value);
                }}
                value={CanoRoller}
              >
                <option value=""></option>
                <option style={{ textAlign: "center" }} value="30">
                  30
                </option>
                <option style={{ textAlign: "center" }} value="38">
                  38
                </option>
                <option style={{ textAlign: "center" }} value="43">
                  43
                </option>
                <option style={{ textAlign: "center" }} value="45">
                  45
                </option>
              </Form.Select>
            </Col>
          </Row>
          <Row className="justify-content-center mt-4">
            <Col md="3" className="d-flex justify-content-center">
              <Button
                onClick={() => AddCor(Ven.IdVenata)}
                variant="success"
                className="w-auto"
              >
                Agregar
              </Button>
            </Col>
            <Col md="3" className="d-flex justify-content-center">
              <Button
                onClick={() => CancelarAddCor()}
                variant="danger"
                className="w-auto"
              >
                Cancelar
              </Button>
            </Col>
          </Row>
        </>
      ) : (
        <Row className="justify-content-center">
          <Col className="text-center my-2"></Col>
          <Col className="text-center my-2">
            <Button
              type="submit"
              onClick={() => {
                SetAgregarRollerBool(true);
              }}
            >
              Agergar Cortina
            </Button>
          </Col>
          <Col className="text-center my-2"></Col>
        </Row>
      )}

      {AgregarRollerBool ? null : (
        <Row className="justify-content-center">
          <Col className="text-center my-2">
            {loadingpdf ? (
              <Loading tipo="Ticket" />
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  downloadPDF(Ven, CortinasRollers, CortinasTradi);
                }}
                className="w-auto"
              >
                PDF
              </Button>
            )}
          </Col>
          <Col className="text-center my-2">
            <FloatingLabel
              controlId="floatingTextarea2"
              label="Comentario para PDF"
            >
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{
                  borderRadius: "5px",
                  overflow: "hidden", // Evita que aparezca una barra de desplazamiento
                }}
                value={ComentarioVenta}
                onChange={(e) => {
                  const lines = e.target.value.split("\n");
                  if (lines.length <= 3) {
                    setComentarioVenta(e.target.value);
                  } else {
                    // Si se exceden las 3 líneas, trunca el texto
                    setComentarioVenta(lines.slice(0, 3).join("\n"));
                  }
                }}
              />
            </FloatingLabel>
          </Col>
          <Col className="text-center my-2">
            {loadingTicket ? (
              <Loading tipo="Ticket" />
            ) : (
              <Button
                variant="primary"
                onClick={() => {
                  downloadTicket(
                    Ven,
                    CortinasRollers,
                    CortinasTradicionales1pano,
                    false
                  );
                }}
                className="w-auto"
              >
                Tickets S/Numero
              </Button>
            )}
          </Col>
        </Row>
      )}
    </>
  );
};
