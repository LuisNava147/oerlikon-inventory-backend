import { Button, Tooltip } from "@heroui/react";
import { Edit, Eye, Pencil, Trash, Trash2 } from "lucide-react";
import Link from "next/link";
import { Deparment, Device, Employee, Location } from "@/entities";
import UpdateAccesories from "./UpdateAccesories";
import DeleteAccesorieButton from "./DeleteAccesoriesButton";
import AddDeviceNote from "../../devices/_components/device-table/AddDeviceNote";

interface Props {
    locations: Location[],
    employees: Employee[],
    departments: Deparment[],
    devices: Device
    onClose: () => void
}

export default function AccesorieActions({devices, locations, employees, departments, onClose}:Props){
    return(
        <div className="flex items-center justify-center gap-2">
             <Tooltip content="Historial/Nota">
            <AddDeviceNote devices={devices} />
            </Tooltip>

            <Tooltip content="Editar">
            <UpdateAccesories devices={devices} locations={locations} departments={departments} employees={employees} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <DeleteAccesorieButton device={devices} />
            </Tooltip>
        </div>
    )
}