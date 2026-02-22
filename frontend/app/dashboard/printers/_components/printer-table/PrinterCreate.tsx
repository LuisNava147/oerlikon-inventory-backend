"use client"

import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import { Monitor, MonitorUp, Plus, PrinterCheck } from "lucide-react";
import { Children, ReactNode } from "react";
import { Deparment, Employee, Location } from "@/entities";
import FormCreatePrinter from "./FormPrinterCreate";

export default function CreatePrinter({locations, departments}:{locations: Location[], departments: Deparment[]}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Button onPress={onOpen} color="primary" className="font-bold">
            <Plus size={20}/> Nueva Impresora
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="inside" backdrop="blur">
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalHeader className="flex gap-3 items-center">
                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                            <PrinterCheck size={30}/>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Registrar una Impresora</h3>
                            <p className="text-sm text-gray-500 font-normal">Registre una nueva Impresora.</p>
                        </div>
                        </ModalHeader>
                        <ModalBody className="py-1 overflow-y-auto font-bold">  
                        <FormCreatePrinter locations={locations} departments={departments} onClose={onOpenChange}/>  
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}