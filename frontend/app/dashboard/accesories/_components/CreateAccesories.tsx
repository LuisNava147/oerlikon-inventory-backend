"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { HardDriveUpload, Monitor, MonitorUp, Plus, TabletSmartphone } from "lucide-react";
import { Children, ReactNode } from "react";
import { Employee, Location } from "@/entities";
import FormCreateAccesories from "./FormCreateAccesories";


export default function CreateAccesories({locations, employees}:{locations: Location[], employees: Employee[]}){
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
                        <ModalHeader className="flex flex-row gap-3 items-center text-slate-700">
                        <HardDriveUpload size={30} className="border border-red-50 bg-red-50 rounded-lg text-red-600"/>
                        <p className="text-xl font-bold">Registrar nuevo Periférico</p>
                        </ModalHeader>
                        <ModalBody className="py-7 overflow-y-auto">  
                        <FormCreateAccesories locations={locations} employees={employees} onClose={onOpenChange}/>  
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}