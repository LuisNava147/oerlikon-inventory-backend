"use client"

import { Deparment, Device, Employee, Location } from "@/entities";
import { Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from "@heroui/react";
import { HardDriveDownload, MonitorCog, Pencil } from "lucide-react";
import FormUpdateAccesories from "./FormUpdateAccesories";

interface Props {
    locations: Location[],
    employees: Employee[],
    departments: Deparment[],
    devices: Device
}

export default function UpdateAccesories({locations, employees, devices, departments}:Props){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Tooltip content="Editar Periférico">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-blue-600" onClick={onOpen}>
            <Pencil size={18} />
        </span>
        </Tooltip>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="inside" backdrop="blur" isDismissable={false}>
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalHeader className="flex flex-row gap-3 items-center text-slate-700">
                            <HardDriveDownload size={30} className="border border-red-50 bg-red-50 rounded-lg text-red-600 text-xl" />
                           <p className="font-bold text-xl">Editar Periférico: <span className="text-red-600">{devices?.deviceBrand} {devices?.deviceModel}</span></p> 
                        </ModalHeader>
                        <ModalBody className="py-7 overflow-y-auto">
                            <FormUpdateAccesories employees={employees} locations={locations} departments={departments} devices={devices} onClose={onOpenChange}/>
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}