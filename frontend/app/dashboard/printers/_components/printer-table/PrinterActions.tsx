
import { Button, Tooltip } from "@heroui/react";
import { Deparment, Device, Employee, Location } from "@/entities";
import UpdatePrinter from "./PrinterUpdate";
import DeleteDeviceButton from "@/app/dashboard/devices/_components/device-table/DeleteDeviceButton";
import AddDeviceNote from "@/app/dashboard/devices/_components/device-table/AddDeviceNote";

interface Props {
    devices:Device
    locations:Location[]
    onClose: ()=>void
    departments: Deparment[]
}

export default function PrinterActions({devices, locations, departments, onClose}:Props){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Historial/Nota">
            <AddDeviceNote devices={devices} />
            </Tooltip>

            <Tooltip content="Editar">
            <UpdatePrinter locations={locations} departments={departments} devices={devices} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <DeleteDeviceButton  device={devices} category="printing"/>
            </Tooltip>
        </div>
    )
}