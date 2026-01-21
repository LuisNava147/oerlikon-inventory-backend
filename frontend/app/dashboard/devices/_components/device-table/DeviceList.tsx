'use client';

import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  User, Chip, Pagination
} from "@heroui/react";
import { Device } from "@/entities";
import { useState, useMemo } from "react";
import DeviceIcon from "./DeviceIcon";       
import DeviceActions from "./DeviceActions"; 

const columns = [
  { name: "DISPOSITIVO", uid: "device", align: "center" },
  { name: "IDENTIFICADORES", uid: "ids", align: "center" },
  { name: "ASIGNACIÓN", uid: "assignment", align: "center" },
  { name: "UBICACIÓN", uid: "location", align: "center" },
  { name: "ACCIONES", uid: "actions", align: "center" },
];

export default function DeviceList({ devices }: { devices: Device[] }) {
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(devices.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return devices.slice(start, start + rowsPerPage);
    }, [page, devices]);

    const renderCell = (device: Device, columnKey: React.Key) => {
        switch (columnKey) {
            case "device":
                return (
                    <div className="flex items-center gap-3 min-w-[160px] ">
                        <div className=" flex items-start justify-start p-2 bg-slate-100 rounded-md border border-slate-200 shrink-0">
                            <DeviceIcon type={device.deviceType} />
                            
                        </div>
                        <div className="flex flex-col text-start">
                            <p className="font-bold text-sm capitalize text-slate-800 whitespace-nowrap">
                                {device.deviceBrand} {device.deviceModel}
                            </p>
                            <p className="text-xs text-slate-500 capitalize">{device.deviceType}</p>
                        </div>
                    </div>
                );
            case "ids":
                return (
                    <div className="flex flex-col  gap-1 min-w-[160px]">
                        {device.deviceSerialTag && (
                            <div className="text-xs text-slate-500 flex justify-between items-center w-full border-b border-slate-200 pb-1 ">
                                <span className="font-semibold text-slate-700 block">S/N: </span>
                                <span className="font-semibold text-slate-500 text-right ml-2 truncate font-medum">{device.deviceSerialTag}</span>
                            </div>
                        )}
                        {device.deviceAssetNumber && (
                            <div className="text-xs text-slate-500 flex justify-between items-center w-full border-b border-slate-200 pb-1">
                                <span className="font-semibold text-slate-700 block">NO. ACTIVO: </span>
                                <span className="font-semibold text-red-500 text-right ml-2 truncate font-medum">{device.deviceAssetNumber}</span>
                            </div>
                        )}
                         {device.deviceHostName && (
                            <div className="text-xs text-slate-500 flex justify-between items-center w-full ">
                            <span className="font-semibold text-slate-700 block">HOSTNAME: </span>
                            <span className="font-semibold text-slate-500 text-right ml-2 truncate font-medum">{device.deviceHostName}</span>
                        </div>
                        )}
                    </div>
                );
            case "assignment":
                if (device.employee) {
                    return (
                        <div className="min-w-[160px] items-center text-center">
                            <User
                                name={`${device.employee.employeeName} ${device.employee.employeeLastName}`}
                                description={device.employee.employeeEmail}
                                avatarProps={{ size: "sm", className: "bg-blue-100 text-blue-600 shrink-0" }}
                                classNames={{
                                    name: "text-md font-semibold text-slate-700 whitespace-nowrap",
                                    description: "text-[10px] text-slate-400"
                                }}
                            />
                        </div>
                    );
                }
                return <div className="min-w-[160px] items-center text-center">
                        <Chip size="md" color="success" variant="flat" className="text-md">En stock</Chip>
                </div>
                
                

            case "location":
                return (
                    <div className="flex flex-col min-w-[100px]">
                        <span className="text-sm text-slate-700 whitespace-nowrap">
                            {typeof device.location === 'object' ? device.location?.locationName : "Sin ubicación"}
                        </span>
                    </div>
                );

            case "actions":
                return <DeviceActions deviceId={device.deviceId} />;
            default: return null;
        }
    };

    if (devices.length === 0) {
        return (
            <div className="text-center py-10 bg-slate-200 rounded-xl border border-collapse border-slate-300">
                <p className="text-slate-500">No se encontraron dispositivos.</p>
            </div>
        );
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
                        <TableRow key={item.deviceId || Math.random().toString()} className="border-b border-slate-200 last:border-none hover:bg-slate-50 transition-colors"> 
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