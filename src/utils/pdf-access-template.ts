import { AccessRequest } from "src/access-requests/entities/access-request.entity";

export const generateAccessRequestHtml = (request: AccessRequest): string =>{
    const dateObj = new Date(request.accessDate);
    const dateStr = dateObj.toLocaleDateString('es-ES', {day: '2-digit', month:'2-digit', year: 'numeric'});
    const providerName = request.providerName ? request.providerName : 'Externo/Independiente';

    const applicantCenterName = request.location?.locationName || 'N/A';
    const accessCenterName = request.location?.locationName || 'N/A';
    const logoHtml = `<div style="color: #FF0000; font-weight: bold; font-size: 24px;">oerlikon <span style="color: #666; font-weight: normal;">balzers</span></div>`;

    return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; margin: 40px; font-size: 12px; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 10px; }
        td { padding: 6px 10px; vertical-align: middle; border: 1px solid white; }
        .bg-red { background-color: #FF0000; color: white; font-weight: bold; }
        .bg-gray { background-color: #E6E6E6; color: black; }
        .section-header { text-align: left; font-size: 14px; padding: 5px; }
        .main-title { text-align: center; font-size: 16px; padding: 8px; margin-top: 10px; }
        .label-cell { width: 35%; }
        .value-cell { width: 65%; text-align: center; }
        .dashed-lines { border-bottom: 1px dashed #000; height: 20px; margin-bottom: 5px; }
      </style>
    </head>
    <body>

      <div style="margin-bottom: 10px;">${logoHtml}</div>

      <table style="margin-bottom: 20px;">
        <tr><td class="bg-red main-title">Solicitud de autorización de ingreso</td></tr>
      </table>

      <table style="margin-bottom: 0;">
        <tr><td class="bg-red section-header" colspan="2">Datos del solicitante</td></tr>
      </table>
      
      <table>
        <tr>
          <td class="bg-red label-cell">Nombre</td>
          <td class="bg-gray value-cell">${request.applicantFullName}</td>
        </tr>
        <tr>
          <td class="bg-red label-cell">Área</td>
          <td class="bg-gray value-cell">IT (Sistemas)</td>
        </tr>
        <tr>
          <td class="bg-red label-cell">Centro del solicitante</td>
          <td class="bg-gray value-cell">${applicantCenterName}</td>
        </tr>
      </table>

      <table>
        <tr>
          <td class="bg-red label-cell">Centro al que solicita el acceso</td>
          <td class="bg-gray value-cell">${accessCenterName}</td>
        </tr>
      </table>
      <br>

      <table style="margin-bottom: 0;">
        <tr><td class="bg-red section-header" colspan="2">Datos del personal que ingresará</td></tr>
      </table>

      <table style="border: 0;">
        <tr>
          <td class="bg-red label-cell" style="vertical-align: top; height: 200px;">
            <div style="margin-bottom: 10px;">Empresa</div>
            <div style="border-top: 1px dashed white; margin: 10px 0;"></div>
            <div>Nombre/s</div>
          </td>
          <td class="value-cell" style="background-color: white; vertical-align: top; text-align: left; padding: 0;">
            <div style="padding: 6px 10px; border-bottom: 1px dashed black;">${providerName}</div>
            <div style="padding: 6px 10px; font-weight: bold;">${request.visitorName}</div>
            <div style="padding: 0 10px;">
              <div class="dashed-lines"></div><div class="dashed-lines"></div><div class="dashed-lines"></div>
              <div class="dashed-lines"></div><div class="dashed-lines"></div><div class="dashed-lines"></div>
            </div>
          </td>
        </tr>
      </table>

      <table style="margin-top: -1px;">
        <tr>
          <td class="bg-red label-cell">Motivo de ingreso a planta</td>
          <td class="value-cell" style="border: 1px solid #ccc; text-align: left;">${request.accessReason}</td>
        </tr>
        <tr>
          <td class="bg-red label-cell">Fecha de ingreso</td>
          <td class="value-cell" style="border: 1px solid #ccc; text-align: left;">${dateStr}</td>
        </tr>
        <tr>
          <td class="bg-red label-cell">Hora de entrada</td>
          <td class="value-cell" style="border: 1px solid #ccc; text-align: left;">${request.accessHour}</td>
        </tr>
        <tr>
          <td class="bg-red label-cell">Duración de la visita</td>
          <td class="value-cell" style="border: 1px solid #ccc; text-align: left;">${request.accessDuration}</td>
        </tr>
      </table>

    </body>
    </html>
  `;
}