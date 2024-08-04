import React, { useState, useEffect } from 'react';
import { Document, Page, View, Text, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 0,
  },
  tableContainer: {
    marginTop: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:"50%"
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
    fontSize: 1.5,
    justifyContent: 'center',
  },
  tableCell5: {
    fontSize: 1.5,
    width: '18%',
    textAlign: 'center',
    borderBottomColor: '#000000',
    color:"red"
  },
  tableCell7: {
    fontSize: 2,
    width: '18%',
    textAlign: 'center',
  },
  tableCell8: {
    fontSize: 2,
    width: '18%',
    textAlign: 'center',
    marginRight: 1,
    borderBottomColor: '#000000',
  },
  tableCell9: {
    fontSize: 2,
    width: '18%',
    textAlign: 'center',
    borderBottomColor: '#000000',
  },
  tableCell19: {
    fontSize: 2,
    width: '14%',
    textAlign: 'center',
    borderBottomColor: '#000000',
  },
  tableCell6: {
    fontSize: 2,
    width: '6%',
    textAlign: 'center',
  },
  tableCell3: {
    fontSize: 2,
    marginTop: 0.2,
    width: '50%',
    textAlign: 'center',
  },
  tableCell4: {
    fontSize: 1,
    width: '50%',
    textAlign: 'center',
  },
  tableCell1: {
    fontSize: 1.5,
    marginBottom: 1,
    width: '33%',
    textAlign: 'center',
  },tableCell10: {
    fontSize: 5,
    width: '8%',
    textAlign: 'center',
  },
  tableCell12: {
    fontSize: 5,
    marginRight:1.5,
    width: '8%',
    textAlign: 'center',
  }
});

export const TicketsCortinas = ({ Venta, Cortinas = [] , NumeroCor}) => {
  const [fontSize, setFontSize] = useState(2);
  const [fontSizeMedidas, setfontSizeMedidas] = useState(2);
  const [fontSizeAmbiente, setfontSizeAmbiente] = useState(2);
  useEffect(() => {
    // Si el nombre del cliente tiene más de 14 caracteres, reducir el tamaño de la fuente
    if (Venta.NombreCliente.length > 16) {
      setFontSize(1.5);
      setfontSizeMedidas(2.5)
    } else {
      setFontSize(2.5);
      setfontSizeMedidas(2.5)
    }

    
  }, [Venta.NombreCliente]);

  return (
    <Document>
      {Cortinas.map(cor => (
        
        <Page size={[34, 12]} style={styles.page} key={cor.idCortina}>
          <View style={styles.tableContainer1}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell3,]}>
                {Venta.NombreCliente}
              </Text>
              <Text style={styles.tableCell3}>{Venta.Obra || 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.tableContainer}>
            <View style={styles.tableRow}>
              {NumeroCor && <Text style={cor.numeroCortina.toString().length >= 2 ?  [styles.tableCell12] : [styles.tableCell10] }>{cor.numeroCortina}</Text>}
              <Text style={[styles.tableCell5, {fontSize: cor.ambiente.length>=6 ?  1.8 : fontSize}]}>{cor.ambiente}</Text>
              <Text style={[styles.tableCell7, { fontSize: fontSizeMedidas }]}>{cor.anchoAfuerAfuera}</Text>
              <Text style={[styles.tableCell6, { fontSize: fontSize }]}>X</Text>
              <Text style={[styles.tableCell8, { fontSize: fontSizeMedidas}]}>{cor.altoCortina}</Text>
              <Text style={NumeroCor ? [styles.tableCell19, { fontSize: fontSize}] : [styles.tableCell9, { fontSize: fontSize}] }>{cor.ladoCadena}</Text>
              <Text style={NumeroCor ? [styles.tableCell19, { fontSize: fontSize}] : [styles.tableCell9, { fontSize: fontSize}] }>{cor.posicion}</Text>
            </View>
          </View>
        </Page>   
      ))}
      
    </Document>
  );
};
