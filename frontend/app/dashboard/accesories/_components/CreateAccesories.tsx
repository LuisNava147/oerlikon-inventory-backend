"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { HardDriveUpload, Monitor, MonitorUp, Plus, TabletSmartphone } from "lucide-react";
import { Deparment, Employee, Location } from "@/entities";
import FormCreateAccesories from "./FormCreateAccesories";

interface Props {
    locations: Location[]
    employees: Employee[]
    departments: Deparment[]
}

export default function CreateAccesories({locations, employees, departments}:Props){
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
                                <HardDriveUpload size={30}/>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Registrar un Periférico</h3>
                                <p className="text-sm text-gray-500 font-normal">Registra un nuevo Periférico de computo.</p>
                            </div>
                        </ModalHeader>
                        <ModalBody className="py-1 overflow-y-auto font-bold">  
                        <FormCreateAccesories locations={locations} employees={employees} departments={departments} onClose={onOpenChange}/>  
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}