import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { VentaView } from "../Componentes/VentaView";
import { useDispatch, useSelector } from "react-redux";
import { setCortinas, setVenta } from "../Features/VentaViewReucer.js";
import "../Routes/Css/VentasView.css"; // Ensure this CSS file contains your styles
import { selectVenta } from "../Features/VentaViewReucer";
export const Ventas = ({ IdVentaView }) => {
  const [isLoading, setIsLoading] = useState(false); // Estado de carga

  const tableRef = useRef(null);
  const dispatch = useDispatch();
  const [IdVenta, setIdVenta] = useState(null);
  const [SearchText, setSearchText] = useState("");
  const [Tamano, setTamano] = useState("1");
  const [Ventas, setVentas] = useState([]);
  const [VentasTotales, setVentasTotales] = useState([]);
  const [showModal, setShowModal] = useState(false); // State to manage modal visibility
  let lastDay = "";
  const UrlVentas = "http://localhost:8081/Ventas/Dto";
  const UrlVenta = "http://localhost:8081/Ventas/DtoVentaCor/";
  const VentaSelector = useSelector(selectVenta);
  const setVentaView = async (Venta) => {
    if (Venta.IdVenata != null) {
      setShowModal(true); // Abre el modal inmediatamente
      setIsLoading(true); // Activa el estado de carga

      try {
        const res = await fetch(UrlVenta + Venta.IdVenata);
        const data = await res.json();
        console.log("data", data);

        const dataSortRollers = data.rollers.sort(
          (a, b) => a.numeroCortina - b.numeroCortina
        );
        const dataSortTradicionales1pano = data.tradicionals.filter(
          (cor) => cor.panos === 1
        );
        const dataSortTradicionales2pano = data.tradicionals.filter(
          (cor) => cor.panos === 2
        );
        const dataRiel = data.rieles;

        const VentaCors = {
          Rollers: dataSortRollers,
          Tradicionales1P: dataSortTradicionales1pano,
          Tradicionales2P: dataSortTradicionales2pano,
          Rieles: dataRiel,
        };
        console.log("Venta", Venta);

        dispatch(setCortinas(VentaCors));
        dispatch(setVenta(Venta));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Desactiva el estado de carga cuando los datos se obtienen
      }
    }
  };

  const FetchVentas = async () => {
    try {
      const res = await fetch(UrlVentas);
      const data = await res.json();
      const sortedData = data.sort(
        (a, b) => new Date(b.FechaVenta) - new Date(a.FechaVenta)
      );
      setVentas(sortedData);
      setVentasTotales(sortedData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    FetchVentas();
  }, []);

  const MostrarDia = ({ Day }) => {
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0"); // Get day and pad with zero
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Get month and pad with zero
      return `${day}/${month}`; // Return formatted date
    };

    let Ok = false;
    if (lastDay !== Day) {
      Ok = true;
      lastDay = Day;
    }

    return (
      <>
        {Ok && (
          <div className="day-header">
            <h3>{formatDate(Day)}</h3>
          </div>
        )}
      </>
    );
  };

  const groupedVentas = Ventas.reduce((acc, venta) => {
    const dateKey = venta.FechaVenta.split("T")[0]; // Extrae la fecha
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push(venta);
    return acc;
  }, {});

  const FiltrarVentas = () => {
    if (SearchText.trim()) {
      const filtered = VentasTotales.filter((venta) =>
        venta.NombreCliente.toLowerCase().includes(SearchText.toLowerCase())
      );
      setVentas(filtered);
    } else {
      setVentas(VentasTotales);
    }
  };

  useEffect(() => {
    FiltrarVentas();
    lastDay = "";
  }, [SearchText]);

  const handleClose = () => {
    setShowModal(false);
    setIdVenta(null); // Reset selected venta
    setIsLoading(false); // Restablece el estado de carga
  };

  return (
    <div className="container">
      <Row style={{ marginTop: "80px" }}>
        <h1 className="title">VENTAS</h1>
      </Row>
        <Row>
            <Col></Col>
            <Col>
      <div className="search-container">
        <Form.Control
          type="text"
          value={SearchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Buscar por cliente"
          className="search-input"
        />
      </div>
      </Col>
      <Col>
        <h3 style={{textAlign:"center"}}>Tamaño</h3>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <button className="tamano" onClick={()=>{setTamano("")}}>Grande</button>
        <button className="tamano" onClick={()=>{setTamano("1")}}>Mediano</button>
        <button className="tamano" onClick={()=>{setTamano("2")}}>Chico</button>
        </div>
      </Col>
      </Row>

      <div>
        {Object.entries(groupedVentas).map(([date, ventasDelDia]) => {
          const sortedVentasDelDia = ventasDelDia
            .sort((a, b) => new Date(a.FechaVenta) - new Date(b.FechaVenta))
            .reverse();

          return (
            <React.Fragment key={date}>
              <MostrarDia Day={date} />
              {sortedVentasDelDia.map((Ven) => (
                <div
                    className={`venta-card${Tamano} shadow-sm p-3 mb-4 bg-white rounded`}
                  onClick={() => setVentaView(Ven)}
                  key={Ven.IdVenata}
                >
                  <Row className="align-items-center">
                    <Col md={7}>
                      <div style={{fontSize:"26px"}} className="fw-bold">{Ven.NombreCliente}</div>
                      <div className="text-muted">{Ven.Obra && Ven.Obra}</div>
                    </Col>
                    <Col className="text-center">
                      <div className="fw-bold">Rollers</div>
                      <div>{Ven.CantidadaRollers || 0}</div>
                    </Col>
                    <Col className="text-center">
                      <div className="fw-bold">Rieles</div>
                      <div>{Ven.CantidadaRieles || 0}</div>
                    </Col>
                    <Col className="text-center">
                      <div className="fw-bold">Tradicionales</div>
                      <div>{Ven.CantidadaTradicionales || 0}</div>
                    </Col>
                  </Row>
                </div>
              ))}
            </React.Fragment>
          );
        })}
      </div>

      <Modal
        show={showModal}
        onHide={handleClose}
        dialogClassName="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ textAlign: "center", width: "100%" }}>
          {isLoading ? null
          :<>
            Detalle de la Venta
            </>
          }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isLoading ? (
            <div className="text-center">
            <div
              className="spinner-border"
              role="status"
              style={{ width: "4rem", height: "4rem" }} // Cambia el tamaño aquí
            >
              <span className="visually-hidden">Cargando...</span>
            </div>
          </div>
          
          ) : (
            <VentaView />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Volver
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
