"use client"

import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import { LaptopMinimalCheck, Monitor, MonitorUp, Plus } from "lucide-react";
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
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="inside" backdrop="blur">
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalHeader className="flex gap-3 items-center">
                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                            <LaptopMinimalCheck size={30} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Editar Ubicación</h3>
                            <p className="text-sm text-gray-500 font-normal">Crea un nuevo Equipo de computo.</p>
                        </div>
                        </ModalHeader>
                        <ModalBody className="py-1 overflow-y-auto font-bold">  
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