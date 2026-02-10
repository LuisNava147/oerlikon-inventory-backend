"use client";

import { useState, useEffect } from "react";
import { Input, Button, Card, CardBody, CardHeader, Textarea, Divider } from "@heroui/react";
import { FileDown, RefreshCw, Eraser, MapPinHouse } from "lucide-react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import { AccessRequestDocument, AccessRequestData } from "./_components/AccessRequestDocument"; // Ajusta la ruta

// Estado inicial vacío
const INITIAL_STATE: AccessRequestData = {
    applicantName: "",
    center: "Querétaro PVD",
    providerName: "",
    visitorNames: "",
    reason: "",
    date: new Date().toISOString().split('T')[0],
    time: "09:00",
    duration: "1 hora"
};

export default function AccessRequestPage() {
    const [formData, setFormData] = useState<AccessRequestData>(INITIAL_STATE);
    const [isClient, setIsClient] = useState(false);

    // Evitar errores de hidratación con React PDF
    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleChange = (name: keyof AccessRequestData, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleClear = () => {
        setFormData(INITIAL_STATE);
    };

    const isValid = formData.applicantName && formData.visitorNames && formData.reason;

    return (
        <div className="w-full h-auto flex flex-col gap-6 mt-4">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-slate-800 ml-4">Generador de Pases de Acceso</h1>
                <p className="text-slate-500 ml-4">Genere el PDF para ingreso de proveedores sin guardar registros en el sistema.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <Card className="shadow-sm border border-slate-200">
                    <CardHeader className="bg-slate-50 flex justify-between items-center">
                        <div className="flex justify-start items-center">
                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                            <MapPinHouse size={18}/>
                        </div>
                        <span className="font-bold text-lg text-slate-700 ml-4">Datos del Pase</span>
                        </div>
                        <div className="flex justify-between items-center">
                        <Button size="sm" variant="light" color="danger" startContent={<Eraser size={16}/>} onPress={handleClear}>
                            Limpiar 
                        </Button>
                        </div>
                        
                    </CardHeader>
                    <Divider/>
                    <CardBody className="gap-4">
                        
                        <span className="text-xs font-bold text-slate-400 uppercase">Solicitante (IT)</span>
                        <div className="grid grid-cols-2 gap-2">
                            <Input 
                                label="Nombre Solicitante" 
                                placeholder="Tu nombre" 
                                value={formData.applicantName} 
                                onValueChange={(v) => handleChange("applicantName", v)}
                                isRequired
                            />
                            <Input 
                                label="Centro/Planta" 
                                value={formData.center} 
                                onValueChange={(v) => handleChange("center", v)}
                            />
                        </div>

                        <span className="text-xs font-bold text-slate-400 uppercase mt-2">Visitante / Proveedor</span>
                        <Input 
                            label="Empresa Proveedora" 
                            placeholder="Ej. Konica, Dell, Independiente..." 
                            value={formData.providerName} 
                            onValueChange={(v) => handleChange("providerName", v)}
                        />
                        <Textarea 
                            label="Nombres de Visitantes" 
                            placeholder="Juan Pérez, Maria Lopez..." 
                            minRows={2}
                            value={formData.visitorNames} 
                            onValueChange={(v) => handleChange("visitorNames", v)}
                            isRequired
                        />

                        <span className="text-xs font-bold text-slate-400 uppercase mt-2">Detalles del Acceso</span>
                        <Input 
                            label="Motivo de Visita" 
                            placeholder="Mantenimiento a Site, Entrega de equipos..." 
                            value={formData.reason} 
                            onValueChange={(v) => handleChange("reason", v)}
                            isRequired
                        />
                        <div className="grid grid-cols-3 gap-2">
                            <Input 
                                type="date" 
                                label="Fecha" 
                                value={formData.date} 
                                onValueChange={(v) => handleChange("date", v)}
                            />
                            <Input 
                                type="time" 
                                label="Hora" 
                                value={formData.time} 
                                onValueChange={(v) => handleChange("time", v)}
                            />
                            <Input 
                                label="Duración" 
                                value={formData.duration} 
                                onValueChange={(v) => handleChange("duration", v)}
                            />
                        </div>
                    </CardBody>
                </Card>

                <div className="flex flex-col gap-4 pr-2">
                    <Card className="bg-blue-50 border border-blue-100 shadow-none">
                        <CardBody className="text-center py-10 gap-4">
                            <h3 className="text-lg font-bold text-blue-900">¿Listo para descargar?</h3>
                            <p className="text-sm text-blue-700 px-4">
                                Asegúrese de llenar todos los campos obligatorios antes de generar el PDF.
                            </p>
                            
                            {isClient && (
                                <div className="flex justify-center mt-2">
                                    {isValid ? (
                                        <PDFDownloadLink
                                            document={<AccessRequestDocument data={formData} />}
                                            fileName={`Acceso_${formData.providerName || 'Visitante'}_${formData.date}.pdf`}
                                        >
                                            {({ loading }) => (
                                                <Button 
                                                    color="primary" 
                                                    size="lg" 
                                                    className="font-bold shadow-lg w-full"
                                                    startContent={loading ? <RefreshCw className="animate-spin"/> : <FileDown />}
                                                    isLoading={loading}
                                                >
                                                    {loading ? "Generando..." : "Descargar PDF"}
                                                </Button>
                                            )}
                                        </PDFDownloadLink>
                                    ) : (
                                        <Button isDisabled size="lg" variant="faded">
                                            Llene los datos requeridos
                                        </Button>
                                    )}
                                </div>
                            )}
                        </CardBody>
                    </Card>

                    <Card className="shadow-none border border-slate-200">
                        <CardBody>
                            <h4 className="font-bold text-sm mb-2">Vista Previa de Datos:</h4>
                            <ul className="text-sm space-y-1 text-slate-600">
                                <li><strong>Solicita:</strong> {formData.applicantName || "..."}</li>
                                <li><strong>Visita:</strong> {formData.visitorNames || "..."}</li>
                                <li><strong>Empresa:</strong> {formData.providerName || "..."}</li>
                                <li><strong>Fecha:</strong> {formData.date} a las {formData.time}</li>
                            </ul>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </div>
    );
}