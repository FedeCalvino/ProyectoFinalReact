import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "../Routes/Css/CrearVenta.css";
import { selectTelasRoller } from "../Features/TelasReducer";
import { useSelector } from "react-redux";
import { Table } from "react-bootstrap";
import "./EditarCortina.css";
import Form from "react-bootstrap/Form";
export const EditarCortina = ({ callBackCancel,cortinaEdited}) => {
  const [Cortina, setCortina] = useState(cortinaEdited);
  const [Ambiente, setAmbiente] = useState(cortinaEdited.ambiente);
  const telasRoller = useSelector(selectTelasRoller);
  console.log(cortinaEdited);
  const NombreTelas = [];

  telasRoller.forEach((tela) => {
    let esta = false;
    NombreTelas.forEach((nombre) => {
      if (nombre.nombre === tela.nombre) {
        esta = true;
      }
    });
    if (!esta) {
      NombreTelas.push(tela);
    }
  });
  console.log("cortinaEdited", cortinaEdited);
  const telaRoller = telasRoller.find(
    (tel) =>
      tel.Color === cortinaEdited.colorTela &&
      tel.nombre === cortinaEdited.nombreTela
  );
  console.log("telaRoller", telaRoller);
  const SetTelasStart = telasRoller.filter(
    (Tela) => Tela.Nombre === telaRoller.nombre
  );
  console.log(telaRoller.id);
  const [selectedTelaMostrarRoler, SetselectedTelaMostrarRoler] = useState(
    telaRoller.id
  );
  const [TelasDelTipo, setTelasDelTipo] = useState(SetTelasStart);

  const [selectedTelaRoler, SetselectedTelaRoler] = useState(telaRoller.id);
  useEffect(() => {
    // Actualiza el estado cuando cambie la cortina editada
    setCortina(cortinaEdited);
    setAmbiente(cortinaEdited.ambiente);
  }, [cortinaEdited]);

  const handleSelectChange = (e) => {
    console.log("e.target.value", e.target.value);
    const selectedValue = parseInt(e.target.value, 10);
    const selectedTela = telasRoller.find((tela) => tela.Id === selectedValue);
    console.log("selectedTela", selectedTela);
    SetselectedTelaMostrarRoler(e.target.value);
    const SetTelas = telasRoller.filter(
      (Tela) => Tela.Nombre === selectedTela.Nombre
    );
    console.log("SetTelas", SetTelas);
    //SetTelas.sort((a, b) => a.Color.localeCompare(b.Color));
    setTelasDelTipo(SetTelas);
  };

  const handleInputChange = (e, field) => {
    setCortina((prevState) => ({
      ...prevState,
      [field]: e.target.value,
    }));
  };

  const handleSelectTela = (e) => {
    //console.log(e.target.value)
    const selectedValue = parseInt(e.target.value, 10);
    console.log(selectedValue);
    const selectedTela = telasRoller.find((tela) => tela.Id === selectedValue);
    console.log(selectedTela);
    SetselectedTelaRoler(e.target.value);
  };

  const handleConfirmEdit = () => {
    onConfirmEdit({ ...Cortina, ambiente: Ambiente }); // Pasa los datos editados al padre
  };

  return (
    <>
      <Table responsive>
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Num</th>
            <th>Ambiente</th>
            <th>Tela</th>
            <th>Color</th>
            <th>Ancho AF-AF</th>
            <th>Alto Cortina</th>
            <th>Caño</th>
            <th>Lado Cadena</th>
            <th>Posición</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Roller</td>
            <td>
              <input
                className="table-input-num"
                type="text"
                value={Cortina.numeroCortina}
                onChange={(e) => handleInputChange(e, "numeroCortina")}
              />
            </td>
            <td>
              <input
                className="table-input-ambiente"
                type="text"
                value={Cortina.ambiente}
                onChange={(e) => handleInputChange(e, "ambiente")}
              />
            </td>
            <td>
              <Form.Select
                className="table-select-tela"
                onChange={handleSelectChange}
                value={selectedTelaMostrarRoler}
              >
                <option></option>
                {NombreTelas.map((Tel) => (
                  <option value={Tel.id} key={Tel.id}>
                    {Tel.Nombre}
                  </option>
                ))}
              </Form.Select>
            </td>
            <td>
              <Form.Select
                className="table-select-tela"
                onChange={handleSelectTela}
                value={selectedTelaRoler}
              >
                <option></option>
                {TelasDelTipo.map((Tel) => (
                  <option value={Tel.id} key={Tel.id}>
                    {Tel.Color}
                  </option>
                ))}
              </Form.Select>
            </td>
            <td>
              <input
                className="table-input"
                type="text"
                value={Cortina.anchoAfuerAfuera}
                onChange={(e) => handleInputChange(e, "anchoAfuerAfuera")}
              />
            </td>
            <td>
              <input
                className="table-input"
                type="text"
                value={Cortina.altoCortina}
                onChange={(e) => handleInputChange(e, "altoCortina")}
              />
            </td>
            <td>
              <input
                className="table-input"
                type="text"
                value={Cortina.cano}
                onChange={(e) => handleInputChange(e, "cano")}
              />
            </td>
            <td>
              <Form.Select
                className="table-select"
                onChange={(e) => handleInputChange(e, "ladoCadena")}
                value={Cortina.ladoCadena}
              >
                <option value=""></option>
                <option value="Izq">Izq</option>
                <option value="Der">Der</option>
              </Form.Select>
            </td>
            <td>
              <Form.Select
                className="table-select"
                onChange={(e) => handleInputChange(e, "posicion")}
                value={Cortina.posicion}
              >
                <option value=""></option>
                <option value="Adl">Adelante</option>
                <option value="Atr">Atrás</option>
              </Form.Select>
            </td>
          </tr>
        </tbody>
      </Table>
      <div className="commContainer">
        <Form.Control
          as="textarea"
          placeholder="Comentario"
          className="comm"
          value={Cortina.detalle}
          onChange={(e) => handleInputChange(e, "detalle")}
        />
        </div>
      <button className="Butooneditable" onClick={handleConfirmEdit}>
        Confirmar
      </button>
      <button className="Butooneditable" onClick={callBackCancel}>
        Cancelar
      </button>
    </>
  );
};
