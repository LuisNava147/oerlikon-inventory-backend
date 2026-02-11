"use client"

import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import { Monitor, MonitorUp, Plus } from "lucide-react";
import { Children, ReactNode } from "react";
import FormCreateDevice from "./FormDeviceCreate";
import { Deparment, Employee, Location } from "@/entities";

export default function CreateDevice({locations, employees, departments}:{locations: Location[], employees: Employee[], departments: Deparment[]}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Button onPress={onOpen} color="primary" className="font-bold">
            <Plus size={20}/> Nuevo Equipo
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" scrollBehavior="inside" backdrop="blur">
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalHeader className="flex flex-row gap-3 items-center text-slate-700">
                        <MonitorUp size={30} className="text-red-600"/>
                        <p className="text-xl font-bold">Registrar nuevo Equipo</p>
                        </ModalHeader>
                        <ModalBody className="py-7 overflow-y-auto">  
                        <FormCreateDevice locations={locations} employees={employees} departments={departments} onClose={onOpenChange}/>  
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}