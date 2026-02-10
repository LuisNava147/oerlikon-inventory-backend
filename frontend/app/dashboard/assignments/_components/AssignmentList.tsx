'use client';

import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  User, Chip, Pagination, Button
} from "@heroui/react";
import { Assignment, Deparment, Device, Employee, Incident, Location } from "@/entities";
import { useState, useMemo, useCallback } from "react";
import { CircleAlert, FileDown, FileText, Printer } from "lucide-react";
import AssignmentActions from "./AssignmentsActions";

const columns = [
    {name: "RESPONSIVA", uid: "assignment", align: "start" as const, width: 100},
    {name: "DESCRIPCIÓN", uid: "description", align: "center" as const, width:160},
    {name: "FECHA", uid: "date", align: "center" as const, width: 120},
    {name: "ACCIONES", uid: "actions", align: "center" as const, width: 100}
]

interface Props{
    assignments: Assignment[],
    devices: Device[],
    employees: Employee[],
    onClose: () => void,
}
export default function AssignmentList({assignments, devices, employees, onClose}:Props){
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(assignments.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return assignments.slice(start, start + rowsPerPage);
    }, [page, assignments]);

    const renderCell = useCallback((assignment: Assignment, columnKey: React.Key) => {
        const devicesList = assignment.assignmentDevice?.map(ad => ad.device) || [];
        const cellValue = assignment[columnKey as keyof Assignment];
        switch(columnKey){
            case "assignment":
                return(
                    <div className="flex items-start gap-3 max-w-[100]">
                        <div className="p-2 bg-red-50 rounded-lg text-red-500 shrink-0">
                            <FileText size={30}/>  
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="font-bold text-sm text-slate-700 truncate block">
                                {assignment.employee?.employeeName} {assignment.employee?.employeeLastName}
                            </span>
                            <span className="text-xs text-slate-400 font-medium uppercase">
                                {devicesList.length} {devicesList.length === 1 ? 'equipo' : 'equipos'}
                            </span>
                        </div>
                    </div>
                )
            case "description":
                return(
                    <div className="flex flex-col gap-1max-w-md font-semibold"> 
                        {devicesList.map((dev) => (
                            <div key={dev.deviceId} className="flex flex-col text-xs border-b border-gray-100 last:border-0 pb-1">
                                <div className="flex justify-between items-center">
        
                                    <span className="text-slate-500 font-semibold min-w-[120px] truncate mr-2">
                                        {dev.deviceType} {dev.deviceBrand}
                                    </span>
                                  
                                    <span className="text-xs text-slate-400 font-semibold shrink-0">
                                        SN: {dev.deviceSerialTag}
                                    </span>
                                </div>
                            </div>
                        ))}

                        {devicesList.length === 0 && (
                            <span className="text-xs text-red-300 italic">Sin equipos vinculados</span>
                        )}
                    </div>
                )
            case "date":
                return(
                    <div className="flex flex-col gap-2">
                    <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Emitida</span>
                        <span className="text-xs font-medium text-slate-700">
                            {assignment.assignmentDate ? new Date(assignment.assignmentDate).toLocaleDateString('es-ES',{timeZone:'UTC'}) : "-"}
                        </span>
                    </div>
                    </div>
                )
            case "actions":
                    return(
                        <AssignmentActions assignments={assignment} allAssignments={assignments} />
                    )
        }
    },[assignments])

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
                        width={column.width}
                        >
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        // 1. CORRECCIÓN CLAVE: Aseguramos que la key sea string y nunca undefined
                        <TableRow key={item.assignmentId || Math.random().toString()} className="border-b border-slate-200 last:border-none hover:bg-slate-50 transition-colors"> 
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
    )
}