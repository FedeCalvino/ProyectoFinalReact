import React from 'react';
import { Document, Page, StyleSheet, View, Text } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 0, // Adjust padding for better fit
  }
  , subtitle2: {
    fontSize: 1.5,
  },
  tableContainer: {
    marginTop: 1,
  }
  ,
  tableContainer1: {
    marginBottom: 1,
    borderBottomWidth: 0.1,
    borderBottomColor: '#000000',
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 1.5,
  },
  tableCell: {
    fontSize: 2,
    width: '33%',
    textAlign: 'center',
  }, tableCell5: {
    fontSize: 3,
    width: '30%',
    textAlign: 'center',
  }, tableCell6: {
    fontSize: 2,
    width: '6%',
    textAlign: 'center',
  }, tableCell3: {
    fontSize: 2,
    width: '50%',
    textAlign: 'center',
  }, tableCell4: {
    fontSize: 1,
    width: '50%',
    textAlign: 'center',
  },
  tableCell1: {
    fontSize: 1.5,
    marginBottom: 1,
    width: '33%',
    textAlign: 'center',
  }
});

export const TicketsCortinas = ({ Venta, Cortinas = [] }) => {
  return (
    <Document>
      {Cortinas.map(cor => (
        <Page size={[34, 12]} style={styles.page}>
        <View style={styles.tableContainer1}>
          <View style={styles.tableRow} key={cor.idCortina}>
            <Text style={styles.tableCell4}></Text>
            <Text style={styles.tableCell4}>Obra</Text>
          </View>
          <View style={styles.tableRow} key={cor.idCortina}>
            <Text style={styles.tableCell3}>{Venta.NombreCliente}</Text>
            <Text style={styles.tableCell3}>{Venta.Obra || 'N/A'}</Text>
          </View>
        </View>
        {/* Tabla de detalles de las cortinas */}
        <View style={styles.tableContainer}>
          <View style={styles.tableRow} key={cor.idCortina}>
            <Text style={[styles.tableCell, styles.text]}>{cor.ambiente}</Text>
            <Text style={[styles.tableCell5, styles.text]}>{cor.anchoAfuerAfuera}</Text>
            <Text style={[styles.tableCell6, styles.text]}>X</Text>
            <Text style={[styles.tableCell5, styles.text]}>{cor.altoCortina}</Text>
          </View>
        </View>
      </Page>
      ))}
    </Document>
  );
};