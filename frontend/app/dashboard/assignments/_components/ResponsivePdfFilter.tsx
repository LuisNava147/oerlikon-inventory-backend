"use client";

import { Assignment } from "@/entities";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { ResponsivaDocument } from "./ResponsiveDocument";
import { Tooltip } from "@heroui/react";
import { FileDown, Loader2 } from "lucide-react";

interface Props {
    assignment: Assignment;
}

export default function ResponsivePdfFilter({ assignment }: Props) {
    if (!assignment || !assignment.employee) return null;

    //la estructura Many-to-Many, UNA sola asignación contiene todos los equipos.
    // Metemos la asignación en un array [] porque el componente ResponsivaDocument espera una lista.
    const dataForPdf = [assignment];

    // Generación del nombre del archivo:
    //Limpiamos espacios y formateamos la fecha
    const safeName = `${assignment.employee.employeeName}_${assignment.employee.employeeLastName}`.replace(/\s+/g, '_');
    const dateStr = assignment.assignmentDate 
        ? new Date(assignment.assignmentDate).toISOString().split('T')[0] 
        : 'fecha';
        
    const fileName = `Responsiva_${safeName}_${dateStr}.pdf`;

    return (
        <div className="flex items-center gap-2 justify-center">
            <PDFDownloadLink
                document={<ResponsivaDocument assignments={dataForPdf} />}
                fileName={fileName}
            >
                {({ loading }) => (
                    <Tooltip content="Descargar Responsiva">
                        {/* Usamos un div como wrapper para evitar problemas de props con el Tooltip */}
                        <div className="cursor-pointer text-default-400 active:opacity-50 hover:text-blue-600 flex items-center justify-center">
                            {loading ? (
                                // Mostramos un spinner mientras se genera el PDF
                                <Loader2 className="animate-spin" size={20} />
                            ) : (
                                // Icono normal de descarga
                                <FileDown size={20} />
                            )}
                        </div>
                    </Tooltip>
                )}
            </PDFDownloadLink>
        </div>
    );
}