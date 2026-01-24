
import { Button, Tooltip } from "@heroui/react";
import { Deparment, Device, Employee, Location } from "@/entities";
import UpdatePrinter from "./PrinterUpdate";
import DeleteDeviceButton from "@/app/dashboard/devices/_components/device-table/DeleteDeviceButton";



export default function PrinterActions({devices, locations, departments, onClose}:{devices:Device, locations:Location[], departments: Deparment[], onClose: ()=>void}){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Editar">
            <UpdatePrinter locations={locations} departments={departments} devices={devices} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <DeleteDeviceButton  device={devices}/>
            </Tooltip>
        </div>
    )
}