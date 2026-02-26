'use client';

import {
  Table, TableHeader, TableColumn, TableBody, TableRow, TableCell,
  User, Chip, Pagination
} from "@heroui/react";
import { Deparment, Device, Employee, Incident, Location, TicketIncident } from "@/entities";
import { useState, useMemo } from "react";
import { CircleAlert, ExternalLink, Printer, Ticket } from "lucide-react";
import TicketActions from "./TicketActions";

const columns = [
    {name: "TICKET #", uid: "ticket", align: "start" as const},
    {name: "DESCRIPCIÓN", uid: "description", align: "center" as const},
    {name: "ESTADO", uid: "status", align: "center" as const},
    {name: "FECHA DE REPORTE", uid: "date", align: "center" as const},
    {name: "ACCIONES", uid: "actions", align: "center" as const}
]

export default function TicketList({tickets}:{tickets:TicketIncident[]}){
    const [page, setPage] = useState(1);
    const rowsPerPage = 10;
    const pages = Math.ceil(tickets.length / rowsPerPage);

    const items = useMemo(() => {
        const start = (page - 1) * rowsPerPage;
        return tickets.slice(start, start + rowsPerPage);
    }, [page, tickets]);

    const renderCell = (ticket: TicketIncident, columnKey: React.Key) => {
        switch(columnKey){
            case "ticket":
                return(
                    <div className="flex items-center gap-3 min-w-[160px] ">
                        <div className="p-2 bg-red-50 rounded-lg text-red-500 shrink-0">
                            <Ticket size={30}/>  
                        </div>
                        <div className="flex flex-col">
                            <span className="font-bold text-sm text-slate-800 whitespace-nowrap">
                                #{ticket.ticketName}
                            </span>
                            <span className="text-xs text-slate-400 uppercase font-medium">
                                Incidente
                            </span>
                        </div>
                    </div>
                )
                case "description":
                    const href = ticket.ticketLink.startsWith('http') 
                    ? ticket.ticketLink 
                    : `https://${ticket.ticketLink}`;
                return(
                    <div className="flex flex-col gap-2 py-2 max-w-[300px] text-start">
                    {ticket.ticketDescription && (
                        <div className="text-xs text-slate-500 w-full">
                            <span className="font-semibold text-slate-700 text-start block">PROBLEMA:</span>
                            <span className="text-xs font-semibold text-slate-500 text-right">{ticket.ticketDescription}</span>
                        </div>
                    )}
                    
                    {ticket.ticketLink && (
                       
                        <div className="text-xs text-slate-500 w-full">
                            <span className="font-semibold text-slate-700 text-start block">LIGA DE ACCESO:</span> 
                            <a href={href} target="_blank" rel="noopener noreferrer"
                            className="text-blue-600 font-medium hover:underline hover:text-blue-800 flex items-center gap-1 transition-colors">
                                Abrir Enlace <ExternalLink size={14} />
                            </a>
                    </div>
                    )}
                    </div>
                )
                case "status":
                return(
                    <div className="flex justify-center gap-2">
                        <Chip size="sm" variant="flat" color={ticket.status && ticket.status === 'PENDIENTE' ? "danger" : "success"}
                        className="font-semibold capitalize">
                            {ticket.status}
                        </Chip>
                    </div>
                )
                case "date":
                return(
                    <div className="flex flex-col gap-2">
                        <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-slate-400 uppercase">Apertura</span>
                            <span className="text-xs font-medium text-slate-700">
                                {ticket.ticketDateOpening ? new Date(ticket.ticketDateOpening).toLocaleDateString('es-MX',{timeZone:'UTC'}) : "-"}
                            </span>
                        </div>
                        
                        {ticket.ticketDateClose && (
                            <div className="flex flex-col">
                                <span className="text-[10px] font-bold text-slate-400 uppercase">Cierre</span>
                                <span className="text-xs font-medium text-slate-700">
                                    {new Date(ticket.ticketDateClose).toLocaleDateString('es-MX',{timeZone:'UTC'})}
                                </span>
                            </div>
                        )}
                    </div>
                )
            case "actions":
                return(
                    <TicketActions tickets={ticket}/>
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
                        <TableRow key={item.ticketIncidentId || Math.random().toString()} className="border-b border-slate-200 last:border-none hover:bg-slate-50 transition-colors"> 
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
