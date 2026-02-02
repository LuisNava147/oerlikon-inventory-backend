"use client"

import { Deparment, Incident } from "@/entities";
import { Tooltip, useDisclosure } from "@heroui/react";
import { Pencil } from "lucide-react";
import UpdateDeviceIncident from "./UpdateDeviceIncident";
import DeleteDeviceIncidentButton from "./DeleteIncidentButton";

export default function DeviceIncidentActions({incidents}:{incidents:Incident}){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Marcar como Resuelto">
               <UpdateDeviceIncident incidents={incidents}/>
            </Tooltip>
            <Tooltip content="Eliminar">
               <DeleteDeviceIncidentButton incident={incidents}/>
            </Tooltip>
        </div>
    )
}