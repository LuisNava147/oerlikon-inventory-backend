"use client"
import deleteLocation from "@/actions/locations/delete";
import { API_URL } from "@/constants";
import { Location } from "@/entities";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, useDisclosure } from "@heroui/react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";

function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type="submit" color="danger" variant="solid" isLoading={pending} startContent={!pending && <Trash2 size={18}/>} className="font-semibold shadow-md">
            {pending ? "Eliminando..." : "Sí, eliminar"}
        </Button>
    )
}

export default function DeleteLocationButtom({locations}:{locations:Location}){
    const locationId = String(locations?.locationId)
    const [loading, setLoading] = useState(false)
    const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
    const [error, setError] = useState<string | null>(null)

    const router = useRouter();

    const handleDelete = async () => {
        setError(null)
        const result = await deleteLocation(locationId)

        if(result.success){
            onClose()
            router.push('/dashboard')
            router.refresh()
        }else{
            setError(result.error)
        }
    }

    return(
        <>
        <Button onPress={onOpen} color="danger" variant="solid" isIconOnly>
            <Trash2 size={20} />
        </Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop="blur" classNames={{backdrop: "bg-red-900/20"}}>
    <ModalContent>
        {(onClose) => (
            <form action={handleDelete}>
                <ModalHeader className="flex flex-col gap-1 text-red-600 items-center">
                    <AlertTriangle size={48} />
                    <span className="text-xl">¿Eliminar Ubicación?</span>
                </ModalHeader>
                <ModalBody className="text-center">
                    <p className="text-slate-600">Estás a punto de eliminar la Ubicación:</p>
                    <div className="bg-red-50 p-3 rounded-lg border border-red-100 mt-2">
                        <p className="font-bold text-slate-800">
                            {locations.locationName}
                        </p>
                    </div>
                    <p className="text-xs text-slate-400 mt-4">
                        Esta acción es irreversible y se perderá el historial de ubicaciones. 
                        Si <b>{locations.locationName}</b> tiene equipos, empleados, incidentes asignados, estos quedarán sin ubicación.
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