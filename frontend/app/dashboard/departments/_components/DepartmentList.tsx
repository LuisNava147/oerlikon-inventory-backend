'use client';

import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  Pagination, Chip
} from "@heroui/react";
import { Deparment } from "@/entities";
import { useState, useMemo } from "react";
import DepartmentActions from "./DepartmentActions";
// import DepartmentActions from "./DepartmentActions"; // Lo crearemos después

const columns = [
  { name: "DEPARTAMENTO", uid: "name", align: "start" as const},
  {name: "ASIGNACIONES", uid:"count", align:"center" as const},
  { name: "ACCIONES", uid: "actions", align: "center" as const},
];

export default function DepartmentList({ departments }: { departments: Deparment[] }) {
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
                    <div className="font-bold text-slate-700">
                        {dept.departmentName}
                    </div>
                );
            case "count":
                return(
                    <div className="flex justify-center items-center">
                        <Chip size="md" variant="flat" color={dept.printerCount && dept.printerCount > 0 ? "primary" : "default"} 
                        classNames={{content:""}}>
                            {dept.printerCount || 0} impresoras asignadas.
                        </Chip>
                    </div>
                    
                )
            case "actions":
                return (
                    <div className="flex flex-col justify-center items-center">
                        <DepartmentActions departments={dept}/>
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