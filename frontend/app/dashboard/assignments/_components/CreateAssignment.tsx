"use client";
import { Button, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react";
import { ClipboardList, Plus } from "lucide-react";
import { Device, Employee } from "@/entities";
import FormCreateAssignment from "./FormCreateAssignments";

interface Props {
  employees: Employee[];
  devices: Device[];
}

export default function CreateAssignment({ employees, devices }: Props) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen} color="primary" className="font-bold shadow-md">
        <Plus size={20} /> Asignar Equipo
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="2xl" backdrop="blur">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex gap-3 items-center">
                <div className="p-2 bg-red-100 rounded-lg text-red-600">
                    <ClipboardList size={24} />
                </div>
                <div>
                    <h3 className="text-lg font-bold">Nueva Asignación</h3>
                    <p className="text-sm text-gray-500 font-normal">Asocie un dispositivo a un empleado y genere su responsiva.</p>
                </div>
              </ModalHeader>
              <ModalBody>
                <FormCreateAssignment employees={employees} devices={devices} onClose={onClose} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}