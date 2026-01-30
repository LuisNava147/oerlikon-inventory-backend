"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Chip
} from "@heroui/react";
import { Device, Employee } from "@/entities";
import { Laptop, LaptopMinimalCheck } from "lucide-react";

interface ViewAssetsModalProps {
    devices: Device[];
    employees: Employee
  }

  export default function ViewAssetsModal({devices=[], employees}: ViewAssetsModalProps){
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const count = devices.length;

    if (count === 0) {
        return (
          <Chip size="sm" variant="flat" className="text-slate-400 bg-slate-100 border border-slate-200">
            0 asignados
          </Chip>
        );
      }
    
    return(
        <>
            <div onClick={onOpen} className="cursor-pointer hover:opacity-80 active:scale-95 transition-all">
                <Chip startContent={<Laptop size={14} className="ml-1"/>} variant="flat"
                color="primary" className="gap-1 font-medium pl-2" size="sm">
                    {count} {count === 1 ? "equipo" : "equipos"}
                </Chip>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg" backdrop="blur">
                <ModalContent>
                    {(onClose)=>(
                        <>
                            <ModalHeader className="pb-2 border-y-3 border-slate-100">
                            <LaptopMinimalCheck size={30} className="text-red-600 mr-3 bg-red-50 rounded-lg"/>
                                <div className="flex flex-col">
                            
                                    <span className="text-lg font-bold text-slate-800">Equipos Asignados</span>
                                    <span className="text-xs text-slate-500 font-normal"> 
                                    Usuario: {employees.employeeName} {employees.employeeLastName}</span>
                                </div>
                            </ModalHeader>
                            <ModalBody className="py-4">
                                {devices.length > 0 ? (
                                    <ul className="flex flex-col gap-2">
                                        {devices.map((dev, index) => (
                                            <li key={dev.deviceId || index} className="flex items-center gap-2">
                                                <span className="w-1.5 h-1.5 rounded-full bg-red-400 shrink-0"></span>
                                                <span className="text-sm text-slate-700 font-medium">
                                                    {dev.deviceBrand} {dev.deviceModel}
                                                </span>
                                                <span className="text-xs text-slate-500 font-normal">
                                                    {dev.deviceAssetNumber} | {dev.deviceSerialTag}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ): (
                                    <p className="text-sm text-slate-400 italic">Lista vacía.</p>
                                )}
                            </ModalBody>
                            <ModalFooter className="pt-2">
                                <Button size="md" color="danger" variant="light" onPress={onClose}>
                                    Cerrar
                                </Button>
                            </ModalFooter>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    )
  }