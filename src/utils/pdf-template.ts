import { Assignment } from "../assignments/entities/assignment.entity";

export const generateResponsivaHTML = (assignments: Assignment[]): string  => {
    if(!assignments || assignments.length === 0)return '<h1>No hay dispositivos asignados</h1>';
    const {employee, assignmentDate} = assignments[0];

    const dateObj = new Date(assignmentDate)
    const dateStr = dateObj.toLocaleDateString('es-ES',{
        year: 'numeric', month: 'long', day: 'numeric' })
    
    let computerText= 'N/A';
    let phoneText = 'N/A';
    let tabletText = 'N/A';
    let monitorText = 'N/A';
    let accessoriesText : string[] = [];

    assignments.forEach(assign => {
        const d = assign.device;
        const type = d.deviceType.toLowerCase();
        const info = `${d.deviceType}/${d.deviceBrand}/${d.deviceModel}/${d.deviceSerialTag}`;

        if(type.includes('laptop') || type.includes('desktop')){
            computerText = `${d.deviceAssetNumber}/${info} cargador`;
        }else if(type.includes('telefono movil') || type.includes('celular')){
            phoneText = `${d.employee.employeePhoneNumber}/${info} cable/cargador`;
        }else if(type.includes('tablet')){
            tabletText = `${info} cable/cargador`
        }else if(type.includes('monitor') || type.includes('pantalla')){
            monitorText = `${info}`
        }else{
            accessoriesText.push(`${d.deviceType}:${info}`)
        }
    });

        const finalAccessories = accessoriesText.length > 0 ? accessoriesText.join('<br>&nbsp;&nbsp;') : 'N/A';

        return `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: 'Arial', sans-serif; font-size: 10pt; line-height: 1.4; margin: 40px 50px; color: #000; }
            .header { text-align: right; margin-bottom: 20px; font-weight: bold; }
            .title { font-weight: bold; margin-bottom: 20px; text-transform: uppercase; }
            .content { text-align: justify; margin-bottom: 12px; }
            .list-section { margin: 15px 0; padding-left: 10px; }
            .list-item { margin-bottom: 5px; }
            .label { font-weight: bold; }
            .signature-section { margin-top: 60px; text-align: center; page-break-inside: avoid; }
            .line { border-top: 1px solid #000; width: 50%; margin: 0 auto; margin-bottom: 10px; }
            .footer { font-size: 9pt; text-align: center; margin-top: 30px; color: #666; }
          </style>
        </head>
        <body>
    
          <div class="header">
            Querétaro, Qro., a ${dateStr}
          </div>
    
          <div class="title">
            OERLIKON BALZERS COATING MÉXICO, S.A. DE C.V.<br>
            PRESENTE.
          </div>
    
          <div class="content">
            Por este conducto les manifiesto, que a partir de esta fecha recibo las siguientes herramientas de trabajo:
          </div>
    
          <div class="list-section">
            <div class="list-item"><span class="label">Teléfono móvil:</span> ${phoneText}</div>
            <div class="list-item"><span class="label">Computadora:</span> ${computerText}</div>
            <div class="list-item"><span class="label">Tableta electrónica:</span> ${tabletText}</div>
            <div class="list-item"><span class="label">Pantalla/Monitor:</span> ${monitorText}</div>
            <div class="list-item"><span class="label">Accesorios/Otros:</span> <br>&nbsp;&nbsp;${finalAccessories}</div>
          </div>
    
          <div class="content">
            En virtud de lo anterior, me comprometo a utilizar las citadas herramientas, única y exclusivamente para asuntos de trabajo.
          </div>
    
          <div class="content">
            Asimismo, me comprometo a dar el uso adecuado a estas herramientas de trabajo, en base a los manuales e instrucciones de uso, así como a cuidar que se dé el mantenimiento preventivo y correctivo que sea necesario para su óptimo uso, así como a informar por escrito y de manera oportuna de cualquier problema que las mismas presenten.
          </div>
    
          <div class="content">
            Estoy consciente y reconozco que en virtud de que dichos equipos se encuentran totalmente bajo mi resguardo, será mi completa responsabilidad en caso de pérdida o cualquier daño que sufran los mismos, autorizando de igual forma por este medio para que de mi nómina me sean descontados dentro de los límites del artículo 110 de la Ley Federal del Trabajo, la cantidad que para el caso corresponda a la reposición o arreglo de los equipos que se me entregan.
          </div>
    
          <div class="content">
            De igual forma acepto que cualquier cargo realizado por la compañía telefónica a la Empresa respecto de llamadas o servicios que no sean autorizados por la Empresa y que sean registrados por el equipo que se me asigna, quedarán a mi cargo.
          </div>
    
          <div class="content">
            Toda vez que las mencionadas herramientas se me otorgan a efecto de hacer más eficiente el desempeño de mi trabajo, estoy consciente de que su uso no forma parte integrante de mi salario y se me pueden cambiar o retirar en cualquier momento.
          </div>
    
          <div class="content">
            Por lo anterior, me comprometo a devolver al término de la relación de trabajo que me une con esta Empresa los objetos antes descritos, sin importar cual sea la causa que lo motive.
          </div>
    
          <div class="content">
            Finalmente me comprometo a hacer buen uso de las herramientas que se me entregan, en el entendido que son intransferibles y que nadie que no sea yo, las puede utilizar.
          </div>
    
          <div class="signature-section">
            <div class="content" style="text-align: center; margin-bottom: 50px;">Atentamente</div>
            
            <div class="line"></div>
            <div style="font-weight: bold;">${employee.employeeName} ${employee.employeeLastName}</div>
            <div>Empleado Responsable</div>
          </div>
    
        </body>
        </html>
      `;
}