'use client';

import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Pagination, Chip, Tooltip
} from "@heroui/react";
import { Deparment, Location } from "@/entities";
import { useState, useMemo } from "react";
import DepartmentActions from "./DepartmentActions";
import { BriefcaseBusiness, Keyboard, Laptop, Monitor, Printer, QrCode, TabletSmartphone, User, Users } from "lucide-react";
// import DepartmentActions from "./DepartmentActions"; // Lo crearemos después

const columns = [
  { name: "DEPARTAMENTO", uid: "name", align: "start" as const, width: 250},
  {name: "ASIGNACIONES", uid:"count", align:"center" as const},
  { name: "ACCIONES", uid: "actions", align: "center" as const, width: 100},
];

export default function DepartmentList({ departments, locations }: { departments: Deparment[], locations:Location[] }) {
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(departments.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return departments.slice(start, start + rowsPerPage);
    }, [page, departments]);


    const renderCell = (dept: Deparment, columnKey: React.Key) => {
        switch (columnKey) {
            case "name":
                return (
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-red-50 rounded-lg text-red-500">
                            <BriefcaseBusiness size={30}/>
                        </div>
                        <div className="flex flex-col text-start">
                            <span className="font-bold text-sm text-slate-800">
                                {dept.departmentName}
                            </span>
                            <span className="text-xs text-slate-400 uppercase font-medium">
                                {dept.location?.locationName || "Sin ubicación"}
                            </span>
                        </div>
                    </div>
                    
                );
            case "count":
                return(
                    <div className="flex flex-col gap-1 max-w-sm">
                            <div className="text-xs text-slate-500 flex justify-between items-center w-full border-b border-slate-200 pb-1 ">
                                <div className="flex items-center">
                                <User size={20} className="text-slate-400 mr-2"/>
                                <span className="font-semibold text-slate-700 text-start">Empleados: </span>
                                </div>
                                
                                <span className="font-semibold text-slate-500 text-right ml-2 truncate font-medum">
                                    <strong className="text-red-600">{dept.employeeCount || 0}</strong>  asignados
                                </span>
                            </div>
                            <div className="text-xs text-slate-500 flex justify-between items-center w-full border-b border-slate-200 pb-1 ">
                                <div className="flex items-center">
                                <Laptop size={20} className="text-slate-400 mr-2"/>
                                <span className="font-semibold text-slate-700 text-start">Equipos: </span>
                                </div>
                                <span className="font-semibold text-slate-500 text-right ml-2 truncate font-medum">
                                    <strong className="text-red-600">{dept.deviceCount || 0}</strong>  asignados
                                </span>
                            </div>
                            <div className="text-xs text-slate-500 flex justify-between items-center w-full border-b border-slate-200 pb-1 ">
                                <div className="flex items-center">
                                <Printer size={20} className="text-slate-400 mr-2"/>
                                <span className="font-semibold text-slate-700">Impresoras: </span>
                                </div>
                                <span className="font-semibold text-slate-500 text-right ml-2 truncate font-medum">
                                    <strong className="text-red-600">{dept.printerCount || 0}</strong>  asignados
                                </span>
                            </div>
                            <div className="text-xs text-slate-500 flex justify-between items-center w-full border-b border-slate-200 pb-1 ">
                                <div className="flex items-center">
                                <TabletSmartphone size={20} className="text-slate-400 mr-2"/>
                                <span className="font-semibold text-slate-700">Dispositivos Moviles: </span>
                                </div>
                                <span className="font-semibold text-slate-500 text-right ml-2 truncate font-medum">
                                    <strong className="text-red-600">{dept.mobileCount || 0}</strong>  asignados
                                </span>
                            </div>
                            <div className="text-xs text-slate-500 flex justify-between items-center w-full border-b border-slate-200 pb-1 ">
                                <div className="flex items-center">
                                <Keyboard size={20} className="text-slate-400 mr-2"/>
                                <span className="font-semibold text-slate-700">Periféricos: </span>
                                </div>
                                <span className="font-semibold text-slate-500 text-right ml-2 truncate font-medum">
                                    <strong className="text-red-600">{dept.accesoriesCount || 0}</strong>  asignados
                                </span>
                            </div>
                            <div className="text-xs text-slate-500 flex justify-between items-center w-full border-b border-slate-200 pb-1 ">
                                <div className="flex items-center">
                                <Monitor size={20} className="text-slate-400 mr-2"/>
                                <span className="font-semibold text-slate-700">Monitores: </span>
                                </div>
                                <span className="font-semibold text-slate-500 text-right ml-2 truncate font-medum">
                                    <strong className="text-red-600">{dept.monitorCount || 0}</strong>  asignados
                                </span>
                            </div>
                            <div className="text-xs text-slate-500 flex justify-between items-center w-full ">
                                <div className="flex items-center">
                                <QrCode size={20} className="text-slate-400 mr-2"/>
                                <span className="font-semibold text-slate-700 block">Lectores de Barras: </span>
                                </div>
                                <span className="font-semibold text-slate-500 text-right ml-2 truncate font-medum">
                                    <strong className="text-red-600">{dept.barcodeCount || 0}</strong>  asignados
                                </span>
                            </div>
                    </div>
                    
                )
            case "actions":
                return (
                    <div className="flex flex-col justify-center items-center">
                        <DepartmentActions departments={dept} locations={locations}/>
                    </div>
                );
            default:
                return null;
        }
    };

    if (departments.length === 0) {
        return (
            <div className="text-center py-10 bg-slate-200 rounded-xl border border-collapse border-slate-300">
                <p className="text-slate-500">No se encontraron departamentos.</p>
            </div>
        );
    }

    return (
        <div className="w-full overflow-x-auto pb-4">
            <Table 
                aria-label="Tabla de departamentos"
                className="min-w-[600px]" 
                removeWrapper 
                isStriped
            >
                <TableHeader columns={columns}>
                    {(column) => (
                        <TableColumn key={column.uid} align={column.align}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        <TableRow key={item.departmentId} className="border-b border-slate-200 hover:bg-slate-50"> 
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