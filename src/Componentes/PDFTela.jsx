import React from "react";
import {
  Document,
  Text,
  Page,
  StyleSheet,
  Image,
  View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: 20,
  },
  logoContainer: {
    position: "absolute",
    top: 12,
    right: 21,
  },
  logo: {
    marginTop: "10px",
    width: 180,
    height: 80,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  title1: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "center",
  },
  title2: {
    fontSize: 22,
    marginBottom: 10,
    fontWeight: "bold",
    textAlign: "start",
  },
  subtitle: {
    fontSize: 12,
    marginBottom: 5,
  },
  tableHeader: {
    backgroundColor: "#f0f0f0",
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    fontSize: 12,
    fontWeight: "bold",
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  tableRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5,
    fontSize: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eeeeee",
  },
  tableHeaderCell: {
    width: "8%",
    textAlign: "center",
  },tableHeaderCellR: {
    width: "5%",
    textAlign: "center",
  },

  tableHeaderCellPP: {
    width: "18%",
    textAlign: "center",
  },
  tableHeaderCell1: {
    width: "18%",
    textAlign: "center",
  },
  tableCell: {
    width: "8%",
    textAlign: "center",
  },
  tableCellP: {
    width: "8%",
    textAlign: "center",
  },
  tableCellPP: {
    width: "18%",
    textAlign: "center",
  },
  tableHeaderCellPD: {
    width: "36%",
    textAlign: "center",
  },
  tableCell1: {
    width: "18%",
    textAlign: "center",
  },tableCellR: {
    width: "25%",
    textAlign: "center",
  },
  
  text: {
    fontSize: 14,
  },
  text2: {
    fontSize: 8,
  },
  comment: {
    marginTop: 50,
    paddingTop: 5,
    paddingLeft: 5,
    paddingBottom: 15,
    fontSize: 12,
    borderWidth: 1,
    borderColor: "#000", // Añade un borde alrededor del comentario
    borderRadius: 5,
  },
  commentTitle: {
    fontSize: 20,
    fontWeight: "bold",
    paddingBottom: 5,
    textAlign: "left",
  },
  commentText: {
    marginTop: 5,
    fontSize: 15,
    textAlign: "center",
  },
});

const FormatearFecha = ({ fecha }) => {
  if (!fecha) return ""; // Maneja el caso donde la fecha es nula o indefinida
  const partesFecha = fecha.split("-");
  if (partesFecha.length !== 3) return ""; // Maneja el caso donde la fecha no tiene el formato correcto
  const [anio, mes, dia] = partesFecha;
  return `${dia}/${mes}/${anio}`;
};

const Header = ({ Venta }) => (
  <>
    <Text style={styles.title2}>{Venta.IdVenata}</Text>
    <Text style={styles.title1}>
      Fecha Instalación: <FormatearFecha fecha={Venta.DiaInstalacion} />
    </Text>
    <View style={styles.logoContainer}>
      <Image style={styles.logo} src="ImgLogo.png" />
    </View>
    <Text style={styles.title}>Detalles de la Venta</Text>
    <Text style={styles.subtitle}>
      Nombre del Cliente: {Venta.NombreCliente}
    </Text>
    <Text style={styles.subtitle}>Obra: {Venta.Obra || "N/A"}</Text>
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
const TableHeaderRiel = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.tableHeaderCell1, styles.subtitle]}>Ambiente</Text>
    <Text style={[styles.tableHeaderCell, styles.subtitle]}>Ancho</Text>
    <Text style={[styles.tableHeaderCell, styles.subtitle]}>Tipo</Text>
    <Text style={[styles.tableHeaderCell, styles.subtitle]}>Accionamiento</Text>
    <Text style={[styles.tableCellR, styles.subtitle]}>Armado</Text>
    <Text style={[styles.tableCellR, styles.subtitle]}>Soportes</Text>
    <Text style={[styles.tableCellR, styles.subtitle]}>Bastones</Text>

  </View>
);

const TableHeaderTradicional1Paño = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.tableHeaderCell1, styles.subtitle]}>Ambiente</Text>
    <Text style={[styles.tableHeaderCell, styles.subtitle]}>Paños</Text>
    <Text style={[styles.tableHeaderCell, styles.subtitle]}>Ancho</Text>
    <Text style={[styles.tableHeaderCell, styles.subtitle]}>Largo</Text>
    <Text style={[styles.tableHeaderCell, styles.subtitle]}>Lado Acumula</Text>
    <Text style={[styles.tableHeaderCellPP, styles.subtitle]}>Pinza</Text>
    <Text style={[styles.tableHeaderCellPD, styles.subtitle]}>Detalle</Text>
  </View>
);
const TableHeaderTradicional2Paños = () => (
  <View style={styles.tableHeader}>
    <Text style={[styles.tableHeaderCell1, styles.subtitle]}>Ambiente</Text>
    <Text style={[styles.tableHeaderCell, styles.subtitle]}>Paños</Text>
    <Text style={[styles.tableHeaderCell, styles.subtitle]}>
      Ancho Izquierdo
    </Text>
    <Text style={[styles.tableHeaderCell, styles.subtitle]}>Ancho Derecho</Text>
    <Text style={[styles.tableHeaderCell, styles.subtitle]}>Largo</Text>
    <Text style={[styles.tableHeaderCellPP, styles.subtitle]}>Pinza</Text>
    <Text style={[styles.tableHeaderCellPD, styles.subtitle]}>Detalle</Text>
  </View>
);

const TelaTitle = ({ tela }) => <Text style={styles.title}>Tela: {tela}</Text>;

export const PDFTela = ({
  Venta,
  Cortinasroller = [],
  Cortinastradicional = [],
  Rieles=[],
  ComentarioVen,
}) => {
  console.log(Rieles)
  if (!Venta || !Cortinasroller) {
    throw new Error("Faltan datos necesarios para generar el PDF");
  }

  const groupedCortinasTradicional = Object.entries(
    Cortinastradicional.reduce((groups, cortina) => {
      const key = `${cortina.nombreTela} ${cortina.colorTela}`;

      // Si no existe el grupo para esa tela, inicialízalo con dos listas vacías
      if (!groups[key]) {
        groups[key] = {
          panos1: [],
          panos2: [],
        };
      }

      // Verifica el valor de `panos` y agrega la cortina en la lista correspondiente
      if (cortina.panos === 1) {
        groups[key].panos1.push(cortina);
      } else if (cortina.panos === 2) {
        groups[key].panos2.push(cortina);
      }

      return groups;
    }, {})
  );

  console.log(groupedCortinasTradicional);

  const groupedCortinas = Object.entries(
    Cortinasroller.reduce((groups, cortina) => {
      const key = `${cortina.nombreTela} ${cortina.colorTela}`;
      if (!groups[key]) groups[key] = [];
      groups[key].push(cortina);
      return groups;
    }, {})
  );

  console.log(ComentarioVen);

  if (Cortinasroller.length > 9) {
    const pages = [];

    groupedCortinas.forEach(([key, cortinas]) => {
      // Dividimos las cortinas en bloques de 9
      for (let i = 0; i < cortinas.length; i += 9) {
        const cortinasSlice = cortinas.slice(i, i + 9);
        pages.push({
          tela: key,
          cortinas: cortinasSlice,
        });
      }
    });

    return (
      <Document>
        {pages.map((page, index) => (
          <Page
            key={index}
            size="A4"
            style={styles.page}
            orientation="landscape"
          >
            <Header Venta={Venta} />
            <TelaTitle tela={page.tela} />
            <TableHeader />
            {page.cortinas.map((cortina, cortinaIndex) => (
              <View style={styles.tableRow} key={cortinaIndex}>
                <Text style={[styles.tableCell1, styles.text]}>
                  {cortina.ambiente}
                </Text>
                <Text style={[styles.tableCell, styles.text]}>
                  {cortina.anchoAfuerAfuera}
                </Text>
                <Text style={[styles.tableCell, styles.text]}>
                  {cortina.anchoCortina}
                </Text>
                <Text style={[styles.tableCell, styles.text]}>
                  {cortina.anchoCaño}
                </Text>
                <Text style={[styles.tableCell, styles.text]}>
                  {cortina.cano}
                </Text>
                <Text style={[styles.tableCell, styles.text]}>
                  {cortina.altoCortina}
                </Text>
                <Text style={[styles.tableCell, styles.text]}>
                  {cortina.altoTela}
                </Text>
                <Text style={[styles.tableCell, styles.text]}>
                  {cortina.cadena}
                </Text>
                <Text style={[styles.tableCell, styles.text]}>
                  {cortina.posicion}
                </Text>
                <Text style={[styles.tableCell, styles.text]}>
                  {cortina.ladoCadena}
                </Text>
                <Text style={[styles.tableCell, styles.text2]}>
                  {cortina.detalle}
                </Text>
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

              {/* Tabla para panos = 1 */}
              <TableHeaderTradicional1Paño />
              {cortinas.panos1.length > 0 ? (
                cortinas.panos1.map((cortina, cortinaIndex) => (
                  <View style={styles.tableRow} key={cortinaIndex}>
                    <Text style={[styles.tableCell1, styles.text]}>
                      {cortina.ambiente}
                    </Text>
                    <Text style={[styles.tableCellP, styles.text]}>
                      {cortina.panos}
                    </Text>
                    <Text style={[styles.tableCellP, styles.text]}>
                      {cortina.anchoCortina}
                    </Text>
                    <Text style={[styles.tableCellP, styles.text]}>
                      {cortina.altoCortina}
                    </Text>
                    <Text style={[styles.tableCellP, styles.text]}>
                      {cortina.acumula}
                    </Text>
                    <Text style={[styles.tableCellPP, styles.text]}>
                      {cortina.pinza}
                    </Text>
                    <Text style={[styles.tableHeaderCellPD, styles.text]}>
                      {cortina.detalle}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>
                  No hay cortinas con 1 paño
                </Text>
              )}

              {/* Tabla para panos = 2 */}
              <TableHeaderTradicional2Paños />
              {cortinas.panos2.length > 0 ? (
                cortinas.panos2.map((cortina, cortinaIndex) => (
                  <View style={styles.tableRow} key={cortinaIndex}>
                    <Text style={[styles.tableCell1, styles.text]}>
                      {cortina.ambiente}
                    </Text>
                    <Text style={[styles.tableCellP, styles.text]}>
                      {cortina.panos}
                    </Text>
                    <Text style={[styles.tableCellP, styles.text]}>
                      {cortina.anchoCortina}
                    </Text>
                    <Text style={[styles.tableCellP, styles.text]}>
                      {cortina.anchoDerecho}
                    </Text>
                    <Text style={[styles.tableCellP, styles.text]}>
                      {cortina.altoCortina}
                    </Text>
                    <Text style={[styles.tableCellPP, styles.text]}>
                      {cortina.pinza}
                    </Text>
                    <Text style={[styles.tableHeaderCellPD, styles.text]}>
                      {cortina.detalle}
                    </Text>
                  </View>
                ))
              ) : (
                <Text style={styles.noDataText}>
                  No hay cortinas con 2 paños
                </Text>
              )}
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
        {Cortinasroller.length > 0 && (
        <Page size="A4" style={styles.page} orientation="landscape">
          {/* Header */}
          <Header Venta={Venta} />

          {/* Grouped Cortinas Mapping */}
          {groupedCortinas.map(([key, cortinas], index) => (
            <React.Fragment key={index}>
              {/* Tela Title */}
              <TelaTitle tela={key} />

              {cortinas.length > 0 && (
                <>
                  {/* Table Header */}
                  <TableHeader />

                  {/* Cortinas Data Rows */}
                  {cortinas.map((cortina, cortinaIndex) => (
                    <View style={styles.tableRow} key={cortinaIndex}>
                      <Text style={[styles.tableCell1, styles.text]}>
                        {cortina.ambiente}
                      </Text>
                      <Text style={[styles.tableCell, styles.text]}>
                        {cortina.anchoAfuerAfuera}
                      </Text>
                      <Text style={[styles.tableCell, styles.text]}>
                        {cortina.anchoCortina}
                      </Text>
                      <Text style={[styles.tableCell, styles.text]}>
                        {cortina.anchoCaño}
                      </Text>
                      <Text style={[styles.tableCell, styles.text]}>
                        {cortina.cano}
                      </Text>
                      <Text style={[styles.tableCell, styles.text]}>
                        {cortina.altoCortina}
                      </Text>
                      <Text style={[styles.tableCell, styles.text]}>
                        {cortina.altoTela}
                      </Text>
                      <Text style={[styles.tableCell, styles.text]}>
                        {cortina.cadena}
                      </Text>
                      <Text style={[styles.tableCell, styles.text]}>
                        {cortina.posicion}
                      </Text>
                      <Text style={[styles.tableCell, styles.text]}>
                        {cortina.ladoCadena}
                      </Text>
                      <Text style={[styles.tableCell, styles.text2]}>
                        {cortina.detalle}
                      </Text>
                    </View>
                  ))}
                </>
              )}
            </React.Fragment>
          ))}

          {/* Comment Section */}
          <Text style={styles.comment}>
            <Text style={styles.commentTitle}>Comentario</Text>
            {"\n"}
            <Text style={styles.commentText}>{ComentarioVen}</Text>
          </Text>
        </Page>
        )
        }
{groupedCortinasTradicional.map(([key, cortinas], index) => (
  cortinas.panos1.length > 0 || cortinas.panos2.length > 0 ? (
    <Page size="A4" style={styles.page} orientation="landscape" key={index}>
      <Header Venta={Venta} />
      <TelaTitle tela={key} />

      {/* Table for panos = 1 */}
      {cortinas.panos1.length > 0 && (
        <>
          <TableHeaderTradicional1Paño />
          {cortinas.panos1.map((cortina, cortinaIndex) => (
            <View style={styles.tableRow} key={cortinaIndex}>
              <Text style={[styles.tableCell1, styles.text]}>
                {cortina.ambiente}
              </Text>
              <Text style={[styles.tableCellP, styles.text]}>
                {cortina.panos}
              </Text>
              <Text style={[styles.tableCellP, styles.text]}>
                {cortina.anchoCortina}
              </Text>
              <Text style={[styles.tableCellP, styles.text]}>
                {cortina.altoCortina}
              </Text>
              <Text style={[styles.tableCellP, styles.text]}>
                {cortina.acumula}
              </Text>
              <Text style={[styles.tableCellPP, styles.text]}>
                {cortina.pinza}
              </Text>
              <Text style={[styles.tableHeaderCellPD, styles.text]}>
                {cortina.detalle}
              </Text>
            </View>
          ))}
        </>
      )}

      {/* Table for panos = 2 */}
      {cortinas.panos2.length > 0 && (
        <>
          <TableHeaderTradicional2Paños />
          {cortinas.panos2.map((cortina, cortinaIndex) => (
            <View style={styles.tableRow} key={cortinaIndex}>
              <Text style={[styles.tableCell1, styles.text]}>
                {cortina.ambiente}
              </Text>
              <Text style={[styles.tableCellP, styles.text]}>
                {cortina.panos}
              </Text>
              <Text style={[styles.tableCellP, styles.text]}>
                {cortina.anchoCortina}
              </Text>
              <Text style={[styles.tableCellP, styles.text]}>
                {cortina.anchoDerecho}
              </Text>
              <Text style={[styles.tableCellP, styles.text]}>
                {cortina.altoCortina}
              </Text>
              <Text style={[styles.tableCellPP, styles.text]}>
                {cortina.pinza}
              </Text>
              <Text style={[styles.tableHeaderCellPD, styles.text]}>
                {cortina.detalle}
              </Text>
            </View>
          ))}
        </>
      )}

      {/* Comment Section */}
      <Text style={styles.comment}>
        <Text style={styles.commentTitle}>Comentario</Text>
        {"\n"}
        <Text style={styles.commentText}>{ComentarioVen}</Text>
      </Text>
    </Page>
  ) : null
))}
{Rieles.length>0 && (
<Page size="A4" style={styles.page} orientation="landscape">
<Header Venta={Venta} />
<TableHeaderRiel/>
                            {Rieles.map((Riel, index) => (
                                  <View style={styles.tableRow} key={Riel.numeroCortina}>
                                    <Text style={[styles.tableHeaderCell1, styles.text]}>
                                   {Riel.ambiente}
                                    </Text>
                                    <Text style={[styles.tableHeaderCellR, styles.text]}>
                                    {Riel.ancho}
                                    </Text>
                                    <Text style={[styles.tableHeaderCell, styles.text]}>
                                    {Riel.tipo}
                                    </Text>
                                    <Text style={[styles.tableHeaderCell, styles.text]}>
                                    {Riel.acc}
                                    </Text>
                                    <Text style={[styles.tableCellR, styles.text]}>
                                    {Riel.armado}
                                    </Text>
                                    <Text style={[styles.tableCellR, styles.text]}>
                                    {Riel.soportes}
                                    </Text>
                                    <Text style={[styles.tableCellR, styles.text]}>
                                    {Riel.bastones}
                                    </Text>
                                  </View>
                            ))}
                    
          </Page>
)}
      </Document>
    );
  }
};
