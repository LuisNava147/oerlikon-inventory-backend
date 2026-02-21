"use client"

import { Deparment, Device, Employee, Location } from "@/entities";
import { Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from "@heroui/react";
import { MonitorCog, Pencil, Printer } from "lucide-react";
import FormUpdatePrinter from "./FormPrinterUpdate";

export default function UpdatePrinter({locations, departments, devices}:{locations: Location[], departments: Deparment[], devices: Device}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Tooltip content="Editar Impresora">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-blue-600" onClick={onOpen}>
            <Pencil size={18} />
        </span>
        </Tooltip>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="inside" backdrop="blur" isDismissable={false}>
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalHeader className="flex gap-3 items-center">
                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                            <Printer size={30}/>
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Editar una Impresora</h3>
                            <p className="text-sm text-gray-500 font-normal">{devices?.deviceBrand} {devices?.deviceModel}.</p>
                        </div>
                        </ModalHeader>
                        <ModalBody className="py-1 overflow-y-auto font-bold">
                            <FormUpdatePrinter departments={departments} locations={locations} devices={devices} onClose={onOpenChange}/>
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}