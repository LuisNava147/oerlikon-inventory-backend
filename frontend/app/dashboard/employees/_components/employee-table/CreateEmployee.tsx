"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { Monitor, MonitorUp, Plus, TabletSmartphone, UserRoundPlus } from "lucide-react";
import { Children, ReactNode } from "react";
import { Deparment, Employee, Location } from "@/entities";
import FormCreateEmployee from "./FormCreateEmployee";

export default function CreateEmployee({locations, departments}:{locations:Location[], departments:Deparment[]}){
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Button onPress={onOpen} color="primary" className="font-bold">
            <Plus size={20}/> Nuevo Equipo
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="4xl" scrollBehavior="inside" backdrop="blur">
            <ModalContent className="w-full h-[90vh] md:h-auto max-h-[90vh]">
                {
                    ()=>(
                        <>
                        <ModalHeader className="flex flex-row gap-3 items-center text-slate-700">
                        <UserRoundPlus size={30} className="border border-red-50 bg-red-50 rounded-lg text-red-600"/>
                        <p className="text-xl font-bold">Registrar nuevo Equipo</p>
                        </ModalHeader>
                        <ModalBody className="py-7 overflow-y-auto">  
                        <FormCreateEmployee locations={locations} departments={departments} onClose={onOpenChange}/>  
                        </ModalBody>
                        </>
                    )
                }
            </ModalContent>
        </Modal>
        </>
    )
}