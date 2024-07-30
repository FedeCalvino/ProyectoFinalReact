import { React, useState, useEffect, useCallback } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "./ClienteList.css";
import { Loading } from "../Componentes/Loading";

export const Provedores = () => {
  const UrlProvedores = "/Cliente/Provedores";
  const [Provedores, setProvedores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    FetchProvedores();
  }, []);


  const FetchProvedores = async () => {
    try {
      const res = await fetch(UrlProvedores);
      const data = await res.json();
      setProvedores(data);
      setLoading(false);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <Loading tipo="all" />;
  }
  return (
    <Row className="justify-content-center">
      {Provedores.map((Prov) => (
        <Col key={Prov.id} xs={12} md={6} lg={4} className="mb-4">
          <Card
            className={`custom-card`}
          >
            <Card.Body>
              <Card.Title>{Prov.nombre}</Card.Title>
              <Card.Text>
                <strong>Empresa: </strong>
                  {Prov.empresa}
                <br />
                <strong>Contacto: </strong>
                  {Prov.contacto}
                <br />
                <strong>Mail: </strong>
                  {Prov.mail}
                  <br />            
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
