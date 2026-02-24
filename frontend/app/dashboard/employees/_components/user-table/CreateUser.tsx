"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@heroui/react";
import { Form, Monitor, MonitorUp, Plus, ShieldAlert, ShieldCheck, ShieldUser, TabletSmartphone, UserRoundPlus } from "lucide-react";
import { Children, ReactNode } from "react";
import { Employee, Location } from "@/entities";
import FormCreateUser from "./FormCreateUser";
import FormEditUser from "./FormEditUser";

export default function CreateUser({employees}:{employees:Employee}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const isAlreadyAdmin = !!employees.user

    return(
        <>
            <Tooltip content={isAlreadyAdmin ? "Gestionar Admin" : "Habilitar Admin"}>
            <span className={`text-lg cursor-pointer active:opacity-50 ${isAlreadyAdmin ? 'text-success hover:text-green-600' : 'text-default-400 hover:text-yellow-400'}`} 
            onClick={onOpen}>
                {isAlreadyAdmin ? <ShieldCheck size={18} /> : <ShieldUser size={18} />}
            </span>
            </Tooltip>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md" scrollBehavior="inside" backdrop="blur" isDismissable={false}>
                <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                    {
                        (onClose)=>(
                            <>
                            <ModalHeader className={`flex flex-row gap-3 items-center text-white ${isAlreadyAdmin ? 'bg-slate-800':'bg-red-600'}`}>
                                {isAlreadyAdmin ? <ShieldAlert size={30} className="rounded-lg text-white"/> : <ShieldUser size={30} className="rounded-lg text-white"/>}
                                <p className="font-bold text-xl">
                                    {isAlreadyAdmin ? "Gestionar Administrador" : "Habilitar Administrador"}
                                </p> 
                            </ModalHeader>
                            <ModalBody className="p-6 overflow-y-auto">
                            {isAlreadyAdmin ? (
                                    <FormEditUser employees={employees} onClose={onClose}/>
                                ): (
                                    <FormCreateUser employee={employees} onClose={onClose}/>
                                )}
                            </ModalBody>
                            </>
                        )
                    }
                </ModalContent>
            </Modal>
        </>
    )
}