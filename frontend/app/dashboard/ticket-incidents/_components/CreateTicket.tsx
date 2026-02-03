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
            <Plus size={20}/> Nuevo Equipo
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" scrollBehavior="inside" backdrop="blur">
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalHeader className="flex flex-row gap-3 items-center text-slate-700">
                        <TicketCheck size={30} className="text-red-600 pd-2 rounded-lg bg-red-50"/>
                        <p className="text-xl font-bold">Registrar un Ticket Jira asociado a la planta</p>
                        </ModalHeader>  
                        <ModalBody className="py-7 overflow-y-auto">  
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