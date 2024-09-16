import React from 'react';
import { pdf } from '@react-pdf/renderer';
import { PDFTela } from '../Componentes/PDFTela';
import axios from 'axios';

export const SendPDFPrintNode = async (Venta, Cortinasroller, Cortinastradicional, ComentarioVen) => {
    const pdfDocument = <PDFTela Venta={Venta} Cortinasroller={Cortinasroller} Cortinastradicional={Cortinastradicional} ComentarioVen={ComentarioVen} />;
    
    // Generar el archivo PDF como un blob
    const pdfBlob = await pdf(pdfDocument).toBlob();

    // Convertir Blob a un archivo Base64 y enviar a PrintNode
    const convertBlobToBase64 = (blob) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onloadend = () => resolve(reader.result.split(",")[1]); // Obtener solo el base64
            reader.onerror = reject;
        });
    };

    try {
        const base64File = await convertBlobToBase64(pdfBlob);

        // Paso 2: Enviar el archivo Base64 a PrintNode
        const response = await axios.post(
            'https://api.printnode.com/printjobs',
            {
                printerId: "73671899", // Cambia con el ID de tu impresora
                title: 'Impresión de PDF',
                contentType: 'pdf_base64',
                content: base64File, // El contenido base64 del PDF
                source: 'React App',
            },
            {
                headers: {
                    'Authorization': `Basic ${btoa("kv9za48VObUEOGQaYKt6AwPt2SihkOiwj3T0sL_bFe4" + ':')}`, // Usa tu API key desde el entorno seguro
                    'Content-Type': 'application/json',
                },
            }
        );
        console.log('Print job created:', response.data);
    } catch (error) {
        console.error('Error al enviar a PrintNode:', error);
    }
};
