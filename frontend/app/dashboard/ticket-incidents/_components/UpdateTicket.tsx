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
                        <ModalHeader className="flex gap-3 items-center">
                            <div className="p-2 bg-red-100 rounded-lg text-red-600">
                                <CircleCheck size={30} />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Actualizar como resuelto el Ticket</h3>
                                <p className="text-sm text-gray-500 font-normal">Actualice el estado del ticket.</p>
                            </div>
                        </ModalHeader>  
                        <ModalBody className="py-1 overflow-y-auto font-bold">  
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