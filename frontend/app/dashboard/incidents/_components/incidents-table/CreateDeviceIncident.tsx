"use client"

import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import { CircleAlert, Monitor, MonitorUp, Plus, PrinterCheck } from "lucide-react";
import { Children, ReactNode } from "react";
import { Deparment, Device, Employee, Location } from "@/entities";
import FormCreateIncident from "./FormCreateIncident";

export default function CreateDeviceIncident({devices}:{devices:Device[]}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Button onPress={onOpen} color="primary" className="font-bold">
            <Plus size={20}/> Nuevo Incidente
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="inside" backdrop="blur">
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalHeader className="flex gap-3 items-center">
                            <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                <CircleAlert size={30}/>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Registrar un Incidente de equipos</h3>
                                <p className="text-sm text-gray-500 font-normal">Registra un incidente técnico asociado a un dispositivo.</p>
                            </div>
                        </ModalHeader>  
                        <ModalBody className="py-1 overflow-y-auto font-bold">  
                        <FormCreateIncident devices={devices} onClose={onOpenChange} />
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}