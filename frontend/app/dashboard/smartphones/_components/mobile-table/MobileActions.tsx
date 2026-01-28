
import { Button, Tooltip } from "@heroui/react";
import { Device, Employee, Location } from "@/entities";
import UpdateMobile from "./UpdateMobile";
import DeleteMobileButton from "./DeleteMobileButton";



export default function MobileActions({devices, locations, employees, onClose}:{devices:Device, locations:Location[], employees: Employee[], onClose: ()=>void}){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Editar">
            <UpdateMobile devices={devices} locations={locations} employees={employees} />
            </Tooltip>

            <Tooltip content="Eliminar">
            <DeleteMobileButton device={devices} />
            </Tooltip>
        </div>
    )
}