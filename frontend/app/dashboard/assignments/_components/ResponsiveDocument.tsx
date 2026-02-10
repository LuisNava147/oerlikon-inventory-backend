import React from 'react';
import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import { Assignment, Device } from '@/entities'; // Asegúrate que importa las interfaces nuevas

const styles = StyleSheet.create({
  page: { paddingTop: 40, paddingBottom: 40, paddingLeft: 50, paddingRight: 50, fontFamily: 'Helvetica', fontSize: 9, lineHeight: 1.5 },
  header: { textAlign: 'right', marginBottom: 20, fontFamily: 'Helvetica-Bold' },
  title: { fontFamily: 'Helvetica-Bold', marginBottom: 20, textTransform: 'uppercase' },
  paragraph: { marginBottom: 12, textAlign: 'justify' },
  listSection: { marginVertical: 15, paddingLeft: 10 },
  listItem: { flexDirection: 'row', marginBottom: 5 },
  label: { fontFamily: 'Helvetica-Bold', width: 90 },
  value: { flex: 1 },
  signatureSection: { marginTop: 10, alignItems: 'center' },
  line: { borderTopWidth: 1, borderTopColor: '#000', width: '50%', marginTop: 40, marginBottom: 10 },
  footerText: { fontFamily: 'Helvetica-Bold', textTransform: 'uppercase' },
});

interface Props {
  assignments: Assignment[];
}

export const ResponsivaDocument = ({ assignments }: Props) => {
  if (!assignments || assignments.length === 0) return <Document><Page><Text>Sin datos</Text></Page></Document>;

  const currentAssignment = assignments[0];
  const { employee, assignmentDate } = currentAssignment;
  
  // FORMATEO DE FECHA SEGURO
  const dateObj = new Date(assignmentDate);
  // Usamos UTC para evitar que la fecha cambie por la zona horaria del navegador
  const dateStr = new Date(dateObj.getUTCFullYear(), dateObj.getUTCMonth(), dateObj.getUTCDate())
                    .toLocaleDateString('es-MX', { year: 'numeric', month: 'long', day: 'numeric' });

  const allDevices: Device[] = currentAssignment.assignmentDevice?.map((ad) => ad.device) || [];

  
  const computers = allDevices.filter(d => {
      const t = d.deviceType?.toLowerCase() || '';
      return t.includes('laptop') || t.includes('desktop') || t.includes('computadora');
  });

  const phones = allDevices.filter(d => {
      const t = d.deviceType?.toLowerCase() || '';
      return t.includes('telefono') || t.includes('celular') || t.includes('movil');
  });

  const tablets = allDevices.filter(d => d.deviceType?.toLowerCase().includes('tablet'));
  
  const monitors = allDevices.filter(d => {
      const t = d.deviceType?.toLowerCase() || '';
      return t.includes('monitor') || t.includes('pantalla');
  });

  const accessories = allDevices.filter(d => {
      const t = d.deviceType?.toLowerCase() || '';
      return !t.includes('laptop') && !t.includes('desktop') && !t.includes('computadora') &&
             !t.includes('telefono') && !t.includes('celular') && !t.includes('movil') && 
             !t.includes('tablet') && !t.includes('monitor') && !t.includes('pantalla');
  });

  const formatDeviceInfo = (device: Device) => 
    `${device.deviceType} ${device.deviceBrand} ${device.deviceModel} / ${device.deviceSerialTag}`;

  const renderDeviceLine = (label: string, items: Device[], extraText: string = '') => (
    <View style={styles.listItem}>
      <Text style={styles.label}>{label}:</Text>
      <View style={styles.value}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <Text key={item.deviceId}>
               {label === 'Teléfono móvil' && employee.employeePhoneNumber ? `${employee.employeePhoneNumber} / ` : ''}
               {label === 'Computadora' && item.deviceAssetNumber ? `${item.deviceAssetNumber} / ` : ''}
               {formatDeviceInfo(item)} {extraText}
               {index < items.length - 1 ? '\n' : ''}
            </Text>
          ))
        ) : <Text>N/A</Text>}
      </View>
    </View>
  );

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        
        <View style={styles.header}>
          <Text>Querétaro, Qro., a {dateStr}</Text>
        </View>

        <View style={styles.title}>
          <Text>OERLIKON BALZERS COATING MÉXICO, S.A. DE C.V.</Text>
          <Text>PRESENTE.</Text>
        </View>

        <Text style={styles.paragraph}>
          Por este conducto les manifiesto, que a partir de esta fecha recibo las siguientes herramientas de trabajo:
        </Text>

        <View style={styles.listSection}>
            {renderDeviceLine('Computadora', computers, 'cargador')}
            {renderDeviceLine('Teléfono móvil', phones, 'cable/cargador')}
            {renderDeviceLine('Tableta electrónica', tablets, 'cable/cargador')}
            {renderDeviceLine('Pantalla/Monitor', monitors)}
            
            <View style={styles.listItem}>
                <Text style={styles.label}>Accesorios/Otros:</Text>
                <View style={styles.value}>
                    {accessories.length > 0 ? (
                        accessories.map((acc, i) => (
                            <Text key={acc.deviceId}>
                                {acc.deviceType}: {formatDeviceInfo(acc)}
                                {i < accessories.length - 1 ? '\n' : ''}
                            </Text>
                        ))
                    ) : <Text>N/A</Text>}
                </View>
            </View>
        </View>

        <Text style={styles.paragraph}>
          En virtud de lo anterior, me comprometo a utilizar las citadas herramientas, única y exclusivamente para asuntos de trabajo.
        </Text>
         <Text style={styles.paragraph}>
            Asimismo, me comprometo a dar el uso adecuado a estas herramientas de trabajo, en base a los manuales e instrucciones de uso, así como a cuidar que se dé el mantenimiento preventivo y correctivo que sea necesario para su óptimo uso, así como a informar por escrito y de manera oportuna de cualquier problema que las mismas presenten.
        </Text>
        <Text style={styles.paragraph}>
            Estoy consciente y reconozco que en virtud de que dichos equipos se encuentran totalmente bajo mi resguardo, será mi completa responsabilidad en caso de pérdida o cualquier daño que sufran los mismos, autorizando de igual forma por este medio para que de mi nómina me sean descontados dentro de los límites del artículo 110 de la Ley Federal del Trabajo, la cantidad que para el caso corresponda a la reposición o arreglo de los equipos que se me entregan.
        </Text>
        <Text style={styles.paragraph}>
            De igual forma acepto que cualquier cargo realizado por la compañía telefónica a la Empresa respecto de llamadas o servicios que no sean autorizados por la Empresa y que sean registrados por el equipo que se me asigna, quedarán a mi cargo.
        </Text>
        <Text style={styles.paragraph}>
            Toda vez que las mencionadas herramientas se me otorgan a efecto de hacer más eficiente el desempeño de mi trabajo, estoy consciente de que su uso no forma parte integrante de mi salario y se me pueden cambiar o retirar en cualquier momento.
        </Text>
        <Text style={styles.paragraph}>
             Por lo anterior, me comprometo a devolver al término de la relación de trabajo que me une con esta Empresa los objetos antes descritos, sin importar cual sea la causa que lo motive.
        </Text>
        <Text style={styles.paragraph}>
            Finalmente me comprometo a hacer buen uso de las herramientas que se me entregan, en el entendido que son intransferibles y que nadie que no sea yo, las puede utilizar.
        </Text>

        <View style={styles.signatureSection}>
            <Text style={{ marginBottom: 10 }}>Atentamente</Text>
            <View style={styles.line} />
            <Text style={styles.footerText}>{employee.employeeName} {employee.employeeLastName}</Text>
            <Text>Empleado Responsable</Text>
        </View>

      </Page>
    </Document>
  );
};