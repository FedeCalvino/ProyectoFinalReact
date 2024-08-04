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

const TelaTitle = ({ tela }) => (
    <Text style={styles.title}>Tela: {tela}</Text>
);

export const PDFTela = ({ Venta, Cortinas = [] }) => {
    if (Cortinas.length > 9) {
        // Agrupamos las cortinas por nombre y color de tela
        const groupedCortinas = Object.entries(Cortinas.reduce((groups, cortina) => {
            const key = `${cortina.nombreTela} ${cortina.colorTela}`;
            if (!groups[key]) groups[key] = [];
            groups[key].push(cortina);
            return groups;
        }, {}));

        const pages = [];

        groupedCortinas.forEach(([key, cortinas]) => {
            // Dividimos las cortinas en bloques de 9
            for (let i = 0; i < cortinas.length; i += 9) {
                const cortinasSlice = cortinas.slice(i, i + 9);
                pages.push({
                    tela: key,
                    cortinas: cortinasSlice
                });
            }
        });

        return (
            <Document>
                {pages.map((page, index) => (
                    <Page key={index} size="A4" style={styles.page} orientation="landscape">
                        <Header Venta={Venta} />
                        <TelaTitle tela={page.tela} />
                        <TableHeader />
                        {page.cortinas.map((cortina, cortinaIndex) => (
                            <View style={styles.tableRow} key={cortinaIndex}>
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
                        ))}
                    </Page>
                ))}
            </Document>
        );
    } else {
        // Agrupamos las cortinas por tela
        const groupedCortinas = Object.entries(Cortinas.reduce((groups, cortina) => {
            const key = `${cortina.nombreTela} ${cortina.colorTela}`;
            if (!groups[key]) groups[key] = [];
            groups[key].push(cortina);
            return groups;
        }, {}));

        return (
            <Document>
                <Page size="A4" style={styles.page} orientation="landscape">
                    <Header Venta={Venta} />
                    {groupedCortinas.map(([key, cortinas], index) => (
                        <React.Fragment key={index}>
                            <TelaTitle tela={key} />
                            <TableHeader />
                            {cortinas.map((cortina, cortinaIndex) => (
                                <View style={styles.tableRow} key={cortinaIndex}>
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
                            ))}
                        </React.Fragment>
                    ))}
                </Page>
            </Document>
        );
    }
};