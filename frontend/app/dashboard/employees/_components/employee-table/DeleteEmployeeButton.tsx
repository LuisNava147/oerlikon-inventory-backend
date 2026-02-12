"use client"

import deleteDevice from "@/actions/devices/devices-delete";
import deleteEmployee from "@/actions/employees/employee-delete";
import { Device, Employee } from "@/entities";
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
export default function DeleteEmployeeButton({employee}:{employee: Employee}){
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [error, setError] = useState<string | null>(null)

    const handleDelete = async () => {
        setError(null)
        const result = await deleteEmployee(employee.employeeId)

        if(result.success){
            onClose()
        }else{
            setError(result.error)
        }
    }

return(
    <>
    <Tooltip content="Eliminar" color="danger">
        <span className="text-lg text-danger cursor-pointer active:opacity-50 hover:text-red-700" onClick={onOpen}><Trash2 size={18}/></span>
    </Tooltip>
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" classNames={{backdrop: "bg-red-900/20"}}>
    <ModalContent>
        {(onClose) => (
            <form action={handleDelete}>
                <ModalHeader className="flex flex-col gap-1 text-red-600 items-center">
                    <AlertTriangle size={48} />
                    <span className="text-xl">¿Eliminar Empleado?</span>
                </ModalHeader>
                <ModalBody className="text-center">
                    <p className="text-slate-600">Estás a punto de eliminar el Empleado:</p>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100 mt-2">
                        <p className="font-bold text-slate-800">
                            {employee.employeeName} {employee.employeeLastName}
                        </p>
                        <p className="text-xs text-slate-500 font-mono mt-1">
                            CORREO: {employee.employeeEmail}
                        </p>
                        <p className="text-xs text-slate-500 font-mono mt-1">
                            TELÉFONO: {employee.employeePhoneNumber || null}
                        </p>
                        <p className="text-xs text-slate-500 font-mono mt-1">
                            DEPARTAMENTO: {employee.department.departmentName || null}
                        </p>
                    </div>
                    <p className="text-xs text-slate-400 mt-4">
                        Esta acción es irreversible y se perderá el historial de asignaciones.
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