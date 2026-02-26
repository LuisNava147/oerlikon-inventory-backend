import { Tooltip } from "@heroui/react";
import { Deparment, Device, Employee, Location } from "@/entities";
import UpdateAccesories from "./UpdateAccesories";
import AddDeviceNote from "../../devices/_components/device-table/AddDeviceNote";
import DeleteDeviceButton from "@/app/dashboard/devices/_components/device-table/DeleteDeviceButton";

interface Props {
    locations: Location[],
    employees: Employee[],
    departments: Deparment[],
    devices: Device
}

export default function AccesorieActions({devices, locations, employees, departments}:Props){
    return(
        <div className="flex items-center justify-center gap-2">
             <Tooltip content="Historial/Nota">
            <AddDeviceNote devices={devices} />
            </Tooltip>

            <Tooltip content="Editar">
            <UpdateAccesories devices={devices} locations={locations} departments={departments} employees={employees} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <DeleteDeviceButton device={devices} category="peripheral"/>
            </Tooltip>
        </div>
    )
}