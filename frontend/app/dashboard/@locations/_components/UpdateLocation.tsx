'use client';

import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import { Edit, MapPinPen, Pencil } from "lucide-react";
import { ReactNode } from "react";
import FormUpdateLocation from "./FormUpdateLocation";
import { Location } from "@/entities";

export default function UpdateLocation({locations}:{locations:Location}){
    if(!locations) return <div />

    const{isOpen, onOpen, onOpenChange} = useDisclosure();

    return(
        <>
        <Button onPress={onOpen} color="primary" variant="solid" isIconOnly>
            <Pencil size={20} />
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur">
            <ModalContent>
                {()=>(
                    <>
                        <ModalHeader className="flex gap-3 items-center">
                        <div className="p-2 bg-red-100 rounded-lg text-red-600">
                            <MapPinPen size={24} />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold">Editar Ubicación</h3>
                            <p className="text-sm text-gray-500 font-normal">Modifique el nombre o dirección de la Ubicación.</p>
                        </div>
                        </ModalHeader>
                        <ModalBody className="py-4 overflow-y-auto font-bold">
                        <FormUpdateLocation locations={locations} onClose={onOpenChange}/>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
        </>
    )
}