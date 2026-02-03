"use client"

import { Deparment, Incident, TicketIncident } from "@/entities";
import { Tooltip, useDisclosure } from "@heroui/react";
import { Pencil } from "lucide-react";
import UpdateTicket from "./UpdateTicket";
import DeleteTicketButton from "./DeleteTicketButton";


export default function TicketActions({tickets}:{tickets:TicketIncident}){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Marcar como Resuelto">
               <UpdateTicket tickets={tickets}/>
            </Tooltip>
            <Tooltip content="Eliminar">
               <DeleteTicketButton ticket={tickets}/>
            </Tooltip>
        </div>
    )
}