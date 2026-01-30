"use client"

import { Device, Employee, Location } from "@/entities";
import { Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from "@heroui/react";
import { MonitorCog, Pencil, UserRoundPen } from "lucide-react";
import FormUpdateEmployee from "./FormUpdateEmployee";

export default function UpdateEmployee({locations, employees}:{locations:Location[], employees:Employee}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure()

    return(
        <>
            <Tooltip content="Editar Empleado">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-blue-600" onClick={onOpen}>
                <Pencil size={18} />
            </span>
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" scrollBehavior="inside" backdrop="blur" isDismissable={false}>
                <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                    {
                        ()=>(
                            <>
                            <ModalHeader className="flex flex-row gap-3 items-center text-slate-700">
                                <UserRoundPen size={30} className="border border-red-50 bg-red-50 rounded-lg text-red-600 text-xl" />
                            <p className="font-bold text-xl">Editar Empleado: <span className="text-red-600">{employees?.employeeName} {employees?.employeeLastName}</span></p> 
                            </ModalHeader>
                            <ModalBody className="py-7 overflow-y-auto">
                                <FormUpdateEmployee employees={employees} locations={locations} onClose={onOpenChange}/>
                            </ModalBody>
                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        </>
    )
}