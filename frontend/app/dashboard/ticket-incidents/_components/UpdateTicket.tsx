"use client"

import { Deparment, Device, Employee, Incident, Location, TicketIncident } from "@/entities";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from "@heroui/react";
import { CircleCheck } from "lucide-react";
import FormUpdateTicket from "./FormUpdateTicket";

export default function UpdateTicket({tickets}:{tickets:TicketIncident}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Tooltip content="Marcar como Resuelto">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-green-400" onClick={onOpen}>
            <CircleCheck size={18} />
        </span>
        </Tooltip>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" scrollBehavior="inside" backdrop="blur">
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalHeader className="flex flex-row gap-3 items-center text-slate-700">
                        <CircleCheck size={30} className="text-red-600 pd-2 rounded-lg bg-red-50"/>
                        <p className="text-xl font-bold">Actualizar como resuelto el Ticket</p>
                        </ModalHeader>  
                        <ModalBody className="py-7 overflow-y-auto">  
                        <FormUpdateTicket tickets={tickets} onClose={onOpenChange} />
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}