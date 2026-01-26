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
  { name: "NOMBRE DEL DEPARTAMENTO", uid: "name", align: "start" },
  { name: "ACCIONES", uid: "actions", align: "center" },
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
            case "id":
                return (
                    <span className="text-xs text-slate-400 font-mono">
                        {dept.departmentId}
                    </span>
                );
            case "actions":
                return (

                    <DepartmentActions departments={dept}/>
                );
            default:
                return null;
        }
    };

    if (departments.length === 0) {
        return (
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300 mt-4">
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
                        <TableColumn key={column.uid} align={column.align || "start"}>
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