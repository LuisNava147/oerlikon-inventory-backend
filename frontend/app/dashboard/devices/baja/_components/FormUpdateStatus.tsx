import { updateDeviceStatus } from "@/actions/devices/deviceStstus-update"
import { Device } from "@/entities"
import { Button, ModalFooter, Select, SelectItem } from "@heroui/react"
import { CircleQuestionMark, Save } from "lucide-react"
import { useEffect } from "react"
import { useFormState, useFormStatus } from "react-dom"

const initialState = {
    success: false,
    error: null,
  }

function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type="submit" color="primary" isLoading={pending} startContent={!pending && <Save size={18}/>} className="font-semibold shadow-md">
            {pending ? "Guardando..." : "Editar Equipo"}
        </Button>
    )
}
export default function FormUpdateStatus({devices, onClose}:{devices:Device, onClose:()=>void}){
    const deviceId = devices?.deviceId ? String(devices.deviceId) : ""
    const updateWithDeviceId = updateDeviceStatus.bind(null, deviceId)

    const [state, formAction] = useFormState(updateWithDeviceId, initialState)

    useEffect(()=>{
        if(state.success){
        onClose()
        }
    }, [state.success, onClose])

    return (
        <form action={formAction} className="flex flex-col gap-4">
        {devices?.deviceId && (
            <input type="hidden" name="device" value={devices.deviceId} />
        )}

        <div className="w-full text-center pb-2 border-b border-slate-200 mb-2">
        <p className="text-slate-500 text-sm">Equipo:</p>
            <h3 className="text-slate-800 font-bold text-lg">
                {devices?.deviceType} {devices?.deviceBrand} {devices?.deviceModel}
            </h3>
        </div>

        <div className="flex flex-col gap-4 w-full font-bold">
           
        <Select label="Estatus del Equipo" placeholder="Selecciona el estado" name="deviceStatus"
                    defaultSelectedKeys={[devices.deviceStatus]} variant="bordered" color="primary" classNames={{trigger:"bg-slate-50"}}
                    startContent={<CircleQuestionMark className="text-gray-400" size={18} />} isRequired selectionMode="single" 
                    disallowEmptySelection={true}>
                    <SelectItem key="Stock" color="success" variant="flat" description="El equipo no tiene un Empleado asignado.">
                        Stock
                    </SelectItem>
                    <SelectItem key="BAJA" color="danger" variant="flat" description="El Equipo ya es obsoleto.">
                        BAJA
                    </SelectItem>
                    </Select>
        {state.error && (
            <p className="text-red-600 text-sm">{state.error}</p>
        )}
        </div>
        <div className="flex justify-end pt-2">
        <ModalFooter className="justify-end w-full gap-4">
                <Button color="danger" variant="light" onPress={onClose}>
                    Cancelar
                </Button>   
                <SubmitButton />
            </ModalFooter>
        </div>
    </form>
    )
}