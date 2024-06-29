import React from 'react'
import { Document, Text, Page, StyleSheet, Image,View  } from '@react-pdf/renderer'

const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        padding: 20,
    },
    logoContainer: {
        position: 'absolute',
        top: 12,
        right: 21,
    },
    logo: {
        marginTop:"10px",
        width: 180,
        height: 80,
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 12,
        marginBottom: 5,
    },
    tableContainer: {
        marginTop: 10,
    },
    tableHeader: {
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        fontSize: 12,
        fontWeight: 'bold',
        borderBottomWidth: 1,
        borderBottomColor: '#cccccc',
    },
    tableRow: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
        fontSize: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eeeeee',
    },
    tableHeaderCell: {
        width: '20%',
        textAlign: 'center',
    },
    tableCell: {
        width: '20%',
        textAlign: 'center',
    },
});

export const PDF = ({ Venta,Cortinas= [] }) => {
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Logo en la esquina superior derecha */}
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} src="ImgLogo.png" />
                </View>

                {/* Detalles de la venta */}
                <Text style={styles.title}>Detalles de la Venta</Text>
                <Text style={styles.subtitle}>Nombre del Cliente: {Venta.NombreCliente}</Text>
                <Text style={styles.subtitle}>Obra: {Venta.Obra || 'N/A'}</Text>
                <Text style={styles.subtitle}>Fecha de Venta: {Venta.FechaVenta}</Text>

                {/* Tabla de detalles de las cortinas */}
                <View style={styles.tableContainer}>
                    <Text style={styles.title}>Detalles de las Cortinas</Text>
                    <View style={styles.tableHeader}>
                        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Ambiente</Text>
                        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Ancho AF-AF</Text>
                        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Ancho Tela</Text>
                        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Ancho Caño</Text>
                        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Caño</Text>
                        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Alto Cortina</Text>
                        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Alto Tela</Text>
                        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Cadena</Text>
                        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Posición</Text>
                        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Lado</Text>
                    </View>
                    {Cortinas.map((cortina, index) => (
                        <View style={styles.tableRow} key={index}>
                            <Text style={[styles.tableCell, styles.text]}>{cortina.ambiente}</Text>
                            <Text style={[styles.tableCell, styles.text]}>{cortina.anchoAfuerAfuera}</Text>
                            <Text style={[styles.tableCell, styles.text]}>{cortina.anchoCortina}</Text>
                            <Text style={[styles.tableCell, styles.text]}>{cortina.anchoCaño}</Text>
                            <Text style={[styles.tableCell, styles.text]}>{cortina.cano}</Text>
                            <Text style={[styles.tableCell, styles.text]}>{cortina.altoCortina}</Text>
                            <Text style={[styles.tableCell, styles.text]}>{cortina.altoTela}</Text>
                            <Text style={[styles.tableCell, styles.text]}>{cortina.cadena}</Text>
                            <Text style={[styles.tableCell, styles.text]}>{cortina.posicion}</Text>
                            <Text style={[styles.tableCell, styles.text]}>{cortina.ladoCadena}</Text>
                        </View>
                    ))}
                </View>
            </Page>
        </Document>
    );
};
