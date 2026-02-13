"use client"

import { Deparment, Location } from "@/entities";
import { Tooltip, useDisclosure } from "@heroui/react";
import { Pencil } from "lucide-react";
import UpdateDepartment from "./UpdateDepartment";
import DeleteDepartmentButton from "./DeleteDepartmentButton";

export default function DepartmentActions({departments, locations}:{departments:Deparment, locations:Location[]}){
    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Editar">
               <UpdateDepartment departments={departments} locations={locations} />
            </Tooltip>
            <Tooltip content="Eliminar">
                <DeleteDepartmentButton departments={departments} />
            </Tooltip>
        </div>
    )
}