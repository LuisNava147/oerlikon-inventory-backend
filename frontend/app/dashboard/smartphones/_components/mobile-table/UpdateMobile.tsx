"use client"

import { Deparment, Device, Employee, Location } from "@/entities";
import { Modal, ModalBody, ModalContent, ModalHeader, Tooltip, useDisclosure } from "@heroui/react";
import { MonitorCog, Pencil, TabletSmartphone } from "lucide-react";
import FormUpdateMobile from "./FormUpdateMobile";

interface Props {
    locations: Location[]
    employees: Employee[]
    departments: Deparment[]
    devices: Device
}
export default function UpdateMobile({locations, employees,departments, devices}:Props){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Tooltip content="Editar Equipo">
        <span className="text-lg text-default-400 cursor-pointer active:opacity-50 hover:text-blue-600" onClick={onOpen}>
            <Pencil size={18} />
        </span>
        </Tooltip>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" scrollBehavior="inside" backdrop="blur" isDismissable={false}>
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalHeader className="flex flex-row gap-3 items-center text-slate-700">
                            <TabletSmartphone size={30} className="border border-red-50 bg-red-50 rounded-lg text-red-600 text-xl" />
                           <p className="font-bold text-xl">Editar Dispositivo: <span className="text-red-600">{devices?.deviceBrand} {devices?.deviceModel}</span></p> 
                        </ModalHeader>
                        <ModalBody className="py-7 overflow-y-auto">
                            <FormUpdateMobile employees={employees} locations={locations} departments={departments} devices={devices} onClose={onOpenChange}/>
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}