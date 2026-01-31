"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@heroui/react";
import { Monitor, MonitorUp, Plus, ShieldAlert, ShieldUser, TabletSmartphone, UserRoundPlus } from "lucide-react";
import { Children, ReactNode } from "react";
import { Employee, Location } from "@/entities";
import FormCreateUser from "./FormCreateUser";

export default function CreateUser({employees}:{employees:Employee}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
            <Tooltip content="Administrador">
            <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-yellow-400" onClick={onOpen}>
                <ShieldUser size={18} />
            </span>
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" scrollBehavior="inside" backdrop="blur" isDismissable={false}>
                <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                    {
                        ()=>(
                            <>
                            <ModalHeader className="flex flex-row gap-3 items-center text-white bg-red-600">
                                <ShieldUser size={30} className=" rounded-lg text-white text-xl" />
                                <p className="font-bold text-xl">Habilitar Usuario Administrador</p> 
                            </ModalHeader>
                            <ModalBody className="p-6 overflow-y-auto">
                            <FormCreateUser employee={employees} onClose={onOpenChange}/>
                            </ModalBody>
                                
                           
                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        </>
    )
}