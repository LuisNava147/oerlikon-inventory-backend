"use client"

import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import { Plus } from "lucide-react";
import { ReactNode } from "react";
import FormCreateDevice from "./FormDeviceCreate";

export default function CreateDevice({children}:{children: ReactNode}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Button onPress={onOpen} color="primary" className="font-bold">
            <Plus size={20}/> Nuevo Equipo
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" scrollBehavior="inside" backdrop="blur" className="bg-slate-200">
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalBody className="py-7 overflow-y-auto">
                            
                            {children}
                            
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}