import React, { useState, useEffect } from 'react';
import { PDFViewer, Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 0,
    width: '374px',  // 34 mm * 11 = 374 mm (escala 1100%)
    height: '132px', // 12 mm * 11 = 132 mm (escala 1100%)
    transformOrigin: 'top left',
  },
  tableContainer: {
    marginTop: 1,
    display:"flex",
    alignItems: 'center',
    justifyContent: 'center',
    height: "70%",
  },
  tableContainer1: {
    marginBottom: 0.2,
    borderBottomWidth: 0.1,
    borderBottomColor: '#000000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16.5, // Escalado proporcional (1.5 * 11 = 16.5)
    justifyContent: 'center',
  },
  tableCell5: {
    fontSize: 16.5,
    width: '22%',
    textAlign: 'center',
    borderBottomColor: '#000000'
  },
  tableCell7: {
    fontSize: 22,
    width: '18%',
    textAlign: 'center',
  },
  tableCell8: {
    fontSize: 22,
    width: '18%',
    textAlign: 'center',
    marginRight: 1,
    borderBottomColor: '#000000',
  },
  tableCell9: {
    fontSize: 22,
    width: '10%',
    textAlign: 'center',
    borderBottomColor: '#000000',
  },
  tableCell19: {
    fontSize: 22,
    width: '10%',
    textAlign: 'center',
    borderBottomColor: '#000000',
  },
  tableCell6: {
    fontSize: 22,
    width: '6%',
    textAlign: 'center',
  },
  tableCell3: {
    fontSize: 22,
    marginTop: 0.2,
    width: '50%',
    textAlign: 'center',
  },
  tableCell4: {
    fontSize: 11,
    width: '50%',
    textAlign: 'center',
  },
  tableCell1: {
    fontSize: 16.5,
    marginBottom: 1,
    width: '33%',
    textAlign: 'center',
  },
  tableCell10: {
    fontSize: 55,
    width: '8%',
    textAlign: 'center',
  },
  tableCell12: {
    fontSize: 55,
    marginRight: 1.5,
    width: '8%',
    textAlign: 'center',
  }
});

const TicketCortinas = ({ NombreCliente, Obra, Cortina, NumeroCor }) => {
  const [fontSize, setFontSize] = useState(22); // Escala proporcional del texto
  const [fontSizeMedidas, setFontSizeMedidas] = useState(22);

  useEffect(() => {
    if (NombreCliente.length > 16) {
      setFontSize(16.5);
      setFontSizeMedidas(22);
    } else {
      setFontSize(27.5);
      setFontSizeMedidas(22);
    }
  }, [NombreCliente]);

  return (
    <Document>
      <Page size={[374, 132]} style={styles.page} key={Cortina.idCortina}>
        <View style={styles.tableContainer1}>
          <View style={styles.tableRow}>
            <Text style={styles.tableCell3}>
              {NombreCliente}
            </Text>
            <Text style={styles.tableCell3}>{Obra || 'N/A'}</Text>
          </View>
        </View>
        <View style={styles.tableContainer}>
          <View style={styles.tableRow}>
            {NumeroCor && (
              <Text
                style={
                  Cortina.numeroCortina.toString().length >= 2
                    ? styles.tableCell12
                    : styles.tableCell10
                }
              >
                {Cortina.numeroCortina}
              </Text>
            )}
            <Text style={[styles.tableCell5, { fontSize: Cortina.ambiente.length >= 14 ? 18.2 : fontSize }]}>
              {Cortina.ambiente}
            </Text>
            <Text style={[styles.tableCell7, { fontSize: fontSizeMedidas }]}>
              {Cortina.anchoAfuerAfuera}
            </Text>
            <Text style={[styles.tableCell6, { fontSize }]}>X</Text>
            <Text style={[styles.tableCell8, { fontSize: fontSizeMedidas }]}>
              {Cortina.altoCortina}
            </Text>
            <Text style={NumeroCor ? [styles.tableCell19, { fontSize: 22 }] : [styles.tableCell9, { fontSize: 22 }]}>
              {Cortina.ladoCadena}
            </Text>
            <Text style={NumeroCor ? [styles.tableCell19, { fontSize: 22 }] : [styles.tableCell9, { fontSize: 22 }]}>
              {Cortina.posicion}
            </Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export const TicketPreview = ({ NombreCliente, Obra, Cortina, NumeroCor }) => {
  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <PDFViewer width="80%" height="89%">
        <TicketCortinas NombreCliente={NombreCliente} Obra={Obra} Cortina={Cortina} NumeroCor={NumeroCor} />
      </PDFViewer>
    </div>
  );
};