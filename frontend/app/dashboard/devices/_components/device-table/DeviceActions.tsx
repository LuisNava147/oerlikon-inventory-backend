
import { Button, Tooltip } from "@heroui/react";
import { Edit, Eye, Pencil, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import FormUpdateDevice from "./FormDeviceUpdate";
import { Deparment, Device, Employee, Location } from "@/entities";
import UpdateDevice from "./DeviceUpdate";
import DeleteDeviceButton from "./DeleteDeviceButton";
import AddDeviceNote from "./AddDeviceNote";

interface Props {
    devices:Device
    locations:Location[]
    employees: Employee[]
    onClose: ()=>void
    departments: Deparment[]
}
export default function DeviceActions({devices, locations, employees, onClose, departments}:Props){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Historial/Nota">
            <AddDeviceNote devices={devices} />
            </Tooltip>

            <Tooltip content="Editar">
            <UpdateDevice devices={devices} locations={locations} employees={employees} departments={departments} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <DeleteDeviceButton device={devices} category="computing"/>
            </Tooltip>
        </div>
    )
}