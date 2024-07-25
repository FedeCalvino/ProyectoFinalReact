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
        alignItems: 'center',
        textAlign:"center",
        justifyContent:'center'
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
    },text: {
        fontSize: 14,
    },text2: {
        fontSize: 8,
    }
});

export const PDF = ({ Venta, Cortinas = [] }) => {

    // Agrupar cortinas por tela y ordenarlas por alto dentro de cada grupo
    const groupedCortinas = Cortinas.reduce((groups, cortina) => {
        const key = `${cortina.nombreTela} ${cortina.colorTela}`;
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(cortina);
        return groups;
    }, {});

    const sortedGroups = Object.keys(groupedCortinas).map(key => {
        return {
            tela: key,
            cortinas: groupedCortinas[key].sort((a, b) => b.altoCortina - a.altoCortina)
        };
    });

    const FormatearFecha = ({ fecha }) => {
        if (!fecha) {
          return ''; // Maneja el caso donde la fecha es nula o indefinida
        }
      
        const partesFecha = fecha.split('-');
        if (partesFecha.length !== 3) {
          return ''; // Maneja el caso donde la fecha no tiene el formato correcto
        }
      
        const [anio, mes, dia] = partesFecha;
        const fechaFormateada = `${dia}/${mes}/${anio}`;
      
        return fechaFormateada;
      };

    return (
        <Document>
            <Page size="A4" style={styles.page} orientation="landscape">
                {/* Logo en la esquina superior derecha */}
                <Text style={styles.title1}> Fecha Instalación: <FormatearFecha fecha={Venta.DiaInstalacion} /></Text>
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} src="ImgLogo.png" />
                </View>

                {/* Detalles de la venta */}
                <Text style={styles.title}>Detalles de la Venta</Text>
                <Text style={styles.subtitle}>Nombre del Cliente: {Venta.NombreCliente}</Text>
                <Text style={styles.subtitle}>Obra: {Venta.Obra || 'N/A'}</Text>

                {/* Tabla de detalles de las cortinas */}
                {sortedGroups.map((group, index) => (
                    <View key={index} style={styles.tableContainer}>
                        <Text style={styles.title}>Tela: {group.tela}</Text>
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
                        {group.cortinas.map((cortina, cortinaIndex) => (
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
                    </View>
                ))}
            </Page>
        </Document>
    );
};
