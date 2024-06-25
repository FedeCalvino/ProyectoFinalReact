
import { React, useState, useEffect, useCallback } from 'react'
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import './ClienteList.css'
import { Loading } from '../Componentes/Loading';

export const Clientes = () => {
    const UrlClientes = "/Cliente"
    const [Clientes, setClientes] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        FetchClientes();
    }, []);

    const FetchClientes = async () => {
        try {
            const res = await fetch(UrlClientes)
            const data = await res.json()
            setClientes(data);
            setLoading(false)
            console.log(data);
        } catch (error) {
            console.log(error)
        }
    };

    if (loading) {
        return (
            <Loading tipo="all"/>
        );
    }
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
