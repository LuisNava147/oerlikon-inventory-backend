import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';

// Estilos para replicar tu template HTML
const styles = StyleSheet.create({
  page: { padding: 40, fontFamily: 'Helvetica', fontSize: 10 },
  
  // Header / Logo
  logoContainer: { flexDirection: 'row', marginBottom: 20 },
  logoRed: { color: '#FF0000', fontSize: 24, fontWeight: 'bold' },
  logoGray: { color: '#666666', fontSize: 24 },

  // Títulos Rojos
  sectionTitle: { 
    backgroundColor: '#FF0000', 
    color: 'white', 
    padding: 5, 
    fontSize: 12, 
    fontWeight: 'bold', 
    textAlign: 'center',
    marginBottom: 5,
    marginTop: 10
  },
  
  subSectionTitle: {
    backgroundColor: '#FF0000', 
    color: 'white', 
    padding: 4, 
    fontSize: 10, 
    fontWeight: 'bold', 
    marginBottom: 0
  },

  // Tablas (Filas)
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ccc', alignItems: 'stretch' },
  
  // Celdas
  labelCell: { 
    width: '35%', 
    backgroundColor: '#FF0000', 
    color: 'white', 
    padding: 5, 
    fontSize: 9,
    fontWeight: 'bold',
    justifyContent: 'center'
  },
  valueCell: { 
    width: '65%', 
    backgroundColor: '#f5f5f5', 
    padding: 5, 
    fontSize: 9,
    color: '#000',
    justifyContent: 'center'
  },

  // Sección especial de visitantes
  visitorBox: {
    borderWidth: 1,
    borderColor: '#ccc',
    minHeight: 100,
    marginTop: 0
  },
  visitorRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    padding: 5
  }
});

export interface AccessRequestData {
    applicantName: string;
    center: string;
    providerName: string;
    visitorNames: string;
    reason: string;
    date: string;
    time: string;
    duration: string;
}

interface Props {
    data: AccessRequestData;
}

export const AccessRequestDocument = ({ data }: Props) => {
  const dateObj = data.date ? new Date(data.date) : new Date();
  // Ajuste UTC para que no se recorra el día
  const dateStr = new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate())
                  .toLocaleDateString('es-ES', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        
        {/* LOGO SIMULADO */}
        <View style={styles.logoContainer}>
            <Text style={styles.logoRed}>oerlikon <Text style={styles.logoGray}>balzers</Text></Text>
        </View>

        {/* TÍTULO PRINCIPAL */}
        <Text style={styles.sectionTitle}>Solicitud de autorización de ingreso</Text>

        {/* SECCIÓN 1: DATOS SOLICITANTE */}
        <Text style={styles.subSectionTitle}>Datos del solicitante</Text>
        
        <View style={styles.tableRow}>
            <View style={styles.labelCell}><Text>Nombre</Text></View>
            <View style={styles.valueCell}><Text>{data.applicantName}</Text></View>
        </View>
        <View style={styles.tableRow}>
            <View style={styles.labelCell}><Text>Área</Text></View>
            <View style={styles.valueCell}><Text>IT (Sistemas)</Text></View>
        </View>
        <View style={styles.tableRow}>
            <View style={styles.labelCell}><Text>Centro del solicitante</Text></View>
            <View style={styles.valueCell}><Text>{data.center}</Text></View>
        </View>
        <View style={styles.tableRow}>
            <View style={styles.labelCell}><Text>Centro al que solicita el acceso</Text></View>
            <View style={styles.valueCell}><Text>{data.center}</Text></View>
        </View>

        {/* SECCIÓN 2: VISITANTES */}
        <Text style={[styles.subSectionTitle, {marginTop: 15}]}>Datos del personal que ingresará</Text>
        
        <View style={styles.tableRow}>
            <View style={[styles.labelCell, { height: 80, justifyContent: 'flex-start' }]}>
                <Text style={{marginBottom: 5}}>Empresa:</Text>
                <Text style={{fontSize: 8, opacity: 0.8}}>{data.providerName || 'Externo/Independiente'}</Text>
            </View>
            <View style={[styles.valueCell, { backgroundColor: 'white', padding: 0 }]}>
                <View style={{padding: 5, backgroundColor: '#eee'}}><Text>Nombres de Visitantes:</Text></View>
                <View style={{padding: 5}}>
                    <Text>{data.visitorNames}</Text>
                </View>
            </View>
        </View>

        {/* SECCIÓN 3: DETALLES */}
        <View style={{marginTop: 0}}>
            <View style={styles.tableRow}>
                <View style={styles.labelCell}><Text>Motivo de ingreso a planta</Text></View>
                <View style={styles.valueCell}><Text>{data.reason}</Text></View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.labelCell}><Text>Fecha de ingreso</Text></View>
                <View style={styles.valueCell}><Text>{dateStr}</Text></View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.labelCell}><Text>Hora de entrada</Text></View>
                <View style={styles.valueCell}><Text>{data.time}</Text></View>
            </View>
            <View style={styles.tableRow}>
                <View style={styles.labelCell}><Text>Duración estimada</Text></View>
                <View style={styles.valueCell}><Text>{data.duration}</Text></View>
            </View>
        </View>

        <Text style={{marginTop: 40, fontSize: 8, color: '#666', textAlign: 'center'}}>
            Documento generado digitalmente por el sistema de IT.
        </Text>

      </Page>
    </Document>
  );
};