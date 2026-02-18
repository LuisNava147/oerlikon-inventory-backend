"use client";

import { useState } from "react";
import { Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, DropdownSection, Spinner } from "@heroui/react";
import { Download, FileDown, FileSpreadsheet } from "lucide-react";
import { saveAs } from "file-saver";
import { exportBajasToExcel } from "@/actions/devices/export-bajas";

interface Props {
    category: string;
    availableModels: string[]; // Lista de modelos únicos para el dropdown
}

export default function DownloadBajasButton({ category, availableModels }: Props) {
    const [isExporting, setIsExporting] = useState(false);

    const handleExport = async (model?: string) => {
        setIsExporting(true);
        try {
            // Llamamos al Server Action
            const result = await exportBajasToExcel(category, model);

            if (result.success && result.data) {
                // Convertir Base64 a Blob para descargar
                const byteCharacters = atob(result.data);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                const blob = new Blob([byteArray], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
                
                // Disparar descarga en el navegador
                saveAs(blob, result.filename);
            } else {
                alert("Error al generar el archivo excel.");
            }
        } catch (error) {
            console.error(error);
            alert("Ocurrió un error inesperado.");
        } finally {
            setIsExporting(false);
        }
    };

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button 
                    color="success" 
                    className="text-white font-semibold shadow-md"
                    startContent={isExporting ? <Spinner size="sm" color="white" /> : <Download size={20} />}
                    isDisabled={isExporting}
                >
                    {isExporting ? "Generando..." : "Descargar Reporte"}
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Opciones de exportación" variant="flat">
                {/* Opción 1: lista general*/}
                <DropdownSection title="Reporte Completo" showDivider>
                    <DropdownItem 
                        key="all" 
                        startContent={<FileSpreadsheet size={18} className="text-green-600"/>}
                        description={`Descargar todos los equipos de ${category}`}
                        onPress={() => handleExport()} // Sin argumentos = todo
                    >
                        Descargar Todo
                    </DropdownItem>
                </DropdownSection>

                {/* Opción 2: lista por modelo */}
                <DropdownSection title="Filtrar por Modelo">
                    {availableModels.length > 0 ? (
                        availableModels.map((model) => (
                            <DropdownItem 
                                key={model} 
                                startContent={<FileDown size={16} className="text-slate-500"/>}
                                onPress={() => handleExport(model)} // Pasamos el modelo
                            >
                                Solo {model}
                            </DropdownItem>
                        ))
                    ) : (
                        <DropdownItem key="empty" isDisabled>Sin modelos disponibles</DropdownItem>
                    )}
                </DropdownSection>
            </DropdownMenu>
        </Dropdown>
    );
}