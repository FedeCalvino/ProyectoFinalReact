import React, { useEffect, useCallback } from "react";
import { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import "../../Routes/Css/CrearVenta.css";
import { TicketPreview } from "../../Componentes/TicketPreview";
import { useDispatch, useSelector } from 'react-redux';
import {selectTelasTradicional} from "../../Features/TelasReducer"
import {addTradicional} from "../../Features/CortinasReducer"
import { TablaTradicional } from "../Tables/TablaTradicional";
import { GoCheckCircle } from "react-icons/go";
export const FormTradicional = () => {
    const [selectedTradicional,SetselectedTradicional]=useState([])
    const [AlertaCorAdd, setAlertaCorAdd] = useState(false);
    const [AnchoTradicionalDer, setAnchoTradicionalDer] = useState("");
    const [ComentarioCor, SetComentarioCor] = useState("");
    const [AnchoTradicional, setAnchoTradicional] = useState("");
    const [LargoTradicional, setLargoTradicional] = useState("");
    const [Paños, setPaños] = useState("1");
    const [IzqDerTradicional, setIzqDerTradicional] = useState("");
    const [selectedAreaRoler, SetselectedAreaRoler] = useState("");
    const [BastonesTradicional, setBastonesTradicional] = useState(false);
    const [Pinza, setPinza] = useState("");
    const [motorizadaTradicional, setMotorizadaTradicional] = useState(false);
    const dispatch = useDispatch()
    const TelaTradicional = useSelector(selectTelasTradicional)
    const [selectedTelaMostrarTradicional, SetselectedTelaMostrarTradicional] = useState([]);
    const [selectedColorRoler, setselectedColorRoler] = useState("");
    const [TelasDelTipoTradicional, SetTelasDelTipoTradicional] = useState([]);
    const handleSelectTelaTradicional = (e) => {
        //console.log(e.target.value)
        const selectedValue = parseInt(e.target.value, 10);
        const selectedTela = Telas.find((tela) => tela.Id === selectedValue);
        SetselectedTradicional(selectedTela);
        console.log(selectedTela);
        setselectedColorRoler(e.target.value);
        // Obtener el Nombre del objeto seleccionado
        selectedTela ? SetselectedTelaRolerNombre(selectedTela.Nombre) : "";
      };

      const AlertaCorA = () => {
        return <GoCheckCircle style={{ color: "green" }} size={30} />;
      };

    const handleSelectChangeTradicional = (e) => {
        const selectedValue = parseInt(e.target.value, 10);
        const selectedTela = TelaTradicional.find((tela) => tela.Id === selectedValue);
    
        SetselectedTelaMostrarTradicional(e.target.value);
        const SetTelasTradicional = Telas.filter(
          (Tela) => Tela.Nombre === selectedTela.Nombre
        );
        SetTelasTradicional.sort((a, b) => a.Descripcion.localeCompare(b.Descripcion));
        SetTelasDelTipoTradicional(SetTelasTradicional);
      };
      
    function AgregarTradicional() {

        const nuevaCortinaTradicional = {
          Ambiente: selectedAreaRoler,
          IdTipoTela: selectedTradicional.Id,
          ancho: AnchoTradicional,
          AnchoDerecho: AnchoTradicionalDer,
          alto: LargoTradicional,
          CantidadPanos: Paños,
          Acumula: Paños === "1" ? IzqDerTradicional : null,
          Pinza: Pinza,
          motorizada: motorizadaTradicional,
          TelaNombre: selectedTradicional.Nombre + " "+selectedTradicional.Descripcion,
          detalle: ComentarioCor,
        };
    /*
        console.log(nuevaCortinaTradicional);
    
        setidCor(idCor + 1);
    
        // Crear una nueva lista de cortinas incluyendo la nueva cortina
        const nuevasCortinas = [...Cortinas, nuevaCortinaTradicional];
    
        // Ordenar las cortinas por numeroCortina
        let cortinasActualizadas = nuevasCortinas.sort(
          (a, b) => a.numeroCortina - b.numeroCortina
        );
    
        // Ajustar los valores de numeroCortina
        cortinasActualizadas = cortinasActualizadas.map((cortina) => {
          if (
            cortina.Id !== nuevaCortinaTradicional.Id &&
            cortina.numeroCortina >= nuevaCortinaTradicional.numeroCortina
          ) {
            return {
              ...cortina,
              numeroCortina: Number(cortina.numeroCortina) + 1,
            };
          }
          return cortina;
        });
    
        setCortinas(cortinasActualizadas);
    
        if (NumAntes !== null) {
          setNumeroCor(Number(NumAntes));
          setNumAntes(null);
        }
    
        setNumeroCor((prevNumeroCor) => prevNumeroCor + 1);
        setCambioNumAntBool(false);*/
        dispatch(addTradicional(nuevaCortinaTradicional))
        setAlertaCorAdd(true);
        setTimeout(() => {
          setAlertaCorAdd(false);
        }, 2000);
      }

  return (
    <>
        <Row>
          <Form.Group as={Col} md="1" style={{ width: "11%" }} noValidate>
            <Form.Label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Ambiente
            </Form.Label>
            <Form.Control
              type="text"
              style={{ textAlign: "center" }}
              value={selectedAreaRoler}
              onChange={(e) => {
                SetselectedAreaRoler(e.target.value);
              }}
              placeholder="Ambiente"
            />
          </Form.Group>
          <Form.Group as={Col} md="1" style={{ width: "11%" }} noValidate>
            <Form.Label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Tela
            </Form.Label>
            <Form.Select
              as={Col}
              md="1"
              aria-label="Default select example"
              onChange={handleSelectChangeTradicional}
              value={selectedTelaMostrarTradicional}
            >
              <option style={{ textAlign: "center" }}></option>
              {TelaTradicional.map((Tel) => (
                <option
                  style={{ textAlign: "center" }}
                  value={Tel.id}
                  key={Tel.id}
                >
                  {Tel.Nombre}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="1" style={{ width: "11%" }} noValidate>
            <Form.Label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Color
            </Form.Label>
            <Form.Select
              as={Col}
              md="1"
              aria-label="Default select example"
              onChange={handleSelectTelaTradicional}
              value={selectedColorRoler}
            >
              <option style={{ textAlign: "center" }}></option>
              {TelasDelTipoTradicional.map((Tel) => (
                <option
                  style={{ textAlign: "center" }}
                  value={Tel.id}
                  key={Tel.id}
                >
                  {Tel.Descripcion}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
          <Form.Group as={Col} md="1" controlId="validationCustom01">
            <Form.Label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Paños
            </Form.Label>
            <Form.Select
              style={{ textAlign: "center" }}
              value={Paños}
              onChange={(e) => {
                setPaños(e.target.value);
              }}
            >
              <option value="1">1</option>
              <option value="2">2</option>
            </Form.Select>
          </Form.Group>
          {Paños === "1" ? (
            <Form.Group as={Col} md="1" style={{ width: "10%" }} noValidate>
              <Form.Label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Ancho
              </Form.Label>
              <Form.Control
                type="number"
                style={{ textAlign: "center" }}
                value={AnchoTradicional}
                onChange={(e) => {
                  setAnchoTradicional(e.target.value);
                }}
                placeholder="Ancho"
              />
            </Form.Group>
          ) : (
            <>
              <Form.Group as={Col} md="1" style={{ width: "10%" }} noValidate>
                <Form.Label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Ancho Izquierda
                </Form.Label>
                <Form.Control
                  type="number"
                  style={{ textAlign: "center" }}
                  value={AnchoTradicional}
                  onChange={(e) => {
                    setAnchoTradicional(e.target.value);
                  }}
                  placeholder="Ancho"
                />
              </Form.Group>
              <Form.Group as={Col} md="1" style={{ width: "10%" }} noValidate>
                <Form.Label
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Ancho Derecha
                </Form.Label>
                <Form.Control
                  type="number"
                  style={{ textAlign: "center" }}
                  value={AnchoTradicionalDer}
                  onChange={(e) => {
                    setAnchoTradicionalDer(e.target.value);
                  }}
                  placeholder="Ancho"
                />
              </Form.Group>
            </>
          )}
          <Form.Group
            style={{ width: "2%" }}
            as={Col}
            md="1"
            controlId="validationCustom01"
          >
            <p style={{ marginTop: "38px", marginRight: "10px" }}>X</p>
          </Form.Group>
          <Form.Group
            as={Col}
            md="1"
            controlId="validationCustom01"
            style={{ width: "10%" }}
            noValidate
          >
            <Form.Label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Largo
            </Form.Label>
            <Form.Control
              type="number"
              value={LargoTradicional}
              style={{ textAlign: "center" }}
              onChange={(e) => {
                setLargoTradicional(e.target.value);
              }}
              placeholder="Largo"
            />
          </Form.Group>
          {Paños === "1" && (
            <Form.Group
              as={Col}
              md="1"
              controlId="validationCustom01"
              noValidate
            >
              <Form.Label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                Acumula
              </Form.Label>
              <Form.Select
                style={{ width: "auto" }}
                as={Col}
                md="1"
                aria-label="Default select example"
                onChange={(e) => {
                  setIzqDerTradicional(e.target.value);
                }}
                value={IzqDerTradicional}
              >
                <option style={{ textAlign: "center" }} value=""></option>
                <option style={{ textAlign: "center" }} value="Izq">
                  Izquierda
                </option>
                <option style={{ textAlign: "center" }} value="Der">
                  Derecha
                </option>
              </Form.Select>
            </Form.Group>
          )}
          <Form.Group
            style={{ marginLeft: "2em" }}
            as={Col}
            md="2"
            controlId="validationCustom01"
            noValidate
          >
            <Form.Label
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Pinza
            </Form.Label>
            <Form.Select
              as={Col}
              md="1"
              aria-label="Default select example"
              onChange={(e) => {
                setPinza(e.target.value);
              }}
              value={Pinza}
            >
              <option style={{ textAlign: "center" }} value=""></option>
              <option style={{ textAlign: "center" }} value="Americana 3 pinzas">Americana 3 pinzas</option>
              <option style={{ textAlign: "center" }} value="Americana 2 pinzas">Americana 2 pinzas</option>
              <option style={{ textAlign: "center" }} value="Americana 1 pinzas">Americana 1 pinzas</option>
              <option style={{ textAlign: "center" }} value="Italiana">Italiana</option>s
              <option style={{ textAlign: "center" }} value="Plisadora">Plisadora</option>
              <option style={{ textAlign: "center" }} value="Ondas">Ondas</option>
              <option style={{ textAlign: "center" }} value="Italiana x 1.80">Italiana x 1.80</option>
              <option style={{ textAlign: "center" }} value="Italiana x 2.00">Italiana x 2.00</option>
              <option style={{ textAlign: "center" }} value="Italiana x 2.50">Italiana x 2.50</option>
            </Form.Select>
          </Form.Group>
        </Row>
        <Row>
          <Col>
        
          </Col>
          <Col>
            <Form.Group controlId="validationCustom01">
              <FloatingLabel controlId="floatingTextarea2" label="Comentario">
                <Form.Control
                  as="textarea"
                  placeholder="Leave a comment here"
                  style={{
                    height: "100px",
                    border: "1px solid black",
                    borderRadius: "5px",
                  }}
                  value={ComentarioCor}
                  onChange={(e) => SetComentarioCor(e.target.value)}
                />
              </FloatingLabel>
            </Form.Group>
          </Col>
          <Col>
          <Form.Group as={Col} md="1" controlId="validationCustom01">
            <Form.Check
              style={{ marginLeft: "2em", marginTop: "2em", transform: 'scale(1.2)' }} // prettier-ignore
              type="switch"
              checked={motorizadaTradicional}
              onChange={(e) => {
                setMotorizadaTradicional(e.target.checked);
              }}
              id="custom-switch"
              label="Motorizada"
            />
          </Form.Group>
          </Col>
        </Row>
        <Row style={{ marginTop: "1em" }}>
                    <Form.Group controlId="validationCustom01">
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center", // Align items vertically in the center
                        }}
                      >
                        <Button
                          style={{
                            justifyContent: "center",
                            textAlign: "center",
                            marginRight: "1em",
                            height: "45px",
                            marginLeft: "20px",
                            width: "200px",
                          }}
                          type="submit"
                          as={Col}
                          md="auto" // Adjust width based on content or requirement
                          onClick={AgregarTradicional}
                        >
                          Agregar Tradicional
                        </Button>
                        {AlertaCorAdd && <AlertaCorA/>}
                      </div>
                    </Form.Group>
                  </Row>
                  <Row>
                    <TablaTradicional/>
                  </Row>
      </>
  )
}
