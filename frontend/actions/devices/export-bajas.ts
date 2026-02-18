'use server'
import { API_URL } from "@/constants"
import { authHeaders } from "@/app/helpers/authHeaders"
import ExcelJS from 'exceljs'
import { Device } from "@/entities"

// Reutilizamos la config para saber qué filtrar en el backend
const CATEGORY_CONFIG: any = {
    computing: ["Laptop", "Desktop", "PC", "Computadora"],
    printing: ["Printer", "Impresora", "Scanner", "Multifuncional"],
    mobile: ["Celular", "Smartphone", "iPhone", "iPad", "Tablet"],
    peripheral: ["Teclado", "Mouse", "Monitor", "Docking", "Diadema", "Token"]
};

export async function exportBajasToExcel(category: string, specificModel?: string) {
    try {
        // 1. Obtener TODOS los dispositivos (igual que en tu page)
        const res = await fetch(`${API_URL}/devices`, {
            headers: { ...authHeaders() },
            cache: "no-store",
        });

        if (!res.ok) throw new Error("Error al obtener datos");
        const allDevices: Device[] = await res.json();
        
        // 2. Filtrar por BAJA y por CATEGORÍA
        const targetTypes = CATEGORY_CONFIG[category] || CATEGORY_CONFIG.computing;
        
        let filteredDevices = allDevices.filter(d => {
            const type = d.deviceType?.toLowerCase().trim() || "";
            const status = d.deviceStatus?.toUpperCase() || "";
            const isBaja = status === "BAJA";
            const matchesType = targetTypes.some((t: string) => type.includes(t.toLowerCase()));
            return isBaja && matchesType;
        });

        // 3. FILTRO ADICIONAL: SI EL USUARIO PIDIÓ UN MODELO ESPECÍFICO
        if (specificModel) {
            filteredDevices = filteredDevices.filter(d => d.deviceModel === specificModel);
        }

        // 4. Crear el Libro de Excel
        const workbook = new ExcelJS.Workbook();
        const sheet = workbook.addWorksheet(`Bajas - ${category.toUpperCase()}`);

        // Definir columnas
        sheet.columns = [
            { header: 'Tipo', key: 'type', width: 15 },
            { header: 'Marca', key: 'brand', width: 15 },
            { header: 'Modelo', key: 'model', width: 25 },
            { header: 'Serie (S/N)', key: 'serial', width: 20 },
            { header: 'Activo Fijo', key: 'asset', width: 15 },
            { header: 'Ubicación', key: 'location', width: 20 },
            { header: 'Notas / Motivo', key: 'note', width: 30 },
            { header: 'Fecha Reporte', key: 'date', width: 15 },
        ];

        // Estilar la cabecera
        sheet.getRow(1).font = { bold: true, color: { argb: 'FFFFFFFF' } };
        sheet.getRow(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFDC2626' } }; // Rojo Oerlikon

        // 5. Llenar datos
        filteredDevices.forEach(d => {
            sheet.addRow({
                type: d.deviceType,
                brand: d.deviceBrand,
                model: d.deviceModel,
                serial: d.deviceSerialTag,
                asset: d.deviceAssetNumber || "Sin Activo fijo",
                location: typeof d.location === 'object' ? d.location?.locationName : d.location,
                note: d.deviceNote || "Sin notas",
                date: new Date().toLocaleDateString() // O la fecha de baja si la tienes en DB
            });
        });

        // 6. Exportar a Buffer y luego a Base64 para enviarlo al cliente
        const buffer = await workbook.xlsx.writeBuffer();
        const base64 = Buffer.from(buffer).toString('base64');

        return { success: true, data: base64, filename: `Bajas_${category}_${specificModel || 'General'}.xlsx` };

    } catch (error) {
        console.error(error);
        return { success: false, error: "No se pudo generar el reporte" };
    }
}