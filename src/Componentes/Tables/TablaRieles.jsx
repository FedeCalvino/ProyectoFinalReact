import React from 'react';
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from 'react-redux';
import { selectRieles, removeRiel } from "../../Features/CortinasReducer";
import Button from "react-bootstrap/Button";
import './TablaRieles.css'; // Archivo CSS para los estilos

export const TablaRieles = () => {
    const Rieles = useSelector(selectRieles);
    const dispatch = useDispatch();

    function BorrarCor(num) {
        dispatch(removeRiel({ numeroCortina: num }));
    }

    return (
        <>
            <Table responsive>
                <thead>
                    <tr>
                        <th>Numero</th>
                        <th>Area</th>
                        <th>Ancho</th>
                        <th>Tipo</th>
                        <th>Accionamiento</th>
                        <th>Armado</th>
                        <th>Soportes</th>
                        <th>Bastones</th>
                    </tr>
                </thead>
                <tbody>
                    {Array.isArray(Rieles) &&
                        <>
                            {Rieles.map((Riel, index) => (
                                <tr key={index} style={{ marginBottom: "1em" }}>
                                    <td>{Riel.numeroCortina}</td>
                                    <td>{Riel.ambiente}</td>
                                    <td>{Riel.ancho}</td>
                                    <td>{Riel.tipo}</td>
                                    <td>{Riel.accionamiento}</td>
                                    <td className="multi-line-text">{Riel.armado}</td>
                                    <td className="multi-line-text">{Riel.soportes}</td>
                                    <td className="multi-line-text">{Riel.bastones}</td>
                                    <td>
                                        <Button onClick={() => BorrarCor(Riel.numeroCortina)}>
                                            Borrar
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </>
                    }
                </tbody>
            </Table>
        </>
    );
};
