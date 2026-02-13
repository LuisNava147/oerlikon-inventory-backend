"use client"

import { Deparment, Location } from "@/entities";
import { Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from "@heroui/react";
import { Pencil, SquarePen } from "lucide-react";
import FormUpdateDepartment from "./FormUpdateDepartment";

export default function UpdateDepartment({departments, locations}:{departments:Deparment, locations:Location[]}){
    const{isOpen, onOpen, onOpenChange} = useDisclosure()
    return(
        <>
        <Tooltip content="Editar">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-blue-600" onClick={onOpen}>
                    <Pencil size={18} />
                </span>
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" isDismissable={false}>
                <ModalContent>
                    {()=>(
                       <>
                       <ModalHeader className="flex flex-row gap-3 items-center text-slate-700">
                       <SquarePen size={30} className="border border-red-50 bg-red-50 rounded-lg text-red-600" />
                        Editar Departamento</ModalHeader>
                       <ModalBody className="py-7 overflow-y-auto">
                       <FormUpdateDepartment departments={departments} locations={locations} onClose={onOpenChange} />
                       </ModalBody>
                       </> 
                    )}
                    
                </ModalContent>

            </Modal>
        </>
    )
}