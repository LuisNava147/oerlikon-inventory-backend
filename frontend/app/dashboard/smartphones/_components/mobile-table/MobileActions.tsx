
import { Button, Tooltip } from "@heroui/react";
import { Deparment, Device, Employee, Location } from "@/entities";
import UpdateMobile from "./UpdateMobile";
import DeleteMobileButton from "./DeleteMobileButton";
import DeleteDeviceButton from "@/app/dashboard/devices/_components/device-table/DeleteDeviceButton";
import AddDeviceNote from "@/app/dashboard/devices/_components/device-table/AddDeviceNote";

interface Props {
    devices:Device
    locations:Location[]
    employees: Employee[]
    onClose: ()=>void
    departments: Deparment[]
}

export default function MobileActions({devices, locations, employees, departments, onClose}:Props){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Historial/Nota">
            <AddDeviceNote devices={devices} />
            </Tooltip>

            <Tooltip content="Editar">
            <UpdateMobile devices={devices} locations={locations} employees={employees} departments={departments} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <DeleteDeviceButton device={devices} category="mobile"/>
            </Tooltip>
        </div>
    )
}