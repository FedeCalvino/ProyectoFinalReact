import React from 'react'
import Table from "react-bootstrap/Table";
import { useDispatch, useSelector } from 'react-redux';
import {selectRieles} from "../Features/RielesReducer"
import Button from "react-bootstrap/Button";
export const TablaRieles = () => {

    const Rieles = useSelector(selectRieles)

    const dispatch = useDispatch()

    function BorrarCor(id) {
        console.log(id);
    
        // Encuentra la cortina que será eliminada
        const RieleEliminada = Rieles.find((Riel) => Riel.Id === id);
    
        if (RieleEliminada) {
          // Filtra las cortinas para eliminar la cortina con el id especificado
          const nuevosRiel = Riel.filter((riel) => riel.Id !== id);
    
          // Actualiza el NumeroCor de las cortinas restantes
          /*const cortinasActualizadas = nuevosRiel.map((riel) => {
            if (riel.numeroCortina > RieleEliminada.numeroCortina) {
              return {
                ...cortina,
                numeroCortina: cortina.numeroCortina - 1,
              };
            }
            return cortina;
          });
          setNumeroCor((prevNumeroCor) => prevNumeroCor - 1);
          // Actualiza el estado
          setCortinas(cortinasActualizadas);*/
        }
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
                <th>Soportes</th>
                <th>Bastones</th>
                </tr>
            </thead>
            <tbody>
                {Array.isArray(Rieles)  &&
                    <>
                {Rieles.map(
                (Riel, index) =>
                    <tr key={index} style={{ marginBottom: "1em" }}>
                        <td>{Riel.Numero}</td>
                        <td>{Riel.Area}</td>
                        <td>{Riel.Ancho}</td>
                        <td>{Riel.Tipo}</td>
                        <td>{Riel.Accionamiento}</td>
                        <td>{Riel.Bastones}</td>
                        <td>
                        <Button onClick={() => BorrarCor(Riel.Id)}>
                            Borrar
                        </Button>
                        </td>
                    </tr>
                )}
                </>
            }
            </tbody>
                
            </Table>
      </>
  )
}
