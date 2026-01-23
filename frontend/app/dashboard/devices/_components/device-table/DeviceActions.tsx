
import { Button, Tooltip } from "@heroui/react";
import { Edit, Eye, Pencil, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import FormUpdateDevice from "./FormDeviceUpdate";
import { Device, Employee, Location } from "@/entities";
import UpdateDevice from "./DeviceUpdate";
import DeleteDeviceButton from "./DeleteDeviceButton";


export default function DeviceActions({devices, locations, employees, onClose}:{devices:Device, locations:Location[], employees: Employee[], onClose: ()=>void}){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Editar">
            <UpdateDevice devices={devices} locations={locations} employees={employees} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <DeleteDeviceButton device={devices} />
            </Tooltip>
        </div>
    )
}