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
import { FormRollers } from "./Forms/FormRollers";
import { EditarCortina } from "./EditarCortina";

export const VentaView = () => {
  const tableRef = useRef(null);
  const input = tableRef.current;
  const [loading, setloading] = useState(true);
  const [loadingAct, setloadingAct] = useState(false);
  const [IdVenta, setIdVenta] = useState(null);
  const [SearchText, setSearchText] = useState("");
  const [Ventas, setVentas] = useState([]);
  const [NumeroCor, setNumeroCor] = useState(false);
  const [ComentarioVenta, setComentarioVenta] = useState("");
  const [showModal, setShowModal] = useState(false);
  const Cortinas = useSelector(selectCortinas);
  const CortinasRollers = Cortinas.Rollers;
  console.log("CortinasRollers", CortinasRollers);
  const CortinasTradicionales1pano = Cortinas.Tradicionales1P;
  const CortinasTradicionales2pano = Cortinas.Tradicionales2P;
  const CortinasTradi = [
    ...CortinasTradicionales1pano,
    ...CortinasTradicionales2pano,
  ];
  const Rieles = Cortinas.Rieles;
  const [loadingTable, setloadingTable] = useState(true);
  const [FilteredVentas, setFilteredVentas] = useState([]);
  const [open, setopen] = useState(false);
  const [openEdit, setopenEdit] = useState(false);
  const [IdCorEdit, setIdCorEdit] = useState(null);
  const [CortinaEdited, setCortrtinaEdited] = useState([]);
  const [CortrtinaTrtyEdited, setCortrtinaTrtyEdited] = useState([]);
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

  const handleShow = (Cor) => {
    setCortrtinaTrtyEdited(Cor);
    setShowModal(true);
  };
  const ShowModalCallB = () => {
    setCortrtinaEdited(null);
    setShowModal(true);
  };
  const handleClose = () => setShowModal(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
        await FetchVentaCortinas();
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
  const CreateETicket = async () => {
    const RequestOptions = {
      headers: { "Content-Type": "application/json" },
      method:"POST"
    };
    const dtoTick = {
      tipoDocumento: 3,
      documento: "47395795",
      nombre_fantasia: "Santiago Israel",
      itemTicket: [],
    };
    CortinasRollers.forEach(element => {
      const ItemTick = {
        cantidad: 1,
        concepto:"Roller "+element.colorTela+element.nombreTela+"medidas "+element.anchoAfuerAfuera+"X"+element.altoCortina ,
        precio: 100,
        indicador_facturacion: 3,
      }
      dtoTick.itemTicket.push(ItemTick)
    });
    console.log(JSON.stringify(dtoTick))
    RequestOptions.body = JSON.stringify(dtoTick);
    try {
      console.log("entro");
      const response = await fetch(
        "http://localhost:8085/print/ETicket",
        RequestOptions
      );
      console.log(response);
    } catch (e) {}
  };

  const EditCor = () => {
    setopenEdit(true);
    setCortrtinaEdited(CortrtinaTrtyEdited);
    handleClose();
  };

  useEffect(() => {
    FetchVentaCortinas();
  }, [IdVenta]);

  const blobToBase64 = (blob) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]); // Retorna solo la parte Base64
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob); // Lee el blob como Data URL
    });
  };

  const PrintNode = async (pdfBase64) => {
    const apiKey = "kv9za48VObUEOGQaYKt6AwPt2SihkOiwj3T0sL_bFe4"; // Replace with your actual API key
    const printerId = 73714764; // Replace with your actual Printer ID

    const data = {
      printerId: printerId,
      title: "Mi Documento PDF",
      contentType: "pdf_base64",
      content: pdfBase64, // The base64 string of the PDF
      source: "Aplicación React",
    };

    try {
      const response = await fetch("https://api.printnode.com/printjobs", {
        method: "POST",
        headers: {
          Authorization: `Basic ${btoa(apiKey + ":")}`, // API key in Base64
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Error al enviar el trabajo de impresión");
      }

      const result = await response.json();
      console.log("Trabajo de impresión enviado correctamente:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
    const base64PDF = await blobToBase64(blob);
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

  const PrintNodeFunction = async (
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
    const base64PDF = await blobToBase64(blob);

    PrintNode(base64PDF);
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
      <Modal
        open={showModal}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
            <h2>Cortina</h2>
          </div>

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
                </tr>
              </thead>
              <tbody>
                <tr key={CortrtinaTrtyEdited.idCortina}>
                  <td>Roller</td>
                  <td>{CortrtinaTrtyEdited.numeroCortina}</td>
                  <td>{CortrtinaTrtyEdited.ambiente}</td>
                  <td>{CortrtinaTrtyEdited.nombreTela}</td>
                  <td>{CortrtinaTrtyEdited.colorTela}</td>
                  <td>{CortrtinaTrtyEdited.anchoAfuerAfuera}</td>
                  <td>{CortrtinaTrtyEdited.anchoCortina}</td>
                  <td>{CortrtinaTrtyEdited.anchoCaño}</td>
                  <td>{CortrtinaTrtyEdited.cano}</td>
                  <td>{CortrtinaTrtyEdited.altoCortina}</td>
                  <td>{CortrtinaTrtyEdited.altoTela}</td>
                  <td>1</td>
                  <td>{CortrtinaTrtyEdited.cadena}</td>
                  <td>{CortrtinaTrtyEdited.ladoCadena}</td>
                  <td>{CortrtinaTrtyEdited.posicion}</td>
                </tr>
              </tbody>
            </Table>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={() => EditCor()}>
                Editar
              </Button>
              <Button variant="success" onClick={() => alert("Ticket Clicked")}>
                Ticket
              </Button>
            </div>
          </>
        </Box>
      </Modal>

      {/*<div style={buttonStyle}>
                            <PDFDownloadLink document={<TicketCortina Venta={VentaImp} Cortina={CortinaCor} NumeroCor={false} />} fileName='Pdf'>
                                <Button variant="primary">Ticket</Button>
                            </PDFDownloa
                            dLink>
  </div>*/}
      {CortinaEdited.idCortina ? (
        <EditarCortina
          callBackCancel={ShowModalCallB}
          cortinaEdited={CortinaEdited}
        />
      ) : (
        <>
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
                  </tr>
                </thead>
                <tbody>
                  {CortinasRollers.map((Cor) => (
                    <tr key={Cor.idCortina} onClick={() => handleShow(Cor)}>
                      <td>Roller</td>
                      <td>{Cor.numeroCortina}</td>
                      <td>{Cor.ambiente}</td>
                      <td>{Cor.nombreTela}</td>
                      <td>{Cor.colorTela}</td>
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
                              document={
                                <TicketCortina Venta={Ven} Cortina={Cor} />
                              }
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
                              document={
                                <TicketCortina Venta={Ven} Cortina={Cor} />
                              }
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
                              document={
                                <TicketCortina Venta={Ven} Cortina={Cor} />
                              }
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
              <FormRollers />
            </>
          ) : (
            <Row className="justify-content-center">
              <Col className="text-center my-2">
                {" "}
                <Button
                  style={{ width: "80px", height: "50px", fontSize: "10px" }}
                  variant="secondary"
                  onClick={CreateETicket}
                >
                  E-Ticket
                </Button>
              </Col>
              <Col className="text-center my-2">
                <Button
                  variant="primary"
                  onClick={() => {
                    PrintNodeFunction(
                      Ven,
                      CortinasRollers,
                      CortinasTradicionales1pano,
                      false
                    );
                  }}
                  className="w-auto"
                >
                  Tickets automatico
                </Button>
              </Col>
              <Col className="text-center my-2"></Col>
            </Row>
          )}

          {AgregarRollerBool ? null : (
            <Row className="justify-content-center">
              <Col style={{ width: "100%" }} className="text-center my-2">
                {loadingpdf ? (
                  <Loading tipo="Ticket" />
                ) : (
                  <Button
                    variant="primary"
                    style={{ width: "250px", fontSize: "18px" }}
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
                  <>
                    <Row
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        marginLeft: "2em",
                      }}
                    >
                      <Col>
                        <Form.Label style={{ fontSize: "20px" }}>
                          Numero Cortina
                        </Form.Label>
                        <Form.Check
                          style={{ transform: 'scale(1.2)'}} // prettier-ignore
                          type="switch"
                          checked={NumeroCor}
                          onChange={(e) => {
                            setNumeroCor(e.target.checked);
                          }}
                          className="w-auto"
                          id="custom-switch"
                        />
                      </Col>
                      <Col>
                        <Button
                          variant="primary"
                          onClick={() => {
                            downloadTicket(
                              Ven,
                              CortinasRollers,
                              CortinasTradicionales1pano,
                              NumeroCor
                            );
                          }}
                          className="w-auto"
                        >
                          Tickets
                        </Button>
                      </Col>
                    </Row>
                  </>
                )}
              </Col>
            </Row>
          )}
        </>
      )}
    </>
  );
};
