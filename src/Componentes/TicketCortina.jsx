import React, { useState }  from 'react'
import { Document, Text, Page, StyleSheet, View } from '@react-pdf/renderer'

export const TicketCortina = ({ Venta, cortina }) => {
    const [text, setText] = useState('');

    const handlePrint = async () => {
      try {
        const device = await navigator.bluetooth.requestDevice({
          filters: [{ services: ['printer'] }]
        });
  
        const server = await device.gatt.connect();
        const service = await server.getPrimaryService('printer');
        const characteristic = await service.getCharacteristic('printer');
  
        const encoder = new TextEncoder();
        const data = encoder.encode(text);
        
        await characteristic.writeValue(data);
        console.log('Impresión enviada correctamente');
      } catch (error) {
        console.error('Error:', error);
      }
    };
  
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <button onClick={handlePrint}>Imprimir Ticket</button>
      </div>
    );
};