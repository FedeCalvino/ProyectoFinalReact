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
    title2: {
        fontSize: 22,
        marginBottom: 10,
        fontWeight: 'bold',
        textAlign: "start",
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
        width: '8%',
        textAlign: 'center',
    },tableHeaderCell1: {
        width: '18%',
        textAlign: 'center',
    },
    tableCell: {
        width: '8%',
        textAlign: 'center',
    },tableCell1: {
        width: '18%',
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
    },
    text2: {
        fontSize: 8,
    },
    comment: {
        marginTop: 50,
        paddingTop:5,
        paddingLeft:5,
        paddingBottom:15,
        fontSize: 12,
        borderWidth: 1,
        borderColor: '#000',  // Añade un borde alrededor del comentario
        borderRadius: 5,
    },
    commentTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom:5,
        textAlign: 'left',
    },
    commentText: {
        marginTop: 5,
        fontSize: 15,
        textAlign: 'center',
    },
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
        <Text style={styles.title2}>{Venta.IdVenata}</Text>
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
        <Text style={[styles.tableHeaderCell1, styles.subtitle]}>Ambiente</Text>
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
const TableHeaderTradicional1Paño = () => (
    <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell1, styles.subtitle]}>Ambiente</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Paños</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Ancho</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Largo</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Lado Acumula</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Bastones</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Techo/Pared</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Motorizada</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Detalle</Text>
    </View>
);
const TableHeaderTradicional2Paños = () => (
    <View style={styles.tableHeader}>
        <Text style={[styles.tableHeaderCell1, styles.subtitle]}>Ambiente</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Paños</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Ancho Izq</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Ancho Der</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Largo</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Lado Acumula</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Bastones</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Techo/Pared</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Motorizada</Text>
        <Text style={[styles.tableHeaderCell, styles.subtitle]}>Detalle</Text>
    </View>
);

const TelaTitle = ({ tela }) => (
    <Text style={styles.title}>Tela: {tela}</Text>
);

export const PDFTela = ({ Venta,Cortinasroller = [] ,Cortinastradicional= [],ComentarioVen }) => {
    if (!Venta || !Cortinasroller) {
        throw new Error("Faltan datos necesarios para generar el PDF");
    }
    const groupedCortinasTradicional = Object.entries(Cortinastradicional.reduce((groups, cortina) => {
        const key = `${cortina.nombreTela} ${cortina.colorTela}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(cortina);
        return groups;
    }, {}));

    const groupedCortinas = Object.entries(Cortinasroller.reduce((groups, cortina) => {
        const key = `${cortina.nombreTela} ${cortina.colorTela}`;
        if (!groups[key]) groups[key] = [];
        groups[key].push(cortina);
        return groups;
    }, {}));

    console.log(ComentarioVen)

    if (Cortinasroller.length > 9) {
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
                                <Text style={[styles.tableCell1, styles.text]}>{cortina.ambiente}</Text>
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
                        <Text style={styles.comment}>
                            <Text style={styles.commentTitle}>Comentario</Text>
                            {"\n"}
                            <Text style={styles.commentText}>{ComentarioVen}</Text>
                        </Text>
                    </Page>
                ))}
                <Page size="A4" style={styles.page} orientation="landscape">
                <Header Venta={Venta} />
                {groupedCortinasTradicional.map(([key, cortinas], index) => (
                    <React.Fragment key={index}>
                        <TelaTitle tela={key} />
                        <TableHeader />
                        {cortinas.map((cortina, cortinaIndex) => (
                            <View style={styles.tableRow} key={cortinaIndex}>
                                <Text style={[styles.tableCell1, styles.text]}>{cortina.ambiente}</Text>
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
                <Text style={styles.comment}>
                    <Text style={styles.commentTitle}>Comentario</Text>
                    {"\n"}
                    <Text style={styles.commentText}>{ComentarioVen}</Text>
                </Text>
            </Page>
            </Document>
        );
    } else {
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
                                    <Text style={[styles.tableCell1, styles.text]}>{cortina.ambiente}</Text>
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

                    <Text style={styles.comment}>
                        <Text style={styles.commentTitle}>Comentario</Text>
                        {"\n"}
                        <Text style={styles.commentText}>{ComentarioVen}</Text>
                    </Text>
                </Page>
                <Page size="A4" style={styles.page} orientation="landscape">
                <Header Venta={Venta} />
                {groupedCortinasTradicional.map(([key, cortinas], index) => (
                    <React.Fragment key={index}>
                        <TelaTitle tela={key} />
                        <TableHeader />
                        {cortinas.map((cortina, cortinaIndex) => (
                            <View style={styles.tableRow} key={cortinaIndex}>
                                <Text style={[styles.tableCell1, styles.text]}>{cortina.ambiente}</Text>
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
                <Text style={styles.comment}>
                    <Text style={styles.commentTitle}>Comentario</Text>
                    {"\n"}
                    <Text style={styles.commentText}>{ComentarioVen}</Text>
                </Text>
            </Page>
            </Document>
        );
    }
};