import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';

export default function Home() {

    const [Ventas, setVentas] = useState([])
    const [VentasJulio, setVentasJulio] = useState([])
    const [VentasSinCortar, setVentasSinCortaro] = useState([])
    const UrlVentas = "http://20.84.121.133:8085/Ventas/Dto"
    
    const filtrarVentas = (data) => {
        let ventasDeJulio = 0;
        data.reduce((contador, venta) => {
          const fechaVenta = venta.FechaVenta.split("-");
          const mesVenta = parseInt(fechaVenta[1], 10);
          console.log(mesVenta)
          if (mesVenta === 7) {
            ventasDeJulio = ventasDeJulio + 1;
          }
          return ventasDeJulio;
        }, 0); // Inicializar reduce con un contador inicial de 0
        console.log(ventasDeJulio)
        setVentasJulio(ventasDeJulio);
    };

    const FetchVentas = async () => {
        console.log("log")
        try{
            const res = await fetch(UrlVentas)
            const data = await res.json()
            filtrarVentas(data)
            setVentas(data);
            console.log(data);
        } catch(error){
            console.log(error)
        }
    }


    useEffect(() => {

        const fetchData = async () => {
            try {
                console.log("entr")
                await FetchVentas();
              
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

  return (
    <>
            <h1>Ventas</h1>
            <BarChart
            series={[
                { data: [VentasJulio], },
            ]}
            height={290}
            xAxis={[{ data: ['Julio', 'Agosto', 'Septiembre', 'Octubre'], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
            <h1>Estados</h1>
            <BarChart
            series={[
                { data: [VentasJulio], },
            ]}
            height={290}
            xAxis={[{ data: ['Julio', 'Agosto', 'Septiembre', 'Octubre'], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />
    </>
  );
}