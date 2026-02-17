'use client';


import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  User, Chip, Pagination
} from "@heroui/react";
import { Deparment, Device, Employee, Location } from "@/entities";
import { useState, useMemo } from "react";


const columns = [
    { name: "DISPOSITIVO", uid: "device", align: "start" as const},
    { name: "IDENTIFICADORES", uid: "ids", align: "center" as const},
    { name: "ASIGNACIÓN", uid: "assignment", align: "center" as const},
    { name: "UBICACIÓN", uid: "location", align: "center" as const},
    { name: "ACCIONES", uid: "actions", align: "center" as const},
  ];


export default function LowDeviceList({ devices }: {devices:Device[]}){
    if(devices.length === 0){
        return(
            <div className="p-10 text-center text-slate-400">
                <p>No se encontraron equipos dados de baja en esta categoria.</p>
            </div>
        )
    }
    return(
        <Table aria-label="Tabla de equipos en baja" shadow="none">
      <TableHeader>
        <TableColumn>DISPOSITIVO</TableColumn>
        <TableColumn>IDENTIFICADORES</TableColumn>
        <TableColumn>UBICACIÓN ANTERIOR</TableColumn>
        <TableColumn>ESTATUS</TableColumn>
      </TableHeader>
      <TableBody>
        {devices.map((device) => (
          <TableRow key={device.deviceId}>
            <TableCell>
              <div className="flex flex-col">
                <span className="font-bold text-slate-700">{device.deviceModel}</span>
                <span className="text-tiny text-slate-400">{device.deviceType}</span>
                <span className="text-tiny text-slate-400">{device.deviceBrand}</span>
              </div>
            </TableCell>
            <TableCell>
              <div className="flex flex-col gap-1">
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded w-fit">S/N: {device.deviceSerialTag}</span>
                <span className="text-xs bg-slate-100 px-2 py-0.5 rounded w-fit">AF: {device.deviceAssetNumber}</span>
              </div>
            </TableCell>
            <TableCell>
              {typeof device.location === 'object' ? device.location?.locationName : device.location || "Sin dato"}
            </TableCell>
            <TableCell>
              <Chip color="danger" variant="flat" size="sm">{device.deviceStatus}</Chip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    )
}
