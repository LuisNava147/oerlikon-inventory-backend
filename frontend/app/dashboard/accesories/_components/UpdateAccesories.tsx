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
                        <ModalHeader className="flex gap-3 items-center">
                            <div className="p-2 bg-red-100 rounded-lg text-red-600">
                            <HardDriveDownload size={30}/>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">Editar un Periférico</h3>
                                <p className="text-sm text-gray-500 font-normal">{devices?.deviceBrand} {devices?.deviceModel}.</p>
                            </div>
                        </ModalHeader>
                        <ModalBody className="py-1 overflow-y-auto font-bold">
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