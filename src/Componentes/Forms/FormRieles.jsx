import React, { useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import { useDispatch, useSelector } from "react-redux";
import { addRiel } from "../../Features/CortinasReducer"; 
import { TablaRieles } from "../Tables/TablaRieles";
import { GoCheckCircle } from "react-icons/go";
export const FormRieles = () => {
  const dispatch = useDispatch();
  const [Tipo, setTipo] = useState("");
  const [selectedAreaRoler, SetselectedAreaRoler] = useState("");
  const [Accionamiento, setAccionamiento] = useState("Manual");
  const [Ancho, setAncho] = useState("");
  const [Armado, setArmado] = useState("");
  const [Soportes, setSoportes] = useState("");
  const [Bastones, setBastones] = useState("");
  const [Rieles,setRieles] = useState([])
  
  const AgregarRiel = () => {
    const nuevoRiel = {
      Tipo: Tipo,
      Area: selectedAreaRoler,
      Accionamiento: Accionamiento,
      Ancho: Ancho,
      Armado: Armado,
      Soportes: Soportes,
      Bastones: Bastones,
    };
  
    // Creamos una nueva copia del estado con el nuevo Riel
    const nuevosRieles = [...Rieles, nuevoRiel];
  
    // Actualizamos el estado con el nuevo array de rieles
    setRieles(nuevosRieles);
  
    // Despachamos el nuevo estado de Rieles
    dispatch(addRiel(nuevoRiel));
  };
  
  return (
    <>
      <Row className="mb-3">
        <Col></Col>
        <Col>
          <Form.Group controlId="ambiente">
            <Form.Label className="text-center w-100">Ambiente</Form.Label>
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
        </Col>
        <Col>
          <Form.Group controlId="ancho">
            <Form.Label className="text-center w-100">Ancho</Form.Label>
            <Form.Control
              type="number"
              value={Ancho}
              style={{ textAlign: "center" }}
              onChange={(e) => {
                setAncho(e.target.value);
              }}
              placeholder="Ancho"
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="tipo">
            <Form.Label style={{ width: "100%" }} className="text-center">
              Tipo
            </Form.Label>
            <Form.Select
              onChange={(e) => {
                setTipo(e.target.value);
              }}
              value={Tipo}
            >
              <option style={{ textAlign: "center" }} value=""></option>
              <option style={{ textAlign: "center" }} value="Hotelero">
                Hotelero
              </option>
              <option style={{ textAlign: "center" }} value="Ondas">
                Ondas
              </option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="accionamiento">
            <Form.Label style={{ width: "100%" }} className="text-center w-100">
              Accionamiento
            </Form.Label>
            <Form.Select
              style={{ width: "100%" }}
              onChange={(e) => {
                setAccionamiento(e.target.value);
              }}
              value={Accionamiento}
            >
              <option style={{ textAlign: "center" }} value="Manual">
                Manual
              </option>
              <option style={{ textAlign: "center" }} value="Motorizado">
                Motorizado
              </option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col></Col>
      </Row>

      <Row className="mb-3">
        <Col>
          <Form.Group controlId="armado">
            <FloatingLabel controlId="floatingTextarea2" label="Armado">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{
                  height: "100px",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                value={Armado}
                onChange={(e) => setArmado(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="soportes">
            <FloatingLabel controlId="floatingTextarea2" label="Soportes">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{
                  height: "100px",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                value={Soportes}
                onChange={(e) => setSoportes(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
        </Col>
        <Col>
          <Form.Group controlId="bastones">
            <FloatingLabel controlId="floatingTextarea2" label="Bastones">
              <Form.Control
                as="textarea"
                placeholder="Leave a comment here"
                style={{
                  height: "100px",
                  border: "1px solid black",
                  borderRadius: "5px",
                }}
                value={Bastones}
                onChange={(e) => setBastones(e.target.value)}
              />
            </FloatingLabel>
          </Form.Group>
        </Col>
      </Row>
      <Row>
        <Col>
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
            onClick={AgregarRiel}
          >
            Agregar Riel
          </Button>
        </Col>
        <Col></Col>
        <Col></Col>
      </Row>
      <Row>
        <TablaRieles/>
      </Row>
    </>
  );
};
