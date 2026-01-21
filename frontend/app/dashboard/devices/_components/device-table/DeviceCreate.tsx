"use client"

import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { Children, ReactNode } from "react";
import FormCreateDevice from "./FormDeviceCreate";
import { Employee, Location } from "@/entities";

export default function CreateDevice({locations, employees}:{locations: Location[], employees: Employee[]}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Button onPress={onOpen} color="primary" className="font-bold">
            <Plus size={20}/> Nuevo Equipo
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" scrollBehavior="inside" backdrop="blur" className="bg-slate-200 rounded-none">
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalBody className="py-7 overflow-y-auto">
                            
                        <FormCreateDevice locations={locations} employees={employees} onClose={onOpenChange}/>
                            
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}