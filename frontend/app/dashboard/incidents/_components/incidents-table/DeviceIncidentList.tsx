'use client';

import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  User, Chip, Pagination
} from "@heroui/react";
import { Deparment, Device, Employee, Incident, Location } from "@/entities";
import { useState, useMemo } from "react";
import { CircleAlert, Printer } from "lucide-react";
import DeviceIncidentActions from "./DeviceIncidentActions";

const columns = [
    {name: "REPORTE #", uid: "report", align: "start" as const},
    {name: "DESCRIPCIÓN", uid: "description", align: "center" as const},
    {name: "EQUIPO AFECTADO", uid: "device", align: "center" as const},
    {name: "ESTADO", uid: "status", align: "center" as const},
    {name: "FECHA DE REPORTE", uid: "date", align: "center" as const},
    {name: "ACCIONES", uid: "actions", align: "center" as const}
]

export default function DeviceIncidentList({incidents, departments, devices}:
    {incidents: Incident[], departments: Deparment[], devices: Device[]}){

    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(incidents.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return incidents.slice(start, start + rowsPerPage);
    }, [page, incidents]);

    const renderCell = (incident: Incident, columnKey: React.Key) => {
        switch(columnKey){
            case "report":
                return (
                    <div className="flex items-center gap-3 min-w-[160px] ">
                        <div className="p-2 bg-red-50 rounded-lg text-red-500 shrink-0">
                            <CircleAlert size={30}/>  
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm text-slate-800 whitespace-nowrap">
                                #{incident.reportNumber} - {incident.device?.deviceType}
                            </span>
                            <span className="text-xs text-slate-400 uppercase font-medium">
                                Incidente
                            </span>
                        </div>
                    </div>
                );
            case "description":
                return(
                    <div className="flex flex-col gap-2 py-2 max-w-[300px] text-start">
                    {incident.incidentDescription && (
                        <div className="text-xs text-slate-500 w-full">
                            <span className="font-semibold text-slate-700 text-start block">PROBLEMA:</span>
                            <span className="text-xs font-semibold text-slate-500 text-right">{incident.incidentDescription}</span>
                        </div>
                    )}
                    {incident.incidentNote && (
                        <div className="text-xs text-slate-500 w-full">
                        <span className="font-semibold text-slate-700 text-start block">NOTAS-RESOLUCIÓN:</span>
                        <span className="text-xs font-semibold text-slate-500 text-right">{incident.incidentNote}</span>
                    </div>
                    )}
                    </div>
                )
            case "device":
                return(
                    <div className="flex flex-col gap-0.5">
                       <span className="font-semibold text-slate-700 text-sm border-b border-slate-200 pb-1">
                        {incident.device?.deviceType} {incident.device?.deviceBrand}
                       </span>
                       <span className="text-xs text-slate-500">
                        Modelo: {incident.device?.deviceModel}
                       </span>
                       <div className="flex justify-between items-center w-full">
                       <span className="text-xs text-slate-500 block">
                        <strong>S/N:</strong>
                       </span>
                       <span className="text-xs text-slate-500 text-right ml-2">
                        {incident.device?.deviceSerialTag}
                       </span>
                       </div>

                        {incident.device?.department?.departmentName && (
                            <div className="flex justify-between items-center w-full">
                                <span className="text-xs text-slate-500 block">
                                <strong>Departamento:</strong>
                                </span>
                                <span className="text-xs text-slate-500 text-right ml-2">
                                {incident.device.department.departmentName}
                                </span>
                            </div>
                        )}
                       
                       {incident.device?.location?.locationName && (
                            <div className="flex justify-between items-center w-full">
                                <span className="text-xs text-slate-500 block">
                                <strong>Ubicación:</strong>
                                </span>
                                <span className="text-xs text-slate-500 text-right ml-2">
                                {incident.device.location?.locationName || "Sin Ubicación"}
                                </span>
                            </div>
                        )}
                    </div>
                )
            case "status":
                return(
                    <div className="flex justify-center gap-2">
                        <Chip size="sm" variant="flat" color={incident.status && incident.status === 'PENDIENTE' ? "danger" : "success"}
                        className="font-semibold capitalize">
                            {incident.status}
                        </Chip>
                    </div>
                )
            case "date":
                return(
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Apertura</span>
                            <span className="text-xs font-medium text-slate-700">
                                {incident.incidentDateOpening ? new Date(incident.incidentDateOpening).toLocaleDateString('es-MX',{timeZone:'UTC'}) : "-"}
                            </span>
                        </div>
                        
                        {incident.incidentDateClose && (
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Cierre</span>
                                <span className="text-xs font-medium text-slate-700">
                                    {new Date(incident.incidentDateClose).toLocaleDateString('es-MX',{timeZone:'UTC'})}
                                </span>
                            </div>
                        )}
                    </div>
                )
            case "actions":
                return(
                    <DeviceIncidentActions incidents={incident}/>
                )

        }
    }

    return (
        <div className="w-full overflow-x-auto pb-4">
            <Table 
                aria-label="Tabla de dispositivos"
                className="min-w-[800px]" 
                removeWrapper 
                isStriped
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.align || "start"}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        // 1. CORRECCIÓN CLAVE: Aseguramos que la key sea string y nunca undefined
                        <TableRow key={item.incidentId || Math.random().toString()} className="border-b border-slate-200 last:border-none hover:bg-slate-50 transition-colors"> 
                            {(columnKey) => <TableCell>{renderCell(item, columnKey)}</TableCell>}
                        </TableRow>
                    )}
                </TableBody>
            </Table>

            {pages > 1 && (
                <div className="flex w-full justify-center mt-4">
                    <Pagination
                        isCompact
                        showControls
                        total={pages}
                        page={page}
                        onChange={setPage}
                        color="primary"
                    />
                </div>
            )}
        </div>
    );
}