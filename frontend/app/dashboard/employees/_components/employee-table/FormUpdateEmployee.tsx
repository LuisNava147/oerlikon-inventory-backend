import { updateDevice } from "@/actions/devices/devices-update"
import updateEmployee from "@/actions/employees/employee-update"
import { Device, Employee, Location } from "@/entities"
import { Autocomplete, AutocompleteItem, Button, Divider, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Tooltip, useDisclosure } from "@heroui/react"
import { MapPin, Pencil, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

const initialState = {
    success: false,
    error: null,
  }

function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type="submit" color="primary" isLoading={pending} startContent={!pending && <Save size={18}/>} className="font-semibold shadow-md">
            {pending ? "Guardando..." : "Editar Empleado"}
        </Button>
    )
}

export default function FormUpdateEmployee({locations=[], employees, onClose}:{locations:Location[], employees:Employee, onClose:()=>void}){
    const [locationId, setLocationId] = useState<string>("")
    const employeeId = employees?.employeeId ? String(employees.employeeId) : ""
    const updateWithEmployeeId = updateEmployee.bind(null, employeeId)
    const [state, formAction] = useFormState(updateWithEmployeeId, initialState)

    useEffect(()=>{
        if(employees){
            if(employees.location?.locationId){
                setLocationId(String(employees.location.locationId))
            }
        }
    },[employees])

    useEffect(()=> {
        if(state.success){
            onClose()
        }
    },[state.success, onClose])

    if(!employees){
        return(
            <div className="flex justify-center items-center h-40">
            <Spinner label="Cargando datos..."/>
        </div>
        )
    }

    return(
        <form action={formAction} className="bg-slate-50 p-8 rounded-none flex flex-col gap-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
            <Input isRequired label="Nombre(s) de Empleado" variant="bordered" name="employeeName" defaultValue={employees?.employeeName} className="mb-3 bg-white rounded-2xl"/>
            <Input isRequired label="Apellido(s) de Empleado" variant="bordered" name="employeeLastName" defaultValue={employees?.employeeLastName} className="mb-3 bg-white rounded-2xl"/>
            <Input isRequired label="Correo Electrónico" placeholder="Ej. firtsname.lastname@oerlikon.com" defaultValue={employees?.employeeEmail} variant="bordered" name="employeeEmail" className="mb-3 bg-white rounded-2xl" />
            <Input label="Número Telefónico" placeholder="Ej. 442XXXXXXX" variant="bordered" name="employeePhoneNumber" defaultValue={employees?.employeePhoneNumber} className="mb-3 bg-white rounded-2xl" />
            </div>
           <Divider className="my-2"/>

           <div className="flex items-center gap-2 mb-4 text-slate-700">
            <MapPin size={24} className="text-red-600"/>
            <h3 className="text-xl font-bold">Ubicación y Asignación</h3>
            </div> 
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <input type="hidden" name="location" value={locationId} />
            <Select name="location" selectedKeys={locationId ? [locationId] : []} onSelectionChange={(keys)=> setLocationId(Array.from(keys)[0] as string)}
            label="Selecciona una Ubicación" placeholder="Selecciona una Ubicación" variant="bordered" className="bg-white rounded-2xl">
                {locations.map((loc)=>(
                    <SelectItem key={String(loc.locationId)} textValue={loc.locationName}>
                        {loc.locationName}
                    </SelectItem>
                ))}
            </Select>
        
                    {state.error && (
                        <p className="text-red-600 text-sm">{state.error}</p>
                    )}
            </div>
            <div className="flex justify-end pt-4">
            <ModalFooter className="justify-center">
                    <Button color="secondary" variant="light" onPress={onClose}>
                        Cancelar
                    </Button>   
                    <SubmitButton />
                </ModalFooter>
            </div>
        </form>
    )
}