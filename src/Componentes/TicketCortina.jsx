import React from 'react'
import { Document, Text, Page, StyleSheet, View } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 10,
        width: '104mm', // Ancho ajustado a 104 mm (4.1")
        height: '2794mm', 
    },
    title: {
        fontSize: 12, // Tamaño de fuente reducido
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: 'left',
    },
    subtitle: {
        fontSize: 8, // Tamaño de fuente reducido
        marginBottom: 5,
        textAlign: 'left',
    },
    tableContainer: {
        marginTop: 10,
        borderTopWidth: 1,
        borderColor: '#cccccc',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        fontSize: 8, // Tamaño de fuente reducido
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    tableCell: {
        width: '33.33%',
        textAlign: 'center',
    },
});

export const TicketCortina = ({ Venta, cortina }) => {
    return (
        <Document>
            <Page size={{ width: 104, height: 100 }} style={styles.page}>
                <Text style={styles.subtitle}>{Venta.NombreCliente}</Text>
                <Text style={styles.subtitle}>{Venta.Obra || 'N/A'}</Text>
                {/* Tabla de detalles de las cortinas */}
                    {cortina.map((item, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={styles.tableCell}>{item.ambiente}</Text>
                            <Text style={styles.tableCell}>{item.anchoCortina}</Text>
                            <Text style={styles.tableCell}>{item.altoCortina}</Text>
                        </View>
                    ))}
            </Page>
        </Document>
    );
};