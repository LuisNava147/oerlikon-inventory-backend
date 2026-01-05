'use client';

import { Button, Modal, ModalBody, ModalContent, useDisclosure } from "@heroui/react";
import { Edit } from "lucide-react";
import { ReactNode } from "react";

export default function UpdateLocation({children, devices}:{children: ReactNode, devices?: string | string[]}){
    if(!devices || devices === "0") return <div />

    const{isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Button onPress={onOpen} color="primary" variant="solid" isIconOnly>
            <Edit size={20} />
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
            <ModalContent>
                
                    <ModalBody className="p-6">
                    <h3 className="text-lg font-bold mb-4">Editar Ubicación</h3>
                    {children}
                    </ModalBody>
                
            </ModalContent>
        </Modal>
        </>
    )
}