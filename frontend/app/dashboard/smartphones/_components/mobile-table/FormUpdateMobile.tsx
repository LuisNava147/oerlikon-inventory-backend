import updateMobile from "@/actions/smartphones/mobile-update"
import { Device, Employee, Location } from "@/entities"
import { Autocomplete, AutocompleteItem, Button, Divider, Input, ModalFooter, Select, SelectItem, Spinner } from "@heroui/react"
import { MapPin, Save } from "lucide-react"
import { useEffect, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"

const DEVICE_TYPE = [
    {key:"Celular", label:"Celular"},
    {key:"iPad", label:"iPad"},
    {key:"Tablet",label:"Tablet"}
]

const initialState = {
    success: false,
    error: null,
  }

  function SubmitButton(){
    const {pending} = useFormStatus()
    return(
        <Button type="submit" color="primary" isLoading={pending} startContent={!pending && <Save size={18}/>} className="font-semibold shadow-md">
            {pending ? "Guardando..." : "Editar Dispositivo"}
        </Button>
    )
}
export default function FormUpdateMobile({locations=[], employees=[], devices, onClose}:{locations: Location[], employees: Employee[], devices: Device, onClose: ()=>void}){
    const [employeeId, setEmployeeId] = useState<string>("");
    const [employeeInput, setEmployeeInput] = useState("")
    const [locationId, setLocationId] = useState<string>("")
    const [deviceType, setDeviceType] = useState<string>("");

    const deviceId = devices?.deviceId ? String(devices.deviceId) : ""
    const updateWithDeviceId = updateMobile.bind(null, deviceId)

    const [state, formAction] = useFormState(updateWithDeviceId, initialState)
    useEffect(()=>{
        if(devices){
            if(devices.employee?.employeeId){
                setEmployeeId(devices.employee.employeeId)
            }
            if(devices.location?.locationId){
                setLocationId(String(devices.location.locationId))
            }
            if(devices.deviceType){
                setDeviceType(devices.deviceType)
            }
        }
        
    }, [devices])

    useEffect(()=>{
        if(employees.length > 0 && employeeId){
            const found = employees.find((e)=> String(e.employeeId) === String(employeeId))
            if(found){
                setEmployeeInput(`${found.employeeName} ${found.employeeLastName}`)
            }
        }
    }, [employeeId, employees])

    useEffect(()=>{
        if(state.success){
        onClose()
        }
    }, [state.success, onClose])

      if(!devices){
        return(
            <div className="flex justify-center items-center h-40">
                <Spinner label="Cargando datos..."/>
            </div>
        )
    }

    return(
        <>    
                <form action={formAction} className="bg-slate-50 p-8 rounded-none flex flex-col gap-2">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input type="hidden" name="deviceType" value={deviceType} />
                    <Select label="Tipo de Dispositivo" placeholder="Selecciona uno" variant="bordered" isRequired items={DEVICE_TYPE} className="bg-white rounded-3xl"
                    selectedKeys={deviceType ? [deviceType] : []} onSelectionChange={(keys)=> setDeviceType(Array.from(keys)[0] as string)}>
                    {DEVICE_TYPE.map((item)=>(
                        <SelectItem key={item.key}>
                            {item.label}
                        </SelectItem>
                    ))}
                </Select>
                <Input isRequired label="Marca del Dispositivo" placeholder="Ej.Motorola" variant="bordered" name="deviceBrand" defaultValue={devices?.deviceBrand} className="mb-3 bg-white rounded-2xl"/>
                <Input isRequired label="Modelo" placeholder="Ej. MOTO G5" variant="bordered" name="deviceModel" defaultValue={devices?.deviceModel} className="mb-3 bg-white rounded-2xl"/>
                <Input isRequired label="Número de Serie(S/N)" variant="bordered" name="deviceSerialTag" defaultValue={devices?.deviceSerialTag} className="mb-3 bg-white rounded-2xl" />
                <Input label="Cuenta de Usuario" placeholder="Ej. firtsname@gmail.com" variant="bordered" name="deviceAccount" defaultValue={devices?.deviceAccount} className="mb-3 bg-white rounded-2xl" />
                <Input label="Contraseña de Cuenta"  variant="bordered" name="devicePassword" defaultValue={devices?.devicePassword} className="mb-3 bg-white rounded-2xl" />
                <Input label="PIN de Bloqueo" placeholder="Ej. 12131415" variant="bordered" name="devicePin" defaultValue={devices?.devicePin} className="mb-3 bg-white rounded-2xl" />
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
            
            <input type="hidden" name="employee" defaultValue={employeeId} />
            <Autocomplete name="employee" label= "Selecciona un Empleado" placeholder="Escribe para buscar..." className="flex-1 bg-white rounded-2xl" defaultItems={employees}variant="bordered"
                 selectedKey={employeeId || null} onSelectionChange={(key) => setEmployeeId(key as string)} inputValue={employeeInput} onInputChange={setEmployeeInput}>
                        {
                            (emp)=>(
                                <AutocompleteItem key={emp.employeeId} textValue={`${emp.employeeName} ${emp.employeeLastName}`}>
                                    <div className="flex flex-col">
                                        <span className="text-small">{emp.employeeName} {emp.employeeLastName}</span>
                                        <span className="text-tiny text-default-400"> | {emp.employeePhoneNumber} | {emp.employeeEmail}</span>
                                    </div>
                                </AutocompleteItem>
                            )
                        }
                    </Autocomplete>
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
        </>
    )
}