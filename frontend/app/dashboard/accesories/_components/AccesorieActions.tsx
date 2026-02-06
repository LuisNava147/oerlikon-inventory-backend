import { Button, Tooltip } from "@heroui/react";
import { Edit, Eye, Pencil, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import { Device, Employee, Location } from "@/entities";
import UpdateAccesories from "./UpdateAccesories";
import DeleteAccesorieButton from "./DeleteAccesoriesButton";

export default function AccesorieActions({devices, locations, employees, onClose}:{devices:Device, locations:Location[], employees: Employee[], onClose: ()=>void}){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Editar">
            <UpdateAccesories devices={devices} locations={locations} employees={employees} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <DeleteAccesorieButton device={devices} />
            </Tooltip>
        </div>
    )
}