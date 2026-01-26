"use client"

import { Deparment } from "@/entities";
import { Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from "@heroui/react";
import { Pencil } from "lucide-react";
import FormUpdateDepartment from "./FormUpdateDepartment";

export default function UpdateDepartment({departments}:{departments:Deparment}){
    const{isOpen, onOpen, onOpenChange} = useDisclosure()
    return(
        <>
        <Tooltip content="Editar">
                <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-blue-600" onClick={onOpen}>
                    <Pencil size={18} />
                </span>
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                    {()=>(
                       <>
                       <ModalHeader>Editar Departamento</ModalHeader>
                       <ModalBody>
                       <FormUpdateDepartment departments={departments} onClose={onOpenChange} />
                       </ModalBody>
                       </> 
                    )}
                    
                </ModalContent>

            </Modal>
        </>
    )
}