"use client"

import {
    Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
    User, Chip, Pagination
  } from "@heroui/react";
  import { Deparment, Device, Employee, Location } from "@/entities";
  import { useState, useMemo } from "react";
import EmployeeActions from "./EmployeeActions";
import ViewAssetsModal from "./ViewAssetsModal";

  const columns = [
    {name: "EMPLEADO", uid: "employee", align: "start" as const},
    {name: "DATOS", uid: "data", align: "center" as const},
    {name: "ACTIVOS", uid: "assets", align: "center" as const},
    {name: "UBICACIÓN", uid: "location", align: "center" as const},
    {name: "ACCIONES", uid: "actions", align: "center" as const}
  ]

  interface Props {
    employees: Employee[]
    devices:Device[]
    locations: Location[]
    departments: Deparment[]
    onClose:()=>void
  }
  export default function EmployeeList({employees, devices, locations, departments, onClose}: Props){
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(employees.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return employees.slice(start, start + rowsPerPage);
    }, [page, employees]);

    const renderCell = (employee: Employee, columnKey: React.Key) =>{
        const locationName = typeof employee.location === 'object' && employee.location !== null
        ? employee.location.locationName 
        : "Sin ubicación";
        
        switch(columnKey){
            case "employee":
                return(
                    <div className="">
                    <User  
                    name={`${employee.employeeName} ${employee.employeeLastName}`}
                    avatarProps={{ size: "md", className: "bg-blue-100 text-blue-600 shrink-0" }}
                    classNames={{
                        name: "text-md font-semibold text-slate-700 whitespace-nowrap",
                        description: "text-[10px] text-slate-400"
                    }}
                    />
                    </div>
                    
                )
            case "data":
                return(
                    <div className=" flex flex-col gap-1 min-w-[180px]">
                        {employee.employeePhoneNumber && (
                            <div className="text-xs text-slate-500 flex justify-between items-center w-full border-b border-slate-200 pb-1">
                            <span className="font-semibold text-slate-700 block">TELÉFONO: </span>
                            <span className="font-semibold text-slate-500 text-right ml-2 truncate font-medum">{employee.employeePhoneNumber}</span>
                        </div>
                        )}

                        {employee.employeeEmail && (
                            <div className="text-xs text-slate-500 flex justify-between items-center w-full border-b border-slate-200 pb-1">
                            <span className="font-semibold text-slate-700 block">CORREO: </span>
                            <span className="font-semibold text-slate-500 text-right ml-2 truncate font-medum">{employee.employeeEmail}</span>
                        </div>
                        )}
                        {employee.department?.departmentName && (
                            <div className=" text-xs flex justify-between items-center w-full">
                                <span className="font-semibold text-slate-700 block">
                                DEPARTAMENTO:
                                </span>
                                <span className="font-semibold text-slate-500 text-right ml-2 truncate font-medum">
                                {employee.department.departmentName}
                                </span>
                            </div>
                        )}
                        
                    </div>
                )
            case "assets":
                const deviceList= Array.isArray(employee.device) ? employee.device : []
                return(
                    <div className="flex justify-center">
                        <ViewAssetsModal employees={employee} devices={deviceList}/>
                    </div>
                )
            case "location":
                return(
                    <div className="flex flex-col min-w-[100px]">
                        <span className="text-sm text-slate-700 whitespace-nowrap">
                            {locationName}
                        </span>
                    </div>
                )
            case "actions":
                return(
                    <EmployeeActions employees={employee} departments={departments} locations={locations} onClose={onClose} />
                )
        }   
    }

    if(employees.length === 0){
        return(
            <div className="text-center py-10 bg-slate-200 rounded-xl border border-collapse border-slate-300">
                <p className="text-slate-500">No se encontraron Empleados.</p>
            </div>
        )
    }
    return (
        <div className="w-full overflow-x-auto pb-4">
            <Table 
                aria-label="Tabla de Empleados"
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
                        <TableRow key={item.employeeId || Math.random().toString()} className="border-b border-slate-200 last:border-none hover:bg-slate-50 transition-colors"> 
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