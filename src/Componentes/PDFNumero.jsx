import React from 'react';
import { Document, Text, Page, StyleSheet, Image, View } from '@react-pdf/renderer';

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
        marginTop: "10px",
        width: 180,
        height: 80,
        marginBottom: 15
    },
    title: {
        fontSize: 18,
        marginBottom: 10,
        fontWeight: 'bold',
    },
    title1: {
        fontSize: 22,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: "center",
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
        width: '9%',
        textAlign: 'center',
    },
    tableCell: {
        width: '9%',
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
    },
    text2: {
        fontSize: 8,
    }
});

const FormatearFecha = ({ fecha }) => {
    if (!fecha) return ''; // Maneja el caso donde la fecha es nula o indefinida
    const partesFecha = fecha.split('-');
    if (partesFecha.length !== 3) return ''; // Maneja el caso donde la fecha no tiene el formato correcto
    const [anio, mes, dia] = partesFecha;
    return `${dia}/${mes}/${anio}`;
};

const Header = ({ Venta }) => (
    <>
        <Text style={styles.title1}>Fecha Instalación: <FormatearFecha fecha={Venta.DiaInstalacion} /></Text>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} src="ImgLogo.png" />
        </View>
        <Text style={styles.title}>Detalles de la Venta</Text>
        <Text style={styles.subtitle}>Nombre del Cliente: {Venta.NombreCliente}</Text>
        <Text style={styles.subtitle}>Obra: {Venta.Obra || 'N/A'}</Text>
    </>
);

const TableHeader = () => (
    <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Numero</Text>
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
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Detalle</Text>
    </View>
);

const TableRow = ({ cortina }) => (
    <View style={styles.tableRow}>
        <Text style={[styles.tableCell, styles.text]}>{cortina.numeroCortina}</Text>
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
        <Text style={[styles.tableCell, styles.text2]}>{cortina.detalle}</Text>
    </View>
);

export const PDFNumero = ({ Venta, Cortinas = [] }) => {
    const groupedCortinas = Cortinas.sort((a, b) => a.numeroCortina - b.numeroCortina);
    const cortinaChunks = [];
    
    for (let i = 0; i < groupedCortinas.length; i += 9) {
        cortinaChunks.push(groupedCortinas.slice(i, i + 9));
    }

    return (
        <Document>
            {cortinaChunks.map((chunk, index) => (
                <Page key={index} size="A4" style={styles.page} orientation="landscape">
                    <Header Venta={Venta} />
                    <TableHeader />
                    {chunk.map(cortina => (
                        <TableRow key={cortina.numeroCortina} cortina={cortina} />
                    ))}
                </Page>
            ))}
        </Document>
    );
};
