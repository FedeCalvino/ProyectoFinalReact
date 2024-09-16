import React, { useEffect, useCallback } from "react";
import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { SlArrowUp } from "react-icons/sl";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { SelecctCliente } from "../Componentes/SelecctCliente";
import InputGroup from "react-bootstrap/InputGroup";
import Table from "react-bootstrap/Table";
import Alert from "react-bootstrap/Alert";
import { Loading } from "../Componentes/Loading";
import { Ventas } from "./Ventas";
import { ClienteSeleccted } from "../Componentes/ClienteSeleccted";
import Accordion from "react-bootstrap/Accordion";
import { FiArrowDownCircle } from "react-icons/fi";
import { GoCheckCircle } from "react-icons/go";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import { Toaster, toast } from "react-hot-toast";
import "./Css/CrearVenta.css";
import { TicketPreview } from "../Componentes/TicketPreview";
import { FormRieles } from "../Componentes/Forms/FormRieles";
import { useDispatch, useSelector } from 'react-redux';
import { TablaRieles } from "../Componentes/Tables/TablaRieles";
import { setTelasRollerFeature,setTelasTradicionalFeature } from "../Features/TelasReducer";
import { FormRollers } from "../Componentes/Forms/FormRollers";
import {selectCliente} from "../Features/ClienteReducer"
import { TableRollers } from "../Componentes/Tables/TableRollers";
import { FormTradicional } from "../Componentes/Forms/FormTradicional";
import { selectRieles,selectRollers,selectTradicional } from "../Features/CortinasReducer";
export const CrearVenta = () => {
  const dispatch = useDispatch()
  const [IdVentaView, setIdVentaView] = useState(null);
  const [loading, setloading] = useState(false);

  const DataCli = useSelector(selectCliente)
  const [Obra, setObra] = useState("");
  const [FechaInstalacion, setFechaInstalacion] = useState("");

  //alertas y validaciones
  const [ErrorCrear, setErrorCrear] = useState(false);

 //cortinas
 const Rieles = useSelector(selectRieles);
 const Rollers = useSelector(selectRollers)
 const Tradicionales = useSelector(selectTradicional)

  useEffect(() => {
    FetchTelas();
  }, []);

  const UrlCliente = "/Cliente";
  const UrlVentas = "/SaveVentas";
  const URLCortinaRollerVenta = "/Cortinas/Rollers/";
  const URLCortinaTradicionalVenta ="/Cortinas/Tradicionales/";
  const UrlTelas = "/TipoTela";


  const FetchTelas = async () => {
    try {
      const res = await fetch(UrlTelas);
      const data = await res.json();
      const tiposRoller = data.filter(
        (tipo, index, self) =>
          index === self.findIndex((t) => t.nombre === tipo.nombre && t.Color==1)
      );
      const tiposTradi = data.filter(
        (tipo, index, self) =>
          index === self.findIndex((t) => t.nombre === tipo.nombre && t.Color==2)
      );
      dispatch(setTelasRollerFeature(tiposRoller));
      dispatch(setTelasTradicionalFeature(tiposRoller));
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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

  async function crearVenta(idCliente, precioFinal, obra, fechaInstalacion) {
    const requestOptionsVenta = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        IdCliente: idCliente,
        PrecioFinal: precioFinal,
        Obra: obra,
        FechaInstalacion: fechaInstalacion,
      }),
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
        setloading(false);
      console.error("Error al crear la venta:", error);
      toast.error(`Error al crear la venta: ${error.message}`, {
        style: {
          background: "#333",
          color: "#fff",
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
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        rut: RutParse,
        Nombre: dataCli.Name,
        NumeroTelefono: TelParse,
        direccion: dataCli.Direcc,
        Tipo: dataCli.Tipo,
      }),
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
        setloading(false);
      console.error("Error al crear el cliente:", error);
      toast.error(`Error al crear el cliente: ${error.message}`, {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
      return null;
    }
  }

  async function CrearNuevaVenta() {
    setloading(true)
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

  const handleResult = (result) => {
    setloading(true);
    console.log("handle", result);
    AgregarCortinasRollers(result.id);
    AgregarCortinasTradicionales(result.id);
    setIdVentaView(result.id);
    /*setTimeout(() => {
            setVentaCreada(false);
        }, 8000);*/
    setloading(false);
  };

  async function AgregarCortinasRollers(idVenta) {

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(Rollers),
    };

    try {
      const response = await fetch(
        URLCortinaRollerVenta + idVenta,
        requestOptions
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("result de cortina", result);
      // AgregarCortinaRollerAVenta(result.id, idVenta);
    } catch (error) {
      console.error("Error en cortinas roller:", error);
      toast.error("Error al agregar cortinas roller", {
        style: {
          background: "#333",
          color: "#fff",
        },
      });
    }
  }

  const AlertaError = ({ Mensaje }) => {
    setloading(false);
    setErrorCrear(true);
    return (
      <>
        <Alert variant="danger">{Mensaje}</Alert>
      </>
    );
  };

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
        {ErrorCrear ? <AlertaError /> : null}
        {!DataCli.set ? (
          <SelecctCliente/>
        ) : (
          <>
            <ClienteSeleccted/>
            <Row>
              <Col md="12">
                <div
                  style={{
                    left: 0,
                    width: "100%",
                    padding: "10px",
                    marginTop:"20px",
                    backgroundColor: "white",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Adds a soft shadow
                    zIndex: 999, // Ensures it's on top
                    display: "flex",
                    justifyContent:"space-around",
                    alignItems: "center",
                    borderBottom: "2px solid #ccc",
                    fontSize: "20px",
                  }}
                >
                  <p
                    style={{
                      margin: "0 20px",
                      marginLeft: "20px",
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    <InputGroup
                      style={{ width: "100%", alignContent: "center" }}
                    >
                      <h3>Obra</h3>
                      <Form.Control
                        type="text"
                        value={Obra}
                        style={{
                          marginLeft: "10px",
                          textAlign: "center",
                          borderRadius: "10px",
                        }}
                        onChange={(e) => setObra(e.target.value)}
                      />
                    </InputGroup>
                  </p>
                  <p style={{ margin: "0 20px" }}>
                    <InputGroup
                      style={{ width: "100%", alignContent: "center" }}
                    >
                      <h3>Fecha Instalacion</h3>
                      <Form.Control
                        type="date"
                        value={FechaInstalacion}
                        style={{
                          marginLeft: "10px",
                          textAlign: "center",
                          borderRadius: "10px",
                        }}
                        onChange={(e) => setFechaInstalacion(e.target.value)}
                      />
                    </InputGroup>
                  </p>
                </div>
              </Col>
            </Row>

            <Row>
              <h2 style={{ textAlign: "center", marginTop: "10px" }}></h2>
              <Tabs
                defaultActiveKey="Roll"
                id="fill-tab-example"
                className="mb-2"
                fill 
              >
                <Tab eventKey="Roll" title="Roller">
                  <FormRollers/>
                </Tab>
                <Tab eventKey="Tra" title="Tradicional">
                <FormTradicional/>
                  
                </Tab>
                <Tab eventKey="Pan" title="Rieles">
                  <FormRieles/>
                </Tab>
              </Tabs>
            </Row>
            <div className="d-flex flex-row align-items-center justify-content-center">
                {loading ?
            <Loading tipo={"tab"} />
            :
            <Button style={{ width: "500px", height: "50px",marginRight:"20px",marginBottom:"40px" }} onClick={CrearNuevaVenta}>
                Crear Venta
            </Button>
                }
            </div>
          </>
        )}
      </>
    );
  }
  if (IdVentaView) {
    return <Ventas />;
  }
};
