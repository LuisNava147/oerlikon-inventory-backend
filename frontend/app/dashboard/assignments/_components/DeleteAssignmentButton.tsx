"use client"

import deleteAssignment from "@/actions/assignments/assignment-delete";
import { Assignment } from "@/entities";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure, ScrollShadow } from "@heroui/react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";

function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type="submit" color="danger" variant="solid" isLoading={pending} startContent={!pending && <Trash2 size={18}/>} className="font-semibold shadow-md">
            {pending ? "Eliminando..." : "Sí, eliminar"}
        </Button>
    )
}

export default function DeleteAssignmentButton({assignment}:{assignment: Assignment}){
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [error, setError] = useState<string | null>(null)

    const handleDelete = async () => {
        setError(null)
        const result = await deleteAssignment(assignment.assignmentId)

        if(result.success){
            onClose()
        }else{
            setError(result.error)
        }
    }

    const safeName = `${assignment.employee?.employeeName} ${assignment.employee?.employeeLastName}`
    
    //Obtenemos la lista real de dispositivos involucrados
    const attachedDevices = assignment.assignmentDevice?.map(ad => ad.device) || [];

    return(
        <>
        <Tooltip content="Eliminar" color="danger">
            <span className="text-lg text-danger cursor-pointer active:opacity-50 hover:text-red-700" onClick={onOpen}>
                <Trash2 size={18}/>
            </span>
        </Tooltip>
        
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" classNames={{backdrop: "bg-red-900/20"}}>
            <ModalContent>
                {(onClose) => (
                    <form action={handleDelete}>
                        <ModalHeader className="flex flex-col gap-1 text-red-600 items-center">
                            <AlertTriangle size={48} />
                            <span className="text-xl">¿Eliminar Responsiva?</span>
                        </ModalHeader>
                        
                        <ModalBody className="text-center">
                            <p className="text-slate-600">Estás a punto de eliminar la Responsiva de:</p>
                            
                            <div className="bg-red-50 p-3 rounded-lg border border-red-100 mt-2 text-left">
                                <p className="font-bold text-slate-800 text-center mb-2 border-b border-red-200 pb-2">
                                    {safeName}
                                </p>
                                
                                <p className="text-xs text-red-400 font-bold uppercase mb-1">Equipos incluidos:</p>
                                
                                <ScrollShadow className="max-h-[100px]">
                                    {attachedDevices.length > 0 ? (
                                        <ul className="flex flex-col gap-1">
                                            {attachedDevices.map(dev => (
                                                <li key={dev.deviceId} className="text-sm text-slate-700 flex justify-between">
                                                    <span>• {dev.deviceType} {dev.deviceBrand}</span>
                                                    <span className="text-slate-400 text-xs">({dev.deviceSerialTag})</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-sm text-slate-400 italic">Sin equipos vinculados</p>
                                    )}
                                </ScrollShadow>

                                <p className="text-[10px] text-slate-400 font-mono mt-3 text-center">
                                    EMITIDA EL: {assignment.assignmentDate ? new Date(assignment.assignmentDate).toLocaleDateString() : 'N/A'}
                                </p>
                            </div>

                            <p className="text-xs text-slate-400 mt-4">
                                Esta acción es irreversible. Se liberarán los equipos y se perderá el registro histórico.
                            </p>
                            
                            {error && (
                                <div className="bg-red-100 text-red-700 p-2 rounded text-sm mt-2">{error}</div>
                            )}
                        </ModalBody>
                        
                        <ModalFooter className="justify-center">
                            <Button color="default" variant="light" onPress={onClose}>
                                Cancelar
                            </Button>   
                            <SubmitButton />
                        </ModalFooter>
                    </form>
                )}
            </ModalContent>
        </Modal>
        </>
    )
}