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
                        <ModalHeader className="flex gap-3 items-center">
                            <div className="p-2 bg-red-100 rounded-lg text-red-600">
                            <FileText size={30}/>
                            </div>
                            <div>
                            <h3 className="text-lg font-bold">Notas</h3>
                            <p className="text-sm text-gray-500 font-normal">Añade una nota del historial del Equipo.</p>
                            </div>
                        </ModalHeader>  
                        <ModalBody className="py-1 overflow-y-auto font-bold">  
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