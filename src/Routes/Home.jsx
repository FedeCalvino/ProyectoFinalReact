import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
export default function Home() {

    const [Ventas, setVentas] = useState([])
    const [VentasJulio, setVentasJulio] = useState([])
    const [VentasAgosto, setVentasAgosto] = useState([])
    const [TelasData, setTelasData] = useState([])
    const [VentasSinCortar, setVentasSinCortaro] = useState([])
    const UrlVentas = "/Ventas/Dto"
    const UrlTelasData = "/Ventas/Datos/Tela"
    const filtrarVentas = (data) => {
        let ventasDeJulio = 0;
        let ventasDeAgosto = 0;
        data.reduce((contador, venta) => {
          const fechaVenta = venta.FechaVenta.split("-");
          const mesVenta = parseInt(fechaVenta[1], 10);
          console.log(mesVenta)
          if (mesVenta === 7) {
            ventasDeJulio = ventasDeJulio + 1;
          }
          if (mesVenta === 8) {
            ventasDeAgosto = ventasDeAgosto + 1;
          }
          return ventasDeJulio;
        }, 0); // Inicializar reduce con un contador inicial de 0
        console.log("agosto",ventasDeAgosto)
        setVentasJulio(ventasDeJulio);
        setVentasAgosto(ventasDeAgosto)
    };

    const chartSetting = {
        width: 1000,
        height: 600,
        margin: {
          right: 30,
          bottom: 40,
          left: 180, // Left margin added here
        },
      };
    const FetchVentas = async () => {
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
    const FetchTelasData = async () => {
        try {
          const res = await fetch(UrlTelasData);
          const data = await res.json();
          
    
          const combinedData = data.map(item => ({
            ...item,
            combinedName: `${item.nombre} ${item.color}`,
          }));
    
          setTelasData(combinedData);
          console.log(combinedData);
        } catch (error) {
          console.log(error);
        }
      };

    useEffect(() => {

        const fetchData = async () => {
            try {
                console.log("entr")
                await FetchVentas();
                await FetchTelasData()
              
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

  return (
    <>
            <h1 style={{marginTop:"70px"}}>Ventas</h1>
            <BarChart
            series={[
                { data: [VentasJulio,VentasAgosto]},
            ]}
            height={290}
            xAxis={[{ data: ['Julio', 'Agosto', 'Septiembre', 'Octubre'], scaleType: 'band' }]}
            margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
            />

            <BarChart
                dataset={TelasData}
                yAxis={[{ scaleType: 'band', dataKey: 'combinedName' }]}
                series={[{ dataKey: 'total', label: 'Total' }]}
                layout="horizontal"
                {...chartSetting}
            />

            
    </>
  );
}