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
  { name: "DISPOSITIVO", uid: "device" },
  { name: "IDENTIFICADORES", uid: "ids" },
  { name: "ASIGNACIÓN", uid: "assignment" },
  { name: "UBICACIÓN", uid: "location" },
  { name: "ACCIONES", uid: "actions" },
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
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-slate-50 rounded-lg border border-slate-200 shrink-0">
                            <DeviceIcon type={device.deviceType} />
                        </div>
                        <div className="flex flex-col">
                            <p className="font-bold text-sm capitalize text-slate-800 whitespace-nowrap">
                                {device.deviceBrand} {device.deviceModel}
                            </p>
                            <p className="text-xs text-slate-500 capitalize">{device.deviceType}</p>
                        </div>
                    </div>
                );
            case "ids":
                return (
                    <div className="flex flex-col gap-1 min-w-[140px]">
                        {device.deviceSerialTag && (
                            <div className="text-xs text-slate-500">
                                <span className="font-semibold text-slate-700">S/N: </span>{device.deviceSerialTag}
                            </div>
                        )}
                        {device.deviceAssetNumber && (
                            <div className="text-xs text-slate-500">
                                <span className="font-semibold text-slate-700">AF: </span>{device.deviceAssetNumber}
                            </div>
                        )}
                         {device.deviceHostName && (
                            <Chip size="sm" variant="flat" className="h-5 text-[10px] bg-slate-100 text-slate-600 max-w-fit">
                                {device.deviceHostName}
                            </Chip>
                        )}
                    </div>
                );
            case "assignment":
                if (device.employee) {
                    return (
                        <div className="min-w-[150px]">
                            <User
                                name={`${device.employee.employeeName} ${device.employee.employeeLastName}`}
                                description={device.employee.employeeEmail}
                                avatarProps={{ size: "sm", className: "bg-blue-100 text-blue-600 shrink-0" }}
                                classNames={{
                                    name: "text-xs font-semibold text-slate-700 whitespace-nowrap",
                                    description: "text-[10px] text-slate-400"
                                }}
                            />
                        </div>
                    );
                }
                return <Chip size="sm" color="success" variant="flat" className="text-xs">Disponible</Chip>;

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
            <div className="text-center py-10 bg-slate-50 rounded-xl border border-dashed border-slate-300">
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
                        <TableColumn key={column.uid} align={column.uid === "actions" ? "center" : "start"}>
                            {column.name}
                        </TableColumn>
                    )}
                </TableHeader>
                <TableBody items={items}>
                    {(item) => (
                        // 1. CORRECCIÓN CLAVE: Aseguramos que la key sea string y nunca undefined
                        <TableRow key={item.deviceId || Math.random().toString()}> 
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