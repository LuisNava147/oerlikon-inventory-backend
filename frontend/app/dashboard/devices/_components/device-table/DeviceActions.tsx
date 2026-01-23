
import { Button, Tooltip } from "@heroui/react";
import { Edit, Eye, Pencil, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import FormUpdateDevice from "./FormDeviceUpdate";
import { Device, Employee, Location } from "@/entities";
import UpdateDevice from "./DeviceUpdate";


export default function DeviceActions({devices, locations, employees, onClose}:{devices:Device, locations:Location[], employees: Employee[], onClose: ()=>void}){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Editar">
            <UpdateDevice devices={devices} locations={locations} employees={employees} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <Button className="cursor-pointer text-default-400 active:opacity-50 hover:text-red-700 bg-transparent border-none outline-none">
                <Trash2 size={18} />
            </Button>
            </Tooltip>
        </div>
    )
}