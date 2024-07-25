import React from 'react';
import { Document, Text, Page, StyleSheet, View, Image } from '@react-pdf/renderer';

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
  },tableCell7: {
    fontSize: 2,
    width: '18%',
    textAlign: 'center'
  }, 
  tableCell5: {
    fontSize: 1.5,
    width: '18%',
    textAlign: 'center',
    borderRightWidth: 0.1,
    borderBottomColor: '#000000',
  },tableCell8: {
    fontSize: 2,
    width: '18%',
    textAlign: 'center',
    borderRightWidth: 0.1,
    borderBottomColor: '#000000',
  }, tableCell6: {
    fontSize: 2,
    width: '6%',
    textAlign: 'center',
  }, tableCell3: {
    fontSize: 2,
    marginTop: 0.5,
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

const CortinaComponent = ({ Cortina }) => {
  // Reemplaza "Black Out" con "BO" si está presente en nombreTela
  var formattedNombreTela;
  if( Cortina.nombreTela.includes("Black Out")){
    formattedNombreTela = Cortina.nombreTela.replace(/Black Out/g, 'BO');
  }
  if(Cortina.nombreTela.includes("Screen")){
    formattedNombreTela = Cortina.nombreTela.replace(/Screen/g, 'SC');
  }

  return (
    <Text style={styles.tableCell5}>
      {formattedNombreTela}{Cortina.colorTela}
    </Text>
  );
};

export const TicketCortina = ({ Venta, Cortina }) => {
  return (
    <Document>
      <Page size={[34, 12]} style={styles.page}>
        <View style={styles.tableContainer1}>
          <View style={styles.tableRow} key={Cortina.idCortina}>
            <Text style={styles.tableCell3}>{Venta.NombreCliente}</Text>
            <Text style={styles.tableCell3}>{Venta.Obra || 'N/A'}</Text>
          </View>
        </View>
        {/* Tabla de detalles de las cortinas */}
        <View style={styles.tableContainer}>
          <View style={styles.tableRow} key={Cortina.idCortina}>
            <Text style={[styles.tableCell5]}>{Cortina.ambiente}</Text>
            <Text style={[styles.tableCell7]}>{Cortina.anchoAfuerAfuera}</Text>
            <Text style={[styles.tableCell6]}>X</Text>
            <Text style={[styles.tableCell8]}>{Cortina.altoCortina}</Text>
            <Text style={[styles.tableCell5]}>{Cortina.ladoCadena}{Cortina.posicion}</Text>
          </View>
        </View>
      </Page>
    </Document>
  );
};