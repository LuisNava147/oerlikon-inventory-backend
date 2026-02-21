"use client"

import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import { CircleAlert, Monitor, MonitorUp, Plus, PrinterCheck, TicketCheck } from "lucide-react";
import { Children, ReactNode } from "react";
import { Deparment, Device, Employee, Location } from "@/entities";
import FormCreateTicket from "./FormCreateTicket";

export default function CreateTicketIncident(){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Button onPress={onOpen} color="primary" className="font-bold">
            <Plus size={20}/> Nuevo Ticket
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" scrollBehavior="inside" backdrop="blur">
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalHeader className="flex gap-3 items-center">
                            <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                <TicketCheck size={30} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Registrar un Ticket Jira</h3>
                                <p className="text-sm text-gray-500 font-normal">Registre un Ticket Jira a asociado a la planta.</p>
                            </div>
                        </ModalHeader>  
                        <ModalBody className="py-1 overflow-y-auto font-bold">  
                        <FormCreateTicket onClose={onOpenChange} />
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}