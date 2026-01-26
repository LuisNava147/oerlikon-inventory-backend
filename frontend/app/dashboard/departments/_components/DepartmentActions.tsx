"use client"

import { Deparment } from "@/entities";
import { Tooltip, useDisclosure } from "@heroui/react";
import { Pencil } from "lucide-react";
import UpdateDepartment from "./UpdateDepartment";
import DeleteDepartmentButton from "./DeleteDepartmentButton";

export default function DepartmentActions({departments}:{departments:Deparment}){
    const{isOpen, onOpen, onOpenChange} = useDisclosure()

    return(
        <div className="flex items-center justify-center gap-2">
            <Tooltip content="Editar">
               <UpdateDepartment departments={departments} />
            </Tooltip>
            <Tooltip content="Eliminar">
                <DeleteDepartmentButton departments={departments} />
            </Tooltip>
        </div>
    )
}