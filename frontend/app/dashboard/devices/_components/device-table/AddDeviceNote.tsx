"use client"

import { Deparment, Device, Employee, Incident, Location } from "@/entities";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from "@heroui/react";
import { ClipboardPen, FileText } from "lucide-react";
import FormAddNote from "./FormAddNote";

export default function AddDeviceNote({devices}:{devices:Device}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Tooltip content="Historial/Notas">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-blue-600 transition-colors" onClick={onOpen}>
            <ClipboardPen size={18} />
        </span>
        </Tooltip>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" scrollBehavior="inside" backdrop="blur">
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalHeader className="flex flex-row gap-3 items-center text-slate-700">
                        <FileText size={30} className="text-red-600 pd-2 rounded-lg bg-red-50"/>
                        <p className="text-xl font-bold">Añade una nota del historial del Equipo</p>
                        </ModalHeader>  
                        <ModalBody className="py-7 overflow-y-auto">  
                        <FormAddNote devices={devices} onClose={onOpenChange} />
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}