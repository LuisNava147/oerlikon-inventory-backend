"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { Monitor, MonitorUp, Plus, TabletSmartphone, UserRoundPlus } from "lucide-react";
import { Children, ReactNode } from "react";
import { Employee, Location } from "@/entities";
import FormCreateProvider from "./FormCreateProvider";

export default function CreateProvider({locations}:{locations:Location[]}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Button onPress={onOpen} color="primary" className="font-bold">
            <Plus size={20}/> Nuevo Equipo
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="3xl" scrollBehavior="inside" backdrop="blur">
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalHeader className="flex flex-row gap-3 items-center text-slate-700">
                        <UserRoundPlus size={30} className="border border-red-50 bg-red-50 rounded-lg text-red-600"/>
                        <p className="text-xl font-bold">Registrar nuevo Provedor</p>
                        </ModalHeader>
                        <ModalBody className="py-7 overflow-y-auto">  
                        <FormCreateProvider locations={locations} onClose={onOpenChange}/>  
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}