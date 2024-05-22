
import { React, useState, useEffect, useCallback } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './ClienteList.css'

export const Clientes = () => {

    const urlIP = import.meta.env.REACT_APP__IPSQL;
    const UrlClientes = "http://"+{urlIP}.urlIP+":8085/Cliente"
    const [Clientes, setClientes] = useState([]);
    useEffect(() => {
        FetchClientes();
    }, []);

    const FetchClientes = async () => {
        try {
            const res = await fetch(UrlClientes)
            const data = await res.json()
            setClientes(data);
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    };

    return (
        <Row className="justify-content-center">
            {Clientes.map((Cli) => (
                <Col key={Cli.id} xs={12} md={6} lg={4} className="mb-4">
                    <Card className="custom-card">
                        <Card.Body>
                            <Card.Title>{Cli.nombre}</Card.Title>
                            <Card.Text>
                                <strong>Teléfono:</strong> {Cli.numeroTelefono} <br />
                                <strong>RUT:</strong> {Cli.rut} <br />
                                <strong>Dirección:</strong> {Cli.direccion}
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
            ))}
        </Row>

    )
}
