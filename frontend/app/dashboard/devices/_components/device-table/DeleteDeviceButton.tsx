"use client"

import deleteDevice from "@/actions/devices/devices-delete";
import { Device } from "@/entities";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Tooltip, useDisclosure } from "@heroui/react";
import { AlertTriangle, Save, Trash2 } from "lucide-react";
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

interface Props {
    device: Device
    category?: 'computing' | 'printing' | 'mobile' |'peripheral' | 'baja'
}
export default function LowDeleteDeviceButton({device, category}:Props){
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure()
    const [ error, setError]  = useState<string | null>(null)

    const handleDelete = async () => {
        setError(null)
        const result = await deleteDevice(device.deviceId)
        if(result.success){
            onClose()
        }else{
            setError(result.error)
        }
    }

    let modalTitle = ""
    let modalDesc = ""
    let modalWarning = ""

    switch(category){
        case 'baja':
            modalTitle= "¿Eliminar permanentemente?"
            modalDesc = "Estás a punto de eliminar este equipo del historial de Bajas:";
            modalWarning = "Esta acción es irreversible. El equipo desaparecerá por completo de los registros del sistema.";
            break;
        case 'printing':
            modalTitle = "¿Eliminar Impresora?";
            modalDesc = "Estás a punto de eliminar la impresora:";
            modalWarning = "Esta acción es irreversible y se perderá su historial de ubicaciones.";
            break;
        case 'mobile':
            modalTitle = "¿Eliminar Celular/Tablet?";
            modalDesc = "Estás a punto de eliminar el dispositivo móvil:";
            modalWarning = "Esta acción es irreversible y se desvinculará del empleado asignado.";
            break;
        case 'peripheral':
            modalTitle = "¿Eliminar Accesorio?";
            modalDesc = "Estás a punto de eliminar este accesorio:";
            modalWarning = "Esta acción es irreversible.";
            break;
        case 'computing':
            default:
            modalTitle = "¿Eliminar Equipo?";
            modalDesc = "Estás a punto de eliminar el equipo (Laptop/Desktop):";
            modalWarning = "Esta acción es irreversible y se perderá el historial de asignaciones.";
            break; 
    }

    return(
        <>
        <Tooltip content="Eliminar" color="danger">
        <span className="text-lg text-danger cursor-pointer active:opacity-50 hover:text-red-700" onClick={onOpen}><Trash2 size={18}/></span>
        </Tooltip> 
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" classNames={{ backdrop: "bg-red-900/20" }}>
                <ModalContent>
                    {(onClose) => (
                        <form action={handleDelete}>
                            <ModalHeader className="flex flex-col gap-1 text-red-600 items-center">
                                <AlertTriangle size={48} />
                                <span className="text-xl">{modalTitle}</span>
                            </ModalHeader>
                            <ModalBody className="text-center">
                                <p className="text-slate-600">{modalDesc}</p>
                                
                                <div className="bg-red-50 p-3 rounded-lg border border-red-100 mt-2">
                                    <p className="font-bold text-slate-800">
                                        {device.deviceBrand} {device.deviceModel}
                                    </p>
                                    <p className="text-xs text-slate-500 font-mono mt-1">
                                        S/N: {device.deviceSerialTag}
                                    </p>
                                    {device.deviceAssetNumber && (
                                        <p className="text-xs text-slate-500 font-mono mt-1">
                                            NO. ACTIVO: {device.deviceAssetNumber}
                                        </p>
                                    )}
                                    {device.deviceHostName && (
                                        <p className="text-xs text-slate-500 font-mono mt-1">
                                            HOSTNAME: {device.deviceHostName}
                                        </p>
                                    )}
                                    {device.employee?.employeePhoneNumber && (
                                        <p className="text-xs text-slate-500 font-mono mt-1">
                                            NUM. TELÉFONO: {device.employee.employeePhoneNumber}
                                        </p>
                                    )}
                                    {device.deviceAccount && (
                                        <p className="text-xs text-slate-500 font-mono mt-1">
                                            CUENTA: {device.deviceAccount}
                                        </p>
                                    )}
                                    {device.employee?.employeeName && (
                                        <p className="text-xs text-slate-500 font-mono mt-1">
                                            EMPLEADO: {device.employee.employeeName} {device.employee.employeeLastName}
                                        </p>
                                    )}
                                    {device.department?.departmentName && (
                                        <p className="text-xs text-slate-500 font-mono mt-1">
                                        DEPARTAMENTO: {device.department.departmentName}
                                        </p>
                                    )}
                                </div>
                                
                                <p className="text-xs text-slate-400 mt-4">
                                    {modalWarning}
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
